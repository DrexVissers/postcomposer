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

  // Prepare data for platform comparison
  const platformData = mockAnalytics.reduce((acc, curr) => {
    const existingPlatform = acc.find((p) => p.platform === curr.platform);
    if (existingPlatform) {
      // If platform already exists, add metrics
      existingPlatform.metrics.views += curr.views;
      existingPlatform.metrics.likes += curr.likes;
      existingPlatform.metrics.shares += curr.shares;
      existingPlatform.metrics.comments += curr.comments;
      existingPlatform.metrics.clicks += curr.clicks;
    } else {
      // Otherwise, add new platform
      acc.push({
        platform: curr.platform,
        metrics: {
          views: curr.views,
          likes: curr.likes,
          shares: curr.shares,
          comments: curr.comments,
          clicks: curr.clicks,
        },
      });
    }
    return acc;
  }, [] as { platform: "linkedin" | "twitter"; metrics: typeof totalMetrics }[]);

  // Prepare data for the chart
  const chartData =
    mockAnalytics
      .find((a) => a.platform === "linkedin")
      ?.dailyStats.map((day) => ({
        date: day.date,
        value: day[selectedMetric],
      })) || [];

  // Prepare data for post performance table
  const postsWithAnalytics = mockAnalytics.map((analytics) => {
    const post = mockPosts.find((p) => p.id === analytics.postId);
    return {
      id: analytics.postId,
      content:
        post?.platforms[analytics.platform]?.content || post?.content || "",
      createdAt: post?.createdAt || "",
      platform: analytics.platform,
      metrics: {
        views: analytics.views,
        likes: analytics.likes,
        shares: analytics.shares,
        comments: analytics.comments,
        clicks: analytics.clicks,
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Analytics</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div onClick={() => handleMetricSelect("views")}>
            <StatsCard
              title="Views"
              value={totalMetrics.views}
              change={weeklyChanges.views}
              icon={<Eye className="w-5 h-5 text-teal-600" />}
              formatter={(val) =>
                val >= 1000 ? (val / 1000).toFixed(1) + "k" : val.toString()
              }
            />
          </div>
          <div onClick={() => handleMetricSelect("likes")}>
            <StatsCard
              title="Likes"
              value={totalMetrics.likes}
              change={weeklyChanges.likes}
              icon={<Heart className="w-5 h-5 text-teal-600" />}
              formatter={(val) =>
                val >= 1000 ? (val / 1000).toFixed(1) + "k" : val.toString()
              }
            />
          </div>
          <div onClick={() => handleMetricSelect("shares")}>
            <StatsCard
              title="Shares"
              value={totalMetrics.shares}
              change={weeklyChanges.shares}
              icon={<Share2 className="w-5 h-5 text-teal-600" />}
            />
          </div>
          <div onClick={() => handleMetricSelect("comments")}>
            <StatsCard
              title="Comments"
              value={totalMetrics.comments}
              change={weeklyChanges.comments}
              icon={<MessageSquare className="w-5 h-5 text-teal-600" />}
            />
          </div>
          <div onClick={() => handleMetricSelect("clicks")}>
            <StatsCard
              title="Clicks"
              value={totalMetrics.clicks}
              change={weeklyChanges.clicks}
              icon={<ExternalLink className="w-5 h-5 text-teal-600" />}
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
            />
          </div>
          <div>
            <PlatformComparison
              data={platformData}
              selectedMetric={selectedMetric}
              onSelectMetric={handleMetricSelect}
            />
          </div>
        </div>

        {/* Post Performance Table */}
        <div className="mb-8">
          <PostPerformance posts={postsWithAnalytics} />
        </div>
      </div>
    </MainLayout>
  );
}
