import { format } from "date-fns";

interface DataPoint {
  date: string;
  value: number;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  lineColor?: string;
}

export default function AnalyticsChart({
  title,
  data,
  color = "hsl(var(--primary))", // Use primary color variable
  className = "bg-card dark:bg-card shadow-md",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  lineColor,
}: AnalyticsChartProps) {
  // Find the min and max values for scaling
  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue;

  // Calculate the height of each point as a percentage
  const getPointHeight = (value: number) => {
    if (range === 0) return 50; // Default to middle if all values are the same
    return 100 - ((value - minValue) / range) * 100;
  };

  // Use lineColor if provided, otherwise use color
  const strokeColor = lineColor || color;

  return (
    <div className={`rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className={`text-lg font-medium mb-4 ${textClassName}`}>{title}</h3>

      <div className="relative h-64">
        {/* Y-axis labels */}
        <div
          className={`absolute left-0 top-0 h-full flex flex-col justify-between text-xs ${subtextClassName}`}
        >
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full relative bg-card dark:bg-card rounded-sm">
          {/* X-axis grid lines */}
          <div className="absolute inset-0 border-b border-border flex flex-col justify-between">
            <div className="border-t border-border h-0"></div>
            <div className="border-t border-border h-0"></div>
            <div className="border-t border-border h-0"></div>
          </div>

          {/* Line chart */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Line */}
            <polyline
              points={data
                .map(
                  (d, i) =>
                    `${(i / (data.length - 1)) * 100}%,${getPointHeight(
                      d.value
                    )}%`
                )
                .join(" ")}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Area under the line */}
            <polygon
              points={`0,100% ${data
                .map(
                  (d, i) =>
                    `${(i / (data.length - 1)) * 100}%,${getPointHeight(
                      d.value
                    )}%`
                )
                .join(" ")} 100%,100%`}
              fill={strokeColor}
              fillOpacity="0.3"
            />

            {/* Data points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${getPointHeight(d.value)}%`}
                r="4"
                fill="white"
                stroke={strokeColor}
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* X-axis labels */}
      <div
        className={`ml-8 mt-2 flex justify-between text-xs ${subtextClassName}`}
      >
        {data.map((d, i) => (
          <div key={i}>{format(new Date(d.date), "MMM d")}</div>
        ))}
      </div>
    </div>
  );
}
