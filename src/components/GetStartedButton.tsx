"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetStartedButton() {
  return (
    <Link href="/sign-up">
      <Button
        size="lg"
        className="bg-card/50 dark:bg-card/50 backdrop-blur-sm hover:bg-card/80 dark:hover:bg-card/80 text-foreground/90 border border-border"
      >
        Get Started
      </Button>
    </Link>
  );
}
