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
//   const charactername = req.query.charactername as string;
//   const localCache : WoWCharacterProfile | undefined = cache.get(`local_character_${charactername}`);
//   const redisCache = await JSON.parse(await redisCli.get(`Redis_character_${charactername}`));

//   if (localCache) {
//     res.status(200).json(localCache)
//     return
//   }
//   if (redisCache) {
//     console.log(`❌로컬 ${charactername} 캐릭터 캐시없음`);
//     cache.set(`local_character_${charactername}`, redisCache);
//     res.status(200).json(redisCache)
//     return
//   }
//   console.log(`❌ Redis ${charactername} 캐릭터 캐시없음`); //todo
//   try {
//     const response = await axios.get(
//       `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodeURIComponent(charactername)}`,
//       {
//         params: {
//           namespace: "profile-classic1x-kr",
//           locale: "ko_kr",
//           access_token: accessToken,
//         },
//       }
//     );
//     if (response.status === 404) {
//       res.status(500).json("error");
//       return;
//     }
//     cache.set(`local_character_${charactername}`, response.data);
//     const stringifyData : string = JSON.stringify(response.data)
//     await redisCli.set(`Redis_character_${charactername}`,stringifyData);
//     res.status(200).json(response.data);
//     return;
//   } catch (error) {
//     console.log(`${charactername} 호출실패`);
// console.log(error);
//     res.status(500).json(error);
//     return;
//   }
// }
