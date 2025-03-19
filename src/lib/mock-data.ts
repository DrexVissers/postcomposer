export interface Post {
  id: string;
  content: string;
  createdAt: string;
  category?: string; // Category of the post
  tags?: string[]; // Tags associated with the post
  platforms: {
    linkedin?: {
      content: string;
      published: boolean;
      publishedAt?: string;
    };
    bluesky?: {
      content: string;
      published: boolean;
      publishedAt?: string;
    };
    threads?: {
      content: string;
      published: boolean;
      publishedAt?: string;
    };
    mastodon?: {
      content: string;
      published: boolean;
      publishedAt?: string;
    };
  };
  status?: "draft" | "pending_approval" | "approved" | "rejected"; // Post approval status
  approvedBy?: string; // User ID who approved the post
  createdBy: string; // User ID who created the post
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
}

export interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: string;
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
  postId?: string; // Reference to the original post if applicable
  repeat?: "none" | "daily" | "weekly" | "monthly";
  category?: string; // Category ID
  tags?: string[]; // Array of tag IDs
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: {
    plan: "free" | "pro" | "enterprise";
    status: "active" | "inactive";
    renewalDate: string;
  };
  connectedAccounts: {
    linkedin: boolean;
    bluesky: boolean;
    threads: boolean;
    mastodon: boolean;
  };
  role: UserRole;
  teamId?: string; // ID of the team the user belongs to
  avatar?: string; // URL to user's avatar
  preferences: {
    darkMode: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}

export type UserRole = "owner" | "admin" | "editor" | "viewer" | "user";

export interface Template {
  id: string;
  name: string;
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
  content: string;
  description?: string;
  category?: string; // Category of the template
  isCustom?: boolean; // Whether this is a custom user-created template
  tags?: string[];
  isDefault?: boolean;
}

export interface PostAnalytics {
  postId: string;
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
  views: number;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
  dailyStats: {
    date: string;
    views: number;
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  }[];
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  name: string;
  url: string;
  thumbnailUrl: string;
  size: number; // in bytes
  dimensions?: { width: number; height: number };
  duration?: number; // for videos, in seconds
  createdAt: string;
  tags: string[];
}

// Add new interfaces for categories and tags
export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

// Add mock data for categories and tags
export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Product Updates",
    description: "Posts about product updates and new features",
    color: "#3b82f6", // blue
  },
  {
    id: "cat-2",
    name: "Industry News",
    description: "Posts about industry news and trends",
    color: "#10b981", // green
  },
  {
    id: "cat-3",
    name: "Tips & Tricks",
    description: "Helpful tips and tricks for users",
    color: "#f59e0b", // amber
  },
  {
    id: "cat-4",
    name: "Company News",
    description: "News about the company",
    color: "#8b5cf6", // purple
  },
];

export const mockTags: Tag[] = [
  { id: "tag-1", name: "marketing", color: "#ef4444" }, // red
  { id: "tag-2", name: "social media", color: "#3b82f6" }, // blue
  { id: "tag-3", name: "analytics", color: "#10b981" }, // green
  { id: "tag-4", name: "engagement", color: "#f59e0b" }, // amber
  { id: "tag-5", name: "growth", color: "#8b5cf6" }, // purple
  { id: "tag-6", name: "strategy", color: "#ec4899" }, // pink
];

// Mock data for posts
export const mockPosts: Post[] = [
  {
    id: "post1",
    content: "Excited to announce our new product launch! #innovation #tech",
    createdAt: "2023-06-15T10:30:00Z",
    category: "product",
    tags: ["innovation", "technology"],
    platforms: {
      linkedin: {
        content:
          "Excited to announce our new product launch! This is a game-changer for our industry. #innovation #tech",
        published: true,
        publishedAt: "2023-06-15T10:30:00Z",
      },
      bluesky: {
        content:
          "Excited to announce our new product launch! #innovation #tech",
        published: true,
        publishedAt: "2023-06-15T10:30:00Z",
      },
    },
    createdBy: "user1",
    platform: "linkedin",
  },
  {
    id: "post2",
    content:
      "Check out our latest blog post on industry trends and insights. Link in bio!",
    createdAt: "2023-06-10T14:45:00Z",
    category: "blog",
    tags: ["insights", "trends"],
    platforms: {
      linkedin: {
        content:
          "Check out our latest blog post on industry trends and insights. We've compiled data from over 100 sources to bring you the most comprehensive analysis. Link in bio!",
        published: true,
        publishedAt: "2023-06-10T14:45:00Z",
      },
    },
    createdBy: "user1",
    platform: "linkedin",
  },
  {
    id: "post3",
    content: "We're hiring! Join our team of passionate professionals.",
    createdAt: "2023-06-05T09:15:00Z",
    platforms: {
      linkedin: {
        content:
          "We're hiring! Join our team of passionate professionals. We offer competitive benefits and a great work culture.",
        published: false,
      },
    },
    createdBy: "user1",
    platform: "linkedin",
  },
];

