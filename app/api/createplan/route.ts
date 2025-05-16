import { db, minioClient } from "@/db/dbconnection"
import { users, plans, attachments } from "@/db/schema"
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { GEOTYPEENUM, IMAGEFORMATENUM } from "@/types/base";


// โดยปกติ Next.js จะพยายามแปลงข้อมูลใน req.body ให้อัตโนมัติ (เช่น JSON, URL-encoded form)
// แต่เมื่อคุณต้องการรับ ไฟล์ภาพ หรือ ไฟล์ binary อื่น ๆ ผ่าน multipart/form-data (เช่นจาก <input type="file" />), 
// คุณ ต้องปิด body parser ด้วยคำสั่งนี้ เพราะมันไม่สามารถจัดการไฟล์ได้โดยตรง
export const config = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req: NextRequest) {
    let imageUrl: string
    const formData = await req.formData()
    const title = formData.get("title")
    const type = formData.get("type")
    const geom = formData.get("geom")
    const imageFile = formData.get("imageFile") as File | null;

    if (!title || !type || !geom) return NextResponse.json({ message: "Invalid data from client" }, { status: 400 });

    try {

        const [insertedPlan] = await db.insert(plans).values({
            title: String(title),
            type: String(type).toUpperCase() as GEOTYPEENUM,
            geom: geom,
        }).returning({ id: plans.id });

        if (imageFile && insertedPlan.id) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileExtension = imageFile.name.split('.').pop();
            const fileName = `/plan-images/${uuidv4()}.${fileExtension}`;

            // upload image to minio
            await minioClient.putObject(process.env.MINIO_BUCKETNAME, fileName, buffer, {
                'Content-Type': imageFile.type
            })

            imageUrl = `http://localhost:9000/${process.env.MINIO_BUCKETNAME}${fileName}`;

            await db.insert(attachments).values([
                {
                    file_url: imageUrl,
                    type: IMAGEFORMATENUM.JPG,
                    planId: insertedPlan.id,
                }
            ])


        }

        return NextResponse.json({ message: 'Uploaded successfully' });
    } catch (err: any) {
        console.error('Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}