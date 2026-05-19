import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        sessions: true,
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const event = await prisma.event.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: body.title,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        location: body.location,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({
      message: "Event deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}