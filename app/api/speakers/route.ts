export async function GET() {
  return Response.json({
    message: "Get all speakers",
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    message: "Create speaker",
    body,
  });
}