import React from "react";
import { Button } from "@/components/ui/button";
import { useSystemNotification } from "@/context/SystemNotificationContext";

export default function NotificationDemo() {
  const { addNotification } = useSystemNotification();

  const simulatePostApproval = () => {
    addNotification({
      title: "Post Approved",
      message: "Your post 'Product Launch Announcement' has been approved",
      type: "post_status",
      relatedId: "post1",
    });
  };

  const simulatePostRejection = () => {
    addNotification({
      title: "Post Rejected",
      message:
        "Your post 'Product Launch Announcement' has been rejected. Please review the feedback.",
      type: "post_status",
      relatedId: "post1",
    });
  };

  const simulateScheduledPost = () => {
    addNotification({
      title: "Post Scheduled",
      message: "Your post has been scheduled for tomorrow at 9:00 AM",
      type: "scheduled",
      relatedId: "post2",
    });
  };

  const simulateApprovalRequest = () => {
    addNotification({
      title: "Approval Required",
      message: "A new post requires your approval",
      type: "approval_required",
      relatedId: "post3",
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-medium mb-4">Notification Demo</h2>
      <p className="text-sm text-gray-600 mb-4">
        Click the buttons below to simulate different notification events.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={simulatePostApproval} variant="outline" size="sm">
          Simulate Post Approval
        </Button>
        <Button onClick={simulatePostRejection} variant="outline" size="sm">
          Simulate Post Rejection
        </Button>
        <Button onClick={simulateScheduledPost} variant="outline" size="sm">
          Simulate Scheduled Post
        </Button>
        <Button onClick={simulateApprovalRequest} variant="outline" size="sm">
          Simulate Approval Request
        </Button>
      </div>
    </div>
  );
}
