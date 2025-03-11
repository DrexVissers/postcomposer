"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Linkedin,
  Instagram,
  Globe,
  Image as ImageIcon,
  Tag,
  Calendar,
  Send,
} from "lucide-react";
import { Category, Tag as TagType } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import BlueskyIcon from "@/components/ui/icons/BlueskyIcon";

interface MobilePostEditorProps {
  onContentChange?: (platform: string, content: string) => void;
  onImageChange?: (platform: string, file: File | null) => void;
  onSubmit?: () => void;
  categories?: Category[];
  tags?: TagType[];
  selectedCategory?: string;
  selectedTags?: string[];
  onCategorySelect?: (categoryId: string) => void;
  onTagToggle?: (tagId: string) => void;
  initialContent?: {
    linkedin?: string;
    bluesky?: string;
    threads?: string;
    mastodon?: string;
  };
  initialImages?: {
    linkedin?: File | null;
    bluesky?: File | null;
    threads?: File | null;
    mastodon?: File | null;
  };
  submitButtonText?: string;
}

export default function MobilePostEditor({
  onContentChange,
  onImageChange,
  onSubmit,
  categories = [],
  tags = [],
  selectedCategory,
  selectedTags = [],
  onCategorySelect,
  onTagToggle,
  initialContent = {},
  initialImages = {},
  submitButtonText = "Create Post",
}: MobilePostEditorProps) {
  const [activeTab, setActiveTab] = useState("linkedin");
  const [linkedinContent, setLinkedinContent] = useState(
    initialContent.linkedin || ""
  );
  const [blueskyContent, setBlueskyContent] = useState(
    initialContent.bluesky || ""
  );
  const [threadsContent, setThreadsContent] = useState(
    initialContent.threads || ""
  );
  const [mastodonContent, setMastodonContent] = useState(
    initialContent.mastodon || ""
  );
  const [showOptions, setShowOptions] = useState(false);

  const handleLinkedinChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinkedinContent(e.target.value);
    if (onContentChange) {
      onContentChange("linkedin", e.target.value);
    }
  };

  const handleBlueskyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlueskyContent(e.target.value);
    if (onContentChange) {
      onContentChange("bluesky", e.target.value);
    }
  };

  const handleThreadsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThreadsContent(e.target.value);
    if (onContentChange) {
      onContentChange("threads", e.target.value);
    }
  };

  const handleMastodonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMastodonContent(e.target.value);
    if (onContentChange) {
      onContentChange("mastodon", e.target.value);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectedCategory_ = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : undefined;

  const selectedTagObjects = selectedTags
    .map((tagId) => tags.find((t) => t.id === tagId))
    .filter(Boolean) as TagType[];

  const handleImageChange = (platform: string, file: File | null) => {
    if (onImageChange) {
      onImageChange(platform, file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 py-3 border-b">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="linkedin"
              className="flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger
              value="bluesky"
              className="flex items-center space-x-2"
            >
              <BlueskyIcon className="w-4 h-4" />
              <span>Bluesky</span>
            </TabsTrigger>
            <TabsTrigger
              value="threads"
              className="flex items-center space-x-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Threads</span>
            </TabsTrigger>
            <TabsTrigger
              value="mastodon"
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>Mastodon</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="linkedin"
          key="mobile-linkedin"
          className="flex-1 flex flex-col p-0 m-0"
        >
          <div className="relative">
            <Textarea
              placeholder="What do you want to share on LinkedIn?"
              className="min-h-[200px] resize-none"
              value={linkedinContent}
              onChange={handleLinkedinChange}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {linkedinContent.length}/3000
            </div>
          </div>
          <ImageUpload
            value={initialImages.linkedin || null}
            onChange={(file) => handleImageChange("linkedin", file)}
            platformPreview="linkedin"
          />
        </TabsContent>

        <TabsContent
          value="bluesky"
          key="mobile-bluesky"
          className="flex-1 flex flex-col p-0 m-0"
        >
          <div className="relative">
            <Textarea
              placeholder="What's happening?"
              className="min-h-[200px] resize-none"
              value={blueskyContent}
              onChange={handleBlueskyChange}
              aria-label="Bluesky post content"
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {blueskyContent.length}/300
            </div>
          </div>
          <ImageUpload
            value={initialImages.bluesky || null}
            onChange={(file) => handleImageChange("bluesky", file)}
            platformPreview="bluesky"
          />
        </TabsContent>

        <TabsContent
          value="threads"
          key="mobile-threads"
          className="flex-1 flex flex-col p-0 m-0"
        >
          <div className="relative">
            <Textarea
              placeholder="Start a thread..."
              className="min-h-[200px] resize-none"
              value={threadsContent}
              onChange={handleThreadsChange}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {threadsContent.length}/500
            </div>
          </div>
          <ImageUpload
            value={initialImages.threads || null}
            onChange={(file) => handleImageChange("threads", file)}
            platformPreview="threads"
          />
        </TabsContent>

        <TabsContent
          value="mastodon"
          key="mobile-mastodon"
          className="flex-1 flex flex-col p-0 m-0"
        >
          <div className="relative">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[200px] resize-none"
              value={mastodonContent}
              onChange={handleMastodonChange}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {mastodonContent.length}/500
            </div>
          </div>
          <ImageUpload
            value={initialImages.mastodon || null}
            onChange={(file) => handleImageChange("mastodon", file)}
            platformPreview="mastodon"
          />
        </TabsContent>
      </Tabs>

      {/* Selected Category and Tags */}
      {(selectedCategory_ || selectedTagObjects.length > 0) && (
        <div className="px-4 py-2 border-t flex flex-wrap gap-1">
          {selectedCategory_ && (
            <Badge
              className="mb-1 mr-1"
              style={{
                backgroundColor: selectedCategory_.color,
                color: "white",
              }}
            >
              {selectedCategory_.name}
            </Badge>
          )}
          {selectedTagObjects.map((tag) => (
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
          ))}
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="border-t px-4 py-3 flex justify-between items-center bg-white">
        <div className="flex space-x-4">
          <button
            className="text-gray-500 hover:text-teal-600 focus:outline-none"
            aria-label="Add image"
          >
            <ImageIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            className={`text-gray-500 hover:text-teal-600 focus:outline-none ${
              showOptions ? "text-teal-600" : ""
            }`}
            onClick={toggleOptions}
            aria-label="Add tags"
          >
            <Tag className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            className="text-gray-500 hover:text-teal-600 focus:outline-none"
            aria-label="Schedule post"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <Button
          onClick={onSubmit}
          size="sm"
          className="rounded-full"
          disabled={
            !linkedinContent &&
            !blueskyContent &&
            !threadsContent &&
            !mastodonContent
          }
        >
          <Send className="w-4 h-4 mr-1" />
          <span>{submitButtonText}</span>
        </Button>
      </div>

      {/* Options Panel */}
      {showOptions && (
        <div className="fixed inset-x-0 bottom-16 bg-white border-t shadow-lg z-10 p-4 animate-slide-up">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? "ring-2 ring-offset-1"
                      : "opacity-70"
                  }`}
                  style={{
                    backgroundColor: category.color,
                    color: "white",
                  }}
                  onClick={() =>
                    onCategorySelect && onCategorySelect(category.id)
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    selectedTags.includes(tag.id)
                      ? "ring-2 ring-offset-1"
                      : "opacity-70"
                  }`}
                  style={{
                    borderColor: tag.color,
                    color: tag.color,
                  }}
                  onClick={() => onTagToggle && onTagToggle(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
