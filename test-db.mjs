import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function testConnection() {
  try {
    console.log("Testing database connection...");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Database connection successful:", result);

    console.log("Testing user table...");
    const users = await prisma.user.findMany({
      take: 1,
    });
    console.log("User query successful:", users);
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
