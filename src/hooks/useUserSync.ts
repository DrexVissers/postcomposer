"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type UserSyncState = {
  isSyncing: boolean;
  error: string | null;
  lastSynced: Date | null;
};

export function useUserSync() {
  const { user, isLoaded } = useUser();
  const [state, setState] = useState<UserSyncState>({
    isSyncing: false,
    error: null,
    lastSynced: null,
  });

  // Function to sync user data with our database
  const syncUser = async () => {
    if (!user) return;

    setState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      // Prepare user data from Clerk
      const userData = {
        email: user.primaryEmailAddress?.emailAddress,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        username: user.username,
        profileImage: user.imageUrl,
      };

      // Call our API to sync the user
      const response = await fetch("/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to sync user");
      }

      const data = await response.json();
      setState({
        isSyncing: false,
        error: null,
        lastSynced: new Date(),
      });

      return data.user;
    } catch (error) {
      console.error("Error syncing user:", error);
      setState({
        isSyncing: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastSynced: state.lastSynced,
      });
    }
  };

  // Sync user when the component mounts and user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      syncUser();
    }
  }, [isLoaded, user]);

  return {
    ...state,
    syncUser,
  };
}
