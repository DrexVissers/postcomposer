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
    platforms: {
      linkedin: boolean;
      twitter: boolean;
      threads: boolean;
      mastodon: boolean;
    };
    repeat: string;
    postId?: string;
  }) => {
    // Create new scheduled posts based on the form data
    const newScheduledPosts = [];

    // Get the first post instead of a random one for demo purposes, or use the selected post if provided
    const selectedPost = data.postId
      ? mockPosts.find((post) => post.id === data.postId)
      : mockPosts[0];

    if (!selectedPost) {
      addNotification({
        type: "error",
        title: "Error",
        message: "Could not find the selected post.",
        duration: 3000,
      });
      return;
    }

    // Create a new scheduled post for each selected platform
    if (data.platforms.linkedin) {
      newScheduledPosts.push({
        id: `sched-${Date.now()}-linkedin`,
        content:
          selectedPost.platforms.linkedin?.content || selectedPost.content,
        scheduledDate: new Date(
          `${data.date.toISOString().split("T")[0]}T${data.time}`
        ).toISOString(),
        platform: "linkedin" as const,
        category: selectedPost.category,
        tags: selectedPost.tags,
      });
    }

    if (data.platforms.twitter) {
      newScheduledPosts.push({
        id: `sched-${Date.now()}-twitter`,
        content:
          selectedPost.platforms.twitter?.content || selectedPost.content,
        scheduledDate: new Date(
          `${data.date.toISOString().split("T")[0]}T${data.time}`
        ).toISOString(),
        platform: "twitter" as const,
        category: selectedPost.category,
        tags: selectedPost.tags,
      });
    }

    if (data.platforms.threads) {
      newScheduledPosts.push({
        id: `sched-${Date.now()}-threads`,
        content:
          selectedPost.platforms.threads?.content || selectedPost.content,
        scheduledDate: new Date(
          `${data.date.toISOString().split("T")[0]}T${data.time}`
        ).toISOString(),
        platform: "threads" as const,
        category: selectedPost.category,
        tags: selectedPost.tags,
      });
    }

    if (data.platforms.mastodon) {
      newScheduledPosts.push({
        id: `sched-${Date.now()}-mastodon`,
        content:
          selectedPost.platforms.mastodon?.content || selectedPost.content,
        scheduledDate: new Date(
          `${data.date.toISOString().split("T")[0]}T${data.time}`
        ).toISOString(),
        platform: "mastodon" as const,
        category: selectedPost.category,
        tags: selectedPost.tags,
      });
    }

    // Add the new scheduled posts to the state
    setScheduledPosts([...scheduledPosts, ...newScheduledPosts]);

    // Show a success notification
    addNotification({
      type: "success",
      title: "Post Scheduled",
      message: `Your post has been scheduled for ${data.date.toLocaleDateString()} at ${
        data.time
      }.`,
      duration: 3000,
    });
  };

  const handleEdit = (id: string) => {
    // Find the post to edit
    const postToEdit = scheduledPosts.find((post) => post.id === id);
    if (!postToEdit) return;

    // Set the form data for editing
    setSelectedDate(new Date(postToEdit.scheduledDate));
    // Additional edit logic would go here
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
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90 mb-8">
          Schedule Posts
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ScheduleTimeline
              scheduledPosts={calendarPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              className="bg-card dark:bg-card border border-border"
              textClassName="text-foreground/90 dark:text-foreground/90"
              subtextClassName="text-muted-foreground"
            />
          </div>
          <div>
            <div className="sticky top-8">
              <ScheduleCalendar
                scheduledPosts={calendarPosts}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                className="bg-card dark:bg-card border border-border mb-6"
                textClassName="text-foreground/90 dark:text-foreground/90"
                subtextClassName="text-muted-foreground"
                selectedClassName="bg-primary/20 text-primary"
                todayClassName="border-primary"
              />
              <div className="mt-6">
                <ScheduleForm
                  selectedDate={selectedDate}
                  onSchedule={handleSchedule}
                  posts={mockPosts}
                  className="bg-card dark:bg-card border border-border"
                  textClassName="text-foreground/90 dark:text-foreground/90"
                  subtextClassName="text-muted-foreground"
                  buttonClassName="bg-card dark:bg-card text-muted-foreground hover:text-foreground/80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
