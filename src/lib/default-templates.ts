import { Template } from "./mock-data";

export const socialMediaTemplates: Template[] = [
  // LinkedIn Templates
  {
    id: "linkedin-announcement",
    name: "Company Announcement",
    platform: "linkedin",
    content: `🎉 Exciting News! [Company Name] is thrilled to announce [announcement]!

Key Highlights:
• [Key Point 1]
• [Key Point 2]
• [Key Point 3]

[Additional context and impact]

#CompanyNews #Innovation #[Industry]`,
    description: "Perfect for company announcements and major updates",
    category: "linkedin",
    isDefault: true,
  },
  {
    id: "linkedin-thought-leadership",
    name: "Thought Leadership Post",
    platform: "linkedin",
    content: `💡 [Interesting observation or insight about your industry]

Here's what I've learned:

1. [First point with brief explanation]
2. [Second point with brief explanation]
3. [Third point with brief explanation]

What's your take on this? Share your thoughts below! 👇

#ThoughtLeadership #[Industry] #ProfessionalDevelopment`,
    description: "Share insights and spark meaningful discussions",
    category: "linkedin",
    isDefault: true,
  },

  // Threads Templates
  {
    id: "threads-story",
    name: "Story Thread",
    platform: "threads",
    content: `🧵 Let me tell you a story about [topic]...

1/ [Opening hook]

2/ [Build up]

3/ [Key moment]

4/ [Lesson or takeaway]

5/ [Call to action or question]

Follow for more stories like this! ✨`,
    description: "Create engaging story-based threads",
    category: "threads",
    isDefault: true,
  },
  {
    id: "threads-tips",
    name: "Quick Tips Thread",
    platform: "threads",
    content: `💫 [Number] Quick Tips for [topic]:

1. [First tip]
2. [Second tip]
3. [Third tip]
4. [Fourth tip]
5. [Fifth tip]

Save this for later! 🔖
Follow for more tips! ✨`,
    description: "Share valuable tips in an easy-to-read format",
    category: "threads",
    isDefault: true,
  },

  // Bluesky Templates
  {
    id: "bluesky-discussion",
    name: "Discussion Starter",
    platform: "bluesky",
    content: `🤔 Question for the timeline:

[Thought-provoking question about current trends or industry topic]

My thoughts:
[Brief opinion or observation]

What do you think? 

#Discussion #[Topic] #[Industry]`,
    description: "Start engaging discussions with your audience",
    category: "bluesky",
    isDefault: true,
  },
  {
    id: "bluesky-update",
    name: "Project Update",
    platform: "bluesky",
    content: `✨ Project Update ✨

Currently working on: [Project name/description]

Progress:
• [Achievement 1]
• [Achievement 2]
• [Next steps]

Stay tuned for more! 🚀

#BuildingInPublic #[Project] #[Industry]`,
    description: "Share project updates and progress",
    category: "bluesky",
    isDefault: true,
  },

  // Mastodon Templates
  {
    id: "mastodon-introduction",
    name: "Introduction Post",
    platform: "mastodon",
    content: `👋 Hello Mastodon!

I'm [name/role] and I'm here to share:
• [Topic 1]
• [Topic 2]
• [Topic 3]

Looking forward to connecting with:
🔹 [Community 1]
🔹 [Community 2]
🔹 [Community 3]

#Introduction #[Industry] #[Interests]`,
    description: "Introduce yourself to the Mastodon community",
    category: "mastodon",
    isDefault: true,
  },
  {
    id: "mastodon-share",
    name: "Resource Share",
    platform: "mastodon",
    content: `📚 Useful Resource Alert!

Title: [Resource name]

Why it's valuable:
• [Point 1]
• [Point 2]
• [Point 3]

Link: [URL]

#ResourceShare #[Topic] #Useful`,
    description: "Share valuable resources with your followers",
    category: "mastodon",
    isDefault: true,
  },
];
