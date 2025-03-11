import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET all template categories
export async function GET() {
  try {
    const categories = await prisma.templateCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching template categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch template categories" },
      { status: 500 }
    );
  }
}

// CREATE a new template category
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await prisma.templateCategory.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Error creating template category:", error);
    return NextResponse.json(
      { error: "Failed to create template category" },
      { status: 500 }
    );
  }
}

// UPDATE a template category
export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, description } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await prisma.templateCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const category = await prisma.templateCategory.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("Error updating template category:", error);
    return NextResponse.json(
      { error: "Failed to update template category" },
      { status: 500 }
    );
  }
}

// DELETE a template category
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
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await prisma.templateCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if there are templates using this category
    const templatesUsingCategory = await prisma.template.findFirst({
      where: { category: id },
    });

    if (templatesUsingCategory) {
      return NextResponse.json(
        { error: "Cannot delete category that is in use by templates" },
        { status: 400 }
      );
    }

    await prisma.templateCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting template category:", error);
    return NextResponse.json(
      { error: "Failed to delete template category" },
      { status: 500 }
    );
  }
}
