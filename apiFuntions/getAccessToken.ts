// tokenManager.js
import NodeCache from "node-cache";
import axios from "axios";
import qs from "querystring";
import cache from "memory-cache";
require("dotenv").config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const tokenCache: NodeCache = new NodeCache({});

interface TokenData {
  value: string;
  expiry: number;
}
export default async function getToken() {
  console.log("토큰 요청");
  // prettier-ignore
  let tokenData: TokenData | undefined = tokenCache.get("accessToken");
  if (tokenData === undefined || isTokenExpired(tokenData)) {
    // 토큰이 없거나 만료된 경우 새로운 토큰 요청
    try {
      console.log("토큰 캐시없음");
      const response = await axios.post(
        "https://oauth.battle.net/token",
        qs.stringify({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${clientID}:${clientSecret}`
            ).toString("base64")}`,
          },
        }
      );
      const expiryTimeInSeconds = response.data.expires_in; // expires_in은 실제 응답에 맞게 변경해야 합니다.
      tokenData = {
        value: response.data.access_token,
        expiry: Date.now() + expiryTimeInSeconds * 1000,
      };

      // 새로운 토큰과 만료 시간 함께 저장
      tokenCache.set("accessToken", tokenData);
      console.log(response.data.access_token + "캐싱완료");
      return response.data.access_token;
    } catch (error) {
      console.log("🚀 ~ file: getAccessToken.ts:49 ~ getToken ~ error:", error);
      return null;
    }
  } else {
    console.log(tokenData.value + `캐시존재`);

    return tokenData.value;
  }
}

function isTokenExpired(tokenData: TokenData) {
  return Date.now() >= tokenData.expiry;
}
