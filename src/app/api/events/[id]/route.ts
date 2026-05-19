import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// helper
function parseId(id: string) {
  const num = Number(id);
  return isNaN(num) ? null : num;
}

// GET ONE EVENT
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseId(params.id);

    if (!id) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        sessions: {
          include: {
            speakers: true,
            room: true,
            questions: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// UPDATE EVENT
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseId(params.id);

    if (!id) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.startDate && {
          startDate: new Date(body.startDate),
        }),
        ...(body.endDate && {
          endDate: new Date(body.endDate),
        }),
        ...(body.location && { location: body.location }),
      },
    });

    return NextResponse.json(event);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE EVENT
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseId(params.id);

    if (!id) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}