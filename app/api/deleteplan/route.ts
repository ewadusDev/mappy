import { db, minioClient } from "@/db/dbconnection";
import { plans, attachments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async (req: NextRequest) => {
    const data = await req.json()
    if (!data) return NextResponse.json({ "message": "Invalid data from client" }, { status: 400 })


    try {

        await minioClient.removeObject(process.env.MINIO_BUCKETNAME, data.attachments.file_url.split("mappy/")[1])
        await db.delete(attachments).where(eq(attachments.planId, data.attachments.id))
        await db.delete(plans).where(eq(plans.id, data.plans.id))

        return NextResponse.json({ "message": "delete successfully " }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ "message": "Error" }, { status: 500 })
    }


}

