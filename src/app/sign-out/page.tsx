"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignOutPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Redirect to home page after a delay
  useEffect(() => {
    if (isSigningOut) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSigningOut, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">PostComposer</h1>
        <p className="mt-2 text-muted-foreground">Sign out of your account</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-card rounded-lg border border-border shadow-sm">
        {isSigningOut ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              You&apos;ve been signed out
            </h2>
            <p className="text-muted-foreground mb-4">
              Redirecting you to the home page...
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-foreground">
              Are you sure you want to sign out?
            </h2>
            <div className="flex space-x-4">
              <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
                <Button
                  variant="destructive"
                  onClick={() => setIsSigningOut(true)}
                >
                  Sign Out
                </Button>
              </SignOutButton>
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
