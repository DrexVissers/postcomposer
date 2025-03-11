import {
  Eye,
  Heart,
  Share2,
  MessageSquare,
  ExternalLink,
  Linkedin,
  Globe,
} from "lucide-react";
import { BlueskyIcon } from "@/components/icons/BlueskyIcon";
import { ThreadsIcon } from "@/components/icons/ThreadsIcon";
import { format, isValid } from "date-fns";

export interface PostWithAnalytics {
  id: string;
  content: string;
  createdAt: string;
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
  metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

interface PostPerformanceProps {
  posts: PostWithAnalytics[];
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
}

export default function PostPerformance({
  posts,
  className = "bg-card dark:bg-card rounded-lg shadow-md p-6",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  headerClassName = "border-border bg-muted/30 dark:bg-muted/10",
  rowClassName = "hover:bg-muted/20 dark:hover:bg-muted/10",
}: PostPerformanceProps) {
  // Format numbers with k for thousands
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  // Format date safely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (!dateString || !isValid(date)) {
        return "Unknown date";
      }
      return format(date, "MMM d, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  // Get platform icon
  const getPlatformIcon = (
    platform: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-blue-600" />;
      case "bluesky":
        return <BlueskyIcon className="w-5 h-5 text-sky-500" />;
      case "threads":
        return <ThreadsIcon className="w-5 h-5 text-purple-600" />;
      case "mastodon":
        return <Globe className="w-5 h-5 text-teal-500" />;
      default:
        return null;
    }
  };

  // Get platform name
  const getPlatformName = (
    platform: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => {
    switch (platform) {
      case "linkedin":
        return "LinkedIn";
      case "bluesky":
        return "Bluesky";
      case "threads":
        return "Threads";
      case "mastodon":
        return "Mastodon";
      default:
        return platform;
    }
  };

  return (
    <div className={className}>
      <h3 className={`text-lg font-medium mb-4 ${textClassName}`}>
        Top Performing Posts
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={`border-b ${headerClassName}`}>
              <th className="py-3 text-left text-xs font-medium uppercase tracking-wider">
                Post
              </th>
              <th className="py-3 text-center text-xs font-medium uppercase tracking-wider">
                <Eye className="w-4 h-4 inline" />
              </th>
              <th className="py-3 text-center text-xs font-medium uppercase tracking-wider">
                <Heart className="w-4 h-4 inline" />
              </th>
              <th className="py-3 text-center text-xs font-medium uppercase tracking-wider">
                <Share2 className="w-4 h-4 inline" />
              </th>
              <th className="py-3 text-center text-xs font-medium uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 inline" />
              </th>
              <th className="py-3 text-center text-xs font-medium uppercase tracking-wider">
                <ExternalLink className="w-4 h-4 inline" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id + post.platform} className={rowClassName}>
                <td className="py-4 pr-4">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <p className={`text-sm line-clamp-2 ${textClassName}`}>
                        {post.content}
                      </p>
                      <p className={`text-xs mt-1 ${subtextClassName}`}>
                        {getPlatformName(post.platform)} •{" "}
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`py-4 text-center text-sm ${textClassName}`}>
                  {formatNumber(post.metrics.views)}
                </td>
                <td className={`py-4 text-center text-sm ${textClassName}`}>
                  {formatNumber(post.metrics.likes)}
                </td>
                <td className={`py-4 text-center text-sm ${textClassName}`}>
                  {formatNumber(post.metrics.shares)}
                </td>
                <td className={`py-4 text-center text-sm ${textClassName}`}>
                  {formatNumber(post.metrics.comments)}
                </td>
                <td className={`py-4 text-center text-sm ${textClassName}`}>
                  {formatNumber(post.metrics.clicks)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
