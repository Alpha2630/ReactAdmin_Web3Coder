import { prisma } from "../../../lib/prisma";

export async function GET() {
  const speakers = await prisma.speaker.findMany({
    include: {
      sessions: {
        include: {
          session: true,
        },
      },
    },
  });

  return Response.json(speakers);
}

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    message: "Create speaker",
    body,
  });
}