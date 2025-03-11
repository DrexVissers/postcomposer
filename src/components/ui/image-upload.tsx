import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  className?: string;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  aspectRatio?: number;
  platformPreview?: "bluesky" | "linkedin" | "threads" | "mastodon" | null;
}

export function ImageUpload({
  className,
  value,
  onChange,
  disabled = false,
  maxSize = 5, // Default 5MB
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  aspectRatio,
  platformPreview = null,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB`);
      return;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setError(`File type not supported. Allowed: ${allowedTypes.join(", ")}`);
      return;
    }

    setError(null);
    if (onChange) {
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
  };

  const getPreviewUrl = () => {
    if (!value) return null;
    if (typeof value === "string") return value;
    return URL.createObjectURL(value);
  };

  const getPreviewContainerClass = () => {
    if (platformPreview === "bluesky") {
      return "aspect-video rounded-md";
    } else if (platformPreview === "linkedin") {
      return "aspect-[1.91/1] max-w-[500px]";
    } else if (platformPreview === "threads") {
      return "aspect-square max-w-[500px]";
    } else if (platformPreview === "mastodon") {
      return "aspect-[16/9] max-w-[500px]";
    } else if (aspectRatio) {
      return `aspect-[${aspectRatio}]`;
    }
    return "aspect-video";
  };

  const getPlatformLabel = () => {
    if (platformPreview === "linkedin") return "LinkedIn";
    if (platformPreview === "bluesky") return "Bluesky";
    if (platformPreview === "threads") return "Threads";
    if (platformPreview === "mastodon") return "Mastodon";
    return "";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {platformPreview && (
        <div className="text-sm font-medium">{getPlatformLabel()} Image</div>
      )}

      <div
        onClick={!disabled ? handleClick : undefined}
        className={cn(
          "relative border border-dashed rounded-lg overflow-hidden",
          getPreviewContainerClass(),
          !disabled && "cursor-pointer hover:border-primary/50",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {getPreviewUrl() ? (
          <>
            <div className="relative w-full h-full">
              <Image
                src={getPreviewUrl() as string}
                alt="Preview"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={handleRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
            <div className="text-sm font-medium">Click to upload an image</div>
            <div className="text-xs text-muted-foreground mt-1">
              {allowedTypes.map((type) => type.split("/")[1]).join(", ")} up to{" "}
              {maxSize}MB
            </div>
          </div>
        )}
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={allowedTypes.join(",")}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
