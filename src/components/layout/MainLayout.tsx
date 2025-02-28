"use client";

import { useState } from "react";
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

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user has permission to approve posts
  const canApprove = mockUser.role === "owner" || mockUser.role === "admin";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="bg-white shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-teal-600">Levercast</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>My Posts</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Create Post</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Eye className="w-5 h-5 mr-3" />
              <span>Preview</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Templates</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/media"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              <span>Media</span>
            </Link>
            {canApprove && (
              <Link
                href="/dashboard/approvals"
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Approvals</span>
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="px-6 py-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  {mockUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {mockUser.name}
                </p>
                <p className="text-xs text-gray-500">
                  {mockUser.subscription.plan} plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-16 px-4 bg-white shadow-md lg:hidden">
        <h1 className="text-xl font-bold text-teal-600">Levercast</h1>
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-gray-700 rounded-md hover:bg-gray-100"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`bg-white shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-teal-600">Levercast</h1>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>My Posts</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Create Post</span>
            </Link>
            <Link
              href="/schedule"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/preview"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <Eye className="w-5 h-5 mr-3" />
              <span>Preview</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Templates</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/media"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              <span>Media</span>
            </Link>
            {canApprove && (
              <Link
                href="/dashboard/approvals"
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Approvals</span>
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="px-6 py-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  {mockUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {mockUser.name}
                </p>
                <p className="text-xs text-gray-500">
                  {mockUser.subscription.plan} plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-8">
        {children}
      </main>
    </div>
  );
}
