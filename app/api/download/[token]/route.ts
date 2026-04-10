import { NextResponse } from "next/server";

type Props = { params: Promise<{ token: string }> };

export async function GET(_req: Request, ctx: Props) {
  const { token } = await ctx.params;
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  return NextResponse.json(
    {
      error:
        "Download links require a database and storage. Configure Supabase to enable fulfillment.",
    },
    { status: 503 },
  );
}
