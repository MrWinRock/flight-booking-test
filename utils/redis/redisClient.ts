import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

export const redisClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Connected to Redis");
  }
}
