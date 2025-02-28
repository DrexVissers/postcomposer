"use client";

import { useState } from "react";
import { useMedia } from "@/context/MediaContext";
import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatFileSize } from "@/lib/media-utils";
import MediaUploader from "./MediaUploader";
import { MediaItem } from "@/lib/mock-data";

interface MediaLibraryProps {
  onSelectMedia?: (media: MediaItem) => void;
}

export default function MediaLibrary({ onSelectMedia }: MediaLibraryProps) {
  const { selectMedia, searchMedia, filterByType } = useMedia();
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search media..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => handleFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterType === "image" ? "default" : "outline"}
            onClick={() => handleFilter("image")}
            size="sm"
          >
            Images
          </Button>
          <Button
            variant={filterType === "video" ? "default" : "outline"}
            onClick={() => handleFilter("video")}
            size="sm"
          >
            Videos
          </Button>
        </div>
      </div>

      <MediaUploader />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-teal-500 transition-all"
            onClick={() => {
              if (onSelectMedia) {
                onSelectMedia(item);
              } else {
                selectMedia(item.id);
              }
            }}
          >
            <div className="relative">
              <Image
                src={item.thumbnailUrl}
                alt={item.name}
                width={200}
                height={200}
                className="w-full aspect-square object-cover"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-teal-600 border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-500">
                {formatFileSize(item.size)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayedItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No media items found</p>
        </div>
      )}
    </div>
  );
}
