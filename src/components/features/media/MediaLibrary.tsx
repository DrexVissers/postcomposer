"use client";

import { useState } from "react";
import { useMedia } from "@/context/MediaContext";
import {
  Search,
  Image as ImageIcon,
  Film,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import MediaUploader from "./MediaUploader";
import { MediaItem } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import the VirtualizedMediaGrid with no SSR to avoid hydration issues
const VirtualizedMediaGrid = dynamic(() => import("./VirtualizedMediaGrid"), {
  ssr: false,
});

interface MediaLibraryProps {
  onSelectMedia?: (media: MediaItem) => void;
}

export default function MediaLibrary({ onSelectMedia }: MediaLibraryProps) {
  const {
    selectMedia,
    searchMedia,
    filterByType,
    currentPage,
    totalItems,
    loadNextPage,
    loadPreviousPage,
    goToPage,
    loadingStates,
  } = useMedia();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">(
    "all"
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (type: "all" | "image" | "video") => {
    setFilterType(type);
  };

  const filteredItems = filterByType(filterType);
  const searchResults = searchMedia(searchQuery);

  // Combine both filters
  const displayedItems = searchQuery
    ? searchResults.filter(
        (item) => filterType === "all" || item.type === filterType
      )
    : filteredItems;

  const handleSelectMedia = (item: MediaItem) => {
    if (onSelectMedia) {
      onSelectMedia(item);
    } else {
      selectMedia(item.id);
    }
  };

  // Calculate pagination info
  const itemsPerPage = 50; // Should match ITEMS_PER_PAGE in MediaContext
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4" role="region" aria-label="Media Library">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="Search media..."
            className="pl-10 bg-background dark:bg-background text-foreground"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search media"
          />
        </div>
        <Tabs
          value={filterType}
          onValueChange={handleFilter as (value: string) => void}
          className="w-auto"
          aria-label="Filter media by type"
        >
          <TabsList className="grid grid-cols-3 w-auto min-w-[240px]">
            <TabsTrigger
              value="all"
              className="flex items-center gap-2"
              role="tab"
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="flex items-center gap-2"
              role="tab"
            >
              <ImageIcon className="w-4 h-4" aria-hidden="true" />
              <span>Images</span>
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="flex items-center gap-2"
              role="tab"
            >
              <Film className="w-4 h-4" aria-hidden="true" />
              <span>Videos</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <MediaUploader />

      {loadingStates.isLoadingPage ||
      loadingStates.isLoadingSearch ||
      loadingStates.isLoadingFilter ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <VirtualizedMediaGrid
          items={displayedItems}
          onSelectMedia={handleSelectMedia}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-muted-foreground">
          Showing page {currentPage} of {totalPages} ({totalItems} items)
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadPreviousPage}
            disabled={currentPage <= 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Page number buttons - show up to 5 pages */}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Calculate which page numbers to show
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className="w-9 h-9 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadNextPage}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
