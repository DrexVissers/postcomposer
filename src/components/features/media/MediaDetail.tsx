"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { X, Edit2, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMedia } from "@/context/MediaContext";
import { formatFileSize } from "@/lib/media-utils";
import ImageEditor from "./ImageEditor";

export default function MediaDetail() {
  const { selectedMedia, selectMedia, removeMedia } = useMedia();
  const [showImageEditor, setShowImageEditor] = useState(false);

  if (!selectedMedia) return null;

  const handleClose = () => {
    selectMedia(null);
  };

  const handleEdit = () => {
    setShowImageEditor(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      removeMedia(selectedMedia.id);
      selectMedia(null);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedMedia.url;
    link.download = selectedMedia.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card dark:bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground/90 dark:text-foreground/90">
            Media Details
          </h3>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-background dark:bg-background rounded-lg overflow-hidden">
                {selectedMedia.type === "image" ? (
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={selectedMedia.url}
                      alt={selectedMedia.name}
                      fill
                      className="object-contain"
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={16 / 9}>
                    <video
                      src={selectedMedia.url}
                      controls
                      className="w-full h-full"
                    />
                  </AspectRatio>
                )}
              </div>

              <div className="flex space-x-2">
                {selectedMedia.type === "image" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handleEdit}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground/90 dark:text-foreground/90 mb-1">
                  File Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Name:</div>
                  <div className="text-foreground/80 dark:text-foreground/80">
                    {selectedMedia.name}
                  </div>
                  <div className="text-muted-foreground">Type:</div>
                  <div className="text-foreground/80 dark:text-foreground/80">
                    {selectedMedia.type.charAt(0).toUpperCase() +
                      selectedMedia.type.slice(1)}
                  </div>
                  <div className="text-muted-foreground">Size:</div>
                  <div className="text-foreground/80 dark:text-foreground/80">
                    {formatFileSize(selectedMedia.size)}
                  </div>
                  <div className="text-muted-foreground">Dimensions:</div>
                  <div className="text-foreground/80 dark:text-foreground/80">
                    {selectedMedia.dimensions?.width || "N/A"} x{" "}
                    {selectedMedia.dimensions?.height || "N/A"}
                  </div>
                  <div className="text-muted-foreground">Uploaded:</div>
                  <div className="text-foreground/80 dark:text-foreground/80">
                    {formatDate(selectedMedia.createdAt)}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground/90 dark:text-foreground/90 mb-1">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.length > 0 ? (
                    selectedMedia.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No tags</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-border">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>

      {selectedMedia.type === "image" && (
        <Dialog open={showImageEditor} onOpenChange={setShowImageEditor}>
          <DialogContent className="sm:max-w-4xl">
            <ImageEditor
              mediaId={selectedMedia.id}
              onClose={() => setShowImageEditor(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
