import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      // Update the lastSyncedAt timestamp
      const updatedUser = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          lastSyncedAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          profileImage: true,
          lastSyncedAt: true,
        },
      });

      logger.info("User sync timestamp updated", {
        userId: updatedUser.id,
        clerkId: userId,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } else {
      // Get user data from request body
      const body = await request.json();
      const { email, name, username, profileImage } = body;

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: email || "",
          name: name || "",
          username: username || "",
          profileImage: profileImage || "",
          lastSyncedAt: new Date(),
          roles: {
            create: {
              role: "USER",
              scope: "global",
              permissions: ["read:own", "write:own"],
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          profileImage: true,
          lastSyncedAt: true,
        },
      });

      logger.info("New user created during sync", {
        userId: newUser.id,
        clerkId: userId,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ user: newUser }, { status: 201 });
    }
  } catch (error) {
    logger.error("Error syncing user", {
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
      service: "postcomposer",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
