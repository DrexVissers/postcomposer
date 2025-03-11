"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatsCard from "@/components/features/analytics/StatsCard";
import AnalyticsChart from "@/components/features/analytics/AnalyticsChart";
import PlatformComparison from "@/components/features/analytics/PlatformComparison";
import PostPerformance from "@/components/features/analytics/PostPerformance";
import { mockAnalytics, mockPosts } from "@/lib/mock-data";
import { Eye, Heart, Share2, MessageSquare, ExternalLink } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";
import { PostWithAnalytics } from "@/components/features/analytics/PostPerformance";

// Predefined chart data to avoid hydration errors
const PREDEFINED_CHART_DATA = [
  { date: "2023-05-01", value: 1254 },
  { date: "2023-05-02", value: 1320 },
  { date: "2023-05-03", value: 1480 },
  { date: "2023-05-04", value: 1390 },
  { date: "2023-05-05", value: 1460 },
  { date: "2023-05-06", value: 1520 },
  { date: "2023-05-07", value: 1610 },
  { date: "2023-05-08", value: 1550 },
  { date: "2023-05-09", value: 1630 },
  { date: "2023-05-10", value: 1710 },
  { date: "2023-05-11", value: 1680 },
  { date: "2023-05-12", value: 1750 },
  { date: "2023-05-13", value: 1820 },
  { date: "2023-05-14", value: 1890 },
];

// Predefined post analytics data
const PREDEFINED_POST_ANALYTICS = [
  {
    platform: "linkedin" as const,
    metrics: {
      views: 2500,
      likes: 320,
      shares: 85,
      comments: 120,
      clicks: 210,
    },
  },
  {
    platform: "bluesky" as const,
    metrics: {
      views: 3200,
      likes: 450,
      shares: 120,
      comments: 95,
      clicks: 180,
    },
  },
  {
    platform: "threads" as const,
    metrics: {
      views: 1800,
      likes: 280,
      shares: 65,
      comments: 110,
      clicks: 150,
    },
  },
  {
    platform: "mastodon" as const,
    metrics: {
      views: 1200,
      likes: 190,
      shares: 45,
      comments: 75,
      clicks: 95,
    },
  },
];

