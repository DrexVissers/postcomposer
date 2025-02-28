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
    platform: "twitter" as const,
    metrics: {
      views: 3200,
      likes: 450,
      shares: 120,
      comments: 95,
      clicks: 180,
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

  // Use predefined platform data instead of random values
  const platformData = PREDEFINED_POST_ANALYTICS;

  // Prepare data for post performance table with consistent values
  const postsWithAnalytics = mockPosts.slice(0, 5).map((post, index) => {
    // Use consistent platform assignment based on index
    const platform =
      index % 2 === 0 ? ("linkedin" as const) : ("twitter" as const);

    // Use consistent metrics based on post index
    const baseMetrics = {
      views: 1000 + index * 500,
      likes: 100 + index * 50,
      shares: 10 + index * 5,
      comments: 20 + index * 10,
      clicks: 50 + index * 15,
    };

    return {
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      platform,
      metrics: baseMetrics,
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
            className="px-3 py-2 bg-blue-500/90 text-white rounded-md text-sm hover:bg-blue-600 transition-colors font-medium"
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
            className="px-3 py-2 bg-green-500/90 text-white rounded-md text-sm hover:bg-green-600 transition-colors font-medium"
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
            className="px-3 py-2 bg-yellow-500/90 text-white rounded-md text-sm hover:bg-yellow-600 transition-colors font-medium"
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
            className="px-3 py-2 bg-red-500/90 text-white rounded-md text-sm hover:bg-red-600 transition-colors font-medium"
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
              className="bg-card-lighter dark:bg-card-lighter shadow-md"
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
              className="bg-card-lighter dark:bg-card-lighter shadow-md"
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
              className="bg-card-lighter dark:bg-card-lighter shadow-md"
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
              className="bg-card-lighter dark:bg-card-lighter shadow-md"
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
              className="bg-card-lighter dark:bg-card-lighter shadow-md"
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
              className="bg-card-lighter dark:bg-card-lighter border border-border shadow-md"
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
              className="bg-card-lighter dark:bg-card-lighter border border-border shadow-md"
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
            className="bg-card-lighter dark:bg-card-lighter border border-border shadow-md"
            textClassName="text-foreground/90 dark:text-foreground/90"
            subtextClassName="text-muted-foreground"
            headerClassName="border-border bg-muted/30 dark:bg-muted/10"
            rowClassName="hover:bg-muted/20 dark:hover:bg-muted/10"
          />
        </div>
      </div>
    </MainLayout>
  );
}
