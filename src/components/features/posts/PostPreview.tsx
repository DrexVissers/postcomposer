import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Monitor, Linkedin, Twitter } from "lucide-react";
import { Category, Tag, MediaItem } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PostPreviewProps {
  content: {
    linkedin?: string;
    twitter?: string;
  };
  showDeviceToggle?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  category?: Category;
  tags?: (Tag | undefined)[];
  media?: MediaItem[];
  className?: string;
  textClassName?: string;
  subtextClassName?: string;
  tabClassName?: string;
  selectedTabClassName?: string;
}

export default function PostPreview({
  content,
  showDeviceToggle = true,
  activeTab = "linkedin",
  onTabChange,
  category,
  tags = [],
  media = [],
  className = "bg-card-lighter dark:bg-card-lighter rounded-lg shadow-sm p-4 sm:p-6",
  textClassName = "text-foreground/90 dark:text-foreground/90",
  subtextClassName = "text-muted-foreground dark:text-muted-foreground",
  tabClassName = "text-muted-foreground hover:text-foreground/80",
  selectedTabClassName = "bg-card dark:bg-card shadow-sm text-primary",
}: PostPreviewProps) {
  const [deviceView, setDeviceView] = useState<"mobile" | "desktop">("desktop");
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Set mobile view by default on small screens
    if (window.innerWidth < 768) {
      setDeviceView("mobile");
    }

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className={`text-lg font-medium ${textClassName}`}>Preview</h2>

        {showDeviceToggle && (
          <div
            className={`flex items-center space-x-2 bg-muted/50 dark:bg-muted/30 p-1 rounded-md self-start ${
              isMobile ? "w-full justify-center" : ""
            }`}
          >
            <button
              onClick={() => setDeviceView("mobile")}
              className={`p-1.5 rounded-md flex items-center ${
                deviceView === "mobile" ? selectedTabClassName : tabClassName
              }`}
              aria-label="Mobile view"
            >
              <Smartphone className="w-4 h-4 mr-1" />
              <span className="text-xs">Mobile</span>
            </button>
            <button
              onClick={() => setDeviceView("desktop")}
              className={`p-1.5 rounded-md flex items-center ${
                deviceView === "desktop" ? selectedTabClassName : tabClassName
              }`}
              aria-label="Desktop view"
            >
              <Monitor className="w-4 h-4 mr-1" />
              <span className="text-xs">Desktop</span>
            </button>
          </div>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="linkedin" className="flex items-center space-x-2">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center space-x-2">
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="linkedin" key="preview-linkedin" className="mt-0">
          <div
            className={`border border-border rounded-lg overflow-hidden ${
              deviceView === "mobile" || isMobile
                ? "max-w-[375px] mx-auto"
                : "w-full"
            }`}
          >
            <div className="bg-background dark:bg-background p-2 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted/50 dark:bg-muted/30 rounded-full"></div>
                <div>
                  <div className={`text-sm font-medium ${textClassName}`}>
                    Jane Smith
                  </div>
                  <div className={`text-xs ${subtextClassName}`}>
                    Product Manager • Just now
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-background dark:bg-background">
              {content.linkedin ? (
                <div className="space-y-3">
                  <div
                    className={`whitespace-pre-line text-sm ${textClassName}`}
                  >
                    {content.linkedin}
                  </div>

                  {/* Category and Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
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

                  {/* Media Preview */}
                  {media.length > 0 && (
                    <div className="pt-2">
                      <div
                        className={`grid ${
                          media.length > 1
                            ? deviceView === "mobile" || isMobile
                              ? "grid-cols-1"
                              : "grid-cols-2"
                            : "grid-cols-1"
                        } gap-2`}
                      >
                        {media
                          .slice(0, deviceView === "mobile" || isMobile ? 2 : 4)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="relative rounded-md overflow-hidden"
                            >
                              <Image
                                src={item.url}
                                alt={item.name}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          ))}
                      </div>
                      {media.length >
                        (deviceView === "mobile" || isMobile ? 2 : 4) && (
                        <div className={`text-xs ${subtextClassName} mt-1`}>
                          +
                          {media.length -
                            (deviceView === "mobile" || isMobile ? 2 : 4)}{" "}
                          more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`italic text-sm ${subtextClassName}`}>
                  LinkedIn preview will appear here.
                </div>
              )}
            </div>
            <div className="bg-background dark:bg-background border-t border-border p-2 flex space-x-4">
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Like
              </div>
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Comment
              </div>
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Share
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="twitter" key="preview-twitter" className="mt-0">
          <div
            className={`border border-border rounded-lg overflow-hidden ${
              deviceView === "mobile" || isMobile
                ? "max-w-[375px] mx-auto"
                : "w-full"
            }`}
          >
            <div className="bg-background dark:bg-background p-3 border-b border-border">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted/50 dark:bg-muted/30 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`font-bold text-sm ${textClassName}`}>
                      Jane Smith
                    </span>
                    <span className={`text-sm ml-1 ${subtextClassName}`}>
                      @janesmith
                    </span>
                    <span className={`text-sm ml-1 ${subtextClassName}`}>
                      • Just now
                    </span>
                  </div>
                  <div className="mt-1 space-y-3">
                    {content.twitter ? (
                      <>
                        <div className={`text-sm ${textClassName}`}>
                          {content.twitter}
                        </div>

                        {/* Category and Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {category && (
                            <Badge
                              className="mb-1 mr-1 text-xs"
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
                                      className="mb-1 mr-1 text-xs"
                                      style={{
                                        borderColor: tag.color,
                                        color: tag.color,
                                      }}
                                    >
                                      {tag.name}
                                    </Badge>
                                  )
                              )}
                              <Badge variant="outline" className="mb-1 text-xs">
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
                                    className="mb-1 mr-1 text-xs"
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

                        {/* Media Preview */}
                        {media.length > 0 && (
                          <div className="pt-1">
                            <div
                              className={`grid ${
                                media.length > 1
                                  ? deviceView === "mobile" || isMobile
                                    ? "grid-cols-1"
                                    : "grid-cols-2"
                                  : "grid-cols-1"
                              } gap-2`}
                            >
                              {media
                                .slice(
                                  0,
                                  deviceView === "mobile" || isMobile ? 2 : 4
                                )
                                .map((item) => (
                                  <div
                                    key={item.id}
                                    className="relative rounded-md overflow-hidden"
                                  >
                                    <Image
                                      src={item.url}
                                      alt={item.name}
                                      width={300}
                                      height={200}
                                      className="w-full h-auto object-cover"
                                    />
                                  </div>
                                ))}
                            </div>
                            {media.length >
                              (deviceView === "mobile" || isMobile ? 2 : 4) && (
                              <div
                                className={`text-xs ${subtextClassName} mt-1`}
                              >
                                +
                                {media.length -
                                  (deviceView === "mobile" || isMobile
                                    ? 2
                                    : 4)}{" "}
                                more
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={`italic ${subtextClassName}`}>
                        Twitter preview will appear here.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background dark:bg-background border-t border-border p-2 flex justify-around">
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Reply
              </div>
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Retweet
              </div>
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Like
              </div>
              <div className={`text-xs ${subtextClassName} flex items-center`}>
                <span className="w-4 h-4 bg-muted/50 dark:bg-muted/30 rounded-full mr-1"></span>
                Share
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
