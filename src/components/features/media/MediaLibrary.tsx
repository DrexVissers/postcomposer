"use client";

import { useState, Suspense } from "react";
import { useMedia } from "@/context/MediaContext";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import MediaUploader from "./MediaUploader";
import { MediaItem } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import the VirtualizedMediaGrid with no SSR to avoid hydration issues
const VirtualizedMediaGrid = dynamic(() => import("./VirtualizedMediaGrid"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[240px] w-full rounded-lg bg-muted animate-pulse"
        />
      ))}
    </div>
  ),
});

interface ImageLibraryProps {
  onSelectMedia?: (media: MediaItem) => void;
}

export default function ImageLibrary({ onSelectMedia }: ImageLibraryProps) {
  const {
    mediaItems,
    selectMedia,
    searchMedia,
    filterByType,
    currentPage,
    totalItems,
    loadNextPage,
    loadPreviousPage,
    loadingStates,
  } = useMedia();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image">("all");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    try {
      searchMedia(e.target.value);
      setError(null);
    } catch (err) {
      setError("Failed to search media items");
      console.error(err);
    }
  };

  const handleFilter = (type: "all" | "image") => {
    setFilterType(type);
    try {
      filterByType(type);
      setError(null);
    } catch (err) {
      setError("Failed to filter media items");
      console.error(err);
    }
  };

  const handleSelectMedia = (item: MediaItem) => {
    selectMedia(item.id);
    onSelectMedia?.(item);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Tabs
            value={filterType}
            onValueChange={(v) => handleFilter(v as "all" | "image")}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
            </TabsList>
          </Tabs>
          <MediaUploader onUploadComplete={() => setSearchQuery("")} />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[240px] w-full rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        }
      >
        <VirtualizedMediaGrid
          items={mediaItems}
          onSelectMedia={handleSelectMedia}
        />
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => loadPreviousPage()}
          disabled={currentPage === 1 || loadingStates.isLoadingPage}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {Math.ceil(totalItems / 50)}
        </span>
        <Button
          variant="outline"
          onClick={() => loadNextPage()}
          disabled={
            currentPage >= Math.ceil(totalItems / 50) ||
            loadingStates.isLoadingPage
          }
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
