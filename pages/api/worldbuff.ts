import { NextApiRequest, NextApiResponse } from "next";

const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USERNAME, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}
