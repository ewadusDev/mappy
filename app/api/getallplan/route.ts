import { db } from "@/db/dbconnection";
import { attachments, plans } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const GET = async () => {
  try {
    const response = await db
      .select({
        plans: plans,
        attachments: attachments,
      })
      .from(plans)
      .leftJoin(attachments, eq(plans.id, attachments.planId))
      .orderBy(desc(plans.id));
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
