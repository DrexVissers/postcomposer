"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockPosts, mockCategories, mockTags } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash,
  ExternalLink,
  Linkedin,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { BlueskyIcon } from "@/components/icons/BlueskyIcon";
import { ThreadsIcon } from "@/components/icons/ThreadsIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/ui/page-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  category?: string;
  tags?: string[];
  platforms: {
    [key: string]: {
      published: boolean;
      scheduledDate?: string;
    };
  };
}

export default function ComposerLibraryPage() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);

  // Filter posts based on search and filters
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = searchQuery
      ? post.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags?.includes(tag));
    const matchesPlatform =
      selectedPlatform === "all" ||
      Object.keys(post.platforms).includes(selectedPlatform);
    return matchesSearch && matchesCategory && matchesTags && matchesPlatform;
  });

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    setSelectedPosts(checked ? filteredPosts.map((post) => post.id) : []);
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    setSelectedPosts((prev) =>
      checked ? [...prev, postId] : prev.filter((id) => id !== postId)
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTags([]);
    setSelectedPlatform("all");
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 space-y-6">
        <PageHeader title="Composer Library" />

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-card dark:bg-card rounded-lg border border-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[150px] bg-input border-input">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: category.color }}
                            ></div>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by category</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[150px] bg-input border-input"
                      >
                        {selectedTags.length === 0
                          ? "Tags"
                          : `${selectedTags.length} tag${
                              selectedTags.length > 1 ? "s" : ""
                            }`}{" "}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-4">
                      <div className="space-y-2">
                        {mockTags.map((tag) => (
                          <div
                            key={tag.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={tag.id}
                              checked={selectedTags.includes(tag.id)}
                              onCheckedChange={(checked) => {
                                setSelectedTags(
                                  checked
                                    ? [...selectedTags, tag.id]
                                    : selectedTags.filter((id) => id !== tag.id)
                                );
                              }}
                            />
                            <Label
                              htmlFor={tag.id}
                              className="flex items-center"
                            >
                              <div
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: tag.color }}
                              ></div>
                              {tag.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by tags</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Select
                    value={selectedPlatform}
                    onValueChange={setSelectedPlatform}
                  >
                    <SelectTrigger className="w-[150px] bg-input border-input">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="linkedin">
                        <div className="flex items-center">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </div>
                      </SelectItem>
                      <SelectItem value="bluesky">
                        <div className="flex items-center">
                          <BlueskyIcon className="h-4 w-4 mr-2" />
                          Bluesky
                        </div>
                      </SelectItem>
                      <SelectItem value="threads">
                        <div className="flex items-center">
                          <ThreadsIcon className="h-4 w-4 mr-2" />
                          Threads
                        </div>
                      </SelectItem>
                      <SelectItem value="mastodon">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Mastodon
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by platform</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear Filters
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear all filters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-card dark:bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 dark:bg-muted/10 font-medium text-foreground/90">
            <div className="col-span-1">
              <Checkbox
                checked={
                  selectedPosts.length === filteredPosts.length &&
                  filteredPosts.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </div>
            <div className="col-span-4">Content</div>
            <div className="col-span-2">Category & Tags</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2">Platforms</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Body */}
          {filteredPosts.length === 0 ? (
            <div className="p-8 text-center text-foreground/50">
              No posts match your filter criteria
            </div>
          ) : (
            filteredPosts.map((post) => {
              const createdDate = new Date(post.createdAt);
              const timeAgo = formatDistanceToNow(createdDate, {
                addSuffix: true,
              });
              const category = mockCategories.find(
                (c) => c.id === post.category
              );
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
                  <div className="col-span-1">
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={(checked) =>
                        handleSelectPost(post.id, checked as boolean)
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setPreviewPost(post)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <p className="line-clamp-2 text-sm">{post.content}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    {category && (
                      <Badge variant="outline" className="mb-1">
                        {category.name}
                      </Badge>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {tags
                        .slice(0, 2)
                        .filter(
                          (tag): tag is NonNullable<typeof tag> =>
                            tag !== undefined
                        )
                        .map((tag) => (
                          <Badge key={tag.id} variant="secondary">
                            {tag.name}
                          </Badge>
                        ))}
                      {tags.length > 2 && (
                        <Badge variant="secondary">+{tags.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-sm">
                    <time dateTime={post.createdAt}>{timeAgo}</time>
                  </div>
                  <div className="col-span-2">
                    <div className="flex gap-2">
                      {post.platforms.linkedin && (
                        <Linkedin className="h-4 w-4 text-foreground/70" />
                      )}
                      {post.platforms.bluesky && (
                        <BlueskyIcon className="h-4 w-4 text-foreground/70" />
                      )}
                      {post.platforms.threads && (
                        <ThreadsIcon className="h-4 w-4 text-foreground/70" />
                      )}
                      {post.platforms.mastodon && (
                        <Globe className="h-4 w-4 text-foreground/70" />
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-foreground hover:bg-muted/50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit post</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete post</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-foreground hover:bg-muted/50"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View post</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Post Preview Dialog */}
        <Dialog open={!!previewPost} onOpenChange={() => setPreviewPost(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post Preview</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-foreground/90 whitespace-pre-wrap">
                {previewPost?.content}
              </p>
              {previewPost && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(previewPost.platforms).map(
                    ([platform, status]: [string, { published: boolean }]) => (
                      <Badge
                        key={platform}
                        variant={status.published ? "default" : "secondary"}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}:{" "}
                        {status.published ? "Published" : "Scheduled"}
                      </Badge>
                    )
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
