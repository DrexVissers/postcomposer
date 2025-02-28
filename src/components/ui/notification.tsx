import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

export default function Notification({
  id,
  type,
  title,
  message,
  duration = 5000,
  onDismiss,
}: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Handle dismissal with animation
  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      onDismiss(id);
    }, 300); // Match the animation duration
  }, [id, onDismiss]);

  // Auto-dismiss notification after duration
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleDismiss]);

  // Get appropriate icon and colors based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          containerClass:
            "bg-card-lighter dark:bg-card-lighter border-green-500 dark:border-green-600 shadow-lg",
          iconClass: "text-green-500 dark:text-green-400",
          titleClass: "text-foreground/90 dark:text-foreground/90",
          messageClass: "text-muted-foreground dark:text-muted-foreground",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          containerClass:
            "bg-card-lighter dark:bg-card-lighter border-red-500 dark:border-red-600 shadow-lg",
          iconClass: "text-red-500 dark:text-red-400",
          titleClass: "text-foreground/90 dark:text-foreground/90",
          messageClass: "text-muted-foreground dark:text-muted-foreground",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          containerClass:
            "bg-card-lighter dark:bg-card-lighter border-yellow-500 dark:border-yellow-600 shadow-lg",
          iconClass: "text-yellow-500 dark:text-yellow-400",
          titleClass: "text-foreground/90 dark:text-foreground/90",
          messageClass: "text-muted-foreground dark:text-muted-foreground",
        };
      case "info":
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          containerClass:
            "bg-card-lighter dark:bg-card-lighter border-blue-500 dark:border-blue-600 shadow-lg",
          iconClass: "text-blue-500 dark:text-blue-400",
          titleClass: "text-foreground/90 dark:text-foreground/90",
          messageClass: "text-muted-foreground dark:text-muted-foreground",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`flex items-start p-4 mb-3 rounded-lg border-l-4 shadow-md ${
        isExiting ? "animate-slide-out" : "animate-slide-in"
      } ${styles.containerClass}`}
      role="alert"
    >
      <div className={`flex-shrink-0 mr-3 ${styles.iconClass}`}>
        {styles.icon}
      </div>
      <div className="flex-1">
        <h3 className={`text-sm font-medium ${styles.titleClass}`}>{title}</h3>
        <div className={`mt-1 text-sm ${styles.messageClass}`}>{message}</div>
      </div>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 ml-3 text-muted-foreground hover:text-foreground/80 dark:text-muted-foreground dark:hover:text-foreground/80"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
