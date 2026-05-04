import { db } from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ unitId: string }> },
) => {
    const { unitId } = await params;
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 }); // ✅ مش data
    }

    const data = await db.query.units.findFirst({
        where: eq(units.id, Number(unitId))
    });
    
    return new NextResponse(JSON.stringify(data), { // ✅
        headers: { "Content-Type": "application/json" }
    });
};

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ unitId: string }>},
) => {
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }
    const { unitId } = await params;
    const body = await req.json();
    const data = await db.update(units)
        .set({ 
            title: body.title,
            
        })
        .where(eq(units.id, Number(unitId)))
        .returning();
    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ unitId: string }> },
) => {
    const { unitId } = await params;
    
    if (!await getIsAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const id = Number(unitId);
    
    const data = await db.delete(units)
        .where(eq(units.id, id))
        .returning();
    return NextResponse.json(data[0]);
};