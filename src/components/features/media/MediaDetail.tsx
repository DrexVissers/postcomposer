"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Edit2, Trash2, Tag, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMedia } from "@/context/MediaContext";
import { formatFileSize, formatDuration } from "@/lib/media-utils";
import ImageEditor from "./ImageEditor";

export default function MediaDetail() {
  const { selectedMedia, selectMedia, removeMedia } = useMedia();
  const [showImageEditor, setShowImageEditor] = useState(false);

  if (!selectedMedia) return null;

  const handleClose = () => {
    selectMedia(null);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this media item?")) {
      removeMedia(selectedMedia.id);
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Media Details</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
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
                    onClick={() => setShowImageEditor(true)}
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

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">
                  {selectedMedia.name}
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-500">Type</div>
                  <div className="capitalize">{selectedMedia.type}</div>

                  <div className="text-gray-500">Size</div>
                  <div>{formatFileSize(selectedMedia.size)}</div>

                  <div className="text-gray-500">Dimensions</div>
                  <div>
                    {selectedMedia.dimensions?.width} ×{" "}
                    {selectedMedia.dimensions?.height} px
                  </div>

                  {selectedMedia.type === "video" && selectedMedia.duration && (
                    <>
                      <div className="text-gray-500">Duration</div>
                      <div>{formatDuration(selectedMedia.duration)}</div>
                    </>
                  )}

                  <div className="text-gray-500">Created</div>
                  <div>{formatDate(selectedMedia.createdAt)}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.length > 0 ? (
                    selectedMedia.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
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
