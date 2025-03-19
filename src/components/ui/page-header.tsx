"use client";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, className, children }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-center justify-between", className)}>
      <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90">
        {title}
      </h1>
      {children && <div className="flex items-center gap-4">{children}</div>}
    </div>
  );
}
