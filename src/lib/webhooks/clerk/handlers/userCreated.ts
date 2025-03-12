import { WebhookEvent } from "@clerk/nextjs/server";
import { WebhookError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

class UserCreatedHandler {
  async handle(evt: WebhookEvent) {
    try {
      logger.info("Starting user creation handler", {
        service: "socialsphere",
        timestamp: new Date().toISOString(),
      });

      const userData = evt.data;
      logger.info("Processing user data:", {
        userId: userData.id,
        email: userData.email_addresses?.[0]?.email_address,
        username: userData.username,
        service: "socialsphere",
        timestamp: new Date().toISOString(),
      });

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: userData.id },
      });

      if (existingUser) {
        logger.warn("User already exists:", {
          userId: userData.id,
          existingUserId: existingUser.id,
          service: "socialsphere",
          timestamp: new Date().toISOString(),
        });
        return;
      }

      try {
        // Create new user
        logger.info("Creating new user:", {
          userId: userData.id,
          service: "socialsphere",
          timestamp: new Date().toISOString(),
        });

        const user = await prisma.user.create({
          data: {
            clerkId: userData.id,
            email: userData.email_addresses?.[0]?.email_address || "",
            name: `${userData.first_name || ""} ${
              userData.last_name || ""
            }`.trim(),
            username: userData.username || "",
            profileImage: userData.image_url || "",
          },
        });

        logger.info("User created successfully:", {
          userId: user.id,
          clerkId: user.clerkId,
          service: "socialsphere",
          timestamp: new Date().toISOString(),
        });

        try {
          // Create user role
          logger.info("Creating user role:", {
            userId: user.id,
            service: "socialsphere",
            timestamp: new Date().toISOString(),
          });

          await prisma.userRole.create({
            data: {
              userId: user.id,
              role: "USER",
            },
          });

          logger.info("User role created successfully:", {
            userId: user.id,
            role: "USER",
            service: "socialsphere",
            timestamp: new Date().toISOString(),
          });
        } catch (err) {
          logger.error("Error creating user role:", {
            error:
              err instanceof Error
                ? {
                    message: err.message,
                    stack: err.stack,
                    name: err.name,
                  }
                : err,
            userId: user.id,
            service: "socialsphere",
            timestamp: new Date().toISOString(),
          });
          throw new WebhookError("Failed to create user role");
        }
      } catch (err) {
        logger.error("Error creating user:", {
          error:
            err instanceof Error
              ? {
                  message: err.message,
                  stack: err.stack,
                  name: err.name,
                }
              : err,
          userData,
          service: "socialsphere",
          timestamp: new Date().toISOString(),
        });
        throw new WebhookError("Failed to create user");
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
        service: "socialsphere",
        timestamp: new Date().toISOString(),
      });
      throw err;
    }
  }
}

export const userCreatedHandler = new UserCreatedHandler();
