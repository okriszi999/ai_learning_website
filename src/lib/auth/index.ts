import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { createAuthClient } from "better-auth/react";
import { config } from "dotenv";

config({
  path: ".env.local",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
});
