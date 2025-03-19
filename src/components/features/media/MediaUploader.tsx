"use client";

import { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMedia } from "@/context/MediaContext";
import { formatFileSize } from "@/lib/media-utils";

interface ImageUploaderProps {
  onUploadComplete?: () => void;
}

export default function ImageUploader({
  onUploadComplete,
}: ImageUploaderProps) {
  const { uploadMedia, isUploading, uploadProgress } = useMedia();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Calculate total size of files to upload
  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  // Max file size: 100MB
  const MAX_FILE_SIZE = 100 * 1024 * 1024;
  // Max total upload size: 500MB
  const MAX_TOTAL_SIZE = 500 * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Reset errors and warnings
      setError(null);
      setWarnings([]);

      // Filter out unsupported files
      const supportedFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );

      // Check for unsupported files
      if (supportedFiles.length !== acceptedFiles.length) {
        setWarnings((prev) => [
          ...prev,
          "Some files were rejected. Only images are supported.",
        ]);
      }

      // Check for large files
      const largeFiles = supportedFiles.filter(
        (file) => file.size > MAX_FILE_SIZE
      );
      if (largeFiles.length > 0) {
        setWarnings((prev) => [
          ...prev,
          `${largeFiles.length} file(s) exceed the 100MB limit and were rejected.`,
        ]);
      }

      // Filter out large files
      const validFiles = supportedFiles.filter(
        (file) => file.size <= MAX_FILE_SIZE
      );

      // Check total size
      const newTotalSize = [...files, ...validFiles].reduce(
        (sum, file) => sum + file.size,
        0
      );
      if (newTotalSize > MAX_TOTAL_SIZE) {
        setError(
          "Total upload size exceeds 500MB limit. Please remove some files."
        );
        return;
      }

      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: MAX_FILE_SIZE,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    // Clear error if total size is now under limit
    if (error && error.includes("500MB limit")) {
      const newTotalSize = files
        .filter((_, i) => i !== index)
        .reduce((sum, file) => sum + file.size, 0);

      if (newTotalSize <= MAX_TOTAL_SIZE) {
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      await uploadMedia(files);
      setFiles([]);
      setWarnings([]);
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
            : "bg-input hover:bg-muted/80 dark:hover:bg-background/80 border-border hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground/90 dark:text-foreground/90">
            {isDragActive
              ? "Drop the images here..."
              : "Drag & drop images here, or click to select files"}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports images up to 100MB each (max 500MB total)
          </p>
        </div>
      </div>

      {error && (
        <div className="text-destructive text-sm p-3 bg-destructive/10 dark:bg-destructive/20 rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="text-amber-600 dark:text-amber-500 text-sm p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-md flex flex-col gap-1">
          {warnings.map((warning, index) => (
            <div key={index} className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-foreground/90 dark:text-foreground/90">
              Images to upload: {files.length} ({formatFileSize(totalSize)})
            </p>
            {files.length > 0 && !isUploading && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiles([])}
                className="text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-background dark:bg-background rounded-md border border-border"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded overflow-hidden relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate text-foreground/90 dark:text-foreground/90">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove file"
                  disabled={isUploading}
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
          <div className="w-full bg-background rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {uploadProgress.toFixed(0)}%
          </p>
        </div>
      ) : (
        files.length > 0 && (
          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={files.length === 0 || !!error}
          >
            Upload {files.length} {files.length === 1 ? "image" : "images"}
          </Button>
        )
      )}
    </div>
  );
}
