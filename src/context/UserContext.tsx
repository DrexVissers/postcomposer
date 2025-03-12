"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useUser } from "@clerk/nextjs";
import { useUserSync } from "@/hooks/useUserSync";

// Define the user data type
type DatabaseUser = {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  username: string | null;
  profileImage: string | null;
  roles?: Array<{
    id: string;
    role: string;
    scope: string;
    permissions: string[];
  }>;
  socialAccounts?: Array<{
    id: string;
    platform: string;
    handle: string | null;
    isConnected: boolean;
  }>;
};

// Define the context type
type UserContextType = {
  user: DatabaseUser | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Debounce helper function
const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const { isSyncing, error: syncError, syncUser } = useUserSync();
  const [user, setUser] = useState<DatabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);
  const lastFetchedClerkIdRef = useRef<string | null>(null);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch user data from our API
  const fetchUserData = useCallback(async () => {
    if (!clerkUser?.id || isFetchingRef.current) return;

    // Skip if we've already fetched for this clerk ID
    if (lastFetchedClerkIdRef.current === clerkUser.id && user !== null) return;

    // Clear any existing timeout
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
      fetchTimeoutRef.current = null;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // Store the current clerk ID we're fetching for
      lastFetchedClerkIdRef.current = clerkUser.id;

      // First check if the user exists in our database
      const response = await fetch(`/api/users/check?clerkId=${clerkUser.id}`);

      if (!response.ok) {
        throw new Error(`Failed to check user existence: ${response.status}`);
      }

      const data = await response.json();

      if (data.exists) {
        // User exists, fetch full user data
        const userResponse = await fetch(`/api/users/${clerkUser.id}`);

        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user details: ${userResponse.status}`
          );
        }

        const userData = await userResponse.json();
        setUser(userData.user);
      } else {
        // User doesn't exist, sync with Clerk
        const syncedUser = await syncUser();
        if (syncedUser) {
          setUser(syncedUser);
        } else {
          throw new Error("Failed to sync user with Clerk");
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [clerkUser?.id, syncUser, user]);

  // Debounced version of fetchUserData
  const debouncedFetchUserData = useCallback(
    debounce(() => {
      fetchUserData();
    }, 300),
    [fetchUserData]
  );

  // Fetch user data when Clerk user is loaded
  useEffect(() => {
    if (isClerkLoaded && clerkUser && !isFetchingRef.current) {
      // Only fetch if the clerk ID has changed or we don't have user data yet
      if (lastFetchedClerkIdRef.current !== clerkUser.id || user === null) {
        debouncedFetchUserData();
      }
    } else if (isClerkLoaded && !clerkUser) {
      setUser(null);
      setIsLoading(false);
      lastFetchedClerkIdRef.current = null;
    }
  }, [isClerkLoaded, clerkUser, debouncedFetchUserData]);

  // Manual refetch function that forces a new fetch regardless of cache
  const refetch = useCallback(async () => {
    if (clerkUser?.id) {
      // Reset the last fetched ID to force a new fetch
      lastFetchedClerkIdRef.current = null;
      await fetchUserData();
    }
  }, [clerkUser?.id, fetchUserData]);

  // Update error state when sync error changes
  useEffect(() => {
    if (syncError) {
      setError(syncError);
    }
  }, [syncError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  // Provide the context value
  const value = {
    user,
    isLoading: isLoading || isSyncing,
    error,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Create a hook to use the context
export function useAppUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useAppUser must be used within a UserProvider");
  }

  return context;
}
