"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserInitializer() {
  const { user, isLoaded } = useUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run once when the user is loaded
    if (isLoaded && user && !isInitialized) {
      const initializeUser = async () => {
        try {
          // Check if user exists in our database
          const checkResponse = await fetch(
            `/api/users/check?clerkId=${user.id}`
          );
          const checkData = await checkResponse.json();

          // If user doesn't exist, create them
          if (!checkData.exists) {
            const createResponse = await fetch("/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || `${user.firstName} ${user.lastName}`,
                username: user.username,
              }),
            });

            if (!createResponse.ok) {
              console.error("Failed to create user in database");
            } else {
              console.log("User created successfully");
            }
          }

          setIsInitialized(true);
        } catch (error) {
          console.error("Error initializing user:", error);
        }
      };

      initializeUser();
    }
  }, [user, isLoaded, isInitialized]);

  // This component doesn't render anything
  return null;
}
