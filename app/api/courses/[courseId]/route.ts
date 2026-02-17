import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ courseId: string }> },
) => {
    const { courseId } = await params;
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 }); // ✅ مش data
    }

    const data = await db.query.courses.findFirst({
        where: eq(courses.id, Number(courseId))
    });
    
    return new NextResponse(JSON.stringify(data), { // ✅
        headers: { "Content-Type": "application/json" }
    });
};

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ courseId: string }>},
) => {
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }
    const { courseId } = await params;
    const body = await req.json();
    const data = await db.update(courses)
        .set({ 
            title: body.title,
            imageSrc: body.imageSrc,
        })
        .where(eq(courses.id, Number(courseId)))
        .returning();
    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ courseId: string }> },
) => {
    const { courseId } = await params;
    
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const id = Number(courseId);
    
    const data = await db.delete(courses)
        .where(eq(courses.id, id))
        .returning();
    return NextResponse.json(data[0]);
};