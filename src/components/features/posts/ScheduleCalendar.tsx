import { useState } from "react";
import { Calendar } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  platform: "linkedin" | "twitter";
}

interface ScheduleCalendarProps {
  scheduledPosts: ScheduledPost[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export default function ScheduleCalendar({
  scheduledPosts,
  onDateSelect,
  selectedDate,
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Schedule Calendar</span>
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousWeek}
            className="p-2 text-gray-500 hover:text-teal-600 border border-gray-300 rounded-lg hover:border-teal-600 transition-colors"
          >
            &larr;
          </button>
          <div className="p-2 font-medium">
            {format(currentWeekStart, "MMM d")} -{" "}
            {format(days[6], "MMM d, yyyy")}
          </div>
          <button
            onClick={handleNextWeek}
            className="p-2 text-gray-500 hover:text-teal-600 border border-gray-300 rounded-lg hover:border-teal-600 transition-colors"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {days.map((day) => (
          <div key={day.toString()} className="text-center">
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
              {format(day, "EEE")}
            </div>
            <div className="text-sm font-medium">{format(day, "d")}</div>
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
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-teal-300"
              } ${isToday ? "bg-blue-50" : ""}`}
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
                          : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      {post.content.substring(0, 20)}
                      {post.content.length > 20 ? "..." : ""}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-xs">
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
