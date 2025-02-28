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
