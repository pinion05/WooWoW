// import getToken from "../../apiFuntions/getAccessToken";
// import NodeCache, { Key } from "node-cache";
// import axios from "axios";
// import { NextApiRequest, NextApiResponse } from "next";
// import WoWCharacterProfile from "@/model/WoWCharacterProfile ";

// const redis = require("redis");
// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//   legacyMode: true,
// });
// redisClient.on("connect", () => {
//   console.info("Redis connected!");
// });
// redisClient.on("error", (err: any) => {
//   console.error("Redis Client Error", err);
// });
// redisClient.connect().then(); // redis v4 연결 (비동기)
// const redisCli = redisClient.v4;

// const cache = new NodeCache({ stdTTL: 60 * 1 });
// // prettier-ignore
// export default async function handler(req: NextApiRequest,res: NextApiResponse) {
//   const accessToken = await getToken();
//   const mediaid = req.query.mediaid as string;
//   const redisCache = await redisCli.get(`Redis_media_${mediaid}`);
//   const localCache = cache.get(`local_media_${mediaid}`);
//   if (localCache) {
//     res.status(200).json(localCache)
//     return
//   }
//   if (redisCache) {
//     console.log(`❌로컬 ${mediaid} 미디어 캐시없음`);
//     cache.set(`local_media_${mediaid}`, redisCache);
//     res.status(200).json(redisCache)
//     return
//   }
//   console.log(`❌ Redis ${mediaid} 미디어캐시 없음`);
//   try {
//     console.log(`axios_media_${mediaid}`);
//     const response = await axios.get(
//       `https://kr.api.blizzard.com/data/wow/media/item/${mediaid}`,
//       {
//         params: {
//           namespace: "static-1.14.4_50753-classic1x-kr",
//           access_token: accessToken,
//         },
//       }
//     );
//     if (response.status === 404) {
//       res.status(500).json("error");
//       return;
//     }
//     cache.set(`local_media_${mediaid}`, response.data.assets[0].value); //*로컬 캐시 셋
//     await redisCli.set(`Redis_media_${mediaid}`,response.data.assets[0].value); //*Redis 캐시 셋
//     res.status(200).json(response.data.assets[0].value);
//     return;
//   } catch (error) {
//     console.log(`${mediaid}미디어 호출실패`);
//     // console.log(error);
//     res.status(500).json(error);
//     return;
//   }
// }
