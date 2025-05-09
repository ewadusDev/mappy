"use server"
import { db } from "@/db"
import { users } from "@/db/schema"

export const testDBConnection = async () => {


    try {
        const response = await db.select().from(users)
        console.log("Connected DB", response)

    } catch (error) {
        console.log("Unable to connect database", error)
    }

}