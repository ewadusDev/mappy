"use server"
import { drizzle } from 'drizzle-orm/node-postgres';
import { db, minioClient } from "@/db/dbconnection"
import { Client } from 'pg';
import { plans, users, attachments } from "@/db/schema"
import { v4 as uuidv4 } from 'uuid';

export const testDBConnection = async () => {
    try {
        const response = await db.select().from(users)
        console.log("Connected DB", response)

    } catch (error) {
        console.log("Unable to connect database", error)
    }
}

export const reseedUsersTable = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        const db = drizzle(client);

        // Drop table if exists
        await db.execute(`DROP TABLE IF EXISTS users CASCADE;`);

        // Recreate table
        await db.execute(`
            CREATE TABLE users (
                 id SERIAL PRIMARY KEY,
                 username VARCHAR(100) NOT NULL UNIQUE,
	             password TEXT NOT NULL,
	             firstname VARCHAR(100),
	             lastname  VARCHAR(100),
	             phone TEXT,
	             profile_url TEXT,
                 email VARCHAR(100) NOT NULL UNIQUE,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
                `);

        //  Insert new data
        await db.insert(users).values([
            { username: "ruknakub", password: "oaijdasdhuahd", email: "ruknakub@gmail.com" },
            { username: "ruknaka", password: "oaijdasdhuahd", email: "ruknaka@gmail.com" },
            { username: "ruknaja", password: "oaijdasdhuahd", email: "ruknaja@gmail.com" }
        ])

        await client.end()
        console.log("Seed users table successfully")

    } catch (error) {
        console.error("Re-seed Database error", error)
    }

}

export const reseedPlansTable = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

  
    try {
        await client.connect();
        const db = drizzle(client);

        // Drop table if exists
        await db.execute(`DROP TABLE IF EXISTS plans CASCADE;`);
        // Drop enum if exists
        await db.execute(`DROP TYPE IF EXISTS type_geom;`)
        // Recreate table
        await db.execute(`
            CREATE TYPE type_geom AS ENUM ('POINT', 'LINE', 'POLYGON');

            CREATE TABLE plans (
                 id SERIAL PRIMARY KEY,
                 title VARCHAR(100) NOT NULL,
                 type type_geom NOT NULL,
                 geom GEOMETRY,
                 user_id INTEGER REFERENCES users(id),
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
            `);

        //  Insert new data
        // await db.insert(plans).values([{
        //     title: "test plan a1",
        //     type: "POINT",
        //     geom: mockData.latLng,
        // }])
        console.log("Seed plans table successfully")
    } catch (error) {
        console.error(error)
    }

}

export const reseedAttachmentsTable = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        const db = drizzle(client);

        // Drop table if exists
        await db.execute(`DROP TABLE IF EXISTS attachments CASCADE;`);

        // Drop enum if exists
        await db.execute(`DROP TYPE IF EXISTS type_file;`)

        // Recreate table
        await db.execute(`
            CREATE TYPE type_file AS ENUM ('JPG', 'PNG', 'GEOTIFF');

            CREATE TABLE attachments (
                 id SERIAL PRIMARY KEY,
                 file_url TEXT,
                 type type_file NOT NULL,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
                 plan_id INTEGER REFERENCES plans(id)
                 );
            `);

        //  Insert new data
        // await db.insert(attachments).values([{
        //     file_url: "/images/test.jpg",
        //     type: "JPG",
        // }])
        console.log("Seed attachments table successfully")

    } catch (error) {
        console.error(error)
    }
}

export const reseedMinioBucket = async () => {
    const exists = await minioClient.bucketExists(process.env.MINIO_BUCKETNAME)
    const originalFile = "public/righnav/road_img.jpg"
    const objectFileName = "/plan-images/" + uuidv4() + ".jpg"

    if (!exists) {
        await minioClient.makeBucket(process.env.MINIO_BUCKETNAME)
        console.log("Bucket was created")
    } else {
        console.log("Bucket already exists")
    }

    try {
        await minioClient.fPutObject(process.env.MINIO_BUCKETNAME, objectFileName, originalFile)
        console.log("upload successfully")
    } catch (error) {
        console.log("upload file", error)
    }
}