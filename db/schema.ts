import { pgTable, serial, varchar, timestamp, text, pgEnum, customType, integer } from 'drizzle-orm/pg-core'


export const planEnum = pgEnum('type', ['POINT', 'LINE', 'POLYGON']);
const attachmentEnum = pgEnum('type', ['JPG', 'PNG', 'GEOTIFF'])

const geometry = customType<{
    data: string;         // You can change this to a GeoJSON object, WKT string, etc.
    driverData: string;   // Raw string as returned by the driver
}>({
    dataType() {
        return 'geometry'; // This is the PostgreSQL type name
    },
});


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 100 }).notNull(),
    password: text('password').notNull(),
    firstname: varchar('firstname', { length: 100 }),
    lastname: varchar('lastname', { length: 100 }),
    phone: text('phone'),
    profile_url: text('profile_url'),
    email: varchar('email', { length: 100 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const plans = pgTable('plans', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
    type: planEnum('type').notNull(),
    geom: geometry('geom'),
    createdAt: timestamp('created_at').defaultNow(),
    userId: integer('user_id').references(() => users.id)
})

export const attachments = pgTable('attachments', {
    id: serial('id').primaryKey(),
    file_url: text('file_url'),
    type: attachmentEnum('type').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    planId: integer('plan_id').references(() => plans.id),
})
