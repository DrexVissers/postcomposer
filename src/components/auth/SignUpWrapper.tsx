"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SignUpWrapperProps {
  children: React.ReactNode;
}

export default function SignUpWrapper({ children }: SignUpWrapperProps) {
  const { isSignedIn, isLoaded } = useUser();

  // If the user is already signed in, show a message with options
  if (isLoaded && isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground">
          You&apos;re already signed in!
        </h2>
        <p className="text-muted-foreground text-center max-w-md">
          You already have an account and are currently signed in. Would you
          like to go to your dashboard or sign out?
        </p>
        <div className="flex space-x-4">
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
          <Link href="/sign-out">
            <Button variant="outline">Sign Out</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Otherwise, render the sign-up component
  return <>{children}</>;
}
