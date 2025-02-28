"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  Eye,
  Calendar,
} from "lucide-react";
import { mockUser } from "@/lib/mock-data";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <span>Preview Tool</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Account Settings</span>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`bg-white shadow-md fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-teal-600">Levercast</h1>
            <button onClick={toggleMobileMenu} className="lg:hidden">
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
              <span>Preview Tool</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Account Settings</span>
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
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <button className="text-gray-500 hover:text-gray-700">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
