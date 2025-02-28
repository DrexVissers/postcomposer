"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTemplates } from "@/lib/mock-data";
import { Mic, Image as ImageIcon, Send, RefreshCw } from "lucide-react";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("linkedin");
  const [generatedContent, setGeneratedContent] = useState({
    linkedin: "",
    twitter: "",
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleGenerate = () => {
    if (!content.trim()) return;

    setIsGenerating(true);

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
    }, 1500);
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
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-teal-600 border border-gray-300 rounded-lg hover:border-teal-600 transition-colors"
                  aria-label="Upload image"
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

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Preview</h2>

            <Tabs
              defaultValue="linkedin"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
              </TabsList>

              <TabsContent value="linkedin" className="mt-0">
                <div className="border border-gray-200 rounded-lg p-4 min-h-[200px]">
                  {generatedContent.linkedin ? (
                    <div className="whitespace-pre-line">
                      {generatedContent.linkedin}
                    </div>
                  ) : (
                    <div className="text-gray-400 italic">
                      LinkedIn preview will appear here after generation.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="twitter" className="mt-0">
                <div className="border border-gray-200 rounded-lg p-4 min-h-[200px]">
                  {generatedContent.twitter ? (
                    <div>{generatedContent.twitter}</div>
                  ) : (
                    <div className="text-gray-400 italic">
                      Twitter preview will appear here after generation.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !generatedContent[activeTab as keyof typeof generatedContent]
                }
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
      </div>
    </MainLayout>
  );
}
