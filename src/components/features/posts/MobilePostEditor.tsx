"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Linkedin,
  Twitter,
  Image as ImageIcon,
  Tag,
  Calendar,
  Send,
} from "lucide-react";
import { Category, Tag as TagType } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface MobilePostEditorProps {
  onContentChange?: (platform: string, content: string) => void;
  onSubmit?: () => void;
  categories?: Category[];
  tags?: TagType[];
  selectedCategory?: string;
  selectedTags?: string[];
  onCategorySelect?: (categoryId: string) => void;
  onTagToggle?: (tagId: string) => void;
}

export default function MobilePostEditor({
  onContentChange,
  onSubmit,
  categories = [],
  tags = [],
  selectedCategory,
  selectedTags = [],
  onCategorySelect,
  onTagToggle,
}: MobilePostEditorProps) {
  const [activeTab, setActiveTab] = useState("linkedin");
  const [linkedinContent, setLinkedinContent] = useState("");
  const [twitterContent, setTwitterContent] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleLinkedinChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinkedinContent(e.target.value);
    if (onContentChange) {
      onContentChange("linkedin", e.target.value);
    }
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTwitterContent(e.target.value);
    if (onContentChange) {
      onContentChange("twitter", e.target.value);
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

  return (
    <div className="flex flex-col h-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 py-3 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="linkedin"
              className="flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger
              value="twitter"
              className="flex items-center space-x-2"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="linkedin"
          key="mobile-linkedin"
          className="flex-1 flex flex-col p-0 m-0"
        >
          <textarea
            className="flex-1 p-4 w-full resize-none border-0 focus:ring-0 focus:outline-none"
            placeholder="What do you want to share on LinkedIn?"
            value={linkedinContent}
            onChange={handleLinkedinChange}
          ></textarea>
        </TabsContent>

        <TabsContent
          value="twitter"
          key="mobile-twitter"
          className="flex-1 flex flex-col p-0 m-0"
        >
          <textarea
            className="flex-1 p-4 w-full resize-none border-0 focus:ring-0 focus:outline-none"
            placeholder="What's happening?"
            value={twitterContent}
            onChange={handleTwitterChange}
            maxLength={280}
          ></textarea>
          <div className="px-4 py-2 text-right text-xs text-gray-500">
            {twitterContent.length}/280
          </div>
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
          disabled={!linkedinContent && !twitterContent}
        >
          <Send className="w-4 h-4 mr-1" />
          <span>Post</span>
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
