import { BskyAgent } from "@atproto/api";

// Create a Bluesky agent for API interactions
export const createBskyAgent = async (handle: string, appPassword: string) => {
  const agent = new BskyAgent({
    service: "https://bsky.social",
  });

  try {
    await agent.login({
      identifier: handle,
      password: appPassword,
    });
    return agent;
  } catch (error) {
    console.error("Error logging into Bluesky:", error);
    throw error;
  }
};

// Post content to Bluesky
export const postToBluesky = async (
  handle: string,
  appPassword: string,
  text: string,
  imageUrl?: string
) => {
  try {
    const agent = await createBskyAgent(handle, appPassword);

    // Create post object
    const postParams: {
      text: string;
      createdAt: string;
      embed?: {
        $type: string;
        images: Array<{
          alt: string;
          image: {
            ref: { $link: string };
            mimeType: string;
            size: number;
          }; // Using the proper type structure for Bluesky blob references
        }>;
      };
    } = {
      text: text,
      createdAt: new Date().toISOString(),
    };

    // If there's an image, upload it and include in the post
    if (imageUrl) {
      // This is a simplified example - in a real app, you'd need to fetch the image
      // and convert it to a Blob or Buffer before uploading
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const uploadResult = await agent.uploadBlob(blob, {
        encoding: "image/jpeg", // Adjust based on your image type
      });

      if (uploadResult.success) {
        postParams.embed = {
          $type: "app.bsky.embed.images",
          images: [
            {
              alt: "Image attached to post",
              image: uploadResult.data.blob,
            },
          ],
        };
      }
    }

    // Create the post
    const result = await agent.post(postParams);
    return result;
  } catch (error) {
    console.error("Error posting to Bluesky:", error);
    throw error;
  }
};

// Get user profile from Bluesky
export const getBlueskyProfile = async (
  handle: string,
  appPassword: string
) => {
  try {
    const agent = await createBskyAgent(handle, appPassword);
    const profile = await agent.getProfile({ actor: handle });
    return profile.data;
  } catch (error) {
    console.error("Error getting Bluesky profile:", error);
    throw error;
  }
};

// Get recent posts from Bluesky
export const getRecentBlueskyPosts = async (
  handle: string,
  appPassword: string,
  limit = 10
) => {
  try {
    const agent = await createBskyAgent(handle, appPassword);
    const feed = await agent.getAuthorFeed({ actor: handle, limit });
    return feed.data;
  } catch (error) {
    console.error("Error getting Bluesky feed:", error);
    throw error;
  }
};