// Mock scheduled posts
export const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "sched1",
    content:
      "Just launched our new product! So excited to share this with everyone.",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    platform: "linkedin",
    postId: "1",
    repeat: "none",
    category: "cat-1",
    tags: ["tag-1", "tag-5"],
  },
  {
    id: "sched2",
    content:
      "Just launched our new product! 🚀 Check it out at example.com #NewProduct #Excited",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    platform: "bluesky",
    postId: "1",
    repeat: "none",
    category: "cat-1",
    tags: ["tag-1", "tag-5"],
  },
  {
    id: "sched3",
    content:
      "Working from home can be challenging. Here are 5 tips I've found helpful for maintaining productivity...",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 3)
    ).toISOString(),
    platform: "linkedin",
    postId: "2",
    repeat: "weekly",
    category: "cat-3",
    tags: ["tag-3"],
  },
  {
    id: "sched4",
    content:
      "5 WFH productivity tips: 1. Dedicated workspace 2. Consistent schedule 3. Regular breaks...",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 3)
    ).toISOString(),
    platform: "bluesky",
    postId: "2",
    repeat: "weekly",
    category: "cat-3",
    tags: ["tag-3"],
  },
  {
    id: "sched5",
    content:
      "Yesterday, I had the privilege of attending the Future of AI Conference...",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 7)
    ).toISOString(),
    platform: "linkedin",
    postId: "3",
    repeat: "none",
    category: "cat-2",
    tags: ["tag-2"],
  },
];

// Mock analytics data
export const mockAnalytics: PostAnalytics[] = [
  {
    postId: "1",
    platform: "linkedin",
    views: 1245,
    likes: 87,
    shares: 23,
    comments: 15,
    clicks: 42,
    dailyStats: [
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(),
        views: 245,
        likes: 12,
        shares: 3,
        comments: 2,
        clicks: 8,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 5)
        ).toISOString(),
        views: 320,
        likes: 18,
        shares: 5,
        comments: 3,
        clicks: 10,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 4)
        ).toISOString(),
        views: 280,
        likes: 22,
        shares: 6,
        comments: 4,
        clicks: 9,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 3)
        ).toISOString(),
        views: 190,
        likes: 15,
        shares: 4,
        comments: 3,
        clicks: 7,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString(),
        views: 110,
        likes: 10,
        shares: 3,
        comments: 2,
        clicks: 5,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString(),
        views: 100,
        likes: 10,
        shares: 2,
        comments: 1,
        clicks: 3,
      },
    ],
  },
  {
    postId: "1",
    platform: "bluesky",
    views: 2350,
    likes: 145,
    shares: 78,
    comments: 32,
    clicks: 65,
    dailyStats: [
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(),
        views: 520,
        likes: 35,
        shares: 18,
        comments: 8,
        clicks: 15,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 5)
        ).toISOString(),
        views: 680,
        likes: 42,
        shares: 22,
        comments: 10,
        clicks: 18,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 4)
        ).toISOString(),
        views: 450,
        likes: 28,
        shares: 15,
        comments: 6,
        clicks: 12,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 3)
        ).toISOString(),
        views: 320,
        likes: 20,
        shares: 12,
        comments: 4,
        clicks: 10,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString(),
        views: 210,
        likes: 12,
        shares: 7,
        comments: 3,
        clicks: 6,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString(),
        views: 170,
        likes: 8,
        shares: 4,
        comments: 1,
        clicks: 4,
      },
    ],
  },
  {
    postId: "2",
    platform: "linkedin",
    views: 875,
    likes: 62,
    shares: 18,
    comments: 9,
    clicks: 31,
    dailyStats: [
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(),
        views: 180,
        likes: 15,
        shares: 4,
        comments: 2,
        clicks: 7,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 5)
        ).toISOString(),
        views: 220,
        likes: 18,
        shares: 5,
        comments: 3,
        clicks: 8,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 4)
        ).toISOString(),
        views: 175,
        likes: 12,
        shares: 4,
        comments: 2,
        clicks: 6,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 3)
        ).toISOString(),
        views: 120,
        likes: 8,
        shares: 2,
        comments: 1,
        clicks: 5,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString(),
        views: 100,
        likes: 5,
        shares: 2,
        comments: 1,
        clicks: 3,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString(),
        views: 80,
        likes: 4,
        shares: 1,
        comments: 0,
        clicks: 2,
      },
    ],
  },
  {
    postId: "5",
    platform: "threads",
    views: 980,
    likes: 75,
    shares: 18,
    comments: 32,
    clicks: 28,
    dailyStats: [
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(),
        views: 180,
        likes: 15,
        shares: 3,
        comments: 6,
        clicks: 5,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 5)
        ).toISOString(),
        views: 210,
        likes: 18,
        shares: 4,
        comments: 7,
        clicks: 6,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 4)
        ).toISOString(),
        views: 195,
        likes: 14,
        shares: 3,
        comments: 6,
        clicks: 5,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 3)
        ).toISOString(),
        views: 225,
        likes: 16,
        shares: 4,
        comments: 8,
        clicks: 7,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString(),
        views: 170,
        likes: 12,
        shares: 4,
        comments: 5,
        clicks: 5,
      },
    ],
  },
  {
    postId: "6",
    platform: "mastodon",
    views: 750,
    likes: 62,
    shares: 14,
    comments: 25,
    clicks: 22,
    dailyStats: [
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(),
        views: 140,
        likes: 12,
        shares: 2,
        comments: 5,
        clicks: 4,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 5)
        ).toISOString(),
        views: 165,
        likes: 14,
        shares: 3,
        comments: 6,
        clicks: 5,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 4)
        ).toISOString(),
        views: 150,
        likes: 11,
        shares: 3,
        comments: 4,
        clicks: 4,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 3)
        ).toISOString(),
        views: 175,
        likes: 13,
        shares: 3,
        comments: 6,
        clicks: 5,
      },
      {
        date: new Date(
          new Date().setDate(new Date().getDate() - 2)
        ).toISOString(),
        views: 120,
        likes: 12,
        shares: 3,
        comments: 4,
        clicks: 4,
      },
    ],
  },
];

