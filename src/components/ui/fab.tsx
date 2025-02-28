"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";

interface FabAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface FabProps {
  actions: FabAction[];
}

export function Fab({ actions }: FabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 z-20 lg:hidden">
      {/* Action buttons that appear when FAB is clicked */}
      {isOpen && (
        <div className="flex flex-col-reverse gap-3 mb-3 animate-fade-in">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-background dark:bg-background shadow-md rounded-lg py-1 px-3 mr-2 text-sm text-foreground">
                {action.label}
              </div>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full shadow-lg"
                onClick={action.onClick}
              >
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB button */}
      <Button
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg ${
          isOpen ? "bg-muted dark:bg-muted" : "bg-primary"
        }`}
        onClick={toggleOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
      </Button>
    </div>
  );
}
