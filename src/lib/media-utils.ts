import { v4 as uuidv4 } from "uuid";
import { MediaItem } from "./mock-data";

/**
 * Formats file size in a human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Formats duration in a human-readable format (MM:SS)
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Creates a thumbnail from an image file
 */
export function createImageThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL(file.type));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Creates a thumbnail from a video file
 */
export function createVideoThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      video.currentTime = 1; // Seek to 1 second
    };
    video.oncanplay = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = (video.videoHeight / video.videoWidth) * 200;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg"));
    };
    video.onerror = () => reject(new Error("Failed to load video"));

    video.src = URL.createObjectURL(file);
  });
}

/**
 * Gets image dimensions
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Gets video dimensions and duration
 */
export function getVideoMetadata(
  file: File
): Promise<{ width: number; height: number; duration: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      });
    };
    video.onerror = () => reject(new Error("Failed to load video"));
    video.src = URL.createObjectURL(file);
  });
}

/**
 * Creates a MediaItem from a File
 */
export async function createMediaItemFromFile(file: File): Promise<MediaItem> {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    throw new Error("Unsupported file type");
  }

  let thumbnailUrl = "";
  let dimensions = { width: 0, height: 0 };
  let duration: number | undefined;

  if (isImage) {
    thumbnailUrl = await createImageThumbnail(file);
    dimensions = await getImageDimensions(file);
  } else if (isVideo) {
    thumbnailUrl = await createVideoThumbnail(file);
    const metadata = await getVideoMetadata(file);
    dimensions = { width: metadata.width, height: metadata.height };
    duration = metadata.duration;
  }

  const url = URL.createObjectURL(file);

  return {
    id: uuidv4(),
    type: isImage ? "image" : "video",
    name: file.name,
    url,
    thumbnailUrl,
    size: file.size,
    dimensions,
    duration,
    createdAt: new Date().toISOString(),
    tags: [],
  };
}

/**
 * Crops an image and returns a new blob
 */
export function cropImage(
  imageUrl: string,
  crop: { x: number; y: number; width: number; height: number }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx?.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      });
    };
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = imageUrl;
  });
}

/**
 * Resizes an image and returns a new blob
 */
export function resizeImage(
  imageUrl: string,
  targetWidth: number,
  targetHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      ctx?.drawImage(image, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      });
    };
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = imageUrl;
  });
}
