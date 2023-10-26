import getToken from "../../apiFuntions/getAccessToken";
import NodeCache, { Key } from "node-cache";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";

const redis = require("redis");
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err: any) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4;
const cache = new NodeCache({ stdTTL: 60 * 1 });
// prettier-ignore
//!     ===========================================  endpoint =============================================================
export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const accessToken = await getToken();
  const localCache = cache.get(`local_guildCount`);
  const redisCache = await redisCli.get('Redis_guildCount');

if (localCache) {
  res.status(200).send(localCache)
  return
}

if (redisCache) {
  console.log('로컬 guildCount 캐시없음');
  res.status(200).send(redisCache);
  cache.set('local_guildCount',redisCache)
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
    cache.set(`local_guildCount`, response.data.member_count);
    redisCli.set(`Redis_guildCount`,response.data.member_count)
    redisCli.expire('Redis_guildCount', 30); // 3600초 후에 username 키 삭제
    res.status(200).json(response.data.member_count);
    return;
  } catch (error) {
    console.log(`길드인원 호출실패`);
    res.status(500).json(error);
    return;
  }

}
