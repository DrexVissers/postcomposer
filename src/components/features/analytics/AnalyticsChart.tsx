import { format } from "date-fns";

interface DataPoint {
  date: string;
  value: number;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
}

export default function AnalyticsChart({
  title,
  data,
  color = "#10b981", // Default to teal color
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>

      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full relative">
          {/* X-axis grid lines */}
          <div className="absolute inset-0 border-b border-gray-200 flex flex-col justify-between">
            <div className="border-t border-gray-200 h-0"></div>
            <div className="border-t border-gray-200 h-0"></div>
            <div className="border-t border-gray-200 h-0"></div>
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
              stroke={color}
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
              fill={color}
              fillOpacity="0.1"
            />

            {/* Data points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${getPointHeight(d.value)}%`}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="ml-8 mt-2 flex justify-between text-xs text-gray-500">
        {data.map((d, i) => (
          <div key={i}>{format(new Date(d.date), "MMM d")}</div>
        ))}
      </div>
    </div>
  );
}
