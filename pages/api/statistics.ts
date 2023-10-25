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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = await getToken();
  const charactername = req.query.charactername as string;
  //*캐릭터의 이름으로 캐시값을 조회하는코드
  // prettier-ignore
  let cachedCharData = cache.get(`stasticsData_${charactername}`);
  if (!cachedCharData) {
    console.log(`${charactername} 캐시없음`);
    try {
      const response = await axios.get(
        // prettier-ignore
        `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodeURIComponent(charactername)}/statistics`,
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
      // console.log(`${charactername} 호출완료`);
      cache.set(`stasticsData_${charactername}`, response.data);
      res.status(200).json(response.data);
      return;
    } catch (error) {
      console.log(`${charactername} 호출실패`);
      // console.log(error);

      res.status(500).json(error);
      return;
    }
  } else {
    // console.log(`${charactername}스탯캐시존재`);
    res.status(200).json(cachedCharData);
    return;
  }
}
