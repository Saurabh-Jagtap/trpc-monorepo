import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  integer
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  fullName: varchar("full_name", { length: 80 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),

  profileImageUrl: text("profile_image_url"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 80 }).notNull(),
  description: varchar("title", { length: 80 }).notNull(),
  slug: varchar("title", { length: 80 }).notNull(),
  visibility: boolean(),
  published: boolean(),
  theme: varchar("theme", { length: 80 }).notNull(),
  creatorId: integer("creator_id").references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
})



export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
