import { useState } from "react";
import { Calendar } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  platform: "linkedin" | "twitter" | "threads" | "mastodon";
}

interface ScheduleCalendarProps {
  scheduledPosts: ScheduledPost[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  selectedClassName?: string;
  todayClassName?: string;
}

export default function ScheduleCalendar({
  scheduledPosts,
  onDateSelect,
  selectedDate,
  className = "bg-card dark:bg-card rounded-lg shadow-sm p-6",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  selectedClassName = "border-primary bg-primary/10",
  todayClassName = "bg-muted/50 dark:bg-muted/30",
}: ScheduleCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const handlePreviousWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, -1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter((post) =>
      isSameDay(new Date(post.scheduledDate), date)
    );
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-lg font-medium flex items-center ${textClassName}`}
        >
          <Calendar className="w-5 h-5 mr-2" />
          <span>Schedule Calendar</span>
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousWeek}
            className={`p-2 hover:text-primary border border-border rounded-lg hover:border-primary transition-colors ${subtextClassName}`}
          >
            &larr;
          </button>
          <div className={`p-2 font-medium ${textClassName}`}>
            {format(currentWeekStart, "MMM d")} -{" "}
            {format(days[6], "MMM d, yyyy")}
          </div>
          <button
            onClick={handleNextWeek}
            className={`p-2 hover:text-primary border border-border rounded-lg hover:border-primary transition-colors ${subtextClassName}`}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {days.map((day) => (
          <div key={day.toString()} className="text-center">
            <div
              className={`text-xs font-medium uppercase mb-1 ${subtextClassName}`}
            >
              {format(day, "EEE")}
            </div>
            <div className={`text-sm font-medium ${textClassName}`}>
              {format(day, "d")}
            </div>
          </div>
        ))}

        {/* Calendar cells */}
        {days.map((day) => {
          const postsForDay = getPostsForDate(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toString() + "-cell"}
              className={`border rounded-lg p-2 min-h-[100px] cursor-pointer transition-colors ${
                isSelected
                  ? selectedClassName
                  : "border-border hover:border-primary/50"
              } ${isToday ? todayClassName : ""}`}
              onClick={() => onDateSelect && onDateSelect(day)}
            >
              {postsForDay.length > 0 ? (
                <div className="space-y-1">
                  {postsForDay.map((post) => (
                    <div
                      key={post.id}
                      className={`text-xs p-1 rounded ${
                        post.platform === "linkedin"
                          ? "bg-blue-100 text-blue-800"
                          : post.platform === "twitter"
                          ? "bg-sky-100 text-sky-800"
                          : post.platform === "threads"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {post.content.substring(0, 20)}
                      {post.content.length > 20 ? "..." : ""}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`h-full flex items-center justify-center text-xs ${subtextClassName}`}
                >
                  No posts
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
