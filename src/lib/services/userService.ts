import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";

// No need for unused type definitions

export class UserService {
  /**
   * Synchronizes a user from Clerk to the database
   * @param clerkId The Clerk user ID
   * @returns The synchronized user
   */
  static async syncUserFromClerk(clerkId: string) {
    try {
      logger.info("Syncing user from Clerk", {
        clerkId,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });

      // Get user from Clerk - properly await the clerkClient function
      const clerk = await clerkClient();
      const clerkUser = await clerk.users.getUser(clerkId);

      if (!clerkUser) {
        logger.error("User not found in Clerk", {
          clerkId,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });
        throw new Error("User not found in Clerk");
      }

      // Check if user exists in database
      const existingUser = await prisma.user.findUnique({
        where: { clerkId },
      });

      if (existingUser) {
        // Update existing user
        logger.info("Updating existing user", {
          userId: existingUser.id,
          clerkId,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });

        const updatedUser = await prisma.user.update({
          where: { clerkId },
          data: {
            email:
              clerkUser.emailAddresses[0]?.emailAddress || existingUser.email,
            name:
              `${clerkUser.firstName || ""} ${
                clerkUser.lastName || ""
              }`.trim() || existingUser.name,
            username: clerkUser.username || existingUser.username,
            profileImage: clerkUser.imageUrl || existingUser.profileImage,
            publicMetadata:
              clerkUser.publicMetadata as unknown as Prisma.InputJsonValue,
            privateMetadataCache:
              clerkUser.privateMetadata as unknown as Prisma.InputJsonValue,
            lastSyncedAt: new Date(),
          },
        });

        logger.info("User updated successfully", {
          userId: updatedUser.id,
          clerkId,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });

        return updatedUser;
      } else {
        // Create new user
        logger.info("Creating new user", {
          clerkId,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });

        const newUser = await prisma.user.create({
          data: {
            clerkId,
            email: clerkUser.emailAddresses[0]?.emailAddress || "",
            name: `${clerkUser.firstName || ""} ${
              clerkUser.lastName || ""
            }`.trim(),
            username: clerkUser.username || "",
            profileImage: clerkUser.imageUrl || "",
            publicMetadata:
              clerkUser.publicMetadata as unknown as Prisma.InputJsonValue,
            privateMetadataCache:
              clerkUser.privateMetadata as unknown as Prisma.InputJsonValue,
            lastSyncedAt: new Date(),
            roles: {
              create: {
                role: "USER",
                scope: "global",
                permissions: ["read:own", "write:own"],
              },
            },
          },
        });

        logger.info("User created successfully", {
          userId: newUser.id,
          clerkId,
          service: "postcomposer",
          timestamp: new Date().toISOString(),
        });

        return newUser;
      }
    } catch (error) {
      logger.error("Error syncing user from Clerk", {
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
              }
            : error,
        clerkId,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  /**
   * Gets a user by Clerk ID, creating or updating if necessary
   * @param clerkId The Clerk user ID
   * @returns The user
   */
  static async getUserByClerkId(clerkId: string) {
    try {
      // Check if user exists in database
      const existingUser = await prisma.user.findUnique({
        where: { clerkId },
        include: {
          roles: true,
          socialAccounts: true,
        },
      });

      if (existingUser) {
        // If the user was synced recently, return it
        const lastSyncedAt = existingUser.lastSyncedAt;
        const now = new Date();
        const diffInHours =
          Math.abs(now.getTime() - lastSyncedAt.getTime()) / 36e5;

        // If synced in the last hour, return existing user
        if (diffInHours < 1) {
          return existingUser;
        }

        // Otherwise, sync from Clerk
        return await this.syncUserFromClerk(clerkId);
      } else {
        // Create new user from Clerk
        return await this.syncUserFromClerk(clerkId);
      }
    } catch (error) {
      logger.error("Error getting user by Clerk ID", {
        error:
          error instanceof Error
            ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
              }
            : error,
        clerkId,
        service: "postcomposer",
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }
}
