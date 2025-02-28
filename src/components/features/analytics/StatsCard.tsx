import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  formatter?: (value: number) => string;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  formatter = (val) => val.toString(),
  onClick,
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-6 transition-all duration-200 ${
        onClick
          ? "cursor-pointer hover:shadow-md hover:border-teal-500 hover:border"
          : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{formatter(value)}</h3>
        </div>
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
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
        <span className="text-sm text-gray-500 ml-2">vs. last week</span>
      </div>
    </div>
  );
}
