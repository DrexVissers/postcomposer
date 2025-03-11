import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Linkedin, Instagram, Globe, Clock } from "lucide-react";
import BlueskyIcon from "@/components/ui/icons/BlueskyIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Post } from "@/lib/mock-data";

interface ScheduleFormProps {
  selectedDate: Date;
  onSchedule: (data: {
    date: Date;
    time: string;
    platforms: {
      linkedin: boolean;
      bluesky: boolean;
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
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [time, setTime] = useState<string>("12:00");
  const [platforms, setPlatforms] = useState({
    linkedin: true,
    bluesky: false,
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

  const togglePlatform = (platform: keyof typeof platforms) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Platforms</label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={platforms.linkedin ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("linkedin")}
              >
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                LinkedIn
              </Button>
              <Button
                type="button"
                variant={platforms.bluesky ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("bluesky")}
              >
                <BlueskyIcon className="w-4 h-4 mr-2 text-sky-500" />
                Bluesky
              </Button>
              <Button
                type="button"
                variant={platforms.threads ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("threads")}
              >
                <Instagram className="w-4 h-4 mr-2 text-pink-600" />
                Threads
              </Button>
              <Button
                type="button"
                variant={platforms.mastodon ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("mastodon")}
              >
                <Globe className="w-4 h-4 mr-2 text-purple-600" />
                Mastodon
              </Button>
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
