/**
 * Premade Templates for PostComposer
 *
 * This file contains template data for various content types:
 * - Email Templates
 * - Newsletter Templates
 * - Blog Post Templates
 * - Content Outline Templates
 * - Script Templates for YouTube/Podcasts
 */

import { v4 as uuidv4 } from "uuid";

// Template Categories
export const templateCategories = [
  {
    id: uuidv4(),
    name: "Email Templates",
    description: "Professional email templates for various purposes",
  },
  {
    id: uuidv4(),
    name: "Newsletter Templates",
    description: "Structured newsletter formats for engaging subscribers",
  },
  {
    id: uuidv4(),
    name: "Blog Post Templates",
    description: "Well-structured blog post formats with sections",
  },
  {
    id: uuidv4(),
    name: "Content Outlines",
    description: "Frameworks for organizing content ideas",
  },
  {
    id: uuidv4(),
    name: "Script Templates",
    description: "Templates for YouTube videos and podcast episodes",
  },
];

// Get category ID by name
const getCategoryId = (name: string) => {
  const category = templateCategories.find((cat) => cat.name === name);
  return category ? category.id : "";
};

// Email Templates
export const emailTemplates = [
  {
    id: uuidv4(),
    name: "Professional Introduction",
    description:
      "A formal email template for introducing yourself to new contacts",
    content: `Subject: Introduction - [Your Name] from [Your Company]

Dear [Recipient Name],

I hope this email finds you well. My name is [Your Name], and I am the [Your Position] at [Your Company]. I recently [how you found/heard about the recipient] and was impressed by [something specific about their work/company].

I would love to connect and explore potential opportunities for collaboration between [Your Company] and [Recipient's Company]. Our company specializes in [brief description of your services/products], and I believe there could be synergies worth discussing.

Would you be available for a brief 15-minute call next week to discuss this further? I'm flexible on [mention available days/times].

Thank you for your time, and I look forward to your response.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Your Contact Information]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Email Templates"),
    tags: ["email", "introduction", "professional", "networking"],
  },
  {
    id: uuidv4(),
    name: "Meeting Follow-Up",
    description: "A template for following up after a business meeting",
    content: `Subject: Thank You for Our Meeting - Next Steps

Dear [Recipient Name],

Thank you for taking the time to meet with me [today/yesterday/on date]. I appreciated the opportunity to discuss [brief summary of what was discussed].

As promised, I'm following up with:
- [Action item 1]
- [Action item 2]
- [Resource/document you promised to share]

Based on our conversation, I understand that our next steps are:
1. [Next step 1]
2. [Next step 2]
3. [Next step 3]

I've scheduled our next meeting for [date and time]. Please let me know if this still works for you.

If you have any questions or need additional information before then, please don't hesitate to reach out.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Your Contact Information]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Email Templates"),
    tags: ["email", "follow-up", "meeting", "business"],
  },
  {
    id: uuidv4(),
    name: "Customer Support Response",
    description: "A template for responding to customer inquiries or issues",
    content: `Subject: Re: [Original Subject Line]

Dear [Customer Name],

Thank you for reaching out to us about [brief description of their inquiry/issue]. We appreciate you bringing this to our attention.

[If resolving the issue immediately:]
I'm pleased to inform you that we have [explanation of the resolution]. [Additional details about the solution if necessary.]

[If more time is needed:]
We're currently looking into [brief description of their issue] and will need some additional time to fully resolve this matter. We expect to have an update for you by [specific date/time].

[If requesting more information:]
To help us resolve this issue more efficiently, could you please provide the following information:
- [Information needed 1]
- [Information needed 2]
- [Information needed 3]

If you have any other questions or concerns in the meantime, please don't hesitate to reply to this email or call us at [support phone number].

Thank you for your patience and for being a valued customer.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Your Contact Information]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Email Templates"),
    tags: ["email", "customer support", "service", "response"],
  },
];

// Newsletter Templates
export const newsletterTemplates = [
  {
    id: uuidv4(),
    name: "Monthly Industry Update",
    description: "A newsletter template for sharing industry news and updates",
    content: `# [Your Company] Monthly Update - [Month Year]

## Hello [Subscriber Name],

Welcome to our monthly newsletter, where we share the latest industry trends, company updates, and valuable resources.

---

## 📰 Industry News

### [News Item 1 Title]
[Brief summary of the news item and its impact on the industry]
[Read more →](link)

### [News Item 2 Title]
[Brief summary of the news item and its impact on the industry]
[Read more →](link)

---

## 🚀 Company Updates

### [Update 1 Title]
[Brief description of company update, achievement, or announcement]

### [Update 2 Title]
[Brief description of company update, achievement, or announcement]

---

## 💡 Featured Content

### [Content Title]
[Brief description of the featured article, video, or resource]
[Check it out →](link)

---

## 📅 Upcoming Events

- **[Event 1 Name]** - [Date] - [Brief description]
- **[Event 2 Name]** - [Date] - [Brief description]

---

## 🔍 Did You Know?

[Interesting fact or tip related to your industry]

---

Thank you for being a valued subscriber. If you have any questions or feedback, simply reply to this email.

Best regards,
[Your Name]
[Your Position]
[Your Company]

[Unsubscribe link] | [Privacy Policy] | [Contact Us]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Newsletter Templates"),
    tags: ["newsletter", "monthly", "industry", "updates"],
  },
  {
    id: uuidv4(),
    name: "Product Launch Announcement",
    description:
      "A newsletter template for announcing a new product or feature",
    content: `# Introducing [Product Name] - [Tagline]

## Dear [Subscriber Name],

We're excited to announce the launch of [Product Name], designed to [brief description of what the product does and its main benefit].

---

## 🎉 What's New

[Product Name] offers:

- **[Feature 1]**: [Brief description of feature and benefit]
- **[Feature 2]**: [Brief description of feature and benefit]
- **[Feature 3]**: [Brief description of feature and benefit]

[See it in action →](link to product demo or video)

---

## 💬 What Our Early Users Are Saying

> "[Testimonial quote from early user]"
> — [User Name], [User Position/Company]

> "[Testimonial quote from early user]"
> — [User Name], [User Position/Company]

---

## 🚀 Getting Started

Ready to try [Product Name]? Here's how:

1. [Step 1 to get started]
2. [Step 2 to get started]
3. [Step 3 to get started]

[Get Started Now →](link)

---

## 📅 Upcoming Webinar

Join us on [Date] at [Time] for a live demonstration of [Product Name].

[Register Now →](link)

---

## 📚 Resources

- [Resource 1 Title](link)
- [Resource 2 Title](link)
- [Resource 3 Title](link)

---

We can't wait to hear what you think about [Product Name]! If you have any questions, our support team is ready to help.

Best regards,
[Your Name]
[Your Position]
[Your Company]

[Unsubscribe link] | [Privacy Policy] | [Contact Us]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Newsletter Templates"),
    tags: ["newsletter", "product launch", "announcement", "marketing"],
  },
];

// Blog Post Templates
export const blogPostTemplates = [
  {
    id: uuidv4(),
    name: "How-To Guide",
    description:
      "A step-by-step tutorial or guide for solving a specific problem",
    content: `# How to [Accomplish Specific Task]

![Featured Image](image-url)

**Published on:** [Date]
**Author:** [Author Name]

## Introduction

[Hook to grab attention - statistic, question, or bold statement]

[Brief explanation of why this topic matters to your audience]

[Overview of what the reader will learn and achieve by the end of the article]

## Prerequisites

Before you begin, make sure you have:

- [Prerequisite 1]
- [Prerequisite 2]
- [Prerequisite 3]

## Step 1: [First Step Title]

[Detailed explanation of the first step]

[Tips or common mistakes to avoid]

![Step 1 Image](image-url)

## Step 2: [Second Step Title]

[Detailed explanation of the second step]

[Tips or common mistakes to avoid]

![Step 2 Image](image-url)

## Step 3: [Third Step Title]

[Detailed explanation of the third step]

[Tips or common mistakes to avoid]

![Step 3 Image](image-url)

## Step 4: [Fourth Step Title]

[Detailed explanation of the fourth step]

[Tips or common mistakes to avoid]

![Step 4 Image](image-url)

## Common Challenges and Solutions

### Challenge 1: [Common Issue]
[Solution to the issue]

### Challenge 2: [Common Issue]
[Solution to the issue]

## Best Practices

- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

## Conclusion

[Summary of what the reader has learned]

[Reminder of the benefits of implementing this solution]

[Call to action - what should the reader do next?]

## Additional Resources

- [Resource 1](link)
- [Resource 2](link)
- [Resource 3](link)

---

**Have questions or feedback about this guide? Let us know in the comments below!**`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Blog Post Templates"),
    tags: ["blog", "how-to", "tutorial", "guide"],
  },
  {
    id: uuidv4(),
    name: "Industry Trends Analysis",
    description: "A blog post analyzing current trends in your industry",
    content: `# [Number] [Industry] Trends to Watch in [Year]

![Featured Image](image-url)

**Published on:** [Date]
**Author:** [Author Name]

## Introduction

[Hook - surprising statistic or statement about the industry]

[Brief overview of the current state of the industry]

[Why staying on top of these trends matters for professionals in this field]

## Trend 1: [Trend Name]

### What It Is

[Detailed explanation of the trend]

### Why It Matters

[Impact on the industry and businesses]

### Real-World Examples

- [Company/Case Study 1]
- [Company/Case Study 2]

### Expert Insight

> "[Expert quote about this trend]"
> — [Expert Name], [Expert Position/Company]

## Trend 2: [Trend Name]

### What It Is

[Detailed explanation of the trend]

### Why It Matters

[Impact on the industry and businesses]

### Real-World Examples

- [Company/Case Study 1]
- [Company/Case Study 2]

### Expert Insight

> "[Expert quote about this trend]"
> — [Expert Name], [Expert Position/Company]

## Trend 3: [Trend Name]

### What It Is

[Detailed explanation of the trend]

### Why It Matters

[Impact on the industry and businesses]

### Real-World Examples

- [Company/Case Study 1]
- [Company/Case Study 2]

### Expert Insight

> "[Expert quote about this trend]"
> — [Expert Name], [Expert Position/Company]

## How to Prepare for These Trends

[Actionable advice for businesses and professionals]

[Specific steps to take advantage of these trends]

## Conclusion

[Summary of the trends discussed]

[Final thoughts on the future of the industry]

[Call to action - what should readers do with this information?]

## Additional Resources

- [Resource 1](link)
- [Resource 2](link)
- [Resource 3](link)

---

**What trends are you seeing in the industry? Share your thoughts in the comments below!**`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Blog Post Templates"),
    tags: ["blog", "trends", "analysis", "industry"],
  },
];

// Content Outline Templates
export const contentOutlineTemplates = [
  {
    id: uuidv4(),
    name: "Comprehensive Guide Outline",
    description: "A detailed outline for creating in-depth guides on any topic",
    content: `# [Topic] Guide: [Subtitle]

## 1. Introduction
- Hook: [Attention-grabbing opening]
- Problem statement: [What issue does this guide solve?]
- Value proposition: [What will readers gain?]
- Credibility: [Why should readers trust this guide?]
- Overview: [Brief summary of what will be covered]

## 2. Background/Context
- History: [Brief history of the topic]
- Current landscape: [State of the industry/topic today]
- Key terminology: [Definitions of important terms]
- Common misconceptions: [Myths to debunk]

## 3. Core Section 1: [Fundamental Concept]
- Main point 1.1: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote
- Main point 1.2: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote
- Main point 1.3: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote

## 4. Core Section 2: [Fundamental Concept]
- Main point 2.1: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote
- Main point 2.2: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote
- Main point 2.3: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote

## 5. Core Section 3: [Fundamental Concept]
- Main point 3.1: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote
- Main point 3.2: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote
- Main point 3.3: [Key idea]
  - Supporting evidence
  - Example
  - Expert quote

## 6. Practical Application
- Step-by-step process
- Case studies
- Tools and resources
- Templates or frameworks

## 7. Common Challenges and Solutions
- Challenge 1: [Common problem]
  - Solution 1.1
  - Solution 1.2
- Challenge 2: [Common problem]
  - Solution 2.1
  - Solution 2.2
- Challenge 3: [Common problem]
  - Solution 3.1
  - Solution 3.2

## 8. Future Trends
- Emerging developments
- Predictions from experts
- How to stay ahead

## 9. Conclusion
- Summary of key points
- Final thoughts
- Call to action

## 10. Additional Resources
- Books
- Articles
- Tools
- Communities
- Courses`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["outline", "guide", "comprehensive", "planning"],
  },
  {
    id: uuidv4(),
    name: "Case Study Outline",
    description: "An outline for creating compelling case studies",
    content: `# [Client/Project Name] Case Study: [Key Result]

## 1. Executive Summary
- Client/project overview
- Key challenges
- Solution implemented
- Results achieved (with specific metrics)
- Timeframe

## 2. Client/Project Background
- Company/organization information
- Industry context
- Size, location, market position
- Previous situation
- Goals and objectives

## 3. Challenge
- Primary problem statement
- Specific pain points
- Business impact of the problem
- Previous attempts to solve
- Constraints and limitations

## 4. Solution
- Solution overview
- Selection process/why this approach
- Implementation details
  - Phase 1: [Description]
  - Phase 2: [Description]
  - Phase 3: [Description]
- Key features/components
- Team involved
- Timeline

## 5. Implementation Process
- Planning stage
- Execution details
- Challenges encountered
- How challenges were overcome
- Collaboration highlights

## 6. Results
- Quantitative outcomes
  - Metric 1: [Before vs. After]
  - Metric 2: [Before vs. After]
  - Metric 3: [Before vs. After]
- Qualitative outcomes
  - Testimonial 1
  - Testimonial 2
- ROI analysis
- Unexpected benefits
- Before and after comparison

## 7. Key Learnings
- What worked well
- What could have been improved
- Insights gained
- Best practices identified

## 8. Future Plans
- Next steps
- Long-term vision
- Ongoing improvements
- Expansion possibilities

## 9. Client Testimonial
- Quote from key stakeholder
- Video testimonial (if available)

## 10. About [Your Company]
- Brief company description
- Relevant expertise
- Similar case studies
- Contact information`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["outline", "case study", "business", "results"],
  },
];

// Script Templates
export const scriptTemplates = [
  {
    id: uuidv4(),
    name: "YouTube Tutorial Script",
    description: "A script template for creating educational YouTube videos",
    content: `# [Video Title] - YouTube Tutorial Script

## Video Details
- **Duration:** [Estimated length]
- **Target Audience:** [Who this video is for]
- **Video Type:** Tutorial/How-To
- **Key Takeaway:** [What viewers will learn]

## INTRO (0:00-0:30)
- **Hook:** [Attention-grabbing opening line]
- **Problem Statement:** [What problem does this tutorial solve?]
- **Credibility:** [Why should viewers trust you on this topic?]
- **Video Overview:** "In this video, I'll show you how to [main topic]. We'll cover [subtopic 1], [subtopic 2], and [subtopic 3]."
- **Quick Disclaimer:** [Any necessary disclaimers]

## CHANNEL BRANDING (0:30-0:45)
- Standard channel intro/animation
- "If you're new here, I'm [Your Name] and I [what you do/channel focus]."
- "Don't forget to subscribe and hit the notification bell to [benefit of subscribing]."

## MAIN CONTENT

### SECTION 1: [Subtopic 1] (0:45-3:00)
- **Intro to concept:** [Brief explanation]
- **Demonstration:** [Step-by-step walkthrough]
- **Common mistakes to avoid:** [Pitfalls]
- **Pro tip:** [Advanced insight]
- **Section summary:** "Now that we've covered [subtopic 1], let's move on to..."

### SECTION 2: [Subtopic 2] (3:00-6:00)
- **Intro to concept:** [Brief explanation]
- **Demonstration:** [Step-by-step walkthrough]
- **Common mistakes to avoid:** [Pitfalls]
- **Pro tip:** [Advanced insight]
- **Section summary:** "Now that we've covered [subtopic 2], let's move on to..."

### SECTION 3: [Subtopic 3] (6:00-9:00)
- **Intro to concept:** [Brief explanation]
- **Demonstration:** [Step-by-step walkthrough]
- **Common mistakes to avoid:** [Pitfalls]
- **Pro tip:** [Advanced insight]
- **Section summary:** "Now that we've covered [subtopic 3], let's wrap things up..."

## CONCLUSION (9:00-10:00)
- **Recap:** "Today we learned how to [main topic]. We covered [subtopic 1], [subtopic 2], and [subtopic 3]."
- **Real-world application:** "You can use this to [practical application]."
- **Call to Action:** "If you found this helpful, please give it a thumbs up and share it with someone who might need it."
- **Question prompt:** "Let me know in the comments if you have any questions or what topic you'd like me to cover next."
- **Outro:** "Thanks for watching, and I'll see you in the next video!"

## B-ROLL/VISUALS NOTES
- [Timestamp]: [Visual needed]
- [Timestamp]: [Visual needed]
- [Timestamp]: [Visual needed]

## ON-SCREEN TEXT/GRAPHICS
- [Timestamp]: [Text/graphic needed]
- [Timestamp]: [Text/graphic needed]
- [Timestamp]: [Text/graphic needed]

## ADDITIONAL NOTES
- [Any other production notes or reminders]
- [Equipment needed]
- [Special editing instructions]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Script Templates"),
    tags: ["script", "youtube", "tutorial", "video"],
  },
  {
    id: uuidv4(),
    name: "Podcast Episode Script",
    description: "A script template for creating engaging podcast episodes",
    content: `# [Episode Title] - Podcast Episode [Number]

## Episode Details
- **Duration:** [Estimated length]
- **Guest:** [Guest name and title, if applicable]
- **Topic:** [Main topic]
- **Release Date:** [Planned release date]

## PRE-RECORDING CHECKLIST
- Confirm recording equipment is working
- Test audio levels
- Prepare water/drinks
- Review guest research/questions
- Minimize background noise
- Start recording software

## INTRO (0:00-2:00)
- **Music/Intro Jingle**
- "Welcome to [Podcast Name], the show where [podcast premise]. I'm your host, [Your Name]."
- "Today we're talking about [topic] and why it matters for [target audience]."
- "If you're new to the show, [brief explanation of what the podcast is about]."
- [If applicable] "I'm excited to be joined by [Guest Name], who is [guest credentials]."

## SPONSOR MESSAGE #1 (2:00-3:00)
- "Before we dive in, a quick word from our sponsor, [Sponsor Name]."
- [Sponsor script]
- "Now, let's get back to our conversation about [topic]."

## MAIN CONTENT

### SEGMENT 1: [Subtopic 1] (3:00-15:00)
- **Introduction to segment:** [Frame the discussion]
- **Key questions:**
  - [Question 1]
  - [Question 2]
  - [Question 3]
- **Talking points:**
  - [Point 1]
  - [Point 2]
  - [Point 3]
- **Transition:** "Now that we've explored [subtopic 1], let's talk about..."

### SEGMENT 2: [Subtopic 2] (15:00-27:00)
- **Introduction to segment:** [Frame the discussion]
- **Key questions:**
  - [Question 1]
  - [Question 2]
  - [Question 3]
- **Talking points:**
  - [Point 1]
  - [Point 2]
  - [Point 3]
- **Transition:** "That brings us to our next topic..."

## SPONSOR MESSAGE #2 (27:00-28:00)
- "We'll be right back after this message from [Sponsor Name]."
- [Sponsor script]
- "Welcome back to [Podcast Name]."

### SEGMENT 3: [Subtopic 3] (28:00-40:00)
- **Introduction to segment:** [Frame the discussion]
- **Key questions:**
  - [Question 1]
  - [Question 2]
  - [Question 3]
- **Talking points:**
  - [Point 1]
  - [Point 2]
  - [Point 3]

## LISTENER QUESTIONS (40:00-45:00)
- "Now it's time for some questions from our listeners."
- [Question 1] from [Listener Name]
- [Question 2] from [Listener Name]
- [Question 3] from [Listener Name]

## CONCLUSION (45:00-48:00)
- **Recap:** "Today we covered [recap of main points]."
- **Key takeaways:** "The main things to remember are..."
- **Call to Action:** "If you enjoyed this episode, please subscribe, rate, and review us on your favorite podcast platform."
- **Next episode teaser:** "Next week, we'll be discussing [next topic] with [next guest if applicable]."
- **Thank guest:** "I want to thank [Guest Name] for joining us today."
- **Sign off:** "This has been [Podcast Name]. I'm [Your Name], and I'll talk to you next time."

## OUTRO MUSIC

## POST-PRODUCTION NOTES
- [Edit points]
- [Sound effects to add]
- [Sections that might need trimming]
- [Additional resources to link in show notes]`,
    platform: "linkedin",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Script Templates"),
    tags: ["script", "podcast", "audio", "interview"],
  },
];

