"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  Settings,
  Menu,
  X,
  Eye,
  Calendar,
  BarChart2,
  Image as ImageIcon,
  CheckCircle,
  FileText,
} from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import MobileNavBar from "./MobileNavBar";
import NotificationCenter from "@/components/features/notifications/NotificationCenter";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Check if user has permission to approve posts
  const canApprove = mockUser.role === "owner" || mockUser.role === "admin";

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    setIsMounted(true);

    if (isMounted) {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen, isMounted]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className="bg-card/90 dark:bg-card/50 shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 hidden lg:block"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">Levercast</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <NotificationCenter />
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2" aria-label="Main menu">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>My Posts</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Create Post</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <Eye className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Preview</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <FileText className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Templates</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <BarChart2 className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/media"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <ImageIcon className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Media</span>
            </Link>
            {canApprove && (
              <Link
                href="/dashboard/approvals"
                className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
                <span>Approvals</span>
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                  {mockUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground/90 dark:text-foreground/90">
                  {mockUser.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockUser.subscription.plan} plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-16 px-4 bg-card/90 dark:bg-card/50 shadow-md lg:hidden">
        <h1 className="text-xl font-bold text-primary">Levercast</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationCenter />
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-foreground/80 dark:text-foreground/80 rounded-md hover:bg-muted/50 dark:hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="mobile-menu"
        className={`bg-card/90 dark:bg-card/50 shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden overflow-y-auto`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">Levercast</h1>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground/80 dark:text-foreground/80 rounded-md hover:bg-muted/50 dark:hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <LayoutDashboard className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>My Posts</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <PlusCircle className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Create Post</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Calendar className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Eye className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Preview</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <FileText className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Templates</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <BarChart2 className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/media"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <ImageIcon className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Media</span>
            </Link>
            {canApprove && (
              <Link
                href="/dashboard/approvals"
                className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
                onClick={toggleMobileMenu}
              >
                <CheckCircle className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
                <span>Approvals</span>
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-foreground/80 dark:text-foreground/80 rounded-lg hover:bg-muted/50 dark:hover:bg-background/50 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Settings className="w-5 h-5 mr-3 text-foreground/70 dark:text-foreground/70" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                  {mockUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground/90 dark:text-foreground/90">
                  {mockUser.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mockUser.subscription.plan} plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto pt-16 lg:pt-0 w-full bg-main-dot-pattern ${
          isMobile ? "pb-24" : "pb-8"
        }`}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation - Only show on mobile */}
      {isMobile && <MobileNavBar />}
    </div>
  );
}
