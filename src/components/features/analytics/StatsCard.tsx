import { ArrowUp, ArrowDown } from "lucide-react";

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
  className = "bg-card dark:bg-card shadow-md",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  iconClassName = "bg-muted/50 dark:bg-muted/30",
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={`rounded-lg shadow-sm p-6 transition-all duration-200 ${className} ${
        onClick
          ? "cursor-pointer hover:shadow-md hover:border-primary hover:border"
          : ""
      }`}
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
