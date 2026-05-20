import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
      include: {
        sessions: {
          include: {
            session: true,
          },
        },
      },
    });
    return NextResponse.json(speakers);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch speakers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const speaker = await prisma.speaker.create({
      data: {
        id: body.id,
        name: body.name,
        bio: body.bio || null,
        photo: body.photo,
        expertise: body.expertise || [],
      },
    });
    return NextResponse.json(speaker, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create speaker" },
      { status: 500 }
    );
  }
}