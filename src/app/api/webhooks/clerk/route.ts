import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { logger } from "@/lib/logger";
import { userCreatedHandler } from "@/lib/webhooks/clerk/handlers/userCreated";

// Get the webhook secret and ensure proper format
const rawWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;
// The webhook secret from Clerk starts with 'whsec_' which needs to be removed
// for the Svix library to properly verify the signature
const webhookSecret = rawWebhookSecret?.startsWith("whsec_")
  ? rawWebhookSecret.substring(6) // Remove 'whsec_' prefix
  : rawWebhookSecret;

export async function POST(req: Request) {
  try {
    // First check if webhook secret is configured
    if (!webhookSecret) {
      logger.error("Webhook secret is not configured");
      return new Response("Webhook secret is not configured", {
        status: 500,
      });
    }

    // Log the webhook secret for debugging (first 4 chars only)
    logger.info("Using webhook secret:", {
      rawWebhookSecret: rawWebhookSecret?.slice(0, 4) + "...",
      webhookSecret: webhookSecret.slice(0, 4) + "...",
      service: "socialsphere",
      timestamp: new Date().toISOString(),
    });

    // Get the headers
    const svix_id = req.headers.get("svix-id") || "";
    const svix_timestamp = req.headers.get("svix-timestamp") || "";
    const svix_signature = req.headers.get("svix-signature") || "";

    // Log headers for debugging
    logger.info("Received webhook headers:", {
      service: "socialsphere",
      svix_id,
      svix_timestamp,
      svix_signature,
      timestamp: new Date().toISOString(),
    });

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      logger.error("Missing required Svix headers", {
        svix_id,
        svix_timestamp,
        svix_signature,
      });
      return new Response("Error occurred -- missing required Svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.clone().json();
    const body = JSON.stringify(payload);

    // Log payload for debugging
    logger.info("Received webhook payload:", {
      ...payload,
      service: "socialsphere",
      timestamp: new Date().toISOString(),
    });

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      // Log verification attempt
      logger.info("Attempting webhook verification", {
        service: "socialsphere",
        timestamp: new Date().toISOString(),
      });

      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;

      logger.info("Webhook verification successful", {
        service: "socialsphere",
        eventType: evt.type,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      logger.error("Error verifying webhook:", {
        error:
          err instanceof Error
            ? {
                message: err.message,
                stack: err.stack,
                name: err.name,
              }
            : err,
        body,
        headers: {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        },
        rawWebhookSecret: rawWebhookSecret?.slice(0, 4) + "...",
        webhookSecret: webhookSecret.slice(0, 4) + "...",
        service: "socialsphere",
        timestamp: new Date().toISOString(),
      });
      return new Response("Error occurred during webhook verification", {
        status: 400,
      });
    }

    // Handle the webhook
    try {
      switch (evt.type) {
        case "user.created":
          logger.info("Handling user.created event", {
            service: "socialsphere",
            timestamp: new Date().toISOString(),
          });
          await userCreatedHandler.handle(evt);
          break;
        // Add more handlers here
        default:
          logger.info(`Unhandled webhook type: ${evt.type}`);
      }

      return new Response("Success", { status: 200 });
    } catch (err) {
      logger.error("Error handling webhook:", {
        error:
          err instanceof Error
            ? {
                message: err.message,
                stack: err.stack,
                name: err.name,
              }
            : err,
        eventType: evt.type,
        eventData: evt.data,
        service: "socialsphere",
        timestamp: new Date().toISOString(),
      });
      return new Response("Error processing webhook", {
        status: 500,
      });
    }
  } catch (err) {
    logger.error("Error processing request:", {
      error:
        err instanceof Error
          ? {
              message: err.message,
              stack: err.stack,
              name: err.name,
            }
          : err,
      service: "socialsphere",
      timestamp: new Date().toISOString(),
    });
    return new Response("Error processing request", {
      status: 500,
    });
  }
}
