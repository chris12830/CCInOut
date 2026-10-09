import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
// Revision-guarded updates make shared-location capacity changes atomic.
export const workspaces = sqliteTable("attendance_workspaces", { ownerId: text("owner_id").primaryKey(), revision: integer("revision").notNull().default(0), data: text("data").notNull(), updatedAt: text("updated_at").notNull() });
