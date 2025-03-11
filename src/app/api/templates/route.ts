import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET all templates
export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ templates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

// CREATE a new template
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      content,
      platform,
      isDefault,
      isCustom,
      category,
      tags,
    } = body;

    if (!name || !content || !platform) {
      return NextResponse.json(
        { error: "Name, content, and platform are required" },
        { status: 400 }
      );
    }

    // Find the user by clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const template = await prisma.template.create({
      data: {
        name,
        description,
        content,
        platform,
        isDefault: isDefault || false,
        isCustom: isCustom || true,
        category,
        tags: tags || [],
        userId: user.id,
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}

// UPDATE a template
export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      name,
      description,
      content,
      platform,
      isDefault,
      isCustom,
      category,
      tags,
    } = body;

    if (!id || !name || !content || !platform) {
      return NextResponse.json(
        { error: "ID, name, content, and platform are required" },
        { status: 400 }
      );
    }

    // Find the user by clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if template exists and belongs to the user
    const existingTemplate = await prisma.template.findUnique({
      where: { id },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // Only allow users to update their own templates unless they're system templates
    if (existingTemplate.userId && existingTemplate.userId !== user.id) {
      return NextResponse.json(
        { error: "You don't have permission to update this template" },
        { status: 403 }
      );
    }

    const template = await prisma.template.update({
      where: { id },
      data: {
        name,
        description,
        content,
        platform,
        isDefault: isDefault || false,
        isCustom: isCustom || true,
        category,
        tags: tags || [],
      },
    });

    return NextResponse.json({ template }, { status: 200 });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    );
  }
}

// DELETE a template
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // Find the user by clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if template exists and belongs to the user
    const existingTemplate = await prisma.template.findUnique({
      where: { id },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // Only allow users to delete their own templates
    if (existingTemplate.userId && existingTemplate.userId !== user.id) {
      return NextResponse.json(
        { error: "You don't have permission to delete this template" },
        { status: 403 }
      );
    }

    await prisma.template.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    );
  }
}
