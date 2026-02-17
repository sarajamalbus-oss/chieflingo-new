import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { count } from "drizzle-orm";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.challengeOptions.findMany();
  const totalResult = await db.select({ count: count() }).from(challengeOptions);
  const total = totalResult[0].count;

  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Content-Range": `lessons 0-${data.length - 1}/${total}`,
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
};

export const POST = async (req: Request) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const data = await db.insert(challengeOptions).values({ ...body }).returning();

  return NextResponse.json(data[0]);
};