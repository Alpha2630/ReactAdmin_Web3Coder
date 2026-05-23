import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const sessions = await prisma.session.findMany({
      include: { event: true, room: true, speakers: { include: { speaker: true } } },
    });
    return NextResponse.json(sessions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, startTime, endTime, capacity, eventId, roomId, speakerIds } = body;
    const session = await prisma.session.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        capacity,
        eventId,
        roomId,
        speakers: { create: speakerIds?.map((speakerId: string) => ({ speakerId })) || [] },
      },
    });
    return NextResponse.json({ success: true, data: session }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}