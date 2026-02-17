// app/api/lessons/[id]/route.ts

import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) => {
    const { id } = await params;
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, Number(id))
    });
    
    return new NextResponse(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
    });
};

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ id: string }>},
) => {
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }
    const { id } = await params;
    const body = await req.json();
    const data = await db.update(lessons)
        .set({ 
            title: body.title,
        })
        .where(eq(lessons.id, Number(id)))
        .returning();
    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) => {
    const { id } = await params;
    
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }
    
    const data = await db.delete(lessons)
        .where(eq(lessons.id, Number(id)))
        .returning();
    return NextResponse.json(data[0]);
};