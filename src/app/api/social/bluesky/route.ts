import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getBlueskyProfile } from "../../../../../lib/bluesky";

// Connect Bluesky account
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, handle, appPassword } = body;

    if (!userId || !handle || !appPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify credentials by getting profile
    try {
      const profile = await getBlueskyProfile(handle, appPassword);

      // Create or update social account
      const socialAccount = await prisma.socialAccount.upsert({
        where: {
          id: `${userId}-bluesky`,
        },
        update: {
          handle: handle,
          accessToken: appPassword, // Note: In production, encrypt this
          isConnected: true,
          profileUrl: `https://bsky.app/profile/${profile.handle || handle}`,
        },
        create: {
          id: `${userId}-bluesky`,
          userId: userId,
          platform: "bluesky",
          handle: handle,
          accessToken: appPassword, // Note: In production, encrypt this
          isConnected: true,
          profileUrl: `https://bsky.app/profile/${profile.handle || handle}`,
        },
      });

      return NextResponse.json(
        {
          success: true,
          account: {
            id: socialAccount.id,
            platform: socialAccount.platform,
            handle: socialAccount.handle,
            profileUrl: socialAccount.profileUrl,
            isConnected: socialAccount.isConnected,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error verifying Bluesky credentials:", error);
      return NextResponse.json(
        { error: "Invalid Bluesky credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error connecting Bluesky account:", error);
    return NextResponse.json(
      { error: "Failed to connect Bluesky account" },
      { status: 500 }
    );
  }
}

// Get Bluesky account
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const socialAccount = await prisma.socialAccount.findFirst({
      where: {
        userId: userId,
        platform: "bluesky",
      },
    });

    if (!socialAccount) {
      return NextResponse.json({ connected: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        connected: socialAccount.isConnected,
        account: {
          id: socialAccount.id,
          platform: socialAccount.platform,
          handle: socialAccount.handle,
          profileUrl: socialAccount.profileUrl,
          isConnected: socialAccount.isConnected,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting Bluesky account:", error);
    return NextResponse.json(
      { error: "Failed to get Bluesky account" },
      { status: 500 }
    );
  }
}
