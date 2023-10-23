import getToken from "../../apiFuntions/getAccessToken";
import NodeCache, { Key } from "node-cache";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";

const cache = new NodeCache({ stdTTL: 60 * 1 });
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = await getToken();
  const charactername = req.query.charactername as string;
  //*캐릭터의 이름으로 캐시값을 조회하는코드
  // prettier-ignore
  let cachedCharData: WoWCharacterProfile | undefined = cache.get(`charData_${charactername}`);
  if (!cachedCharData) {
    console.log(`${charactername} 캐시없음`);
    try {
      const response = await axios.get(
        // prettier-ignore
        `https://kr.api.blizzard.com/profile/wow/character/makgora/${encodeURIComponent(charactername)}`,
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
      console.log(`${charactername} 호출완료`);
      cache.set(`charData_${charactername}`, response.data);
      res.status(200).json(response.data);
      return;
    } catch (error) {
      console.log(`${charactername} 호출실패`);
      // console.log(error);

      res.status(500).json(error);
      return;
    }
  } else {
    console.log(`${charactername}캐시존재`);
    res.status(200).json(cachedCharData);
    return;
  }
}
