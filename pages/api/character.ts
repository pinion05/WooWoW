import getToken from "../../apiFuntions/getAccessToken";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import Item from "@/model/Item";
import Statistics from "@/model/Statistics";
const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USERNAME, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

//!---------------------------------------------------------------------여기부터 엔드포인트
// prettier-ignore
export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const charactername = req.query.charactername as string
  const encodedName = encodeURIComponent(charactername)
  const accessToken = await getToken();
  if (!accessToken) {
    console.log(`accessToken 을 찾을 수 없습니다.`);
  }
  const redisCache = JSON.parse(await redis.get(`Redis_character_${charactername}`))
  if (redisCache) {
    res.status(200).json(redisCache);
    return
  }
  console.log(`❌ Redis ${charactername} 캐릭터 캐시없음`);
  try {
    const characterResponse =  await axios.get(
      `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodedName}?namespace=profile-classic1x-kr&locale=ko_KR&access_token=${accessToken}`);
    const equimentResponse = await axios.get(
      `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodedName}/equipment?namespace=profile-classic1x-kr&access_token=${accessToken}&locale=ko_KR`);
    const stasticsResponse = await axios.get(
      `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodedName}/statistics?namespace=profile-classic1x-kr&access_token=${accessToken}&locale=ko_KR`);
      
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

    await redis.set(`Redis_character_${charactername}`, JSON.stringify(characterResponseData), 'EX', 60 * 2);
    res.status(200).json(characterResponseData)
    return
  } catch (error) {
    console.log('에러발생');
    console.log(error);
    res.status(500).send(error)
  }
}
