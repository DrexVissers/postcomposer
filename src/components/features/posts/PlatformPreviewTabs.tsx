import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Linkedin, Instagram, Globe } from "lucide-react";
import { BlueskyIcon } from "@/components/icons/BlueskyIcon";
import { ImageUpload } from "@/components/ui/image-upload";

interface PlatformPreviewTabsProps {
  blueskyContent: string;
  linkedinContent: string;
  threadsContent: string;
  mastodonContent: string;
  onBlueskyContentChange?: (content: string) => void;
  onLinkedinContentChange?: (content: string) => void;
  onThreadsContentChange?: (content: string) => void;
  onMastodonContentChange?: (content: string) => void;
  onBlueskyImageChange?: (file: File | null) => void;
  onLinkedinImageChange?: (file: File | null) => void;
  onThreadsImageChange?: (file: File | null) => void;
  onMastodonImageChange?: (file: File | null) => void;
  blueskyImage?: File | string | null;
  linkedinImage?: File | string | null;
  threadsImage?: File | string | null;
  mastodonImage?: File | string | null;
  readOnly?: boolean;
  className?: string;
}

export function PlatformPreviewTabs({
  blueskyContent,
  linkedinContent,
  threadsContent,
  mastodonContent,
  onBlueskyContentChange,
  onLinkedinContentChange,
  onThreadsContentChange,
  onMastodonContentChange,
  onBlueskyImageChange,
  onLinkedinImageChange,
  onThreadsImageChange,
  onMastodonImageChange,
  blueskyImage,
  linkedinImage,
  threadsImage,
  mastodonImage,
  readOnly = false,
  className,
}: PlatformPreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("bluesky");

  const handleBlueskyContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (onBlueskyContentChange) {
      onBlueskyContentChange(e.target.value);
    }
  };

  const handleLinkedinContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (onLinkedinContentChange) {
      onLinkedinContentChange(e.target.value);
    }
  };

  const handleThreadsContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (onThreadsContentChange) {
      onThreadsContentChange(e.target.value);
    }
  };

  const handleMastodonContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (onMastodonContentChange) {
      onMastodonContentChange(e.target.value);
    }
  };

  return (
    <Tabs
      defaultValue="bluesky"
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn("w-full", className)}
    >
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="bluesky" className="flex items-center gap-2">
          <BlueskyIcon className="w-4 h-4" />
          <span>Bluesky</span>
        </TabsTrigger>
        <TabsTrigger value="linkedin" className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </TabsTrigger>
        <TabsTrigger value="threads" className="flex items-center gap-2">
          <Instagram className="w-4 h-4" />
          <span>Threads</span>
        </TabsTrigger>
        <TabsTrigger value="mastodon" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Mastodon</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="bluesky" key="platform-bluesky" className="space-y-4">
        <div className="bg-background dark:bg-background rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">Your Name</span>
                <span className="text-muted-foreground text-sm">
                  @yourhandle.bsky.social
                </span>
              </div>

              {readOnly ? (
                <div className="mt-2 text-sm whitespace-pre-wrap">
                  {blueskyContent}
                </div>
              ) : (
                <textarea
                  value={blueskyContent}
                  onChange={handleBlueskyContentChange}
                  className="w-full mt-2 bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[100px]"
                  placeholder="What's on your mind?"
                  aria-label="Bluesky post content"
                />
              )}

              {(blueskyImage || onBlueskyImageChange) && (
                <div className="mt-3">
                  <ImageUpload
                    value={blueskyImage}
                    onChange={onBlueskyImageChange || (() => {})}
                    platformPreview="bluesky"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-primary">
                <div className="flex items-center gap-4">
                  <span className="text-xs">300 characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="linkedin"
        key="platform-linkedin"
        className="space-y-4"
      >
        <div className="bg-background dark:bg-background rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
            <div className="flex-1">
              <div>
                <span className="font-bold text-sm">Your Name</span>
                <span className="text-xs text-muted-foreground block">
                  Your Title
                </span>
              </div>

              {readOnly ? (
                <div className="mt-3 text-sm whitespace-pre-wrap">
                  {linkedinContent}
                </div>
              ) : (
                <textarea
                  value={linkedinContent}
                  onChange={handleLinkedinContentChange}
                  className="w-full mt-3 bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[150px]"
                  placeholder="What do you want to talk about?"
                  aria-label="LinkedIn post content"
                />
              )}

              {(linkedinImage || onLinkedinImageChange) && (
                <div className="mt-3">
                  <ImageUpload
                    value={linkedinImage}
                    onChange={onLinkedinImageChange || (() => {})}
                    platformPreview="linkedin"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-primary">
                <div className="flex items-center gap-4">
                  <span className="text-xs">3000 characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="threads" key="platform-threads" className="space-y-4">
        <div className="bg-background dark:bg-background rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">Your Name</span>
                <span className="text-muted-foreground text-sm">
                  @yourhandle
                </span>
              </div>

              {readOnly ? (
                <div className="mt-2 text-sm whitespace-pre-wrap">
                  {threadsContent}
                </div>
              ) : (
                <textarea
                  value={threadsContent}
                  onChange={handleThreadsContentChange}
                  className="w-full mt-2 bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[100px]"
                  placeholder="Start a thread..."
                  aria-label="Threads post content"
                />
              )}

              {(threadsImage || onThreadsImageChange) && (
                <div className="mt-3">
                  <ImageUpload
                    value={threadsImage}
                    onChange={onThreadsImageChange || (() => {})}
                    platformPreview="threads"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-primary">
                <div className="flex items-center gap-4">
                  <span className="text-xs">500 characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="mastodon"
        key="platform-mastodon"
        className="space-y-4"
      >
        <div className="bg-background dark:bg-background rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">Your Name</span>
                <span className="text-muted-foreground text-sm">
                  @yourhandle@mastodon.social
                </span>
              </div>

              {readOnly ? (
                <div className="mt-2 text-sm whitespace-pre-wrap">
                  {mastodonContent}
                </div>
              ) : (
                <textarea
                  value={mastodonContent}
                  onChange={handleMastodonContentChange}
                  className="w-full mt-2 bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[100px]"
                  placeholder="What's on your mind?"
                  aria-label="Mastodon post content"
                />
              )}

              {(mastodonImage || onMastodonImageChange) && (
                <div className="mt-3">
                  <ImageUpload
                    value={mastodonImage}
                    onChange={onMastodonImageChange || (() => {})}
                    platformPreview="mastodon"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mt-4 text-primary">
                <div className="flex items-center gap-4">
                  <span className="text-xs">500 characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
