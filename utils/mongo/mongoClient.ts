import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI not found in environment variables");
}

const client = new MongoClient(uri);

export async function connectToMongo() {
  await client.connect();
  console.log("Connected to MongoDB");

  return client;
}
