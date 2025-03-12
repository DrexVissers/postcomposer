"use client";

import { useEffect, useState } from "react";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { MediaItem } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Film } from "lucide-react";
import { formatFileSize } from "@/lib/media-utils";

interface VirtualizedMediaGridProps {
  items: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
  columnWidth?: number;
  rowHeight?: number;
}

export default function VirtualizedMediaGrid({
  items,
  onSelectMedia,
  columnWidth = 200,
  rowHeight = 240,
}: VirtualizedMediaGridProps) {
  const [mounted, setMounted] = useState(false);

  // Only render on client side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[400px]"></div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No media items found</p>
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full">
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.max(1, Math.floor(width / columnWidth));
          const rowCount = Math.ceil(items.length / columnCount);

          return (
            <FixedSizeGrid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              itemData={{
                items,
                columnCount,
                onSelectMedia,
              }}
            >
              {Cell}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>
    </div>
  );
}

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    items: MediaItem[];
    columnCount: number;
    onSelectMedia: (item: MediaItem) => void;
  };
}

function Cell({ columnIndex, rowIndex, style, data }: CellProps) {
  const { items, columnCount, onSelectMedia } = data;
  const index = rowIndex * columnCount + columnIndex;

  if (index >= items.length) {
    return <div style={style}></div>;
  }

  const item = items[index];

  return (
    <div style={style} className="p-2">
      <Card
        className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all bg-card dark:bg-card h-full"
        onClick={() => onSelectMedia(item)}
      >
        <div className="relative h-[150px]">
          <Image
            src={item.thumbnailUrl}
            alt={item.name}
            fill
            sizes="200px"
            className="object-cover"
            loading="lazy"
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                <Film className="h-6 w-6 text-primary" />
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <p className="font-medium text-sm truncate text-foreground/90 dark:text-foreground/90">
            {item.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(item.size)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
