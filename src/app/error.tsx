"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">
          An error occurred while loading this page. Please try again or contact
          support if the problem persists.
        </p>
        <div className="flex flex-col gap-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Return to home
          </Button>
        </div>
      </div>
    </div>
  );
}
