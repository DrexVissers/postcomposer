import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { TemplateProvider } from "@/context/TemplateContext";
import { SystemNotificationProvider } from "@/context/SystemNotificationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-theme";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostComposer - Transform Ideas into Social Media Posts",
  description:
    "Quickly capture your ideas and transform them into polished social media posts for LinkedIn and Twitter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider appearance={clerkAppearance}>
          <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <UserProvider>
              <NotificationProvider>
                <SystemNotificationProvider>
                  <TemplateProvider>
                    {children}
                    <Toaster richColors closeButton position="top-right" />
                  </TemplateProvider>
                </SystemNotificationProvider>
              </NotificationProvider>
            </UserProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
