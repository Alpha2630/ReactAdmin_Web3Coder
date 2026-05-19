export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({
    id: params.id,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  return Response.json({
    message: "Update room",
    body,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({
    message: "Delete room",
  });
}