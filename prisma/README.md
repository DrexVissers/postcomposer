# Prisma Setup for SocialSphere

This directory contains the Prisma schema and related files for the SocialSphere project.

## Getting Started

1. Make sure you have updated your `.env` file with your actual Supabase database password:

```
DATABASE_URL="postgresql://postgres.ezklqfvlhvzgtljttqha:YOUR_ACTUAL_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.ezklqfvlhvzgtljttqha:YOUR_ACTUAL_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

2. Generate the Prisma Client:

```bash
npx prisma generate
```

3. Push your schema to the database:

```bash
npx prisma db push
```

## Common Commands

- **Generate Prisma Client**: `npx prisma generate`
- **Push Schema Changes**: `npx prisma db push`
- **Pull Database Schema**: `npx prisma db pull`
- **Open Prisma Studio**: `npx prisma studio`

## Using Prisma in Your Code

Import the Prisma client from the utility file:

```typescript
import { prisma } from "../lib/prisma";
```

Example usage:

```typescript
// Get all users
const users = await prisma.user.findMany();

// Create a new user
const newUser = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
    username: "johndoe",
  },
});

// Get user with their posts
const userWithPosts = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: { posts: true },
});
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma with Next.js](https://www.prisma.io/nextjs)
- [Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase)
