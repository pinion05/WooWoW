"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function GuildInfoArea(): JSX.Element {
  const [guildmemberCount, setGuildmemberCount] = useState<number>(0);

  let mounted = false;

  useEffect(() => {
    if (!mounted) {
      console.log("guild counter mounted");
      featchGuildInfo();
      mounted = true;
    }
  }, []);

  async function featchGuildInfo() {
    try {
      const guildInfo = await axios.get(`api/guild`);
      console.log(guildInfo);
      setGuildmemberCount(guildInfo.data);
    } catch (error) {}
  }

  return (
    <div className="flex absolute left-2 top-3">
      <div className=" relative z-10">
        <p>왁타버스 현재인원</p>
        <p>1000/{guildmemberCount}명</p>
        <br />
        <p className="text-red-600">1분이상 딜레이가 있을 수 있습니다다</p>
        <p className="text-red-600">숫자가 안보인다면 새로고침해주세요</p>
        <p className="text-red-600"></p>
        <br />
      </div>
    </div>
  );
}
