import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
   const events = await prisma.event.findMany({
  include: { sessions: true },
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

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        location: body.location,
      },
    });

    return NextResponse.json(event, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}