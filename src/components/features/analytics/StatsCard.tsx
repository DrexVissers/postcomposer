import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  formatter?: (value: number) => string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  iconClassName?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  formatter = (val) => val.toString(),
  onClick,
  className = "bg-card/90 dark:bg-card/50 hover:bg-muted/80 dark:hover:bg-background/80 transition-all border-border",
  textClassName = "text-foreground/80 dark:text-foreground/80",
  subtextClassName = "text-muted-foreground",
  iconClassName = "bg-muted/50 dark:bg-muted/30",
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        "bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors border-border rounded-lg p-6",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${subtextClassName}`}>{title}</p>
          <h3 className={`text-2xl font-bold mt-1 ${textClassName}`}>
            {formatter(value)}
          </h3>
        </div>
        <div className={`p-2 rounded-lg ${iconClassName}`}>{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <div
          className={`flex items-center ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
        <span className={`text-sm ml-2 ${subtextClassName}`}>
          vs. last week
        </span>
      </div>
    </div>
  );
}
