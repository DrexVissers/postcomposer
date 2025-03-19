import Link from "next/link";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/GetStartedButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-main-dot-pattern pointer-events-none" />

      <div className="relative">
        {/* Navigation */}
        <nav className="p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              PostComposer
            </h1>
            <div className="space-x-4">
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-border backdrop-blur-sm bg-card/50 dark:bg-card/50 hover:bg-card/80 dark:hover:bg-card/80 text-foreground/90"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground/90 dark:text-foreground/90">
              Streamline Your Social Media
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Create, schedule, and manage your social media content across
              multiple platforms with ease.
            </p>
            <div className="mt-10">
              <GetStartedButton />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground/80 dark:text-foreground/80 mb-2">
                Create Posts
              </h3>
              <p className="text-muted-foreground">
                Design and create engaging social media content with our
                intuitive editor.
              </p>
            </div>
            <div className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground/80 dark:text-foreground/80 mb-2">
                Use Templates
              </h3>
              <p className="text-muted-foreground">
                Save time with customizable templates for your regular content.
              </p>
            </div>
            <div className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground/80 dark:text-foreground/80 mb-2">
                Schedule Posts
              </h3>
              <p className="text-muted-foreground">
                Plan and schedule your content for the optimal posting times.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
