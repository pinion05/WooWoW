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
) {
  const { adminKey, buffData } = req.body;
  const { method } = req;
  switch (method) {
    case "POST":
      console.log("월법 개시시도");
      const { adminKey, buffData } = req.body;
      const redisAdminkey = await redis.get("adminKey");
      if (adminKey === redisAdminkey) {
        console.log(`키 일치`);
        console.log(adminKey, buffData);
        redis.set("Redis_worldbuffData", buffData, "EX", 60 * 60 * 10);
        res.status(200).json({ message: "월법" });
      } else {
        console.log(`키가 일치하지 않습니다.`);
        res.status(500).send("Inconsistency key");
      }
      break;
    case "GET":
      console.log("월드버프 요청됨");
      const wouldbuff = await redis.get("Redis_worldbuffData");
      res.status(200).json(wouldbuff);
      break;
  }
}
