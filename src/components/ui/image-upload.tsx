import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Image as ImageIcon, X, Upload } from "lucide-react";
import NextImage from "next/image";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value?: File | string | null;
  className?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
  aspectRatio?: number;
  platformPreview?: "twitter" | "linkedin" | "threads" | "mastodon" | null;
}

export function ImageUpload({
  onChange,
  value,
  className,
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
  aspectRatio,
  platformPreview,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(
        `File type not supported. Please upload ${allowedTypes.join(", ")}`
      );
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getPreviewContainerClass = () => {
    if (platformPreview === "twitter") {
      return "aspect-[16/9] max-w-[500px]";
    } else if (platformPreview === "linkedin") {
      return "aspect-[1.91/1] max-w-[500px]";
    } else if (platformPreview === "threads") {
      return "aspect-[1/1] max-w-[500px]";
    } else if (platformPreview === "mastodon") {
      return "aspect-[16/9] max-w-[500px]";
    } else if (aspectRatio) {
      return `aspect-[${aspectRatio}]`;
    }
    return "max-h-[300px]";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {!preview ? (
        <div
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg bg-muted/30 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload
            className="w-8 h-8 text-muted-foreground mb-2"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground mb-1">
            Click to upload an image
          </p>
          <p className="text-xs text-muted-foreground">
            {allowedTypes.map((type) => type.replace("image/", "")).join(", ")}{" "}
            up to {maxSizeMB}MB
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={allowedTypes.join(",")}
            className="hidden"
            aria-label="Upload image"
          />
        </div>
      ) : (
        <div className="relative">
          <div
            className={cn(
              "relative overflow-hidden rounded-lg border border-border",
              getPreviewContainerClass()
            )}
          >
            <NextImage
              src={preview || ""}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {platformPreview && (
            <div className="mt-2 text-xs text-muted-foreground">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              {platformPreview === "twitter"
                ? "Twitter"
                : platformPreview === "linkedin"
                ? "LinkedIn"
                : platformPreview === "threads"
                ? "Threads"
                : "Mastodon"}{" "}
              optimized preview
            </div>
          )}
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
