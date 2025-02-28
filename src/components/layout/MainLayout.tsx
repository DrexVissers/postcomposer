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
      <aside className="bg-card shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">Levercast</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <NotificationCenter />
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>My Posts</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Create Post</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <Eye className="w-5 h-5 mr-3" />
              <span>Preview</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Templates</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/media"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              <span>Media</span>
            </Link>
            {canApprove && (
              <Link
                href="/dashboard/approvals"
                className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Approvals</span>
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {mockUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
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
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-16 px-4 bg-card shadow-md lg:hidden">
        <h1 className="text-xl font-bold text-primary">Levercast</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationCenter />
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-foreground rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
        className={`bg-card shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">Levercast</h1>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>My Posts</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Create Post</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <Eye className="w-5 h-5 mr-3" />
              <span>Preview</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Templates</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/media"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              <span>Media</span>
            </Link>
            {canApprove && (
              <Link
                href="/dashboard/approvals"
                className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
                onClick={toggleMobileMenu}
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Approvals</span>
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {mockUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
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
        className={`flex-1 overflow-y-auto pt-16 lg:pt-0 w-full ${
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
