"use client";

import MainLayout from "@/components/layout/MainLayout";
import MediaLibrary from "@/components/features/media/MediaLibrary";
import MediaDetail from "@/components/features/media/MediaDetail";
import { MediaProvider } from "@/context/MediaContext";

export default function MediaPage() {
  return (
    <MediaProvider>
      <MainLayout>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Media Management
          </h1>
          <MediaLibrary />
          <MediaDetail />
        </div>
      </MainLayout>
    </MediaProvider>
  );
}
