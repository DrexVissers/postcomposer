const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  try {
    const models = Object.keys(prisma).filter(
      (k) => !k.startsWith("_") && !k.startsWith("$")
    );
    console.log("Available models:", models);
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error:", error);
    await prisma.$disconnect();
  }
}

test();
