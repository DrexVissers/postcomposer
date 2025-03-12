import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { templateCategories, allTemplates } from "@/lib/premade-templates";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create categories first
    const createdCategories = await Promise.all(
      templateCategories.map(async (category) => {
        const existingCategory = await prisma.templateCategory.findFirst({
          where: {
            name: category.name,
          },
        });

        if (existingCategory) {
          return existingCategory;
        }

        return await prisma.templateCategory.create({
          data: {
            id: category.id,
            name: category.name,
            description: category.description,
          },
        });
      })
    );

    // Create templates
    const createdTemplates = await Promise.all(
      allTemplates.map(async (template) => {
        const existingTemplate = await prisma.template.findFirst({
          where: {
            name: template.name,
            isDefault: true,
          },
        });

        if (existingTemplate) {
          return existingTemplate;
        }

        return await prisma.template.create({
          data: {
            id: template.id,
            name: template.name,
            description: template.description,
            content: template.content,
            platform: template.platform,
            isDefault: template.isDefault,
            isCustom: template.isCustom,
            category: template.category,
            tags: template.tags,
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: "Templates seeded successfully",
      categories: createdCategories.length,
      templates: createdTemplates.length,
    });
  } catch (error) {
    console.error("Error seeding templates:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed templates",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
