import { connectRedis, redisClient } from "../redis/redisClient";

export async function getOtpByUserId(userId: string) {
  await connectRedis();

  const key = `emailOtp:${userId}`;
  const value = await redisClient.get(key);

  if (value) {
    console.log(`OTP Value for ${key}:`, value);
  } else {
    console.log(`No value found for key: ${key}`);
  }

  await redisClient.quit();
  return value;
}
