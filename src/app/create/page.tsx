"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockCategories, mockTags, mockUser } from "@/lib/mock-data";
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
import { MediaItem } from "@/lib/mock-data";
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
import Link from "next/link";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("linkedin");
  const [generatedContent, setGeneratedContent] = useState({
    linkedin: "",
    twitter: "",
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
    setContent(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePublish = () => {
    // Create a new post object
    const newPost = {
      id: `post-${Date.now()}`,
      content: content,
      createdAt: new Date().toISOString(),
      category: selectedCategory || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      platforms: {
        ...(generatedContent.linkedin
          ? {
              linkedin: {
                content: generatedContent.linkedin,
                published: !requiresApproval,
                publishedAt: !requiresApproval
                  ? new Date().toISOString()
                  : undefined,
              },
            }
          : {}),
        ...(generatedContent.twitter
          ? {
              twitter: {
                content: generatedContent.twitter,
                published: !requiresApproval,
                publishedAt: !requiresApproval
                  ? new Date().toISOString()
                  : undefined,
              },
            }
          : {}),
      },
      status: requiresApproval ? "pending_approval" : "approved",
      createdBy: mockUser.id,
      approvedBy: !requiresApproval ? mockUser.id : undefined,
    };

    // In a real app, this would save to a database
    console.log("New post created:", newPost);

    // Show notification
    if (requiresApproval) {
      addNotification({
        title: "Post Submitted for Approval",
        message: "Your post has been submitted and is awaiting approval.",
        type: "info",
      });
    } else {
      addNotification({
        title: "Post Published",
        message: "Your post has been published successfully.",
        type: "success",
      });
    }

    // Reset form
    setContent("");
    setGeneratedContent({ linkedin: "", twitter: "" });
    setSelectedCategory("");
    setSelectedTags([]);
    setSelectedMedia([]);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setContent(template.structure);
      addNotification({
        type: "success",
        title: "Template Applied",
        message: `The "${template.name}" template has been applied.`,
        duration: 3000,
      });
    }
  };

  const handleMediaSelect = (media: MediaItem) => {
    setSelectedMedia((prev) => [...prev, media]);
    setShowMediaLibrary(false);
    addNotification({
      type: "success",
      title: "Media Added",
      message: `${media.name} has been added to your post.`,
      duration: 3000,
    });
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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Content Creation */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Create New Post
              </h1>

              {/* Content Input */}
              <div className="mb-6">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[200px]"
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
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
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
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
                <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Approval Required
                    </p>
                    <p className="text-xs text-amber-700">
                      Based on your role, this post will require approval from
                      an admin or owner before it&apos;s published.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setContent("")}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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

            {/* Templates Section */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-teal-500 cursor-pointer text-sm"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <p className="font-medium text-gray-800">{template.name}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      For {template.platform}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right">
                <Link
                  href="/templates"
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Manage Templates →
                </Link>
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
              tags={selectedTags
                .map((tagId) => mockTags.find((t) => t.id === tagId))
                .filter(Boolean)}
              media={selectedMedia}
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
