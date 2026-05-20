import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const speaker = await prisma.speaker.findUnique({
      where: { id },
      include: {
        sessions: {
          include: {
            session: true,
          },
        },
      },
    });
    if (!speaker) {
      return NextResponse.json(
        { message: "Speaker not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(speaker);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch speaker" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const speaker = await prisma.speaker.update({
      where: { id },
      data: {
        name: body.name,
        bio: body.bio,
        photo: body.photo,
        expertise: body.expertise,
      },
    });
    return NextResponse.json(speaker);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Speaker not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Failed to update speaker" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.speaker.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Speaker deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Speaker not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Failed to delete speaker" },
      { status: 500 }
    );
  }
}