// Mock user data
export const mockUser: User = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  subscription: {
    plan: "pro",
    status: "active",
    renewalDate: "2023-12-31",
  },
  connectedAccounts: {
    linkedin: true,
    bluesky: true,
    threads: true,
    mastodon: true,
  },
  role: "owner",
  teamId: "team1",
  avatar: "https://example.com/avatar.jpg",
  preferences: {
    darkMode: true,
    emailNotifications: true,
    pushNotifications: false,
  },
};

// Mock template categories
export interface TemplateCategory {
  id: string;
  name: string;
  description?: string;
}

export const mockTemplateCategories: TemplateCategory[] = [
  {
    id: "cat-announcement",
    name: "Announcements",
    description: "Templates for sharing news and updates",
  },
  {
    id: "cat-engagement",
    name: "Engagement",
    description: "Templates designed to drive audience interaction",
  },
  {
    id: "cat-list",
    name: "Lists",
    description: "Templates formatted as lists or bullet points",
  },
  {
    id: "cat-custom",
    name: "Custom",
    description: "Your custom templates",
  },
];

// Mock templates
export const mockTemplates: Template[] = [
  {
    id: "template1",
    name: "Professional Announcement",
    platform: "linkedin",
    content:
      "I'm excited to share that [MAIN_POINT]. This represents [SIGNIFICANCE]. #[HASHTAG1] #[HASHTAG2]",
    category: "cat-announcement",
  },
  {
    id: "template2",
    name: "Quick Update",
    platform: "bluesky",
    content: "Just [ACTION]! [EMOJI] [BRIEF_DETAIL] #[HASHTAG]",
    category: "cat-announcement",
  },
  {
    id: "template3",
    name: "List Format",
    platform: "linkedin",
    content:
      "[TOPIC] tips:\n\n1. [POINT1]\n2. [POINT2]\n3. [POINT3]\n4. [POINT4]\n5. [POINT5]\n\n#[HASHTAG1] #[HASHTAG2]",
    category: "cat-list",
  },
  {
    id: "template4",
    name: "Question Post",
    platform: "linkedin",
    content:
      "What's your take on [TOPIC]? [QUESTION]\n\nShare your thoughts in the comments below! #[HASHTAG1] #[HASHTAG2]",
    category: "cat-engagement",
  },
  {
    id: "template5",
    name: "Poll Introduction",
    platform: "bluesky",
    content: "I'm curious: [QUESTION]\n\nVote in the poll below! [EMOJI]",
    category: "cat-engagement",
  },
  {
    id: "template6",
    name: "Threads Story",
    platform: "threads",
    content:
      "[OPENING_HOOK]\n\nHere's what happened: [STORY_DETAIL]\n\nThe result? [OUTCOME]\n\n#[HASHTAG1] #[HASHTAG2]",
    category: "cat-engagement",
  },
  {
    id: "template7",
    name: "Threads Tips",
    platform: "threads",
    content:
      "[NUMBER] quick tips for [TOPIC]:\n\n✓ [TIP1]\n✓ [TIP2]\n✓ [TIP3]\n\nSave this for later! #[HASHTAG]",
    category: "cat-list",
  },
  {
    id: "template8",
    name: "Mastodon Introduction",
    platform: "mastodon",
    content:
      "Hello Mastodon! [INTRODUCTION]\n\nI'll be sharing [CONTENT_TYPE] about [TOPIC].\n\n#[HASHTAG1] #[HASHTAG2]",
    category: "cat-announcement",
  },
  {
    id: "template9",
    name: "Mastodon Discussion",
    platform: "mastodon",
    content:
      "Let's discuss: [TOPIC]\n\n[QUESTION]\n\nWhat are your thoughts? Boost to get more perspectives!\n\n#[HASHTAG1] #[HASHTAG2]",
    category: "cat-engagement",
  },
];

