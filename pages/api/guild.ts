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
  //*캐릭터의 이름으로 캐시값을 조회하는코드
  // prettier-ignore
  const cachedGuildMemberCount = cache.get(`guildMemberCount`);
  if (!cachedGuildMemberCount) {
    console.log(`길드인원 캐시없음`);
    try {
      const response = await axios.get(
        // prettier-ignore
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
      console.log(`길드인원 호출완료`);
      cache.set(`guildMemberCount`, response.data.member_count);
      res.status(200).json(response.data.member_count);
      return;
    } catch (error) {
      console.log(`길드인원 호출실패`);
      // console.log(error);

      res.status(500).json(error);
      return;
    }
  } else {
    console.log(`길드인원 캐시존재`);
    res.status(200).json(cachedGuildMemberCount);
    return;
  }
}
