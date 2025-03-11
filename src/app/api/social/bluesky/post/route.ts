import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { postToBluesky } from "../../../../../../lib/bluesky";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, content, imageUrl, postId } = body;

    if (!userId || !content) {
      return NextResponse.json(
        { error: "User ID and content are required" },
        { status: 400 }
      );
    }

    // Get the user's Bluesky account
    const socialAccount = await prisma.socialAccount.findFirst({
      where: {
        userId: userId,
        platform: "bluesky",
        isConnected: true,
      },
    });

    if (!socialAccount || !socialAccount.handle || !socialAccount.accessToken) {
      return NextResponse.json(
        { error: "Bluesky account not connected" },
        { status: 400 }
      );
    }

    // Post to Bluesky
    try {
      const result = await postToBluesky(
        socialAccount.handle,
        socialAccount.accessToken,
        content,
        imageUrl
      );

      // If a postId was provided, update the post platform status
      if (postId) {
        await prisma.postPlatform.upsert({
          where: {
            id: `${postId}-bluesky`,
          },
          update: {
            status: "published",
            publishedAt: new Date(),
            platformPostId: result.uri || null,
          },
          create: {
            id: `${postId}-bluesky`,
            postId: postId,
            platform: "bluesky",
            content: content,
            status: "published",
            publishedAt: new Date(),
            platformPostId: result.uri || null,
          },
        });
      }

      return NextResponse.json(
        {
          success: true,
          postUrl: `https://bsky.app/profile/${
            socialAccount.handle
          }/post/${result.uri?.split("/").pop()}`,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error posting to Bluesky:", error);

      // If a postId was provided, update the post platform status to failed
      if (postId) {
        await prisma.postPlatform.upsert({
          where: {
            id: `${postId}-bluesky`,
          },
          update: {
            status: "failed",
          },
          create: {
            id: `${postId}-bluesky`,
            postId: postId,
            platform: "bluesky",
            content: content,
            status: "failed",
          },
        });
      }

      return NextResponse.json(
        { error: "Failed to post to Bluesky" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in Bluesky post API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
