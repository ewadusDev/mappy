"use server"
import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from "@/db"
import { Client } from 'pg';
import { users } from "@/db/schema"

export const testDBConnection = async () => {


    try {
        const response = await db.select().from(users)
        console.log("Connected DB", response)

    } catch (error) {
        console.log("Unable to connect database", error)
    }

}


export const reseedDatabase = async () => {
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

        console.log("Seed data successfully")

    } catch (error) {
        console.error("Re-seed Database error", error)
    }

}