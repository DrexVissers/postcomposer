import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Category, MediaItem, Tag } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Monitor,
  Laptop,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PostPreviewProps {
  content?: {
    linkedin?: string;
    twitter?: string;
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
}: PostPreviewProps) {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Use the internal state if no onTabChange is provided
  const effectiveActiveTab = onTabChange ? activeTab : internalActiveTab;

  // Handle tab changes internally if no onTabChange is provided
  const handleInternalTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setDeviceView("mobile");
    }
  }, [isMobile]);

  const tabClassName = "text-muted-foreground hover:text-foreground/80";
  const selectedTabClassName = "bg-card dark:bg-card shadow-sm text-primary";

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={cn("text-lg font-medium", textClassName)}>Preview</h3>
        {!isMobile && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDeviceView("desktop")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                deviceView === "desktop"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Desktop view"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                deviceView === "mobile"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Mobile view"
            >
              <Laptop className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <Tabs
        defaultValue={effectiveActiveTab}
        value={effectiveActiveTab}
        onValueChange={handleInternalTabChange}
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
            value="twitter"
            className={cn(
              "flex items-center gap-1.5 text-xs h-8",
              tabClassName,
              effectiveActiveTab === "twitter" && selectedTabClassName
            )}
          >
            <Twitter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Twitter</span>
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
              <div className="w-12 h-12 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
              <div className="flex-1">
                <div>
                  <span className={cn("font-bold text-sm", textClassName)}>
                    Your Name
                  </span>
                  <span className={cn("text-xs block", subtextClassName)}>
                    Your Title
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-3 text-sm whitespace-pre-wrap",
                    textClassName
                  )}
                >
                  {content?.linkedin ||
                    "Your LinkedIn post content will appear here."}
                </div>

                {media.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {media.map((item) => (
                      <div
                        key={item.id}
                        className="aspect-video bg-muted/30 rounded-md overflow-hidden relative"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4">
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
                  {content?.twitter ||
                    "Your Twitter post content will appear here."}
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
