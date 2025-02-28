"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMedia } from "@/context/MediaContext";
import { cropImage, resizeImage } from "@/lib/media-utils";
import { v4 as uuidv4 } from "uuid";

interface ImageEditorProps {
  mediaId: string;
  onClose: () => void;
}

export default function ImageEditor({ mediaId, onClose }: ImageEditorProps) {
  const { mediaItems, addMedia } = useMedia();
  const mediaItem = mediaItems.find((item) => item.id === mediaId);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [scale, setScale] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"crop" | "resize">("crop");
  const [dimensions, setDimensions] = useState({
    width: mediaItem?.dimensions?.width || 0,
    height: mediaItem?.dimensions?.height || 0,
  });
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);

  if (!mediaItem || mediaItem.type !== "image") {
    return <div>Media not found or not an image</div>;
  }

  const handleCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const handleScaleChange = (value: number[]) => {
    setScale(value[0]);
  };

  const handleAspectRatioChange = (ratio: number | undefined) => {
    setAspectRatio(ratio);

    if (ratio && imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          ratio,
          width,
          height
        ),
        width,
        height
      );
      setCrop(newCrop);
    }
  };

  const handleResizeDimensionChange = (
    dimension: "width" | "height",
    value: number
  ) => {
    if (dimension === "width") {
      const aspectRatio =
        mediaItem.dimensions!.width / mediaItem.dimensions!.height;
      setDimensions({
        width: value,
        height: Math.round(value / aspectRatio),
      });
    } else {
      const aspectRatio =
        mediaItem.dimensions!.width / mediaItem.dimensions!.height;
      setDimensions({
        width: Math.round(value * aspectRatio),
        height: value,
      });
    }
  };

  const handleCropSave = async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      setIsProcessing(true);

      // Convert crop from percentages to pixels
      const pixelCrop = {
        x: (completedCrop.x / 100) * imgRef.current.width,
        y: (completedCrop.y / 100) * imgRef.current.height,
        width: (completedCrop.width / 100) * imgRef.current.width,
        height: (completedCrop.height / 100) * imgRef.current.height,
      };

      const croppedBlob = await cropImage(mediaItem.url, pixelCrop);
      const croppedUrl = URL.createObjectURL(croppedBlob);

      // Create a new media item with the cropped image
      const newMediaItem = {
        ...mediaItem,
        id: uuidv4(),
        name: `${mediaItem.name.split(".")[0]}_cropped.${mediaItem.name
          .split(".")
          .pop()}`,
        url: croppedUrl,
        thumbnailUrl: croppedUrl,
        dimensions: {
          width: pixelCrop.width,
          height: pixelCrop.height,
        },
        createdAt: new Date().toISOString(),
      };

      addMedia(newMediaItem);
      setIsProcessing(false);
      onClose();
    } catch (error) {
      console.error("Error cropping image:", error);
      setIsProcessing(false);
    }
  };

  const handleResizeSave = async () => {
    try {
      setIsProcessing(true);

      const resizedBlob = await resizeImage(
        mediaItem.url,
        dimensions.width,
        dimensions.height
      );

      const resizedUrl = URL.createObjectURL(resizedBlob);

      // Create a new media item with the resized image
      const newMediaItem = {
        ...mediaItem,
        id: uuidv4(),
        name: `${mediaItem.name.split(".")[0]}_resized.${mediaItem.name
          .split(".")
          .pop()}`,
        url: resizedUrl,
        thumbnailUrl: resizedUrl,
        dimensions: {
          width: dimensions.width,
          height: dimensions.height,
        },
        createdAt: new Date().toISOString(),
      };

      addMedia(newMediaItem);
      setIsProcessing(false);
      onClose();
    } catch (error) {
      console.error("Error resizing image:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b pb-4">
        <Button
          variant={activeTab === "crop" ? "default" : "outline"}
          onClick={() => setActiveTab("crop")}
        >
          Crop
        </Button>
        <Button
          variant={activeTab === "resize" ? "default" : "outline"}
          onClick={() => setActiveTab("resize")}
        >
          Resize
        </Button>
      </div>

      {activeTab === "crop" && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={handleCropComplete}
              aspect={aspectRatio}
            >
              {/* 
                Using regular img tag here because ReactCrop requires it.
                Next.js Image component is not compatible with ReactCrop.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={mediaItem.url}
                alt={mediaItem.name}
                style={{ transform: `scale(${scale / 100})` }}
              />
            </ReactCrop>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Zoom</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">50%</span>
                <Slider
                  value={[scale]}
                  min={50}
                  max={200}
                  step={1}
                  onValueChange={handleScaleChange}
                  className="flex-1"
                />
                <span className="text-sm">200%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={aspectRatio === undefined ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAspectRatioChange(undefined)}
                >
                  Free
                </Button>
                <Button
                  variant={aspectRatio === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAspectRatioChange(1)}
                >
                  1:1
                </Button>
                <Button
                  variant={aspectRatio === 4 / 3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAspectRatioChange(4 / 3)}
                >
                  4:3
                </Button>
                <Button
                  variant={aspectRatio === 16 / 9 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAspectRatioChange(16 / 9)}
                >
                  16:9
                </Button>
                <Button
                  variant={aspectRatio === 3 / 4 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAspectRatioChange(3 / 4)}
                >
                  3:4
                </Button>
                <Button
                  variant={aspectRatio === 9 / 16 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAspectRatioChange(9 / 16)}
                >
                  9:16
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCropSave}
              disabled={!completedCrop || isProcessing}
            >
              {isProcessing ? "Processing..." : "Save Cropped Image"}
            </Button>
          </div>
        </div>
      )}

      {activeTab === "resize" && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <Image
              src={mediaItem.url}
              alt={mediaItem.name}
              width={mediaItem.dimensions?.width || 400}
              height={mediaItem.dimensions?.height || 300}
              className="max-w-full max-h-[400px] object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Width (px)</Label>
              <input
                id="width"
                type="number"
                className="w-full p-2 border rounded-md"
                value={dimensions.width}
                onChange={(e) =>
                  handleResizeDimensionChange(
                    "width",
                    parseInt(e.target.value) || 0
                  )
                }
                min={1}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (px)</Label>
              <input
                id="height"
                type="number"
                className="w-full p-2 border rounded-md"
                value={dimensions.height}
                onChange={(e) =>
                  handleResizeDimensionChange(
                    "height",
                    parseInt(e.target.value) || 0
                  )
                }
                min={1}
              />
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Original size: {mediaItem.dimensions?.width} ×{" "}
            {mediaItem.dimensions?.height} px
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleResizeSave}
              disabled={
                isProcessing || dimensions.width <= 0 || dimensions.height <= 0
              }
            >
              {isProcessing ? "Processing..." : "Save Resized Image"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
