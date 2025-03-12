"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { MediaItem, mockMediaItems } from "@/lib/mock-data";
import { createMediaItemFromFile } from "@/lib/media-utils";

// Define pagination settings
const ITEMS_PER_PAGE = 50;

// Define a cache for media items
interface MediaCache {
  [key: string]: MediaItem;
}

interface MediaContextType {
  mediaItems: MediaItem[];
  selectedMedia: MediaItem | null;
  isUploading: boolean;
  uploadProgress: number;
  totalItems: number;
  currentPage: number;
  isLoading: boolean;
  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;
  selectMedia: (id: string | null) => void;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  searchMedia: (query: string) => MediaItem[];
  filterByType: (type: "all" | "image" | "video") => MediaItem[];
  startUpload: () => void;
  finishUpload: (success: boolean) => void;
  uploadMedia: (files: File[]) => Promise<void>;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // All media items (for search and filtering)
  const [allMediaItems, setAllMediaItems] =
    useState<MediaItem[]>(mockMediaItems);
  // Paginated media items (for display)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaCache, setMediaCache] = useState<MediaCache>({});

  // Calculate total pages
  const totalItems = allMediaItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Load media items for the current page
  const loadMediaItems = useCallback(() => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedItems = allMediaItems.slice(startIndex, endIndex);

      setMediaItems(paginatedItems);
      setIsLoading(false);
    }, 300);
  }, [currentPage, allMediaItems]);

  // Load initial page
  useEffect(() => {
    loadMediaItems();
  }, [loadMediaItems]);

  // Pagination controls
  const loadNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const loadPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  // Simulate upload progress
  useEffect(() => {
    if (isUploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 100));
      }, 300);
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

  // Add media with caching
  const addMedia = useCallback(
    (media: MediaItem) => {
      // Add to cache
      setMediaCache((prev) => ({
        ...prev,
        [media.id]: media,
      }));

      // Add to all media items
      setAllMediaItems((prev) => [media, ...prev]);

      // Update current page if needed
      if (currentPage === 1) {
        setMediaItems((prev) => {
          const newItems = [media, ...prev];
          if (newItems.length > ITEMS_PER_PAGE) {
            return newItems.slice(0, ITEMS_PER_PAGE);
          }
          return newItems;
        });
      }
    },
    [currentPage]
  );

  const removeMedia = useCallback(
    (id: string) => {
      // Remove from cache
      setMediaCache((prev) => {
        const newCache = { ...prev };
        delete newCache[id];
        return newCache;
      });

      // Remove from all media items
      setAllMediaItems((prev) => prev.filter((item) => item.id !== id));

      // Remove from current page items
      setMediaItems((prev) => prev.filter((item) => item.id !== id));

      // Clear selected media if it's the one being removed
      if (selectedMedia?.id === id) {
        setSelectedMedia(null);
      }
    },
    [selectedMedia]
  );

  const selectMedia = useCallback(
    (id: string | null) => {
      if (id === null) {
        setSelectedMedia(null);
        return;
      }

      // Check cache first
      if (mediaCache[id]) {
        setSelectedMedia(mediaCache[id]);
        return;
      }

      // Otherwise find in all media items
      const media = allMediaItems.find((item) => item.id === id) || null;
      setSelectedMedia(media);

      // Add to cache if found
      if (media) {
        setMediaCache((prev) => ({
          ...prev,
          [id]: media,
        }));
      }
    },
    [allMediaItems, mediaCache]
  );

  const updateMedia = useCallback(
    (id: string, updates: Partial<MediaItem>) => {
      // Update in cache
      setMediaCache((prev) => {
        if (prev[id]) {
          return {
            ...prev,
            [id]: { ...prev[id], ...updates },
          };
        }
        return prev;
      });

      // Update in all media items
      setAllMediaItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );

      // Update in current page items
      setMediaItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );

      // Update selected media if it's the one being updated
      if (selectedMedia?.id === id) {
        setSelectedMedia((prev) => (prev ? { ...prev, ...updates } : null));
      }
    },
    [selectedMedia]
  );

  // Memoize search and filter functions for better performance
  const searchMedia = useCallback(
    (query: string) => {
      if (!query.trim()) return mediaItems;

      const lowercaseQuery = query.toLowerCase();
      return allMediaItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercaseQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      );
    },
    [allMediaItems, mediaItems]
  );

  const filterByType = useCallback(
    (type: "all" | "image" | "video") => {
      if (type === "all") return mediaItems;
      return mediaItems.filter((item) => item.type === type);
    },
    [mediaItems]
  );

  const startUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);
  }, []);

  const finishUpload = useCallback((success: boolean) => {
    if (success) {
      setUploadProgress(100);
    } else {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const uploadMedia = useCallback(
    async (files: File[]) => {
      if (!files.length) return;

      startUpload();

      try {
        // Process files in batches to avoid UI freezing
        const batchSize = 3;
        const totalFiles = files.length;
        let processedFiles = 0;

        while (processedFiles < totalFiles) {
          const batch = files.slice(processedFiles, processedFiles + batchSize);

          // Process batch concurrently
          const mediaItems = await Promise.all(
            batch.map((file) => createMediaItemFromFile(file))
          );

          // Add each media item
          for (const mediaItem of mediaItems) {
            addMedia(mediaItem);
          }

          processedFiles += batch.length;

          // Update progress based on processed files
          setUploadProgress(Math.min(90, (processedFiles / totalFiles) * 100));

          // Small delay to allow UI updates
          if (processedFiles < totalFiles) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }

        finishUpload(true);
      } catch (error) {
        console.error("Error uploading media:", error);
        finishUpload(false);
      }
    },
    [addMedia, finishUpload, startUpload]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      mediaItems,
      selectedMedia,
      isUploading,
      uploadProgress,
      totalItems,
      currentPage,
      isLoading,
      addMedia,
      removeMedia,
      selectMedia,
      updateMedia,
      searchMedia,
      filterByType,
      startUpload,
      finishUpload,
      uploadMedia,
      loadNextPage,
      loadPreviousPage,
      goToPage,
    }),
    [
      mediaItems,
      selectedMedia,
      isUploading,
      uploadProgress,
      totalItems,
      currentPage,
      isLoading,
      addMedia,
      removeMedia,
      selectMedia,
      updateMedia,
      searchMedia,
      filterByType,
      startUpload,
      finishUpload,
      uploadMedia,
      loadNextPage,
      loadPreviousPage,
      goToPage,
    ]
  );

  return (
    <MediaContext.Provider value={contextValue}>
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
