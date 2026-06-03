import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: { sessions: true },
    });
    const response = NextResponse.json(rooms);
    response.headers.set('X-Total-Count', String(rooms.length));
    response.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }
    const room = await prisma.room.create({ data: { name } });
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create room" },
      { status: 500 }
    );
  }
}