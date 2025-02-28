import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface ErrorStateProps {
  title?: string;
  message: string;
  retryAction?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  retryAction,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 rounded-lg border border-destructive/20 bg-destructive/5 text-center",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle
        className="w-8 h-8 text-destructive mb-4"
        aria-hidden="true"
      />
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
      {retryAction && (
        <Button onClick={retryAction} variant="outline">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
