# PostComposer – User Interface Design Document

## 1. Layout Structure

- **Dashboard Overview**

  - **Left-Side Navigation**: Sections for "My Posts," "Create Post," "Account Settings," (future expansion to "Analytics").
  - **Header Area**: Displays brand logo, notifications (if any), and a quick user profile menu.
  - **Main Content Panel**: Dynamically changes based on the user's navigation choice:
    - **My Posts**: List view of past and scheduled posts (future).
    - **Create Post**: Central text/voice input panel and post preview tabs.
    - **Account Settings**: Subscription management, social account connections.

- **Responsive Design**
  - On smaller screens (e.g., mobile), the navigation collapses into a hamburger menu.
  - The main content panel remains the focus with clear CTA buttons to maintain ease of publishing on-the-go.

---

## 2. Core Components

1. **Nav Menu (Left Sidebar)**

   - **Icons & Labels** for quick identification (e.g., a house icon for "My Posts," a plus icon for "Create Post").
   - Collapsible to give more space to the main content if needed.

2. **Post List (My Posts)**

   - Displays recent posts with minimal metadata (post title/first line, date/time published).
   - Clicking a post opens a detail view in the main panel for quick editing/review (in MVP, may only view content).

3. **Post Creation Panel**

   - **Input Box**: Text or voice input for capturing ideas.
   - **Preview Tabs**: Horizontal tabs for LinkedIn and Twitter. Each tab shows an AI-generated draft with platform-appropriate styling.
   - **Edit & Publish Controls**: Inline editing, "Publish" button, and optional image upload.

4. **Account Settings**
   - **Subscription Status**: Users can view or upgrade their plan, see billing details.
   - **Connected Accounts**: OAuth connections for LinkedIn and Twitter, with on/off toggles or revoke access options.
   - **Profile Info**: Basic user details (name, email).

---

## 3. Interaction Patterns

1. **Navigation & Dashboard Access**

   - User logs in and lands on the "My Posts" screen.
   - Side navigation allows quick switching between sections.

2. **Creating a Post**

   - Users click **"Create Post"** in the sidebar.
   - Type or record their idea, watch real-time AI suggestions in separate preview tabs.
   - Switch tabs to refine text for each platform, add images, then hit "Publish."

3. **Editing & Publishing**

   - From the **"My Posts"** view, clicking on a post opens it for editing (if it's still in draft).
   - Once satisfied, the user selects **"Publish"** to send it to the connected platforms.

4. **Managing Accounts & Subscription**
   - Click **"Account Settings"** in the sidebar.
   - Update subscription tier, connect/disconnect social media accounts, manage personal info.

---

## 4. Visual Design Elements & Color Scheme

- **Color Palette**

  - **Neutral Backgrounds**: Light gray or off-white (#F7F7F7) for main panels.
  - **Primary Accent**: A vibrant teal or blue (#008CBA) for CTA buttons, tab highlights, and link hovers.
  - **Secondary Accent**: Mid-gray (#4A4A4A) for text and UI dividers.

- **Icons & Imagery**

  - Simple, modern icon set for navigation (e.g., Material Design or a similar open-source library).
  - Minimal decorative imagery to keep focus on the content creation and previews.

- **Overall Aesthetic**
  - Clean, professional feel. Limited use of shadows or gradients, leaning toward a flat/UI minimal style.
  - Clear separation of sections using subtle lines or contrasting backgrounds.

---

## 5. Typography

- **Primary Font**: A modern sans-serif (e.g., **Roboto**, **Open Sans**, or **Nunito**).
- **Font Sizes**:
  - Headings: 16–20pt (scalable based on breakpoints).
  - Body Text: 14–16pt for easy reading.
  - Labels & Captions: 12–14pt.
- **Emphasis & Hierarchy**:
  - Use bold for headings and subheadings.
  - Use standard weight (400–500) for body text to maintain clarity and readability.

---

## 6. Accessibility

- **Color Contrast**: Ensure text and icon color contrast meets or exceeds WCAG AA guidelines, particularly for teal/blue text on light backgrounds.
- **Keyboard Navigation**: All interactive elements (buttons, form fields, nav items) are accessible via tab and arrow keys.
- **Labels & ARIA Attributes**: Proper labeling of forms, tabs, and voice input buttons for screen readers.
- **Responsive Touch Targets**: Ensure buttons and links meet minimum size guidelines on mobile devices to accommodate different user needs.
