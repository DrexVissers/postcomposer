import { Linkedin, Twitter, Instagram, Globe } from "lucide-react";

interface PlatformData {
  platform: "linkedin" | "twitter" | "threads" | "mastodon";
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
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  buttonClassName?: string;
  selectedButtonClassName?: string;
}

export default function PlatformComparison({
  data,
  selectedMetric,
  onSelectMetric,
  className = "bg-card dark:bg-card shadow-md",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  buttonClassName = "bg-muted/50 dark:bg-muted/30 text-foreground/80 dark:text-foreground/80",
  selectedButtonClassName = "bg-primary/20 text-primary border-primary/50",
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
  const getPlatformIcon = (
    platform: "linkedin" | "twitter" | "threads" | "mastodon"
  ) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-blue-600" />;
      case "twitter":
        return <Twitter className="w-5 h-5 text-sky-500" />;
      case "threads":
        return <Instagram className="w-5 h-5 text-purple-600" />;
      case "mastodon":
        return <Globe className="w-5 h-5 text-teal-500" />;
      default:
        return null;
    }
  };

  // Get platform color
  const getPlatformColor = (
    platform: "linkedin" | "twitter" | "threads" | "mastodon"
  ) => {
    switch (platform) {
      case "linkedin":
        return "bg-blue-600";
      case "twitter":
        return "bg-sky-500";
      case "threads":
        return "bg-purple-600";
      case "mastodon":
        return "bg-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get platform name
  const getPlatformName = (
    platform: "linkedin" | "twitter" | "threads" | "mastodon"
  ) => {
    switch (platform) {
      case "linkedin":
        return "LinkedIn";
      case "twitter":
        return "Twitter";
      case "threads":
        return "Threads";
      case "mastodon":
        return "Mastodon";
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
    <div className={`rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className={`text-lg font-medium mb-4 ${textClassName}`}>
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
                ? selectedButtonClassName
                : buttonClassName
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
              <span className={`text-sm font-medium ${textClassName}`}>
                {getPlatformName(platformData.platform)}
              </span>
              <span className={`ml-auto text-sm font-medium ${textClassName}`}>
                {formatNumber(platformData.metrics[selectedMetric])}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getPlatformColor(platformData.platform)}`}
                style={{
                  width: `${
                    (platformData.metrics[selectedMetric] / maxValue) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className={`text-xs mt-1 ${subtextClassName}`}>
              {platformData.metrics[selectedMetric]}{" "}
              {getMetricName(selectedMetric).toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
