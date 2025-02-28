"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMedia } from "@/context/MediaContext";

interface MediaUploaderProps {
  onUploadComplete?: () => void;
}

export default function MediaUploader({
  onUploadComplete,
}: MediaUploaderProps) {
  const { uploadMedia, isUploading, uploadProgress } = useMedia();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out unsupported files
    const supportedFiles = acceptedFiles.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (supportedFiles.length !== acceptedFiles.length) {
      setError(
        "Some files were rejected. Only images and videos are supported."
      );
    } else {
      setError(null);
    }

    setFiles((prev) => [...prev, ...supportedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxSize: 100 * 1024 * 1024, // 100MB max
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      await uploadMedia(files);
      setFiles([]);
      onUploadComplete?.();
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-background/80"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground/90 dark:text-foreground/90">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to select files"}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports images and videos up to 100MB
          </p>
        </div>
      </div>

      {error && (
        <div className="text-destructive text-sm p-2 bg-destructive/10 dark:bg-destructive/20 rounded-md">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground/90 dark:text-foreground/90">
            Files to upload:
          </p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-background dark:bg-background rounded-md border border-border"
              >
                <div className="flex items-center space-x-2">
                  {file.type.startsWith("image/") ? (
                    <div className="h-10 w-10 rounded overflow-hidden relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <File className="h-10 w-10 text-muted-foreground p-2" />
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate text-foreground/90 dark:text-foreground/90">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isUploading ? (
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      ) : (
        files.length > 0 && (
          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={files.length === 0}
          >
            Upload {files.length} {files.length === 1 ? "file" : "files"}
          </Button>
        )
      )}
    </div>
  );
}
