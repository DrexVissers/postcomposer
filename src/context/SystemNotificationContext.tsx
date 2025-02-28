"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SystemNotification } from "@/components/features/notifications/NotificationCenter";

interface SystemNotificationContextType {
  notifications: SystemNotification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<SystemNotification, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const SystemNotificationContext = createContext<
  SystemNotificationContextType | undefined
>(undefined);

export function SystemNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: "1",
      title: "Post Approved",
      message: "Your post 'Product Launch Announcement' has been approved",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
      type: "post_status",
      relatedId: "post1",
    },
    {
      id: "2",
      title: "Post Scheduled",
      message: "Your post has been scheduled for tomorrow at 9:00 AM",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      read: true,
      type: "scheduled",
      relatedId: "post2",
    },
    {
      id: "3",
      title: "Approval Required",
      message: "A new post requires your approval",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      read: false,
      type: "approval_required",
      relatedId: "post3",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem("systemNotifications");
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error("Failed to parse saved notifications", error);
      }
    }
  }, []);

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("systemNotifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (
    notification: Omit<SystemNotification, "id" | "timestamp" | "read">
  ) => {
    const newNotification: SystemNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <SystemNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </SystemNotificationContext.Provider>
  );
}

export function useSystemNotification() {
  const context = useContext(SystemNotificationContext);
  if (context === undefined) {
    throw new Error(
      "useSystemNotification must be used within a SystemNotificationProvider"
    );
  }
  return context;
}
