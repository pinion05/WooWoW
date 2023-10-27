import getToken from "../../apiFuntions/getAccessToken";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const Redis = require("ioredis");

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USERNAME, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

// prettier-ignore
//!     ===========================================  endpoint
export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const accessToken = await getToken();
  if (!accessToken) {
    console.log(`accessToken 을 찾을 수 없습니다.`);
  }
  const redisCache = JSON.parse(await redis.get(`Redis_guild`))
if (redisCache) {
  res.status(200).send(redisCache);
  return
}
  console.log(`❌ Redis 길드인원 캐시없음`);
  try {
    const response = await axios.get(
      `https://kr.api.blizzard.com/data/wow/guild/makgora/%EC%99%81%ED%83%80%EB%B2%84%EC%8A%A4`,
      {
        params: {
          namespace: "profile-classic1x-kr",
          locale: "ko_kr",
          access_token: accessToken,
        },
      }
    );
    if (response.status === 404) {
      res.status(500).json("error");
      return;
    }
    await redis.set(`Redis_guild`, JSON.stringify(response.data.member_count), 'EX', 30);
    res.status(200).json(response.data.member_count);
    return;
  } catch (error) {
    console.log(`길드인원 호출실패`);
    res.status(500).json(error);
    return;
  }
}