// Bluesky Templates - Short-form content optimized for 300 character limit
export const blueskyTemplates = [
  {
    id: uuidv4(),
    name: "Bluesky Announcement",
    description:
      "A concise announcement template for Bluesky's 300 character limit",
    content: `📢 [ANNOUNCEMENT_TITLE]

[BRIEF_DESCRIPTION]

Learn more: [LINK]

#[HASHTAG1] #[HASHTAG2]`,
    platform: "bluesky",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["bluesky", "announcement", "short-form"],
  },
  {
    id: uuidv4(),
    name: "Bluesky Question",
    description: "Engage your audience with a thought-provoking question",
    content: `💭 [QUESTION]

What do you think? Share your thoughts below!

#[HASHTAG1] #[HASHTAG2]`,
    platform: "bluesky",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["bluesky", "question", "engagement", "short-form"],
  },
  {
    id: uuidv4(),
    name: "Bluesky Quick Tip",
    description: "Share a valuable tip within Bluesky's character limit",
    content: `💡 Quick Tip: [TIP_TITLE]

[TIP_CONTENT]

Found this helpful? Repost to share with others!

#[HASHTAG1] #[HASHTAG2]`,
    platform: "bluesky",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["bluesky", "tip", "advice", "short-form"],
  },
  {
    id: uuidv4(),
    name: "Bluesky Quote",
    description: "Share an inspiring quote with your audience",
    content: `"[QUOTE]" — [AUTHOR]

[YOUR_REFLECTION]

#[HASHTAG1] #[HASHTAG2]`,
    platform: "bluesky",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["bluesky", "quote", "inspiration", "short-form"],
  },
];

