import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET 
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await prisma.session.findUnique({
      where: { id: Number(id) },
      include: {
        event: true,
        room: true,
        speakers: { include: { speaker: true } },
        questions: true,
      },
    });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    return NextResponse.json(session);
  } catch (error) {
    console.error("GET /api/sessions/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}

// PUT 
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, startTime, endTime, roomId, capacity } = body;

    const updated = await prisma.session.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        startTime: startTime ? new Date(startTime) : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        roomId,
        capacity,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/sessions/[id] error:", error);
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}

// DELETE 
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sessionId = Number(id);

    await prisma.question.deleteMany({
      where: { sessionId },
    });

    await prisma.sessionSpeaker.deleteMany({
      where: { sessionId },
    });

    await prisma.session.delete({
      where: { id: sessionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/sessions/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}