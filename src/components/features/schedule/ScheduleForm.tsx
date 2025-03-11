import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Linkedin, Instagram, Globe } from "lucide-react";
import { BlueskyIcon } from "@/components/icons/BlueskyIcon";
import { useState } from "react";

interface ScheduleFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ScheduleFormData>;
}

interface ScheduleFormData {
  date?: Date;
  time: string;
  platform: "linkedin" | "twitter" | "threads" | "mastodon" | "bluesky";
  repeat: string;
}

export default function ScheduleForm({
  onSubmit,
  onCancel,
  initialData,
}: ScheduleFormProps) {
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  const [time, setTime] = useState(initialData?.time || "");
  const [platform, setPlatform] = useState<
    "linkedin" | "twitter" | "threads" | "mastodon" | "bluesky"
  >(initialData?.platform || "linkedin");
  const [repeat, setRepeat] = useState(initialData?.repeat || "none");
  const [isRecurring, setIsRecurring] = useState(
    initialData?.repeat && initialData.repeat !== "none"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      time,
      platform,
      repeat: isRecurring ? repeat : "none",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="platform" className="text-foreground/90">
            Platform
          </Label>
          <Select
            value={platform}
            onValueChange={(value) =>
              setPlatform(
                value as
                  | "linkedin"
                  | "twitter"
                  | "threads"
                  | "mastodon"
                  | "bluesky"
              )
            }
          >
            <SelectTrigger id="platform" className="w-full mt-1.5">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin" className="flex items-center">
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                  LinkedIn
                </div>
              </SelectItem>
              <SelectItem value="bluesky" className="flex items-center">
                <div className="flex items-center">
                  <BlueskyIcon className="h-4 w-4 mr-2 text-sky-500" />
                  Bluesky
                </div>
              </SelectItem>
              <SelectItem value="threads" className="flex items-center">
                <div className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2 text-purple-600" />
                  Threads
                </div>
              </SelectItem>
              <SelectItem value="mastodon" className="flex items-center">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-teal-500" />
                  Mastodon
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="date" className="text-foreground/90">
            Date
          </Label>
          <div className="mt-1.5">
            <Input
              type="date"
              id="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                setDate(e.target.value ? new Date(e.target.value) : undefined)
              }
              className="w-full"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="time" className="text-foreground/90">
            Time
          </Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time" className="w-full mt-1.5">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9:00 AM">9:00 AM</SelectItem>
              <SelectItem value="12:00 PM">12:00 PM</SelectItem>
              <SelectItem value="3:00 PM">3:00 PM</SelectItem>
              <SelectItem value="6:00 PM">6:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="recurring"
            checked={isRecurring || false}
            onCheckedChange={(checked) => {
              setIsRecurring(checked === true);
            }}
          />
          <Label
            htmlFor="recurring"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-foreground/90"
          >
            Make this a recurring post
          </Label>
        </div>

        {isRecurring && (
          <div>
            <Label htmlFor="repeat" className="text-foreground/90">
              Repeat
            </Label>
            <Select value={repeat} onValueChange={setRepeat}>
              <SelectTrigger id="repeat" className="w-full mt-1.5">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground/90 hover:bg-muted/50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
