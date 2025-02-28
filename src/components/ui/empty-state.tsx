import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & EmptyStateProps
>(({ className, icon, title, description, action, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed border-border bg-card",
      className
    )}
    {...props}
  >
    {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
    <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-md mb-6">{description}</p>
    {action && (
      <Button onClick={action.onClick} variant="outline">
        {action.label}
      </Button>
    )}
  </div>
));

EmptyState.displayName = "EmptyState";

export { EmptyState };
