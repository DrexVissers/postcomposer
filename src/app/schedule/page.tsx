"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ScheduleCalendar from "@/components/features/posts/ScheduleCalendar";
import ScheduleForm from "@/components/features/posts/ScheduleForm";
import ScheduleTimeline from "@/components/features/posts/ScheduleTimeline";
import { mockScheduledPosts, mockPosts } from "@/lib/mock-data";
import { useNotification } from "@/context/NotificationContext";

export default function SchedulePage() {
  const [scheduledPosts, setScheduledPosts] = useState(mockScheduledPosts);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addNotification } = useNotification();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSchedule = (data: {
    date: Date;
    time: string;
    platforms: { linkedin: boolean; twitter: boolean };
    repeat: string;
  }) => {
    // Create new scheduled posts based on the form data
    const newScheduledPosts = [];

    // Get a random post for demo purposes
    const randomPost = mockPosts[Math.floor(Math.random() * mockPosts.length)];

    if (data.platforms.linkedin) {
      newScheduledPosts.push({
        id: `sched${Date.now()}-linkedin`,
        content: randomPost.platforms.linkedin?.content || randomPost.content,
        scheduledDate: data.date.toISOString(),
        platform: "linkedin" as const,
        postId: randomPost.id,
        repeat: data.repeat as "none" | "daily" | "weekly" | "monthly",
      });
    }

    if (data.platforms.twitter) {
      newScheduledPosts.push({
        id: `sched${Date.now()}-twitter`,
        content: randomPost.platforms.twitter?.content || randomPost.content,
        scheduledDate: data.date.toISOString(),
        platform: "twitter" as const,
        postId: randomPost.id,
        repeat: data.repeat as "none" | "daily" | "weekly" | "monthly",
      });
    }

    // Add the new scheduled posts to the existing ones
    setScheduledPosts([...scheduledPosts, ...newScheduledPosts]);

    // Show success notification
    addNotification({
      type: "success",
      title: "Post Scheduled",
      message: `Your post has been scheduled for ${data.date.toLocaleDateString()} at ${
        data.time
      }.`,
      duration: 5000,
    });
  };

  const handleEdit = (postId: string) => {
    // In a real app, this would open an edit modal or navigate to an edit page
    console.log(`Edit post ${postId}`);
    addNotification({
      type: "info",
      title: "Edit Mode",
      message: "Post editing functionality will be available soon.",
      duration: 3000,
    });
  };

  const handleDelete = (postId: string) => {
    // Remove the post from the scheduled posts
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== postId));

    // Show success notification
    addNotification({
      type: "success",
      title: "Post Removed",
      message: "The scheduled post has been removed successfully.",
      duration: 3000,
    });
  };

  // Convert string dates to Date objects for the calendar component
  const calendarPosts = scheduledPosts.map((post) => ({
    ...post,
    scheduledDate: new Date(post.scheduledDate),
  }));

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Schedule Posts
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScheduleCalendar
              scheduledPosts={calendarPosts}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </div>

          <div>
            <ScheduleForm
              selectedDate={selectedDate}
              onSchedule={handleSchedule}
            />
          </div>

          <div className="lg:col-span-3">
            <ScheduleTimeline
              scheduledPosts={calendarPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