export const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    name: "company-logo.png",
    url: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
    size: 245000,
    dimensions: { width: 800, height: 800 },
    createdAt: "2023-10-15T14:30:00Z",
    tags: ["logo", "branding"],
  },
  {
    id: "2",
    type: "image",
    name: "product-showcase.jpg",
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=133",
    size: 1250000,
    dimensions: { width: 1200, height: 800 },
    createdAt: "2023-11-05T09:45:00Z",
    tags: ["product", "marketing"],
  },
  {
    id: "3",
    type: "image",
    name: "team-photo.jpg",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=133",
    size: 1850000,
    dimensions: { width: 1200, height: 800 },
    createdAt: "2023-12-12T16:20:00Z",
    tags: ["team", "people"],
  },
  {
    id: "4",
    type: "video",
    name: "product-demo.mp4",
    url: "https://example.com/videos/product-demo.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=113",
    size: 15000000,
    dimensions: { width: 1920, height: 1080 },
    duration: 145,
    createdAt: "2024-01-20T11:15:00Z",
    tags: ["demo", "product", "video"],
  },
  {
    id: "5",
    type: "image",
    name: "office-space.jpg",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=133",
    size: 2100000,
    dimensions: { width: 1200, height: 800 },
    createdAt: "2024-02-05T13:40:00Z",
    tags: ["office", "workspace"],
  },
];

export interface Team {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string; // User ID of the team owner
  members: TeamMember[];
}

export interface TeamMember {
  userId: string;
  role: UserRole;
  addedAt: string;
  invitedBy: string; // User ID who invited this member
}

export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Marketing Team",
    createdAt: "2023-01-15T08:00:00Z",
    ownerId: "user1",
    members: [
      {
        userId: "user1",
        role: "owner",
        addedAt: "2023-01-15T08:00:00Z",
        invitedBy: "user1",
      },
      {
        userId: "user2",
        role: "admin",
        addedAt: "2023-01-16T10:30:00Z",
        invitedBy: "user1",
      },
      {
        userId: "user3",
        role: "editor",
        addedAt: "2023-01-20T14:45:00Z",
        invitedBy: "user1",
      },
      {
        userId: "user4",
        role: "viewer",
        addedAt: "2023-02-05T09:15:00Z",
        invitedBy: "user2",
      },
    ],
  },
];

export const mockTeamMembers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    subscription: {
      plan: "enterprise",
      status: "active",
      renewalDate: "2024-01-15",
    },
    connectedAccounts: {
      linkedin: true,
      bluesky: true,
      threads: true,
      mastodon: true,
    },
    role: "owner",
    teamId: "team1",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    preferences: {
      darkMode: true,
      emailNotifications: true,
      pushNotifications: false,
    },
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    subscription: {
      plan: "pro",
      status: "active",
      renewalDate: "2024-02-20",
    },
    connectedAccounts: {
      linkedin: true,
      bluesky: false,
      threads: true,
      mastodon: true,
    },
    role: "admin",
    teamId: "team1",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    preferences: {
      darkMode: false,
      emailNotifications: true,
      pushNotifications: true,
    },
  },
  {
    id: "user3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "user",
    avatar: "/avatars/user3.png",
    connectedAccounts: {
      linkedin: false,
      bluesky: true,
      threads: false,
      mastodon: false,
    },
    preferences: {
      darkMode: true,
      emailNotifications: false,
      pushNotifications: true,
    },
    subscription: {
      plan: "free",
      status: "active",
      renewalDate: "2024-05-15",
    },
  },
  {
    id: "user4",
    name: "Sam Wilson",
    email: "sam@example.com",
    role: "user",
    avatar: "/avatars/user4.png",
    connectedAccounts: {
      linkedin: true,
      bluesky: false,
      threads: true,
      mastodon: false,
    },
    preferences: {
      darkMode: false,
      emailNotifications: true,
      pushNotifications: false,
    },
    subscription: {
      plan: "pro",
      status: "active",
      renewalDate: "2024-06-20",
    },
  },
];
