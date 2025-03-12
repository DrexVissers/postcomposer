"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  mockCategories,
  mockTags,
  mockUser,
  Tag,
  MediaItem,
} from "@/lib/mock-data";
import {
  Image as ImageIcon,
  Send,
  RefreshCw,
  Tag as TagIcon,
  Clock,
} from "lucide-react";
import PostPreview from "@/components/features/posts/PostPreview";
import { useNotification } from "@/context/NotificationContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MediaProvider } from "@/context/MediaContext";
import MediaLibrary from "@/components/features/media/MediaLibrary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTemplates } from "@/context/TemplateContext";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("linkedin");
  const [generatedContent, setGeneratedContent] = useState({
    linkedin: "",
    twitter: "",
    threads: "",
    mastodon: "",
  });
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const requiresApproval =
    mockUser.role !== "owner" && mockUser.role !== "admin";
  const { addNotification } = useNotification();
  const { templates } = useTemplates();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    // Also update the generated content for the active platform
    setGeneratedContent({
      ...generatedContent,
      [activeTab]: newContent,
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePublish = () => {
    // Simulate publishing or submitting for approval
    setTimeout(() => {
      addNotification({
        type: requiresApproval ? "info" : "success",
        title: requiresApproval ? "Submitted for Approval" : "Post Published",
        message: requiresApproval
          ? "Your post has been submitted for approval."
          : "Your post has been published successfully.",
        duration: 5000,
      });

      // Clear the form
      setContent("");
      setSelectedMedia([]);
      setSelectedCategory("");
      setSelectedTags([]);
    }, 1000);
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      // Check if this is a Bluesky or Threads template
      const isBlueSkyOrThreadsTemplate = ["bluesky", "threads"].includes(
        template.platform.toLowerCase()
      );

      // If it's not a Bluesky or Threads template, redirect to preview page
      if (!isBlueSkyOrThreadsTemplate) {
        // For other templates, redirect to the preview page with template data
        localStorage.setItem("selectedTemplate", JSON.stringify(template));
        window.location.href = "/preview";
        return;
      }

      // For Bluesky or Threads templates, continue with the current behavior
      setContent(template.content);
      // Also update the generated content for the active platform
      setGeneratedContent({
        ...generatedContent,
        [activeTab]: template.content,
      });
      addNotification({
        type: "success",
        title: "Template Applied",
        message: `The "${template.name}" template has been applied.`,
        duration: 3000,
      });
    }
  };

  // Handle media selection
  const handleMediaSelect = (media: MediaItem) => {
    // Check if media is already selected
    if (!selectedMedia.some((m) => m.id === media.id)) {
      setSelectedMedia([...selectedMedia, media]);
    }
  };

  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-muted-foreground">
            Short Form
          </h1>
          <div className="flex items-center gap-2">
            {/* ... existing code ... */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Content Creation */}
          <div className="flex-1 space-y-6">
            <div className="bg-card dark:bg-card rounded-lg border border-border shadow-sm p-6">
              {/* Content Input */}
              <div className="mb-6">
                <textarea
                  className="w-full p-4 bg-background dark:bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px] text-foreground/80 dark:text-foreground/80"
                  placeholder="What do you want to share today?"
                  value={content}
                  onChange={handleContentChange}
                ></textarea>
              </div>

              {/* Media Selection */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedMedia.map((media) => (
                    <div
                      key={media.id}
                      className="relative group rounded-lg overflow-hidden"
                    >
                      <Image
                        src={media.thumbnailUrl}
                        alt={media.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          setSelectedMedia(
                            selectedMedia.filter((m) => m.id !== media.id)
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                  onClick={() => setShowMediaLibrary(true)}
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Add Media</span>
                </button>
              </div>

              {/* Category and Tags */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <TagIcon className="w-4 h-4" />
                      <span>
                        {selectedTags.length > 0
                          ? `${selectedTags.length} Tags Selected`
                          : "Select Tags"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-4">
                    <div className="space-y-2">
                      {mockTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={() => toggleTag(tag.id)}
                          />
                          <Label
                            htmlFor={`tag-${tag.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-foreground/90 dark:text-foreground/90"
                          >
                            {tag.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Approval Requirement Notice */}
              {requiresApproval && (
                <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                      Approval Required
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-500">
                      Based on your role, this post will require approval from
                      an admin or owner before it&apos;s published.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  onClick={() => setContent("")}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear</span>
                </button>

                <div className="w-full max-w-xs mx-4">
                  <Select
                    onValueChange={(value) => handleTemplateSelect(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates
                        .filter((template) =>
                          // Only include Bluesky and Threads templates
                          ["bluesky", "threads"].includes(
                            (template.platform || "").toLowerCase()
                          )
                        )
                        .map((template) => {
                          // Remove "(Copy)" from template names if present
                          const displayName = template.name.replace(
                            /\s*\(Copy\)/g,
                            ""
                          );
                          return (
                            <SelectItem key={template.id} value={template.id}>
                              {displayName}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>

                <button
                  className="flex items-center gap-2 px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  onClick={handlePublish}
                  disabled={!content.trim()}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {requiresApproval ? "Submit for Approval" : "Publish"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section - Using the PostPreview component */}
          <div>
            <PostPreview
              content={generatedContent}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              category={
                selectedCategory
                  ? mockCategories.find((c) => c.id === selectedCategory)
                  : undefined
              }
              tags={
                selectedTags
                  .map((tagId) => mockTags.find((t) => t.id === tagId))
                  .filter(Boolean) as Tag[]
              }
              media={selectedMedia}
              className="bg-card dark:bg-card rounded-lg shadow-sm p-4 sm:p-6 border border-border"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground dark:text-muted-foreground"
              tabClassName="text-muted-foreground hover:text-foreground/80"
              selectedTabClassName="bg-background dark:bg-background shadow-sm text-primary"
            />
          </div>
        </div>

        {/* Media Library Dialog */}
        <Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
          <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogTitle>Media Library</DialogTitle>
            <MediaProvider>
              <MediaLibrary onSelectMedia={handleMediaSelect} />
            </MediaProvider>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
