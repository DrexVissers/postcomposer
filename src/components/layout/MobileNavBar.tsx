"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Calendar,
  Settings,
  Menu,
} from "lucide-react";

export default function MobileNavBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide bottom nav when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 transition-transform duration-300 lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center h-16">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/dashboard") ? "text-teal-600" : "text-gray-500"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-xs mt-1">Posts</span>
        </Link>

        <Link
          href="/create"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/create") ? "text-teal-600" : "text-gray-500"
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-xs mt-1">Create</span>
        </Link>

        <Link
          href="/schedule"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/schedule") ? "text-teal-600" : "text-gray-500"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs mt-1">Schedule</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/settings") ? "text-teal-600" : "text-gray-500"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs mt-1">Settings</span>
        </Link>

        <button
          className="flex flex-col items-center justify-center w-full h-full text-gray-500"
          aria-label="More options"
        >
          <Menu className="w-5 h-5" />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </div>
  );
}
