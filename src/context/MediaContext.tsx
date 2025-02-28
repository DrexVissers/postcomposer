"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MediaItem, mockMediaItems } from "@/lib/mock-data";

interface MediaContextType {
  mediaItems: MediaItem[];
  selectedMedia: MediaItem | null;
  isUploading: boolean;
  uploadProgress: number;
  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;
  selectMedia: (id: string | null) => void;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  searchMedia: (query: string) => MediaItem[];
  filterByType: (type: "all" | "image" | "video") => MediaItem[];
  startUpload: () => void;
  finishUpload: (success: boolean) => void;
  uploadMedia: (files: File[]) => Promise<void>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulate upload progress
  useEffect(() => {
    if (isUploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 100));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isUploading, uploadProgress]);

  // Reset upload progress when upload finishes
  useEffect(() => {
    if (uploadProgress === 100) {
      const timer = setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [uploadProgress]);

  const addMedia = (media: MediaItem) => {
    setMediaItems((prev) => [media, ...prev]);
  };

  const removeMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedMedia?.id === id) {
      setSelectedMedia(null);
    }
  };

  const selectMedia = (id: string | null) => {
    if (id === null) {
      setSelectedMedia(null);
      return;
    }
    const media = mediaItems.find((item) => item.id === id) || null;
    setSelectedMedia(media);
  };

  const updateMedia = (id: string, updates: Partial<MediaItem>) => {
    setMediaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    // Update selected media if it's the one being updated
    if (selectedMedia?.id === id) {
      setSelectedMedia((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const searchMedia = (query: string) => {
    if (!query.trim()) return mediaItems;

    const lowercaseQuery = query.toLowerCase();
    return mediaItems.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const filterByType = (type: "all" | "image" | "video") => {
    if (type === "all") return mediaItems;
    return mediaItems.filter((item) => item.type === type);
  };

  const startUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  const finishUpload = (success: boolean) => {
    if (success) {
      setUploadProgress(100);
    } else {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadMedia = async (files: File[]) => {
    if (!files.length) return;

    startUpload();

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Process each file and create media items
      for (const file of files) {
        // Create a new media item from the file
        const newItem: MediaItem = {
          id: `media-${Date.now()}-${mediaItems.length + 1}`,
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : "video",
          url: URL.createObjectURL(file),
          thumbnailUrl: URL.createObjectURL(file),
          size: file.size,
          dimensions: { width: 0, height: 0 },
          createdAt: new Date().toISOString(),
          tags: [],
        };

        addMedia(newItem);
      }

      finishUpload(true);
    } catch (error) {
      console.error("Error uploading media:", error);
      finishUpload(false);
    }
  };

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        selectedMedia,
        isUploading,
        uploadProgress,
        addMedia,
        removeMedia,
        selectMedia,
        updateMedia,
        searchMedia,
        filterByType,
        startUpload,
        finishUpload,
        uploadMedia,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
