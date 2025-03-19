"use client";

import { MediaItem } from "@/lib/mock-data";
import { formatFileSize } from "@/lib/media-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ExternalLink, Download, Trash2 } from "lucide-react";
import { useState } from "react";

interface ImageDetailProps {
  image: MediaItem | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function ImageDetail({
  image,
  onClose,
  onDelete,
}: ImageDetailProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!image) return null;

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(image.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete image:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditInCanva = () => {
    // TODO: Implement Canva integration
    window.open("https://canva.com", "_blank");
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={!!image} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Image Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Preview */}
          <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
            <Image
              src={image.url}
              alt={image.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Image Information */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Name</h3>
              <p className="text-sm text-muted-foreground">{image.name}</p>
            </div>

            {image.dimensions && (
              <div>
                <h3 className="font-medium mb-1">Dimensions</h3>
                <p className="text-sm text-muted-foreground">
                  {image.dimensions.width} × {image.dimensions.height} pixels
                </p>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-1">Size</h3>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(image.size)}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Type</h3>
              <p className="text-sm text-muted-foreground">{image.type}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Upload Date</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {image.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleEditInCanva}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Edit in Canva
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleDelete}
                disabled={!onDelete || isDeleting}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
