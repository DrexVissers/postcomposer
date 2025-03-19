"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockPosts, mockUser, Post } from "@/lib/mock-data";
import { useNotification } from "@/context/NotificationContext";
import { CheckCircle, XCircle, Filter, ChevronDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ApprovalsPage() {
  // Initialize with mock posts that need approval
  const [posts, setPosts] = useState<Post[]>(
    mockPosts.map((post) => ({
      ...post,
      status:
        post.id === "post3" ? "pending_approval" : post.status || "approved",
    })) as Post[]
  );
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("pending");
  const { addNotification } = useNotification();

  // Check if user has permission to approve posts
  const canApprove = mockUser.role === "owner" || mockUser.role === "admin";

  // Filter posts based on status
  const filteredPosts = posts.filter((post) => {
    if (filterStatus === "pending") return post.status === "pending_approval";
    if (filterStatus === "approved") return post.status === "approved";
    if (filterStatus === "rejected") return post.status === "rejected";
    return true; // "all" filter
  });

  // Handle post approval
  const handleApprove = (post: Post) => {
    if (!canApprove) {
      addNotification({
        type: "error",
        title: "Permission Denied",
        message: "You don't have permission to approve posts.",
        duration: 3000,
      });
      return;
    }

    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
        // Update platforms to set published to true
        const updatedPlatforms = { ...p.platforms };
        if (updatedPlatforms.linkedin) {
          updatedPlatforms.linkedin.published = true;
          updatedPlatforms.linkedin.publishedAt = new Date().toISOString();
        }
        if (updatedPlatforms.bluesky) {
          updatedPlatforms.bluesky.published = true;
          updatedPlatforms.bluesky.publishedAt = new Date().toISOString();
        }
        if (updatedPlatforms.threads) {
          updatedPlatforms.threads.published = true;
          updatedPlatforms.threads.publishedAt = new Date().toISOString();
        }
        if (updatedPlatforms.mastodon) {
          updatedPlatforms.mastodon.published = true;
          updatedPlatforms.mastodon.publishedAt = new Date().toISOString();
        }

        return {
          ...p,
          status: "approved" as const,
          approvedBy: mockUser.id,
          platforms: updatedPlatforms,
        };
      }
      return p;
    });

    setPosts(updatedPosts as Post[]);
    setIsPreviewOpen(false);

    addNotification({
      type: "success",
      title: "Post Approved",
      message: "The post has been approved and published.",
      duration: 3000,
    });
  };

  // Handle post rejection
  const handleReject = (post: Post) => {
    if (!canApprove) {
      addNotification({
        type: "error",
        title: "Permission Denied",
        message: "You don't have permission to reject posts.",
        duration: 3000,
      });
      return;
    }

    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
        return {
          ...p,
          status: "rejected" as const,
        };
      }
      return p;
    });

    setPosts(updatedPosts as Post[]);
    setIsPreviewOpen(false);

    addNotification({
      type: "info",
      title: "Post Rejected",
      message: "The post has been rejected.",
      duration: 3000,
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "pending_approval":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      default:
        return "bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy h:mm a");
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90">
            Content Approvals
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>
                  {filterStatus === "pending" && "Pending Approval"}
                  {filterStatus === "approved" && "Approved"}
                  {filterStatus === "rejected" && "Rejected"}
                  {filterStatus === "all" && "All Posts"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                Pending Approval
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
                Rejected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Posts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {!canApprove && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800">
              You are in view-only mode. Only admins and owners can approve or
              reject posts.
            </p>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors rounded-lg shadow-sm p-8 text-center">
            <p className="text-muted-foreground">
              {filterStatus === "pending"
                ? "No posts pending approval."
                : filterStatus === "approved"
                ? "No approved posts."
                : filterStatus === "rejected"
                ? "No rejected posts."
                : "No posts found."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors rounded-lg shadow-sm p-6 border-l-4"
                style={{
                  borderLeftColor:
                    post.status === "pending_approval"
                      ? "#f59e0b"
                      : post.status === "approved"
                      ? "#10b981"
                      : post.status === "rejected"
                      ? "#ef4444"
                      : "#e5e7eb",
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-medium text-foreground/90 dark:text-foreground/90">
                      {post.content.length > 60
                        ? post.content.substring(0, 60) + "..."
                        : post.content}
                    </h2>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-1">
                      Created {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <Badge className={getStatusBadgeColor(post.status)}>
                    {post.status === "pending_approval" && "Pending Approval"}
                    {post.status === "approved" && "Approved"}
                    {post.status === "rejected" && "Rejected"}
                    {!post.status && "Draft"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.platforms.linkedin && (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 dark:bg-blue-900/20"
                    >
                      LinkedIn
                    </Badge>
                  )}
                  {post.platforms.bluesky && (
                    <Badge
                      variant="outline"
                      className="bg-sky-50 dark:bg-sky-900/20"
                    >
                      Bluesky
                    </Badge>
                  )}
                  {post.platforms.threads && (
                    <Badge
                      variant="outline"
                      className="bg-purple-50 dark:bg-purple-900/20"
                    >
                      Threads
                    </Badge>
                  )}
                  {post.platforms.mastodon && (
                    <Badge
                      variant="outline"
                      className="bg-teal-50 dark:bg-teal-900/20"
                    >
                      Mastodon
                    </Badge>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsPreviewOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </Button>

                  {post.status === "pending_approval" && canApprove && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-red-600 dark:text-red-500"
                        onClick={() => handleReject(post)}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-green-600 dark:text-green-500"
                        onClick={() => handleApprove(post)}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post Preview Dialog */}
        {selectedPost && (
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Post Preview</DialogTitle>
                <DialogDescription>
                  Review the content before approving or rejecting
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="linkedin" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="linkedin"
                    disabled={!selectedPost.platforms.linkedin}
                  >
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger
                    value="bluesky"
                    disabled={!selectedPost.platforms.bluesky}
                  >
                    Bluesky
                  </TabsTrigger>
                  <TabsTrigger
                    value="threads"
                    disabled={!selectedPost.platforms.threads}
                  >
                    Threads
                  </TabsTrigger>
                  <TabsTrigger
                    value="mastodon"
                    disabled={!selectedPost.platforms.mastodon}
                  >
                    Mastodon
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="linkedin"
                  key="approval-linkedin"
                  className="mt-4"
                >
                  {selectedPost.platforms.linkedin ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="whitespace-pre-wrap">
                        {selectedPost.platforms.linkedin.content}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No LinkedIn content
                    </p>
                  )}
                </TabsContent>

                <TabsContent
                  value="bluesky"
                  key="approval-bluesky"
                  className="mt-4"
                >
                  {selectedPost.platforms.bluesky ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="whitespace-pre-wrap">
                        {selectedPost.platforms.bluesky.content}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No Bluesky content
                    </p>
                  )}
                </TabsContent>

                <TabsContent
                  value="threads"
                  key="approval-threads"
                  className="mt-4"
                >
                  {selectedPost.platforms.threads ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="whitespace-pre-wrap">
                        {selectedPost.platforms.threads.content}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No Threads content
                    </p>
                  )}
                </TabsContent>

                <TabsContent
                  value="mastodon"
                  key="approval-mastodon"
                  className="mt-4"
                >
                  {selectedPost.platforms.mastodon ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="whitespace-pre-wrap">
                        {selectedPost.platforms.mastodon.content}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No Mastodon content
                    </p>
                  )}
                </TabsContent>
              </Tabs>

              {selectedPost.status === "pending_approval" && canApprove && (
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 text-red-600 dark:text-red-500"
                    onClick={() => handleReject(selectedPost)}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-1 text-green-600 dark:text-green-500"
                    onClick={() => handleApprove(selectedPost)}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
}
