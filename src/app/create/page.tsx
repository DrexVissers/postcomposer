"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockTemplates } from "@/lib/mock-data";
import { Mic, Image as ImageIcon, Send, RefreshCw } from "lucide-react";
import PostPreview from "@/components/features/posts/PostPreview";
import { useNotification } from "@/context/NotificationContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MediaProvider } from "@/context/MediaContext";
import MediaLibrary from "@/components/features/media/MediaLibrary";
import { MediaItem } from "@/lib/mock-data";

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

    // Simulate AI generation with a timeout
    setTimeout(() => {
      // For LinkedIn, create a more professional, longer format
      const linkedinContent = `I wanted to share some thoughts on ${content.substring(
        0,
        50
      )}${
        content.length > 50 ? "..." : ""
      }\n\n${content}\n\nWhat are your thoughts on this? I'd love to hear your perspective. #ProfessionalDevelopment #Insights`;

      // For Twitter, create a shorter, more casual format
      const twitterContent = `${content.substring(0, 240)}${
        content.length > 240 ? "..." : ""
      } #Thoughts`;

      setGeneratedContent({
        linkedin: linkedinContent,
        twitter: twitterContent,
      });

      setIsGenerating(false);

      addNotification({
        type: "success",
        title: "Content Generated",
        message: "Your content has been optimized for LinkedIn and Twitter.",
        duration: 4000,
      });
    }, 1500);
  };

  const handlePublish = () => {
    if (!generatedContent[activeTab as keyof typeof generatedContent]) {
      addNotification({
        type: "error",
        title: "Cannot Publish",
        message: "Please generate content before publishing.",
        duration: 3000,
      });
      return;
    }

    // Simulate publishing with a notification
    addNotification({
      type: "success",
      title: "Post Published",
      message: `Your post has been published to ${
        activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
      }.`,
      duration: 5000,
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find((t) => t.id === templateId);
    if (template) {
      setContent(template.structure);
      addNotification({
        type: "info",
        title: "Template Applied",
        message: `The "${template.name}" template has been applied.`,
        duration: 3000,
      });
    }
  };

  const handleMediaSelect = (media: MediaItem) => {
    setSelectedMedia([...selectedMedia, media]);
    // Insert media reference at cursor position or at the end of content
    const mediaText = `[Image: ${media.name}] `;
    setContent(content + mediaText);
    setShowMediaLibrary(false);
    addNotification({
      type: "success",
      title: "Media Added",
      message: `${media.name} has been added to your post.`,
      duration: 3000,
    });
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
                disabled={!content.trim() || isGenerating}
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

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
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
