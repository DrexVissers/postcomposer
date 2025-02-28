import { Linkedin, Twitter } from "lucide-react";

interface PlatformData {
  platform: "linkedin" | "twitter";
  metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

interface PlatformComparisonProps {
  data: PlatformData[];
  selectedMetric: keyof PlatformData["metrics"];
  onSelectMetric: (metric: keyof PlatformData["metrics"]) => void;
}

export default function PlatformComparison({
  data,
  selectedMetric,
  onSelectMetric,
}: PlatformComparisonProps) {
  // Get the maximum value for the selected metric across all platforms
  const maxValue = Math.max(...data.map((d) => d.metrics[selectedMetric]));

  // Format numbers with k for thousands
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  // Get platform icon
  const getPlatformIcon = (platform: "linkedin" | "twitter") => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-blue-600" />;
      case "twitter":
        return <Twitter className="w-5 h-5 text-sky-500" />;
      default:
        return null;
    }
  };

  // Get platform color
  const getPlatformColor = (platform: "linkedin" | "twitter") => {
    switch (platform) {
      case "linkedin":
        return "bg-blue-600";
      case "twitter":
        return "bg-sky-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get platform name
  const getPlatformName = (platform: "linkedin" | "twitter") => {
    switch (platform) {
      case "linkedin":
        return "LinkedIn";
      case "twitter":
        return "Twitter";
      default:
        return platform;
    }
  };

  // Get metric name
  const getMetricName = (metric: keyof PlatformData["metrics"]) => {
    switch (metric) {
      case "views":
        return "Views";
      case "likes":
        return "Likes";
      case "shares":
        return "Shares";
      case "comments":
        return "Comments";
      case "clicks":
        return "Clicks";
      default:
        return metric;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Platform Comparison
      </h3>

      {/* Metric selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          Object.keys(data[0]?.metrics || {}) as Array<
            keyof PlatformData["metrics"]
          >
        ).map((metric) => (
          <button
            key={metric}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedMetric === metric
                ? "bg-teal-100 text-teal-800 border border-teal-300"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
            onClick={() => onSelectMetric(metric)}
          >
            {getMetricName(metric)}
          </button>
        ))}
      </div>

      {/* Platform bars */}
      <div className="space-y-4">
        {data.map((platformData) => (
          <div key={platformData.platform}>
            <div className="flex items-center mb-1">
              <div className="mr-2">
                {getPlatformIcon(platformData.platform)}
              </div>
              <span className="text-sm font-medium">
                {getPlatformName(platformData.platform)}
              </span>
              <span className="ml-auto text-sm font-medium">
                {formatNumber(platformData.metrics[selectedMetric])}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getPlatformColor(platformData.platform)}`}
                style={{
                  width: `${
                    (platformData.metrics[selectedMetric] / maxValue) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
