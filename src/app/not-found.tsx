import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Button className="w-full">Return to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
