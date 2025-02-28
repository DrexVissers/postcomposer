import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

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
  // Auto-dismiss notification after duration
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  // Get appropriate icon and colors based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          containerClass: "bg-green-50 border-green-500",
          iconClass: "text-green-500",
          titleClass: "text-green-800",
          messageClass: "text-green-700",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          containerClass: "bg-red-50 border-red-500",
          iconClass: "text-red-500",
          titleClass: "text-red-800",
          messageClass: "text-red-700",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          containerClass: "bg-yellow-50 border-yellow-500",
          iconClass: "text-yellow-500",
          titleClass: "text-yellow-800",
          messageClass: "text-yellow-700",
        };
      case "info":
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          containerClass: "bg-blue-50 border-blue-500",
          iconClass: "text-blue-500",
          titleClass: "text-blue-800",
          messageClass: "text-blue-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`flex items-start p-4 mb-3 rounded-lg border-l-4 shadow-md animate-slide-in ${styles.containerClass}`}
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
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
