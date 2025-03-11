import { BskyAgent } from "@atproto/api";

const BLUESKY_API = "https://bsky.social";

interface BlueskyProfile {
  handle: string;
  displayName?: string;
  description?: string;
}

interface BlueskyPostResult {
  uri: string;
  cid: string;
}

/**
 * Get a user's Bluesky profile
 */
export async function getBlueskyProfile(
  handle: string,
  appPassword: string
): Promise<BlueskyProfile> {
  const agent = new BskyAgent({ service: BLUESKY_API });

  try {
    await agent.login({ identifier: handle, password: appPassword });
    const response = await agent.getProfile({ actor: handle });

    return {
      handle: response.data.handle,
      displayName: response.data.displayName,
      description: response.data.description,
    };
  } catch (error) {
    console.error("Error getting Bluesky profile:", error);
    throw new Error("Failed to get Bluesky profile");
  }
}

/**
 * Post content to Bluesky
 */
export async function postToBluesky(
  handle: string,
  appPassword: string,
  content: string,
  imageUrl?: string
): Promise<BlueskyPostResult> {
  // Validate content length
  if (content.length > 300) {
    throw new Error("Content exceeds 300 character limit");
  }

  const agent = new BskyAgent({ service: BLUESKY_API });

  try {
    await agent.login({ identifier: handle, password: appPassword });

    let images;
    if (imageUrl) {
      // Fetch and upload image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const upload = await agent.uploadBlob(blob, {
        encoding: "image/jpeg",
      });

      images = [
        {
          image: upload.data.blob,
          alt: "Image from SocialSphere",
        },
      ];
    }

    const post = await agent.post({
      text: content,
      ...(images && { embed: { $type: "app.bsky.embed.images", images } }),
    });

    return {
      uri: post.uri,
      cid: post.cid,
    };
  } catch (error) {
    console.error("Error posting to Bluesky:", error);
    throw new Error("Failed to post to Bluesky");
  }
}

/**
 * Validate content for Bluesky
 */
export function validateBlueskyContent(content: string): {
  valid: boolean;
  message?: string;
  remainingChars: number;
} {
  const maxLength = 300;
  const remainingChars = maxLength - content.length;

  if (content.length > maxLength) {
    return {
      valid: false,
      message: `Content exceeds ${maxLength} character limit`,
      remainingChars,
    };
  }

  return {
    valid: true,
    remainingChars,
  };
}
