# Levercast – Software Requirements Specification (SRS)

## System Design
- **Core Goal**: Provide a platform for capturing ideas (text/voice), generating AI-driven posts for LinkedIn & Twitter, and publishing them via OAuth.
- **High-Level Flow**:  
  1. User inputs text/voice.  
  2. AI module processes input using predefined templates.  
  3. Results are displayed for LinkedIn/Twitter previews.  
  4. User edits/accepts output.  
  5. System posts to social platforms or saves drafts.

## Architecture Pattern
- **Layered (Monolithic) MVC**:
  - **Presentation Layer**: Web frontend (React or Vue).
  - **Business Logic Layer**: Node.js server with AI integration.
  - **Data Access Layer**: Database interactions (PostgreSQL or similar).
- **Rationale**: Simplified communication flow for an MVP with potential to evolve into microservices later.

## State Management
- **Front-End**:
  - Use a global state manager (e.g., Redux or Vuex) to handle user sessions, post drafts, and subscription status.
- **Server-Side**:
  - Session storage (JWT tokens) for authenticated routes.
  - Database state for posts, templates, and user data.

## Data Flow
- **Capture & Format**:
  1. User input (text/voice) sent to server.
  2. Server calls AI module with user’s template preferences.
  3. AI returns formatted content for each platform.
- **Publish**:
  1. Front-end sends publish request with selected platforms and final content.
  2. Server uses OAuth tokens to post to LinkedIn/Twitter.
  3. Server updates database with published post details.

## Technical Stack
- **Front-End**: React (with Redux or Context API), HTML/CSS, TypeScript (optional).
- **Back-End**: Node.js + Express for RESTful API, AI integration (via a language model API or library).
- **Database**: PostgreSQL for relational data (Users, Posts, Templates).
- **Hosting**: Cloud-based (AWS, Azure, or GCP).
- **OAuth**: Integration libraries for LinkedIn/Twitter (e.g., `passport.js` or similar).

## Authentication Process
- **User Sign-Up & Login**:
  - Uses JSON Web Tokens (JWT) for session management.
  - Password hashing (e.g., bcrypt) for secure storage.
- **OAuth for Social Posting**:
  - Upon connecting LinkedIn/Twitter, user consents via each platform’s OAuth flow.
  - Server stores encrypted OAuth tokens to enable one-click publishing.

## Route Design
- **Public Routes**:
  - `POST /api/auth/signup` – create user
  - `POST /api/auth/login` – user login
- **Protected Routes** (JWT required):
  - `GET /api/posts` – fetch user’s posts
  - `POST /api/posts` – create AI-generated post
  - `PUT /api/posts/:id` – update/edit post content
  - `POST /api/publish` – publish post(s) to selected platforms
  - `GET /api/account` – view subscription and connected accounts
  - `POST /api/account/connect` – link social platforms (OAuth)
  - `DELETE /api/account/disconnect/:platform` – revoke social access

## API Design
- **Request/Response Structure**:
  - JSON for all requests/responses.
  - Success/failure statuses with relevant error messages.
- **Key Endpoints**:
  - **Post Creation**: `POST /api/posts`  
    - Body includes raw text/voice transcript, chosen templates, or platform preferences.
  - **AI Formatting**: Invoked internally; returns structured content for LinkedIn/Twitter.
  - **Publishing**: `POST /api/publish`  
    - Body includes references to the post ID, platform selection, and final text.

## Database Design ERD
- **Entities**:
  1. **User** (user_id, email, password_hash, subscription_level)
  2. **Post** (post_id, user_id FK, content, status, created_at, updated_at)
  3. **Template** (template_id, title, body_structure, platform)
  4. **PlatformCredential** (platform_credential_id, user_id FK, platform_name, oauth_token, oauth_secret)
- **Relationships**:
  - One **User** to Many **Post**.
  - One **User** to Many **PlatformCredential**.
  - Many **Post** to Many **Template** (if extended to allow reference to multiple templates).
