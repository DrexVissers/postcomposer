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
          <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90 mb-8">
            Image Library
          </h1>
          <MediaLibrary />
          <MediaDetail />
        </div>
      </MainLayout>
    </MediaProvider>
  );
}
