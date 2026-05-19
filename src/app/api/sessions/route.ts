import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        event: true,
        room: true,
        speakers: {
          include: {
            speaker: true,
          },
        },
        questions: true,
      },
    });

    return Response.json(sessions);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.eventId || !body.roomId) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await prisma.session.create({
      data: {
        title: body.title,
        description: body.description ?? "",

        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),

        eventId: Number(body.eventId),
        roomId: Number(body.roomId),

        capacity: body.capacity ? Number(body.capacity) : null,
        speakers: body.speakerIds
          ? {
              create: body.speakerIds.map((id: string) => ({
                speakerId: id,
              })),
            }
          : undefined,
      },
      include: {
        speakers: true,
      },
    });

    return Response.json(session, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to create session" },
      { status: 500 }
    );
  }
}