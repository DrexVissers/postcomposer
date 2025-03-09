import { dark } from "@clerk/themes";

export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#3b82f6", // blue-500
    colorBackground: "#1e293b", // slate-800
    colorText: "#f8fafc", // slate-50
    colorTextSecondary: "#94a3b8", // slate-400
    colorInputBackground: "#0f172a", // slate-900
    colorInputText: "#f8fafc", // slate-50
    colorSuccess: "#22c55e", // green-500
    colorWarning: "#f59e0b", // amber-500
    colorDanger: "#ef4444", // red-500
    borderRadius: "0.5rem",
  },
  elements: {
    card: "shadow-md",
    formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
    headerTitle: "text-slate-50",
    headerSubtitle: "text-slate-400",
    socialButtonsIconButton: "border border-slate-700 hover:bg-slate-800",
    socialButtonsBlockButton: "border border-slate-700 hover:bg-slate-800",
    formFieldLabel: "text-slate-300",
    formFieldInput: "bg-slate-900 border-slate-700 text-slate-50",
    footerActionText: "text-slate-400",
    footerActionLink: "text-blue-400 hover:text-blue-300",
    identityPreviewText: "text-slate-50",
    identityPreviewEditButtonText: "text-blue-400",
  },
};
