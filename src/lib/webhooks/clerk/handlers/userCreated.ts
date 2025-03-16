import { WebhookEvent } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";
import { UserService } from "@/lib/services/userService";

// Define the user data type for the webhook
interface ClerkWebhookUserData {
  id: string;
  email_addresses?: Array<{ email_address: string }>;
  username?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

// Custom error class for webhook errors
class WebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookError";
  }
}

class UserCreatedHandler {
  async handle(evt: WebhookEvent) {
    try {
      logger.info("Starting user creation handler", {
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });

      // Type assertion to access user data properties
      const userData = evt.data as ClerkWebhookUserData;
      logger.info("Processing user data:", {
        userId: userData.id,
        email: userData.email_addresses?.[0]?.email_address,
        username: userData.username,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });

      try {
        // Use the UserService to sync the user
        if (!userData.id) {
          throw new WebhookError("User ID is missing from webhook data");
        }

        const user = await UserService.syncUserFromClerk(userData.id);

        logger.info("User synchronized successfully:", {
          userId: user.id,
          clerkId: user.clerkId,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });

        return user;
      } catch (err) {
        logger.error("Error synchronizing user:", {
          error:
            err instanceof Error
              ? {
                  message: err.message,
                  stack: err.stack,
                  name: err.name,
                }
              : err,
          userData,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });
        throw new WebhookError("Failed to synchronize user");
      }
    } catch (err) {
      logger.error("Error in user creation handler:", {
        error:
          err instanceof Error
            ? {
                message: err.message,
                stack: err.stack,
                name: err.name,
              }
            : err,
        eventData: evt.data,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });
      throw err;
    }
  }
}

export const userCreatedHandler = new UserCreatedHandler();
