export interface Post {
  id: string;
  content: string;
  createdAt: string;
  platforms: {
    linkedin?: {
      content: string;
      published: boolean;
      publishedAt?: string;
    };
    twitter?: {
      content: string;
      published: boolean;
      publishedAt?: string;
    };
  };
}

export interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: string;
  platform: "linkedin" | "twitter";
  postId?: string; // Reference to the original post if applicable
  repeat?: "none" | "daily" | "weekly" | "monthly";
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
    twitter: boolean;
  };
}

export interface Template {
  id: string;
  name: string;
  platform: "linkedin" | "twitter";
  structure: string;
}

export interface PostAnalytics {
  postId: string;
  platform: "linkedin" | "twitter";
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

// Mock data for posts
export const mockPosts: Post[] = [
  {
    id: "1",
    content:
      "Just launched our new product! So excited to share this with everyone.",
    createdAt: "2023-06-15T10:30:00Z",
    platforms: {
      linkedin: {
        content:
          "I'm thrilled to announce the launch of our new product! After months of hard work, our team has created something truly special. #ProductLaunch #Innovation",
        published: true,
        publishedAt: "2023-06-15T10:35:00Z",
      },
      twitter: {
        content:
          "Just launched our new product! 🚀 Check it out at example.com #NewProduct #Excited",
        published: true,
        publishedAt: "2023-06-15T10:35:00Z",
      },
    },
  },
  {
    id: "2",
    content:
      "Here are 5 tips for improving your productivity while working from home.",
    createdAt: "2023-06-10T14:20:00Z",
    platforms: {
      linkedin: {
        content:
          "Working from home can be challenging. Here are 5 tips I've found helpful for maintaining productivity:\n\n1. Create a dedicated workspace\n2. Stick to a schedule\n3. Take regular breaks\n4. Set clear boundaries\n5. Stay connected with your team\n\nWhat strategies have worked for you? #RemoteWork #Productivity",
        published: true,
        publishedAt: "2023-06-10T14:25:00Z",
      },
      twitter: {
        content:
          "5 WFH productivity tips:\n\n1. Dedicated workspace\n2. Consistent schedule\n3. Regular breaks\n4. Clear boundaries\n5. Team connection\n\nWhat works for you? #RemoteWork",
        published: false,
      },
    },
  },
  {
    id: "3",
    content:
      "Attended an amazing conference on AI and machine learning yesterday.",
    createdAt: "2023-06-05T09:15:00Z",
    platforms: {
      linkedin: {
        content:
          "Yesterday, I had the privilege of attending the Future of AI Conference. The insights shared by industry leaders were truly eye-opening. Particularly fascinated by the discussions on ethical AI development and practical applications in healthcare.\n\nKey takeaways:\n- AI ethics should be built-in, not bolted on\n- Healthcare applications showing promising results\n- Collaboration between humans and AI remains essential\n\n#AIConference #MachineLearning #TechInnovation",
        published: false,
      },
    },
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
  },
  {
    id: "sched2",
    content:
      "Just launched our new product! 🚀 Check it out at example.com #NewProduct #Excited",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    platform: "twitter",
    postId: "1",
    repeat: "none",
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
  },
  {
    id: "sched4",
    content:
      "5 WFH productivity tips: 1. Dedicated workspace 2. Consistent schedule 3. Regular breaks...",
    scheduledDate: new Date(
      new Date().setDate(new Date().getDate() + 3)
    ).toISOString(),
    platform: "twitter",
    postId: "2",
    repeat: "weekly",
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
    platform: "twitter",
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
    twitter: true,
  },
};

// Mock templates
export const mockTemplates: Template[] = [
  {
    id: "template1",
    name: "Professional Announcement",
    platform: "linkedin",
    structure:
      "I'm excited to share that [MAIN_POINT]. This represents [SIGNIFICANCE]. #[HASHTAG1] #[HASHTAG2]",
  },
  {
    id: "template2",
    name: "Quick Update",
    platform: "twitter",
    structure: "Just [ACTION]! [EMOJI] [BRIEF_DETAIL] #[HASHTAG]",
  },
  {
    id: "template3",
    name: "List Format",
    platform: "linkedin",
    structure:
      "[TOPIC] tips:\n\n1. [POINT1]\n2. [POINT2]\n3. [POINT3]\n4. [POINT4]\n5. [POINT5]\n\n#[HASHTAG1] #[HASHTAG2]",
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
