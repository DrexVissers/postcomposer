"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { MediaItem, mockMediaItems } from "@/lib/mock-data";
import { createMediaItemFromFile } from "@/lib/media-utils";

// Define pagination settings
const ITEMS_PER_PAGE = 50;

// Define a cache for media items
interface MediaCache {
  [key: string]: MediaItem;
}

// Define Canva types
interface CanvaGraphic {
  id: string;
  title: string;
  previewUrl: string;
  width: number;
  height: number;
}

interface CanvaState {
  isConnected: boolean;
  isSearching: boolean;
  searchResults: CanvaGraphic[];
}

interface MediaContextType {
  mediaItems: MediaItem[];
  selectedMedia: MediaItem | null;
  isUploading: boolean;
  uploadProgress: number;
  totalItems: number;
  currentPage: number;
  loadingStates: {
    isLoadingPage: boolean;
    isLoadingSearch: boolean;
    isLoadingFilter: boolean;
  };
  canvaState: CanvaState;
  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;
  selectMedia: (id: string | null) => void;
  updateMedia: (id: string, updates: Partial<MediaItem>) => void;
  searchMedia: (query: string) => MediaItem[];
  filterByType: (type: "all" | "image") => MediaItem[];
  startUpload: () => void;
  finishUpload: (success: boolean) => void;
  uploadMedia: (files: File[]) => Promise<void>;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
  connectToCanva: () => Promise<void>;
  searchCanva: (query: string) => Promise<void>;
  importFromCanva: (id: string) => Promise<void>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Filter out video items from mock data
  const initialMediaItems = mockMediaItems.filter(
    (item) => item.type === "image"
  );

  // All media items (for search and filtering)
  const [allMediaItems, setAllMediaItems] =
    useState<MediaItem[]>(initialMediaItems);
  // Paginated media items (for display)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaCache, setMediaCache] = useState<MediaCache>({});
  const [loadingStates, setLoadingStates] = useState({
    isLoadingPage: false,
    isLoadingSearch: false,
    isLoadingFilter: false,
  });
  const [canvaState, setCanvaState] = useState<CanvaState>({
    isConnected: false,
    isSearching: false,
    searchResults: [],
  });

  // Calculate total pages
  const totalItems = allMediaItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Load media items for the current page
  const loadMediaItems = useCallback(() => {
    setLoadingStates((prev) => ({ ...prev, isLoadingPage: true }));

    // Simulate API delay
    setTimeout(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedItems = allMediaItems.slice(startIndex, endIndex);

      setMediaItems(paginatedItems);
      setLoadingStates((prev) => ({ ...prev, isLoadingPage: false }));
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
      if (media.type !== "image") return;

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

      setLoadingStates((prev) => ({ ...prev, isLoadingSearch: true }));

      // Simulate API delay
      const results = allMediaItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );

      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, isLoadingSearch: false }));
      }, 300);

      return results;
    },
    [allMediaItems, mediaItems]
  );

  const filterByType = useCallback(
    (type: "all" | "image") => {
      setLoadingStates((prev) => ({ ...prev, isLoadingFilter: true }));

      const results =
        type === "all"
          ? allMediaItems
          : allMediaItems.filter((item) => item.type === type);

      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, isLoadingFilter: false }));
      }, 300);

      return results;
    },
    [allMediaItems]
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
      startUpload();

      try {
        // Filter out non-image files
        const imageFiles = files.filter((file) =>
          file.type.startsWith("image/")
        );

        // Process each file
        const mediaItems = await Promise.all(
          imageFiles.map((file) => createMediaItemFromFile(file))
        );

        // Add each media item
        mediaItems.forEach((item) => {
          if (item) addMedia(item);
        });

        finishUpload(true);
      } catch (error) {
        console.error("Upload failed:", error);
        finishUpload(false);
        throw error;
      }
    },
    [addMedia, startUpload, finishUpload]
  );

  // Canva integration functions
  const connectToCanva = useCallback(async () => {
    try {
      // TODO: Implement Canva OAuth flow
      setCanvaState((prev) => ({ ...prev, isConnected: true }));
    } catch (error) {
      console.error("Failed to connect to Canva:", error);
      throw error;
    }
  }, []);

  const searchCanva = useCallback(async (query: string) => {
    try {
      setCanvaState((prev) => ({ ...prev, isSearching: true }));
      // TODO: Implement Canva search with query parameter
      console.log(`Searching Canva for: ${query}`);
      const results: CanvaGraphic[] = []; // Replace with actual Canva API call using query
      setCanvaState((prev) => ({
        ...prev,
        isSearching: false,
        searchResults: results,
      }));
    } catch (error) {
      console.error("Failed to search Canva:", error);
      setCanvaState((prev) => ({ ...prev, isSearching: false }));
      throw error;
    }
  }, []);

  const importFromCanva = useCallback(
    async (canvaId: string) => {
      try {
        // TODO: Implement Canva import
        const mediaItem: MediaItem = {
          id: `canva-${canvaId}`,
          type: "image",
          name: "Imported from Canva",
          url: "",
          thumbnailUrl: "",
          size: 0,
          createdAt: new Date().toISOString(),
          tags: ["canva"],
        };
        addMedia(mediaItem);
      } catch (error) {
        console.error("Failed to import from Canva:", error);
        throw error;
      }
    },
    [addMedia]
  );

  const value = {
    mediaItems,
    selectedMedia,
    isUploading,
    uploadProgress,
    totalItems,
    currentPage,
    loadingStates,
    canvaState,
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
    connectToCanva,
    searchCanva,
    importFromCanva,
  };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
