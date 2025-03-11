import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
};
