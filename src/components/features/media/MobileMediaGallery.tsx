"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { MediaItem } from "@/lib/mock-data";

interface MobileMediaGalleryProps {
  media: MediaItem[];
  onClose: () => void;
  onSelect?: (selectedMedia: MediaItem[]) => void;
  multiSelect?: boolean;
  initialSelected?: MediaItem[];
}

export default function MobileMediaGallery({
  media,
  onClose,
  onSelect,
  multiSelect = false,
  initialSelected = [],
}: MobileMediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] =
    useState<MediaItem[]>(initialSelected);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "detail">("grid");

  const toggleMediaSelection = (item: MediaItem) => {
    if (!multiSelect) {
      setSelectedMedia([item]);
      if (onSelect) {
        onSelect([item]);
      }
      return;
    }

    const isSelected = selectedMedia.some(
      (selected) => selected.id === item.id
    );

    if (isSelected) {
      const newSelection = selectedMedia.filter(
        (selected) => selected.id !== item.id
      );
      setSelectedMedia(newSelection);
      if (onSelect) {
        onSelect(newSelection);
      }
    } else {
      const newSelection = [...selectedMedia, item];
      setSelectedMedia(newSelection);
      if (onSelect) {
        onSelect(newSelection);
      }
    }
  };

  const isSelected = (item: MediaItem) => {
    return selectedMedia.some((selected) => selected.id === item.id);
  };

  const viewDetail = (index: number) => {
    setCurrentIndex(index);
    setViewMode("detail");
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center text-white">
        {viewMode === "detail" ? (
          <button
            onClick={() => setViewMode("grid")}
            className="p-2"
            aria-label="Back to grid"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <h2 className="text-lg font-medium">Media Gallery</h2>
        )}
        <button onClick={onClose} className="p-2" aria-label="Close gallery">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-3 gap-2">
            {media.map((item, index) => (
              <div
                key={item.id}
                className="relative aspect-square"
                onClick={() => viewDetail(index)}
              >
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
                {multiSelect && (
                  <button
                    className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected(item)
                        ? "bg-teal-500 text-white"
                        : "bg-black bg-opacity-50 text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMediaSelection(item);
                    }}
                    aria-label={
                      isSelected(item) ? "Deselect image" : "Select image"
                    }
                  >
                    {isSelected(item) && <Check className="w-4 h-4" />}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail View */}
      {viewMode === "detail" && media.length > 0 && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <Image
              src={media[currentIndex].url}
              alt={media[currentIndex].name}
              fill
              className="object-contain"
            />

            {/* Navigation buttons */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Selection button */}
            {multiSelect && (
              <button
                className={`absolute bottom-4 right-4 px-4 py-2 rounded-full flex items-center ${
                  isSelected(media[currentIndex])
                    ? "bg-teal-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => toggleMediaSelection(media[currentIndex])}
              >
                {isSelected(media[currentIndex]) ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    <span>Selected</span>
                  </>
                ) : (
                  <span>Select</span>
                )}
              </button>
            )}
          </div>

          {/* Image info */}
          <div className="p-4 bg-black bg-opacity-75 text-white">
            <p className="font-medium">{media[currentIndex].name}</p>
            <p className="text-sm text-gray-300">{media[currentIndex].size}</p>
          </div>
        </div>
      )}

      {/* Footer with action buttons */}
      {viewMode === "grid" && multiSelect && (
        <div className="p-4 bg-black bg-opacity-75 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-white">{selectedMedia.length} selected</p>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                if (onSelect) {
                  onSelect(selectedMedia);
                }
                onClose();
              }}
              disabled={selectedMedia.length === 0}
            >
              Use Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
