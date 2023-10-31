import axios from "axios";
import { useEffect, useState } from "react";

export default function WorldBuff(): JSX.Element {
  const [buffData, setBuffData] = useState();
  async function getWorldbuff() {
    try {
      const response = await axios.get("https://woowow.xyz/api/worldbuff");
      setBuffData(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    getWorldbuff();
  });
  return (
    <div className="">
      {buffData && <p>{buffData}</p>}
      {!buffData && <p className="text-2xl">월드버프정보 없음</p>}
    </div>
  );
}