export default function AnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState<
    "views" | "likes" | "shares" | "comments" | "clicks"
  >("views");
  const { addNotification } = useNotification();

  // Simulate data loading
  useEffect(() => {
    addNotification({
      type: "info",
      title: "Analytics Updated",
      message:
        "Your analytics data has been refreshed with the latest metrics.",
      duration: 3000,
    });
  }, [addNotification]);

  // Calculate total metrics across all platforms
  const totalMetrics = mockAnalytics.reduce(
    (acc, curr) => {
      acc.views += curr.views;
      acc.likes += curr.likes;
      acc.shares += curr.shares;
      acc.comments += curr.comments;
      acc.clicks += curr.clicks;
      return acc;
    },
    { views: 0, likes: 0, shares: 0, comments: 0, clicks: 0 }
  );

  // Calculate week-over-week changes (mock data for demo)
  const weeklyChanges = {
    views: 12,
    likes: 8,
    shares: -3,
    comments: 5,
    clicks: 15,
  };

  // Use predefined chart data instead of generating random values
  const chartData = PREDEFINED_CHART_DATA.map((item) => {
    // Update dates to be relative to today
    const today = new Date();
    const pastDate = new Date(today);
    const dayOffset =
      PREDEFINED_CHART_DATA.length -
      1 -
      PREDEFINED_CHART_DATA.findIndex((d) => d.date === item.date);
    pastDate.setDate(today.getDate() - dayOffset);

    return {
      date: pastDate.toISOString().split("T")[0],
      value: item.value,
    };
  });

  // Define additional chart data for the other charts
  const impressionsData = PREDEFINED_CHART_DATA.map((item) => {
    // Update dates to be relative to today
    const today = new Date();
    const pastDate = new Date(today);
    const dayOffset =
      PREDEFINED_CHART_DATA.length -
      1 -
      PREDEFINED_CHART_DATA.findIndex((d) => d.date === item.date);
    pastDate.setDate(today.getDate() - dayOffset);

    return {
      date: pastDate.toISOString().split("T")[0],
      value: Math.floor(item.value * 1.2), // Slightly higher than engagement
    };
  });

  const engagementsData = PREDEFINED_CHART_DATA.map((item) => {
    // Update dates to be relative to today
    const today = new Date();
    const pastDate = new Date(today);
    const dayOffset =
      PREDEFINED_CHART_DATA.length -
      1 -
      PREDEFINED_CHART_DATA.findIndex((d) => d.date === item.date);
    pastDate.setDate(today.getDate() - dayOffset);

    return {
      date: pastDate.toISOString().split("T")[0],
      value: Math.floor(item.value * 0.8), // 80% of the views
    };
  });

  const followersData = PREDEFINED_CHART_DATA.map((item) => {
    // Update dates to be relative to today
    const today = new Date();
    const pastDate = new Date(today);
    const dayOffset =
      PREDEFINED_CHART_DATA.length -
      1 -
      PREDEFINED_CHART_DATA.findIndex((d) => d.date === item.date);
    pastDate.setDate(today.getDate() - dayOffset);

    return {
      date: pastDate.toISOString().split("T")[0],
      value: 5000 + Math.floor(item.value * 0.1), // Base followers + small growth
    };
  });

  // Use the predefined platform data
  const platformData = PREDEFINED_POST_ANALYTICS;

  // Generate post analytics data for the table
  const postsWithAnalytics: PostWithAnalytics[] = mockPosts
    .slice(0, 5)
    .map((post, index) => {
      // Determine which platform to use for this post
      let platform: "linkedin" | "bluesky" | "threads" | "mastodon";

      // Assign platforms in a round-robin fashion
      switch (index % 4) {
        case 0:
          platform = "linkedin";
          break;
        case 1:
          platform = "bluesky";
          break;
        case 2:
          platform = "threads";
          break;
        case 3:
          platform = "mastodon";
          break;
        default:
          platform = "linkedin";
      }

      return {
        id: post.id,
        content:
          post.content.substring(0, 100) +
          (post.content.length > 100 ? "..." : ""),
        createdAt: post.createdAt,
        platform,
        metrics: {
          views: Math.floor(Math.random() * 2000) + 500,
          likes: Math.floor(Math.random() * 200) + 50,
          shares: Math.floor(Math.random() * 50) + 10,
          comments: Math.floor(Math.random() * 30) + 5,
          clicks: Math.floor(Math.random() * 100) + 20,
        },
      };
    });

  const handleMetricSelect = (
    metric: "views" | "likes" | "shares" | "comments" | "clicks"
  ) => {
    setSelectedMetric(metric);

    // Show notification for metric change
    const metricNames = {
      views: "Views",
      likes: "Likes",
      shares: "Shares",
      comments: "Comments",
      clicks: "Clicks",
    };

    addNotification({
      type: "info",
      title: "Metric Changed",
      message: `Now showing ${metricNames[metric]} data across all analytics.`,
      duration: 2000,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90 mb-8">
          Analytics
        </h1>

        {/* Test Notifications */}
        <div className="mb-6 flex space-x-2">
          <button
            onClick={() =>
              addNotification({
                type: "info",
                title: "Information",
                message: "This is an informational notification.",
                duration: 5000,
              })
            }
            className="px-3 py-2 bg-card dark:bg-card text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 rounded-lg border border-border shadow-sm transition-colors"
          >
            Test Info
          </button>
          <button
            onClick={() =>
              addNotification({
                type: "success",
                title: "Success",
                message: "Operation completed successfully!",
                duration: 5000,
              })
            }
            className="px-3 py-2 bg-card dark:bg-card text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 rounded-lg border border-border shadow-sm transition-colors"
          >
            Test Success
          </button>
          <button
            onClick={() =>
              addNotification({
                type: "warning",
                title: "Warning",
                message: "This action might have consequences.",
                duration: 5000,
              })
            }
            className="px-3 py-2 bg-card dark:bg-card text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 rounded-lg border border-border shadow-sm transition-colors"
          >
            Test Warning
          </button>
          <button
            onClick={() =>
              addNotification({
                type: "error",
                title: "Error",
                message: "Something went wrong. Please try again.",
                duration: 5000,
              })
            }
            className="px-3 py-2 bg-card dark:bg-card text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 rounded-lg border border-border shadow-sm transition-colors"
          >
            Test Error
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div onClick={() => handleMetricSelect("views")}>
            <StatsCard
              title="Views"
              value={totalMetrics.views}
              change={weeklyChanges.views}
              icon={<Eye className="w-5 h-5 text-primary" />}
              formatter={(val) =>
                val >= 1000 ? (val / 1000).toFixed(1) + "k" : val.toString()
              }
              className="bg-card dark:bg-card shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              iconClassName="bg-muted/50 dark:bg-muted/30"
            />
          </div>
          <div onClick={() => handleMetricSelect("likes")}>
            <StatsCard
              title="Likes"
              value={totalMetrics.likes}
              change={weeklyChanges.likes}
              icon={<Heart className="w-5 h-5 text-primary" />}
              formatter={(val) =>
                val >= 1000 ? (val / 1000).toFixed(1) + "k" : val.toString()
              }
              className="bg-card dark:bg-card shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              iconClassName="bg-muted/50 dark:bg-muted/30"
            />
          </div>
          <div onClick={() => handleMetricSelect("shares")}>
            <StatsCard
              title="Shares"
              value={totalMetrics.shares}
              change={weeklyChanges.shares}
              icon={<Share2 className="w-5 h-5 text-primary" />}
              className="bg-card dark:bg-card shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              iconClassName="bg-muted/50 dark:bg-muted/30"
            />
          </div>
          <div onClick={() => handleMetricSelect("comments")}>
            <StatsCard
              title="Comments"
              value={totalMetrics.comments}
              change={weeklyChanges.comments}
              icon={<MessageSquare className="w-5 h-5 text-primary" />}
              className="bg-card dark:bg-card shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              iconClassName="bg-muted/50 dark:bg-muted/30"
            />
          </div>
          <div onClick={() => handleMetricSelect("clicks")}>
            <StatsCard
              title="Clicks"
              value={totalMetrics.clicks}
              change={weeklyChanges.clicks}
              icon={<ExternalLink className="w-5 h-5 text-primary" />}
              className="bg-card dark:bg-card shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              iconClassName="bg-muted/50 dark:bg-muted/30"
            />
          </div>
        </div>

        {/* Charts and Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AnalyticsChart
              title={`${
                selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)
              } Over Time`}
              data={chartData}
              className="bg-card dark:bg-card border border-border shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              lineColor="hsl(var(--primary))"
            />
          </div>
          <div>
            <PlatformComparison
              data={platformData}
              selectedMetric={selectedMetric}
              onSelectMetric={handleMetricSelect}
              className="bg-card dark:bg-card border border-border shadow-md"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
              buttonClassName="bg-muted/50 dark:bg-muted/30 text-foreground/80 dark:text-foreground/80"
              selectedButtonClassName="bg-primary/20 text-primary border-primary/50"
            />
          </div>
        </div>

        {/* Post Performance Table */}
        <div className="mb-8">
          <PostPerformance
            posts={postsWithAnalytics}
            className="bg-card dark:bg-card border border-border shadow-md"
            textClassName="text-foreground/90 dark:text-foreground/90"
            subtextClassName="text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <AnalyticsChart
            title="Impressions Over Time"
            data={impressionsData}
            className="bg-card dark:bg-card border border-border shadow-md"
            lineColor="hsl(var(--chart-1))"
          />
          <AnalyticsChart
            title="Engagements Over Time"
            data={engagementsData}
            className="bg-card dark:bg-card border border-border shadow-md"
            lineColor="hsl(var(--chart-2))"
          />
          <AnalyticsChart
            title="Followers Growth"
            data={followersData}
            className="bg-card dark:bg-card border border-border shadow-md"
            lineColor="hsl(var(--chart-3))"
          />
        </div>
      </div>
    </MainLayout>
  );
}
