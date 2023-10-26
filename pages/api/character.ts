import getToken from "../../apiFuntions/getAccessToken";
import NodeCache, { Key } from "node-cache";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import Item from "@/model/Item";
import CharacterStatistics from "@/model/Statistics";
import Statistics from "@/model/Statistics";
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

//!---------------------------------------------------------------------여기부터 엔드포인트 --------------------------------------------------
// prettier-ignore
export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const charactername = req.query.charactername as string
  console.log(`${charactername} 요청`);
  const encodedName = encodeURIComponent(charactername)
  
  const accessToken = await getToken();
  const localCache = cache.get(`local_character_${charactername}`);
  const redisCache = await JSON.parse(await redisCli.get(`Redis_character_${charactername}`));
  if (localCache) {
    res.status(200).json(localCache)
    return
  } 
  if (redisCache) {
    console.log(`❌로컬 ${charactername} 캐릭터 캐시없음`);
    cache.set(`local_character_${charactername}`, redisCache);
    res.status(200).json(redisCache)
    return
  }
  console.log(`❌ Redis ${charactername} 캐릭터 캐시없음`);
  try {
    const characterResponse =  await axios.get(
      `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodedName}?namespace=profile-classic1x-kr&locale=ko_KR&access_token=KR8yFplomaTeggvFh9IELHFBMMPGWHR6UV`);
    const equimentResponse = await axios.get(
      `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodedName}/equipment?namespace=profile-classic1x-kr&access_token=KR8yFplomaTeggvFh9IELHFBMMPGWHR6UV&locale=ko_KR`);
    const stasticsResponse = await axios.get(
      `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodedName}/statistics?namespace=profile-classic1x-kr&access_token=KR8yFplomaTeggvFh9IELHFBMMPGWHR6UV&locale=ko_KR`);


        console.log('완료');
        const equimentResponseData = equimentResponse.data
    const characterResponseData : WoWCharacterProfile = characterResponse.data    
    const equimentItems : Item[]= equimentResponseData.equipped_items
    const stasticsResponseData : Statistics = stasticsResponse.data
    const equimentItemsAddURL = equimentItems.map(async (item : Item, idx)=>{
      const response = await axios.get(`https://kr.api.blizzard.com/data/wow/media/item/${item.media.id}?namespace=static-1.14.4_50753-classic1x-kr&access_token=KR8yFplomaTeggvFh9IELHFBMMPGWHR6UV`)
      const imgURL = response.data.assets[0].value
      item.media.url = imgURL
      return item
    })
    const resolveEquimentItemsAddURL = await Promise.all(equimentItemsAddURL)

    characterResponseData.equipment.items = resolveEquimentItemsAddURL
    characterResponseData.statistics.data = stasticsResponseData
    
    redisCli.set(`Redis_character_${charactername}`, JSON.stringify(characterResponseData),60 * 2)
    redisCli.expire(`Redis_character_${charactername}`, 60 * 3); // 3600초 후에 username 키 삭제
    res.status(200).json(characterResponseData)
    return
  } catch (error) {
    console.log('에러발생');
    console.log(error);
    res.status(500).send(error)
  }
}
