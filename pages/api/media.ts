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
  const mediaid = req.query.mediaid as string;
  // prettier-ignore
  const cachedMediadata = cache.get(`mediaData_${mediaid}`);
  if (!cachedMediadata) {
    console.log(`${mediaid} 미디어캐시없음`);
    try {
      const response = await axios.get(
        // prettier-ignore
        `https://kr.api.blizzard.com/data/wow/media/item/${mediaid}`,
        {
          params: {
            namespace: "static-1.14.4_50753-classic1x-kr",
            access_token: accessToken,
          },
        }
      );
      if (response.status === 404) {
        res.status(500).json("error");
        return;
      }
      console.log(`${mediaid}미디어 호출완료`);
      cache.set(`mediaData_${mediaid}`, response.data.assets[0].value);
      res.status(200).json(response.data.assets[0].value);
      return;
    } catch (error) {
      console.log(`${mediaid}미디어 호출실패`);
      console.log(error);

      res.status(500).json(error);
      return;
    }
  } else {
    console.log(`${mediaid}미디어캐시존재`);
    res.status(200).json(cachedMediadata);
    return;
  }
}
