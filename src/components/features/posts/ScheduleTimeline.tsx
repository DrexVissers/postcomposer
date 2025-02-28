import { Clock, Linkedin, Twitter, Trash, Edit } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { mockCategories, mockTags } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  platform: "linkedin" | "twitter";
  category?: string; // Category ID
  tags?: string[]; // Array of tag IDs
}

interface ScheduleTimelineProps {
  scheduledPosts: ScheduledPost[];
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
}

export default function ScheduleTimeline({
  scheduledPosts,
  onEdit,
  onDelete,
  className = "bg-card dark:bg-card rounded-lg shadow-sm p-4 sm:p-6",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
}: ScheduleTimelineProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Sort posts by date
  const sortedPosts = [...scheduledPosts].sort(
    (a, b) =>
      new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  );

  // Group posts by date
  const groupedPosts: { [key: string]: ScheduledPost[] } = {};

  sortedPosts.forEach((post) => {
    const date = new Date(post.scheduledDate);
    const dateKey = format(date, "yyyy-MM-dd");

    if (!groupedPosts[dateKey]) {
      groupedPosts[dateKey] = [];
    }

    groupedPosts[dateKey].push(post);
  });

  const dateKeys = Object.keys(groupedPosts).sort();

  return (
    <div className={className}>
      <h2
        className={`text-lg font-medium mb-4 sm:mb-6 flex items-center ${textClassName}`}
      >
        <Clock className="w-5 h-5 mr-2" />
        <span>Scheduled Posts</span>
      </h2>

      {dateKeys.length > 0 ? (
        <div className="space-y-6">
          {dateKeys.map((dateKey) => {
            const date = new Date(dateKey);
            const isToday = isSameDay(date, new Date());

            return (
              <div key={dateKey}>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <h3 className={`text-sm font-medium ${subtextClassName}`}>
                    {isToday ? "Today" : format(date, "EEEE, MMMM d")}
                  </h3>
                </div>

                <div className="ml-2 sm:ml-4 border-l-2 border-border pl-2 sm:pl-4 space-y-4">
                  {groupedPosts[dateKey].map((post) => {
                    // Find category details
                    const category = post.category
                      ? mockCategories.find((c) => c.id === post.category)
                      : null;

                    // Find tag details
                    const tags = post.tags
                      ? post.tags
                          .map((tagId) => mockTags.find((t) => t.id === tagId))
                          .filter(Boolean)
                      : [];

                    return (
                      <div key={post.id} className="relative">
                        <div className="absolute -left-3 top-1 w-2 h-2 bg-muted rounded-full"></div>
                        <div
                          className={`flex ${
                            isMobile ? "flex-col" : "items-start"
                          }`}
                        >
                          <div
                            className={`${
                              isMobile ? "mb-2" : "min-w-[60px]"
                            } text-xs ${subtextClassName}`}
                          >
                            {format(new Date(post.scheduledDate), "h:mm a")}
                          </div>
                          <div
                            className={`flex-1 bg-muted/30 rounded-lg p-3 border border-border ${
                              isMobile ? "w-full" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                {post.platform === "linkedin" ? (
                                  <Linkedin className="w-4 h-4 text-blue-600 mr-1" />
                                ) : (
                                  <Twitter className="w-4 h-4 text-sky-500 mr-1" />
                                )}
                                <span className="text-xs font-medium">
                                  {post.platform === "linkedin"
                                    ? "LinkedIn"
                                    : "Twitter"}
                                </span>
                              </div>
                              <div className="flex space-x-1">
                                {onEdit && (
                                  <button
                                    onClick={() => onEdit(post.id)}
                                    className="text-muted-foreground hover:text-primary"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {onDelete && (
                                  <button
                                    onClick={() => onDelete(post.id)}
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <p
                              className={`text-sm line-clamp-2 mb-2 ${textClassName}`}
                            >
                              {post.content}
                            </p>

                            {/* Display category and tags */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {category && (
                                <Badge
                                  className="text-xs"
                                  style={{
                                    backgroundColor: category.color,
                                    color: "white",
                                  }}
                                >
                                  {category.name}
                                </Badge>
                              )}
                              {tags.length > 0 && isMobile ? (
                                <>
                                  {tags.slice(0, 1).map(
                                    (tag) =>
                                      tag && (
                                        <Badge
                                          key={tag.id}
                                          variant="outline"
                                          className="text-xs"
                                          style={{
                                            borderColor: tag.color,
                                            color: tag.color,
                                          }}
                                        >
                                          {tag.name}
                                        </Badge>
                                      )
                                  )}
                                  {tags.length > 1 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{tags.length - 1} more
                                    </Badge>
                                  )}
                                </>
                              ) : (
                                tags.map(
                                  (tag) =>
                                    tag && (
                                      <Badge
                                        key={tag.id}
                                        variant="outline"
                                        className="text-xs"
                                        style={{
                                          borderColor: tag.color,
                                          color: tag.color,
                                        }}
                                      >
                                        {tag.name}
                                      </Badge>
                                    )
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`text-center py-8 ${subtextClassName}`}>
          No scheduled posts yet
        </div>
      )}
    </div>
  );
}
