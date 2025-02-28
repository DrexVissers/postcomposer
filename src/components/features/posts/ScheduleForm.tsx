import { useState } from "react";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ScheduleFormProps {
  selectedDate: Date;
  onSchedule: (data: {
    date: Date;
    time: string;
    platforms: { linkedin: boolean; twitter: boolean };
    repeat: string;
  }) => void;
}

export default function ScheduleForm({
  selectedDate,
  onSchedule,
}: ScheduleFormProps) {
  const [time, setTime] = useState("09:00");
  const [platforms, setPlatforms] = useState({
    linkedin: true,
    twitter: false,
  });
  const [repeat, setRepeat] = useState("none");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new date object with the selected date and time
    const [hours, minutes] = time.split(":").map(Number);
    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(hours, minutes);

    onSchedule({
      date: scheduleDate,
      time,
      platforms,
      repeat,
    });
  };

  const togglePlatform = (platform: "linkedin" | "twitter") => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        <span>Schedule Post</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selected Date
            </label>
            <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
              <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platforms
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`px-3 py-2 rounded-md flex items-center ${
                  platforms.linkedin
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
                onClick={() => togglePlatform("linkedin")}
              >
                <span className="w-4 h-4 mr-2 rounded-full bg-blue-600"></span>
                LinkedIn
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-md flex items-center ${
                  platforms.twitter
                    ? "bg-sky-100 text-sky-800 border border-sky-300"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
                onClick={() => togglePlatform("twitter")}
              >
                <span className="w-4 h-4 mr-2 rounded-full bg-sky-500"></span>
                Twitter
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repeat
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            >
              <option value="none">Do not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Schedule Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
