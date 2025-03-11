"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PostPreview from "@/components/features/posts/PostPreview";
import { mockPosts } from "@/lib/mock-data";

export default function PreviewPage() {
  const [selectedPost, setSelectedPost] = useState(mockPosts[0]);
  const [customContent, setCustomContent] = useState({
    linkedin: selectedPost.platforms.linkedin?.content || "",
    bluesky: selectedPost.platforms.bluesky?.content || "",
  });

  const handlePostChange = (postId: string) => {
    const post = mockPosts.find((p) => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setCustomContent({
        linkedin: post.platforms.linkedin?.content || "",
        bluesky: post.platforms.bluesky?.content || "",
      });
    }
  };

  const handleContentChange = (
    platform: "linkedin" | "bluesky",
    content: string
  ) => {
    setCustomContent({
      ...customContent,
      [platform]: content,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90 mb-8">
          Post Preview Tool
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card dark:bg-card rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-lg font-medium text-foreground/90 dark:text-foreground/90 mb-4">
              Preview Settings
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground/80 dark:text-foreground/80 mb-2">
                Select Post
              </label>
              <select
                className="w-full p-2 bg-background dark:bg-background border border-border rounded-md text-foreground"
                value={selectedPost.id}
                onChange={(e) => handlePostChange(e.target.value)}
              >
                {mockPosts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.content.substring(0, 50)}
                    {post.content.length > 50 ? "..." : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 dark:text-foreground/80 mb-2">
                  LinkedIn Content
                </label>
                <textarea
                  className="w-full h-32 p-3 bg-background dark:bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  value={customContent.linkedin}
                  onChange={(e) =>
                    handleContentChange("linkedin", e.target.value)
                  }
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 dark:text-foreground/80 mb-2">
                  Bluesky Content
                </label>
                <textarea
                  className="w-full h-32 p-3 bg-background dark:bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  value={customContent.bluesky}
                  onChange={(e) =>
                    handleContentChange("bluesky", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          </div>

          <PostPreview
            content={customContent}
            className="bg-card dark:bg-card rounded-lg shadow-sm p-4 sm:p-6 border border-border"
            textClassName="text-foreground/90 dark:text-foreground/90"
            subtextClassName="text-muted-foreground dark:text-muted-foreground"
          />
        </div>
      </div>
    </MainLayout>
  );
}
