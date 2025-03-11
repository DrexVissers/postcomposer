import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Welcome to SocialSphere
        </h1>
        <p className="text-xl text-muted-foreground">
          Transform your ideas into polished social media posts for LinkedIn,
          Bluesky, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/sign-in">
            <Button size="lg" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Create Content</h3>
            <p className="text-muted-foreground">
              Easily create and format content for multiple social platforms at
              once.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Schedule Posts</h3>
            <p className="text-muted-foreground">
              Plan your content calendar and schedule posts for optimal
              engagement.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
            <p className="text-muted-foreground">
              Analyze your social media performance with detailed analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
