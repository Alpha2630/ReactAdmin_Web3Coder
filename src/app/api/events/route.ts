import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        sessions: {
          include: {
            speakers: true,
            questions: true,
          },
        },
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.date || !body.location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const start = body.startDate
      ? new Date(body.startDate)
      : new Date(body.date);

    const end = body.endDate
      ? new Date(body.endDate)
      : new Date(start);

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description ?? "",
        startDate: start,
        endDate: end,
        location: body.location,
        category: body.category ?? "Conference",
        image: body.image ?? "https://images.unsplash.com/photo-1511578314322-379afb476865",
      },
      include: {
        sessions: true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}