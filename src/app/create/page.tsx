"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockTemplates, mockCategories, mockTags } from "@/lib/mock-data";
import {
  Mic,
  Image as ImageIcon,
  Send,
  RefreshCw,
  Tag as TagIcon,
} from "lucide-react";
import PostPreview from "@/components/features/posts/PostPreview";
import { useNotification } from "@/context/NotificationContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MediaProvider } from "@/context/MediaContext";
import MediaLibrary from "@/components/features/media/MediaLibrary";
import { MediaItem } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
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

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("linkedin");
  const [generatedContent, setGeneratedContent] = useState({
    linkedin: "",
    twitter: "",
  });
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { addNotification } = useNotification();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleGenerate = () => {
    if (!content.trim()) {
      addNotification({
        type: "warning",
        title: "Empty Content",
        message: "Please enter some content before generating posts.",
        duration: 3000,
      });
      return;
    }

    setIsGenerating(true);
    addNotification({
      type: "info",
      title: "Generating Content",
      message: "Optimizing your content for different platforms...",
      duration: 2000,
    });

    // Simulate API call to generate content
    setTimeout(() => {
      setGeneratedContent({
        linkedin: `${content}\n\n#ProfessionalPost #LinkedIn`,
        twitter: `${content.substring(0, 200)}${
          content.length > 200 ? "..." : ""
        } #Twitter`,
      });
      setIsGenerating(false);
      addNotification({
        type: "success",
        title: "Content Generated",
        message: "Your content has been optimized for different platforms.",
        duration: 3000,
      });
    }, 1500);
  };

  const handlePublish = () => {
    addNotification({
      type: "info",
      title: "Publishing",
      message: `Publishing to ${
        activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
      }...`,
      duration: 2000,
    });

    // Simulate API call to publish content
    setTimeout(() => {
      addNotification({
        type: "success",
        title: "Published",
        message: `Your post has been published to ${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        }.`,
        duration: 3000,
      });
    }, 1500);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find((t) => t.id === templateId);
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Create Post</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Your Idea
            </h2>
            <div className="mb-4">
              <textarea
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Type or paste your content here..."
                value={content}
                onChange={handleContentChange}
              ></textarea>
            </div>

            {/* Category and Tags Section */}
            <div className="mb-6 space-y-4">
              <div>
                <Label
                  htmlFor="category-select"
                  className="text-sm font-medium mb-1 block"
                >
                  Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category-select" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="tags-select"
                  className="text-sm font-medium mb-1 block"
                >
                  Tags
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      id="tags-select"
                    >
                      {selectedTags.length === 0
                        ? "Select tags"
                        : `${selectedTags.length} tag${
                            selectedTags.length > 1 ? "s" : ""
                          } selected`}
                      <TagIcon className="h-4 w-4 ml-2 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-4">
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
                            className="flex items-center cursor-pointer"
                          >
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: tag.color }}
                            ></div>
                            {tag.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedTags.map((tagId) => {
                    const tag = mockTags.find((t) => t.id === tagId);
                    return (
                      tag && (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="mb-1 mr-1"
                          style={{
                            borderColor: tag.color,
                            color: tag.color,
                          }}
                          onClick={() => toggleTag(tag.id)}
                        >
                          {tag.name}
                        </Badge>
                      )
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-teal-600 border border-gray-300 rounded-lg hover:border-teal-600 transition-colors"
                  aria-label="Record voice"
                  onClick={() =>
                    addNotification({
                      type: "info",
                      title: "Voice Recording",
                      message:
                        "Voice recording feature will be available soon.",
                      duration: 3000,
                    })
                  }
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-teal-600 border border-gray-300 rounded-lg hover:border-teal-600 transition-colors"
                  aria-label="Upload image"
                  onClick={() => setShowMediaLibrary(true)}
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>

              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGenerate}
                disabled={isGenerating || !content.trim()}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>

            {/* Display selected media */}
            {selectedMedia.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Selected Media
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.map((media) => (
                    <div
                      key={media.id}
                      className="relative w-16 h-16 rounded-md overflow-hidden"
                    >
                      <Image
                        src={media.thumbnailUrl}
                        alt={media.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Templates Section */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mockTemplates.map((template) => (
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

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !generatedContent[activeTab as keyof typeof generatedContent]
                }
                onClick={handlePublish}
              >
                <Send className="w-4 h-4" />
                <span>
                  Publish to{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </span>
              </button>
            </div>
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
