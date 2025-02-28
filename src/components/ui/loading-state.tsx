import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
}

export function LoadingState({
  message = "Loading...",
  size = "md",
  fullPage = false,
  className,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={cn(containerClasses, className)} aria-live="polite">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2
          className={cn("animate-spin text-primary", sizeClasses[size])}
          aria-hidden="true"
        />
        {message && (
          <p className="text-sm font-medium text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}
