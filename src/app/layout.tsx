import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { TemplateProvider } from "@/context/TemplateContext";
import { SystemNotificationProvider } from "@/context/SystemNotificationContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SocialSphere - Transform Ideas into Social Media Posts",
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
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          <NotificationProvider>
            <SystemNotificationProvider>
              <TemplateProvider>{children}</TemplateProvider>
            </SystemNotificationProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
