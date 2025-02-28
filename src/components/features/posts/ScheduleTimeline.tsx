import { Clock, Linkedin, Twitter, Trash, Edit } from "lucide-react";
import { format, isSameDay } from "date-fns";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  platform: "linkedin" | "twitter";
}

interface ScheduleTimelineProps {
  scheduledPosts: ScheduledPost[];
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export default function ScheduleTimeline({
  scheduledPosts,
  onEdit,
  onDelete,
}: ScheduleTimelineProps) {
  // Sort posts by date
  const sortedPosts = [...scheduledPosts].sort(
    (a, b) =>
      new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  );

  // Group posts by date
  const groupedPosts: { [key: string]: ScheduledPost[] } = {};

  sortedPosts.forEach((post) => {
    const dateKey = format(new Date(post.scheduledDate), "yyyy-MM-dd");
    if (!groupedPosts[dateKey]) {
      groupedPosts[dateKey] = [];
    }
    groupedPosts[dateKey].push(post);
  });

  const dateKeys = Object.keys(groupedPosts);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        <span>Upcoming Posts</span>
      </h2>

      {dateKeys.length > 0 ? (
        <div className="space-y-6">
          {dateKeys.map((dateKey) => {
            const date = new Date(dateKey);
            const isToday = isSameDay(date, new Date());

            return (
              <div key={dateKey}>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  <h3 className="text-sm font-medium text-gray-700">
                    {isToday ? "Today" : format(date, "EEEE, MMMM d")}
                  </h3>
                </div>

                <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-4">
                  {groupedPosts[dateKey].map((post) => (
                    <div key={post.id} className="relative">
                      <div className="absolute -left-6 top-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="flex items-start">
                        <div className="min-w-[60px] text-xs text-gray-500">
                          {format(new Date(post.scheduledDate), "h:mm a")}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
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
                                  className="text-gray-400 hover:text-teal-600"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  onClick={() => onDelete(post.id)}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No scheduled posts yet
        </div>
      )}
    </div>
  );
}
