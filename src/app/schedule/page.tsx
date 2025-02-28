"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ScheduleCalendar from "@/components/features/posts/ScheduleCalendar";
import ScheduleForm from "@/components/features/posts/ScheduleForm";
import ScheduleTimeline from "@/components/features/posts/ScheduleTimeline";
import { mockScheduledPosts, mockPosts, ScheduledPost } from "@/lib/mock-data";
import { useNotification } from "@/context/NotificationContext";

// Convert string dates to Date objects for the calendar components
const convertScheduledPosts = (posts: ScheduledPost[]) => {
  return posts.map((post: ScheduledPost) => ({
    ...post,
    scheduledDate: new Date(post.scheduledDate),
  }));
};

export default function SchedulePage() {
  const [scheduledPosts, setScheduledPosts] = useState(mockScheduledPosts);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addNotification } = useNotification();

  // Convert string dates to Date objects for the calendar components
  const calendarPosts = convertScheduledPosts(scheduledPosts);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSchedule = (data: {
    date: Date;
    time: string;
    platforms: { linkedin: boolean; twitter: boolean };
    repeat: string;
    postId?: string;
  }) => {
    // Create new scheduled posts based on the form data
    const newScheduledPosts = [];

    // Get a random post for demo purposes, or use the selected post if provided
    const selectedPost = data.postId
      ? mockPosts.find((post) => post.id === data.postId)
      : mockPosts[Math.floor(Math.random() * mockPosts.length)];

    if (!selectedPost) {
      addNotification({
        type: "error",
        title: "Error",
        message: "Could not find the selected post.",
        duration: 3000,
      });
      return;
    }

    if (data.platforms.linkedin) {
      newScheduledPosts.push({
        id: `sched${Date.now()}-linkedin`,
        content:
          selectedPost.platforms.linkedin?.content || selectedPost.content,
        scheduledDate: data.date.toISOString(),
        platform: "linkedin" as const,
        postId: selectedPost.id,
        repeat: data.repeat as "none" | "daily" | "weekly" | "monthly",
        category: selectedPost.category,
        tags: selectedPost.tags,
      });
    }

    if (data.platforms.twitter) {
      newScheduledPosts.push({
        id: `sched${Date.now()}-twitter`,
        content:
          selectedPost.platforms.twitter?.content || selectedPost.content,
        scheduledDate: data.date.toISOString(),
        platform: "twitter" as const,
        postId: selectedPost.id,
        repeat: data.repeat as "none" | "daily" | "weekly" | "monthly",
        category: selectedPost.category,
        tags: selectedPost.tags,
      });
    }

    // Add the new scheduled posts to the existing ones
    setScheduledPosts([...scheduledPosts, ...newScheduledPosts]);

    // Show a success notification
    addNotification({
      type: "success",
      title: "Post Scheduled",
      message: `Post scheduled for ${data.date.toLocaleDateString()} at ${
        data.time
      }`,
      duration: 3000,
    });
  };

  const handleEdit = (postId: string) => {
    // In a real app, this would open an edit form
    addNotification({
      type: "info",
      title: "Edit Scheduled Post",
      message: "Editing scheduled posts will be available soon.",
      duration: 3000,
    });
  };

  const handleDelete = (postId: string) => {
    // Remove the post from the scheduled posts
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== postId));

    // Show a success notification
    addNotification({
      type: "success",
      title: "Post Removed",
      message: "The scheduled post has been removed.",
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Schedule Posts
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScheduleTimeline
              scheduledPosts={calendarPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <div>
            <div className="sticky top-8">
              <ScheduleCalendar
                scheduledPosts={calendarPosts}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              <div className="mt-6">
                <ScheduleForm
                  selectedDate={selectedDate}
                  onSchedule={handleSchedule}
                  posts={mockPosts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
