import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization") || "";

  if (!auth.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: "1",
      email: "word-web-shared@example.com"
    },
    scopes: ["documents.read", "profile.read"],
    source: "shared-backend-pattern"
  });
}