// Threads Templates - Utilizing the 500 character limit
export const threadsTemplates = [
  {
    id: uuidv4(),
    name: "Threads Story",
    description: "Share a personal story or anecdote on Threads",
    content: `✨ [STORY_TITLE]

[STORY_BEGINNING]

[STORY_MIDDLE]

[STORY_ENDING]

What's your experience with this? I'd love to hear your stories in the replies!

#[HASHTAG1] #[HASHTAG2] #[HASHTAG3]`,
    platform: "threads",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["threads", "story", "personal", "short-form"],
  },
  {
    id: uuidv4(),
    name: "Threads List Post",
    description: "Share a numbered list of tips, ideas, or resources",
    content: `📋 [LIST_TITLE]

1️⃣ [ITEM_ONE]
2️⃣ [ITEM_TWO]
3️⃣ [ITEM_THREE]
4️⃣ [ITEM_FOUR]
5️⃣ [ITEM_FIVE]

Which one resonates with you the most? Let me know in the replies!

#[HASHTAG1] #[HASHTAG2]`,
    platform: "threads",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["threads", "list", "tips", "short-form"],
  },
  {
    id: uuidv4(),
    name: "Threads Product Launch",
    description: "Announce a new product or service on Threads",
    content: `🚀 Introducing [PRODUCT_NAME]!

[PRODUCT_DESCRIPTION]

✅ [KEY_FEATURE_1]
✅ [KEY_FEATURE_2]
✅ [KEY_FEATURE_3]

Available now: [LINK]

Drop a 🔥 if you're excited!

#[HASHTAG1] #[HASHTAG2] #[HASHTAG3]`,
    platform: "threads",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["threads", "product", "launch", "short-form"],
  },
  {
    id: uuidv4(),
    name: "Threads Behind-the-Scenes",
    description: "Share behind-the-scenes content with your audience",
    content: `👀 Behind the scenes at [COMPANY/PROJECT]

[DESCRIPTION_OF_PROCESS]

What we learned:
• [LEARNING_POINT_1]
• [LEARNING_POINT_2]
• [LEARNING_POINT_3]

Would you like to see more content like this? Let me know!

#[HASHTAG1] #[HASHTAG2] #BehindTheScenes`,
    platform: "threads",
    isDefault: true,
    isCustom: false,
    category: getCategoryId("Content Outlines"),
    tags: ["threads", "behind-the-scenes", "process", "short-form"],
  },
];

// Combine all templates
export const allTemplates = [
  ...emailTemplates,
  ...newsletterTemplates,
  ...blogPostTemplates,
  ...contentOutlineTemplates,
  ...scriptTemplates,
  ...blueskyTemplates,
  ...threadsTemplates,
];

// Export a function to seed the database with these templates
export async function seedTemplates() {
  try {
    // Call the API route to seed templates
    const response = await fetch("/api/seed-templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to seed templates");
    }

    return data;
  } catch (error) {
    console.error("Error seeding templates:", error);
    return {
      success: false,
      message: "Failed to seed templates",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Export all templates is no longer needed as each template array is exported individually
