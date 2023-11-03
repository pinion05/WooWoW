"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../serverurl";

export default function GuildInfoArea(): JSX.Element {
  const [guildmemberCount, setGuildmemberCount] = useState<number>(0);

  let mounted = false;

  useEffect(() => {
    if (!mounted) {
      // console.log("guild counter mounted");
      featchGuildInfo();
      mounted = true;
    }
  }, []);

  async function featchGuildInfo() {
    try {
      const response = await axios.get(`${SERVER_URL}/api/guild`);
      // console.log(response);
      setGuildmemberCount(response.data);
    } catch (error) {}
  }

  return (
    <div className="flex ">
      <div className=" relative z-10">
        <p className="text-white">왁타버스 현재인원</p>
        <p className="text-white">1000/{guildmemberCount}명</p>
        <p className="text-red-600"></p>
        <br />
      </div>
    </div>
  );
}
