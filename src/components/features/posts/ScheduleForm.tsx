import { useState } from "react";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Post } from "@/lib/mock-data";
import { Linkedin, Twitter, Instagram, Globe } from "lucide-react";

interface ScheduleFormProps {
  selectedDate: Date;
  onSchedule: (data: {
    date: Date;
    time: string;
    platforms: {
      linkedin: boolean;
      twitter: boolean;
      threads: boolean;
      mastodon: boolean;
    };
    repeat: string;
    postId?: string;
  }) => void;
  posts?: Post[];
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  buttonClassName?: string;
}

export default function ScheduleForm({
  selectedDate,
  onSchedule,
  posts = [],
  className = "bg-card dark:bg-card rounded-lg shadow-sm p-6",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-foreground/80 dark:text-foreground/80",
  buttonClassName = "bg-muted text-muted-foreground hover:bg-muted/80",
}: ScheduleFormProps) {
  const [time, setTime] = useState("09:00");
  const [platforms, setPlatforms] = useState({
    linkedin: true,
    twitter: false,
    threads: false,
    mastodon: false,
  });
  const [repeat, setRepeat] = useState("none");
  const [selectedPostId, setSelectedPostId] = useState<string | undefined>(
    undefined
  );

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
      postId: selectedPostId,
    });
  };

  const togglePlatform = (
    platform: "linkedin" | "twitter" | "threads" | "mastodon"
  ) => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform],
    });
  };

  return (
    <div className={className}>
      <h2
        className={`text-lg font-medium mb-6 flex items-center ${textClassName}`}
      >
        <Clock className="w-5 h-5 mr-2" />
        <span>Schedule Post</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${subtextClassName}`}
            >
              Selected Date
            </label>
            <div className="flex items-center p-2 border border-border rounded-md bg-muted/30">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span className={textClassName}>
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </span>
            </div>
          </div>

          {posts.length > 0 && (
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${subtextClassName}`}
              >
                Select Post
              </label>
              <select
                className="w-full p-2 border border-border rounded-md bg-background"
                value={selectedPostId || ""}
                onChange={(e) => setSelectedPostId(e.target.value || undefined)}
              >
                <option value="">Random Post</option>
                {posts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.content.substring(0, 50)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${subtextClassName}`}
            >
              Time
            </label>
            <input
              type="time"
              className="w-full p-2 border border-border rounded-md bg-background"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${subtextClassName}`}
            >
              Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`px-3 py-2 rounded-md flex items-center ${
                  platforms.linkedin
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-muted/50 text-muted-foreground border border-border"
                }`}
                onClick={() => togglePlatform("linkedin")}
              >
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                LinkedIn
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-md flex items-center ${
                  platforms.twitter
                    ? "bg-sky-100 text-sky-800 border border-sky-300"
                    : "bg-muted/50 text-muted-foreground border border-border"
                }`}
                onClick={() => togglePlatform("twitter")}
              >
                <Twitter className="w-4 h-4 mr-2 text-sky-500" />
                Twitter
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-md flex items-center ${
                  platforms.threads
                    ? "bg-purple-100 text-purple-800 border border-purple-300"
                    : "bg-muted/50 text-muted-foreground border border-border"
                }`}
                onClick={() => togglePlatform("threads")}
              >
                <Instagram className="w-4 h-4 mr-2 text-purple-600" />
                Threads
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-md flex items-center ${
                  platforms.mastodon
                    ? "bg-teal-100 text-teal-800 border border-teal-300"
                    : "bg-muted/50 text-muted-foreground border border-border"
                }`}
                onClick={() => togglePlatform("mastodon")}
              >
                <Globe className="w-4 h-4 mr-2 text-teal-500" />
                Mastodon
              </button>
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${subtextClassName}`}
            >
              Repeat
            </label>
            <select
              className="w-full p-2 border border-border rounded-md bg-background"
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
              className={`w-full px-4 py-2 rounded-lg transition-colors ${buttonClassName}`}
            >
              Schedule Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
