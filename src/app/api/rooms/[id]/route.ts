import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function parseId(id: string) {
  const num = Number(id);
  return isNaN(num) ? null : num;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseId(idParam);
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const room = await prisma.room.findUnique({
      where: { id },
      include: { sessions: true },
    });
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseId(idParam);
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    const room = await prisma.room.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(room);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseId(idParam);
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    await prisma.room.delete({ where: { id } });
    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Failed to delete room. May have linked sessions." },
      { status: 500 }
    );
  }
}