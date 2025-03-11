import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Category, MediaItem, Tag } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram, Globe, Monitor, Laptop } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import BlueskyIcon from "@/components/ui/icons/BlueskyIcon";

interface PostPreviewProps {
  content?: {
    linkedin?: string;
    bluesky?: string;
    threads?: string;
    mastodon?: string;
  };
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  category?: Category;
  tags?: Tag[];
  media?: MediaItem[];
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  tabClassName?: string;
  selectedTabClassName?: string;
  deviceView?: "desktop" | "mobile" | "responsive";
}

export default function PostPreview({
  content = {},
  activeTab = "linkedin",
  onTabChange,
  category,
  tags = [],
  media = [],
  className = "bg-card dark:bg-card rounded-lg shadow-sm p-4 sm:p-6",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  deviceView = "responsive",
}: PostPreviewProps) {
  const [effectiveActiveTab, setEffectiveActiveTab] = useState(activeTab);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Update internal state when prop changes
  useEffect(() => {
    if (activeTab) {
      setEffectiveActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setEffectiveActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  const tabClassName = "text-muted-foreground hover:text-foreground/80";
  const selectedTabClassName = "bg-card dark:bg-card shadow-sm text-primary";

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cn("text-lg font-medium", textClassName)}>
          Post Preview
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(
              "p-1.5 rounded-md",
              deviceView === "desktop" ? "bg-primary/10" : "bg-transparent"
            )}
            onClick={() => {}}
            title="Desktop view"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              "p-1.5 rounded-md",
              deviceView === "mobile" ? "bg-primary/10" : "bg-transparent"
            )}
            onClick={() => {}}
            title="Mobile view"
          >
            <Laptop className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Tabs
        value={effectiveActiveTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 h-9">
          <TabsTrigger
            value="linkedin"
            className={cn(
              "flex items-center gap-1.5 text-xs h-8",
              tabClassName,
              effectiveActiveTab === "linkedin" && selectedTabClassName
            )}
          >
            <Linkedin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </TabsTrigger>
          <TabsTrigger
            value="bluesky"
            className={cn(
              "flex items-center gap-1.5 text-xs h-8",
              tabClassName,
              effectiveActiveTab === "bluesky" && selectedTabClassName
            )}
          >
            <BlueskyIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Bluesky</span>
          </TabsTrigger>
          <TabsTrigger
            value="threads"
            className={cn(
              "flex items-center gap-1.5 text-xs h-8",
              tabClassName,
              effectiveActiveTab === "threads" && selectedTabClassName
            )}
          >
            <Instagram className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Threads</span>
          </TabsTrigger>
          <TabsTrigger
            value="mastodon"
            className={cn(
              "flex items-center gap-1.5 text-xs h-8",
              tabClassName,
              effectiveActiveTab === "mastodon" && selectedTabClassName
            )}
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mastodon</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="linkedin" className="space-y-4">
          <div
            className={cn(
              "bg-white dark:bg-gray-900 rounded-lg border border-border p-4",
              deviceView === "mobile" ? "max-w-[320px] mx-auto" : ""
            )}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className={cn("font-bold text-sm", textClassName)}>
                    Your Name
                  </span>
                  <span className={cn("text-xs", subtextClassName)}>• 1st</span>
                </div>
                <div className={cn("text-xs mt-0.5 mb-2", subtextClassName)}>
                  Your Title
                </div>

                <div
                  className={cn(
                    "mt-2 text-sm whitespace-pre-wrap",
                    textClassName
                  )}
                >
                  {content?.linkedin ||
                    "Your LinkedIn post content will appear here."}
                </div>

                {media.length > 0 && (
                  <div className="mt-3 rounded-xl bg-muted/30 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media[0].thumbnailUrl}
                      alt={media[0].name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bluesky" className="space-y-4">
          <div
            className={cn(
              "bg-white dark:bg-gray-900 rounded-lg border border-border p-4",
              deviceView === "mobile" ? "max-w-[320px] mx-auto" : ""
            )}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className={cn("font-bold text-sm", textClassName)}>
                    Your Name
                  </span>
                  <span className={cn("text-sm", subtextClassName)}>
                    @yourhandle.bsky.social
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-2 text-sm whitespace-pre-wrap",
                    textClassName
                  )}
                >
                  {content?.bluesky ||
                    "Your Bluesky post content will appear here."}
                </div>

                {media.length > 0 && (
                  <div className="mt-3 rounded-xl bg-muted/30 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media[0].thumbnailUrl}
                      alt={media[0].name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="threads" className="space-y-4">
          <div
            className={cn(
              "bg-white dark:bg-gray-900 rounded-lg border border-border p-4",
              deviceView === "mobile" ? "max-w-[320px] mx-auto" : ""
            )}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className={cn("font-bold text-sm", textClassName)}>
                    Your Name
                  </span>
                  <span className={cn("text-sm", subtextClassName)}>
                    @yourhandle
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-2 text-sm whitespace-pre-wrap",
                    textClassName
                  )}
                >
                  {content?.threads ||
                    "Your Threads post content will appear here."}
                </div>

                {media.length > 0 && (
                  <div className="mt-3 aspect-square bg-muted/30 rounded-md overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media[0].thumbnailUrl}
                      alt={media[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mastodon" className="space-y-4">
          <div
            className={cn(
              "bg-white dark:bg-gray-900 rounded-lg border border-border p-4",
              deviceView === "mobile" ? "max-w-[320px] mx-auto" : ""
            )}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className={cn("font-bold text-sm", textClassName)}>
                    Your Name
                  </span>
                  <span className={cn("text-sm", subtextClassName)}>
                    @yourhandle@mastodon.social
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-2 text-sm whitespace-pre-wrap",
                    textClassName
                  )}
                >
                  {content?.mastodon ||
                    "Your Mastodon post content will appear here."}
                </div>

                {media.length > 0 && (
                  <div className="mt-3 rounded-xl bg-muted/30 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media[0].thumbnailUrl}
                      alt={media[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 flex flex-wrap gap-1">
        {category && (
          <Badge
            className="mb-1 mr-1"
            style={{
              backgroundColor: category.color,
              color: "white",
            }}
          >
            {category.name}
          </Badge>
        )}
        {isMobile && tags.length > 2 ? (
          <>
            {tags.slice(0, 2).map(
              (tag) =>
                tag && (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="mb-1 mr-1"
                    style={{
                      borderColor: tag.color,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </Badge>
                )
            )}
            <Badge variant="outline" className="mb-1">
              +{tags.length - 2} more
            </Badge>
          </>
        ) : (
          tags.map(
            (tag) =>
              tag && (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="mb-1 mr-1"
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
  );
}
