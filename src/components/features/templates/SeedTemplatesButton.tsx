"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedTemplates } from "@/lib/premade-templates";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface SeedTemplatesButtonProps {
  className?: string;
}

export function SeedTemplatesButton({ className }: SeedTemplatesButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeedTemplates = async () => {
    try {
      setIsLoading(true);
      const result = await seedTemplates();

      if (result.success) {
        toast.success("Templates Added", {
          description:
            "All premade templates have been successfully added to your account.",
        });
      } else {
        toast.error("Error Adding Templates", {
          description:
            result.message ||
            "There was an error adding the templates. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Error Adding Templates", {
        description:
          "There was an unexpected error adding the templates. Please try again.",
      });
      console.error("Error seeding templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSeedTemplates}
      className={className}
      disabled={isLoading}
      variant="outline"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Templates...
        </>
      ) : (
        "Add Premade Templates"
      )}
    </Button>
  );
}
