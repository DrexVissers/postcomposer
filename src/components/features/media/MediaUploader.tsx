"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileImage, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-teal-500 bg-teal-50"
            : "border-gray-300 hover:border-teal-500 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-lg font-medium">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to select files"}
          </p>
          <p className="text-sm text-gray-500">
            Supports images and videos up to 100MB
          </p>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Selected Files ({files.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    {file.type.startsWith("image/") ? (
                      <FileImage className="h-8 w-8 text-blue-500" />
                    ) : (
                      <FileVideo className="h-8 w-8 text-purple-500" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isUploading ? (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-teal-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 text-center">
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
