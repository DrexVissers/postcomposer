"use client";

import MainLayout from "@/components/layout/MainLayout";
import { mockPosts, mockCategories, mockTags, mockUser } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Trash,
  ExternalLink,
  Filter,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  // Client component with state for filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showPendingApproval, setShowPendingApproval] = useState(false);

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

  // Count posts pending approval
  const pendingApprovalCount = mockPosts.filter(
    (post) => post.status === "pending_approval"
  ).length;

  // Check if user can approve posts
  const canApprove = mockUser.role === "owner" || mockUser.role === "admin";

  // Filter posts based on selected filters
  const filteredPosts = mockPosts.filter((post) => {
    // Filter by category
    if (selectedCategory !== "all" && post.category !== selectedCategory) {
      return false;
    }

    // Filter by tags
    if (
      selectedTags.length > 0 &&
      !selectedTags.every((tag) => post.tags?.includes(tag))
    ) {
      return false;
    }

    // Filter by platform
    if (selectedPlatform !== null) {
      if (selectedPlatform === "linkedin" && !post.platforms.linkedin) {
        return false;
      }
      if (selectedPlatform === "bluesky" && !post.platforms.bluesky) {
        return false;
      }
      if (selectedPlatform === "threads" && !post.platforms.threads) {
        return false;
      }
      if (selectedPlatform === "mastodon" && !post.platforms.mastodon) {
        return false;
      }
    }

    // Filter by approval status
    if (showPendingApproval && post.status !== "pending_approval") {
      return false;
    }

    return true;
  });

  // Handle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSelectedPlatform(null);
    setShowPendingApproval(false);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-muted-foreground">
            Content Dashboard
          </h1>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {canApprove && pendingApprovalCount > 0 && (
              <Link href="/dashboard/approvals" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full sm:w-auto border-border bg-background hover:bg-muted/50"
                >
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-foreground">Pending Approvals</span>
                  <Badge className="ml-1 bg-amber-100 text-amber-800 hover:bg-amber-100">
                    {pendingApprovalCount}
                  </Badge>
                </Button>
              </Link>
            )}
            <Link href="/create" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-background hover:bg-muted/50 text-foreground border border-border">
                Create New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-card dark:bg-card rounded-lg border border-border shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-foreground/90 flex items-center">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" /> Filters
            </h2>
            <button
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <Label
                htmlFor="category-filter"
                className="text-sm font-medium mb-1 block text-foreground/90"
              >
                Category
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="category-filter" className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Filter */}
            <div>
              <Label
                htmlFor="tags-filter"
                className="text-sm font-medium mb-1 block text-foreground/90"
              >
                Tags
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    id="tags-filter"
                  >
                    {selectedTags.length === 0
                      ? "Select Tags"
                      : `${selectedTags.length} tag${
                          selectedTags.length > 1 ? "s" : ""
                        } selected`}
                    <Filter className="h-4 w-4 ml-2 opacity-50 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-4">
                  <div className="space-y-2">
                    {mockTags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag.id}`}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => toggleTag(tag.id)}
                        />
                        <Label
                          htmlFor={`tag-${tag.id}`}
                          className="flex items-center cursor-pointer text-foreground/90"
                        >
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: tag.color }}
                          ></div>
                          {tag.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Platform Filter */}
            <div>
              <Label
                htmlFor="platform-filter"
                className="text-sm font-medium mb-1 block text-foreground/90"
              >
                Platform
              </Label>
              <Select
                value={selectedPlatform || "all"}
                onValueChange={(value) =>
                  setSelectedPlatform(
                    value === "all"
                      ? null
                      : (value as
                          | "linkedin"
                          | "bluesky"
                          | "threads"
                          | "mastodon")
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="bluesky">Bluesky</SelectItem>
                  <SelectItem value="threads">Threads</SelectItem>
                  <SelectItem value="mastodon">Mastodon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        {!isMobile && (
          <div className="bg-card dark:bg-card rounded-lg border border-border shadow-sm overflow-hidden hidden md:block">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 dark:bg-muted/10 font-medium text-foreground/90">
              <div className="col-span-5">Content</div>
              <div className="col-span-2">Category & Tags</div>
              <div className="col-span-2">Created</div>
              <div className="col-span-2">Platforms</div>
              <div className="col-span-1">Actions</div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center text-foreground/50 bg-card dark:bg-card rounded-lg shadow-sm">
                No posts match your filter criteria. Try adjusting your filters.
              </div>
            ) : (
              filteredPosts.map((post) => {
                const createdDate = new Date(post.createdAt);
                const timeAgo = formatDistanceToNow(createdDate, {
                  addSuffix: true,
                });

                // Find category details
                const category = post.category
                  ? mockCategories.find((c) => c.id === post.category)
                  : null;

                // Find tag details
                const tags = post.tags
                  ? post.tags
                      .map((tagId) => mockTags.find((t) => t.id === tagId))
                      .filter(Boolean)
                  : [];

                return (
                  <div
                    key={post.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-border hover:bg-muted/10 transition-colors"
                  >
                    <div className="col-span-5">
                      <p className="text-foreground/90 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                    <div className="col-span-2">
                      {category && (
                        <Badge
                          className="mb-1 mr-1"
                          style={{
                            backgroundColor: category.color,
                            color: "white",
                          }}
                        >
                          {category.name}
                        </Badge>
                      )}
                      {tags.map(
                        (tag) =>
                          tag && (
                            <Badge
                              key={tag.id}
                              variant="outline"
                              className="mb-1 mr-1"
                              style={{
                                borderColor: tag.color,
                                color: tag.color,
                              }}
                            >
                              {tag.name}
                            </Badge>
                          )
                      )}
                    </div>
                    <div className="col-span-2 text-sm text-foreground/90 self-center">
                      {timeAgo}
                    </div>
                    <div className="col-span-2 self-center">
                      <div className="flex flex-col gap-1 mt-2">
                        {post.platforms.linkedin && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">LinkedIn:</span>
                            <Badge
                              variant="secondary"
                              className="bg-muted text-foreground"
                            >
                              {post.platforms.linkedin.published
                                ? "Published"
                                : "Scheduled"}
                            </Badge>
                          </div>
                        )}
                        {post.platforms.bluesky && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Bluesky:</span>
                            <Badge
                              variant="secondary"
                              className="bg-muted text-foreground"
                            >
                              {post.platforms.bluesky.published
                                ? "Published"
                                : "Scheduled"}
                            </Badge>
                          </div>
                        )}
                        {post.platforms.threads && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Threads:</span>
                            <Badge
                              variant="secondary"
                              className="bg-muted text-foreground"
                            >
                              {post.platforms.threads.published
                                ? "Published"
                                : "Scheduled"}
                            </Badge>
                          </div>
                        )}
                        {post.platforms.mastodon && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Mastodon:</span>
                            <Badge
                              variant="secondary"
                              className="bg-muted text-foreground"
                            >
                              {post.platforms.mastodon.published
                                ? "Published"
                                : "Scheduled"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1 self-center">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 text-foreground hover:bg-muted/50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 text-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 text-foreground hover:bg-muted/50"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Mobile Card View */}
        {isMobile && (
          <div className="space-y-4 md:hidden">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center text-foreground/50 bg-card dark:bg-card rounded-lg shadow-sm">
                No posts match your filter criteria. Try adjusting your filters.
              </div>
            ) : (
              filteredPosts.map((post) => {
                const createdDate = new Date(post.createdAt);
                const timeAgo = formatDistanceToNow(createdDate, {
                  addSuffix: true,
                });

                // Find category details
                const category = post.category
                  ? mockCategories.find((c) => c.id === post.category)
                  : null;

                // Find tag details
                const tags = post.tags
                  ? post.tags
                      .map((tagId) => mockTags.find((t) => t.id === tagId))
                      .filter(Boolean)
                  : [];

                return (
                  <div
                    key={post.id}
                    className="bg-card dark:bg-card rounded-lg shadow-sm p-4 border-l-4 border-primary"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-xs text-foreground/50">
                        {timeAgo}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 text-foreground hover:bg-muted/50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 text-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-foreground/90 mb-3 line-clamp-3">
                      {post.content}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {category && (
                        <Badge
                          className="mb-1 mr-1"
                          style={{
                            backgroundColor: category.color,
                            color: "white",
                          }}
                        >
                          {category.name}
                        </Badge>
                      )}
                      {tags.slice(0, 2).map(
                        (tag) =>
                          tag && (
                            <Badge
                              key={tag.id}
                              variant="outline"
                              className="mb-1 mr-1"
                              style={{
                                borderColor: tag.color,
                                color: tag.color,
                              }}
                            >
                              {tag.name}
                            </Badge>
                          )
                      )}
                      {tags.length > 2 && (
                        <Badge variant="outline" className="mb-1">
                          +{tags.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                      {post.platforms.linkedin && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">LinkedIn:</span>
                          <Badge
                            variant="secondary"
                            className="bg-muted text-foreground"
                          >
                            {post.platforms.linkedin.published
                              ? "Published"
                              : "Scheduled"}
                          </Badge>
                        </div>
                      )}
                      {post.platforms.bluesky && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Bluesky:</span>
                          <Badge
                            variant="secondary"
                            className="bg-muted text-foreground"
                          >
                            {post.platforms.bluesky.published
                              ? "Published"
                              : "Scheduled"}
                          </Badge>
                        </div>
                      )}
                      {post.platforms.threads && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Threads:</span>
                          <Badge
                            variant="secondary"
                            className="bg-muted text-foreground"
                          >
                            {post.platforms.threads.published
                              ? "Published"
                              : "Scheduled"}
                          </Badge>
                        </div>
                      )}
                      {post.platforms.mastodon && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Mastodon:</span>
                          <Badge
                            variant="secondary"
                            className="bg-muted text-foreground"
                          >
                            {post.platforms.mastodon.published
                              ? "Published"
                              : "Scheduled"}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 text-foreground hover:bg-muted/50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
