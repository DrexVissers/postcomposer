import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: { clerkId: string } }
) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();

    // Get the requested clerkId from the URL params - fix for Next.js 15
    // Create a new variable to avoid the error with params.clerkId
    const requestedClerkId = String(params.clerkId);

    // Check if this is an authenticated request
    const isAuthenticated = !!userId;

    // For authenticated requests, only allow users to access their own data
    // unless they have admin permissions (future enhancement)
    if (isAuthenticated && userId !== requestedClerkId) {
      return NextResponse.json(
        { error: "Forbidden: You can only access your own user data" },
        { status: 403 }
      );
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { clerkId: requestedClerkId },
      include: {
        // Only include roles and social accounts for authenticated users
        ...(isAuthenticated
          ? {
              roles: {
                select: {
                  id: true,
                  role: true,
                  scope: true,
                  permissions: true,
                },
              },
              socialAccounts: {
                select: {
                  id: true,
                  platform: true,
                  handle: true,
                  profileUrl: true,
                  isConnected: true,
                },
              },
            }
          : {}),
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // For non-authenticated requests, only return public data
    const responseData = isAuthenticated
      ? { user }
      : {
          user: {
            id: user.id,
            clerkId: user.clerkId,
            name: user.name,
            username: user.username,
            profileImage: user.profileImage,
          },
        };

    // Log the successful request
    logger.info("User details retrieved", {
      userId: user.id,
      clerkId: requestedClerkId,
      service: "socialsphere",
      timestamp: new Date().toISOString(),
    });

    // Return the user data
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    logger.error("Error retrieving user details", {
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
      params,
      service: "socialsphere",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "Failed to retrieve user details" },
      { status: 500 }
    );
  }
}
