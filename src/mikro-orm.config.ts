import { MikroORM } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  tsNode: process.env.NODE_DEV === "true" ? true : false,
  debug: process.env.NODE_ENV === "development" ? true : false,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  dbName: process.env.DB_NAME || "social-network",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    transactional: true,
  },
});
