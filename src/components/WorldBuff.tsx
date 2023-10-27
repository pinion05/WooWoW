import { useEffect, useState } from "react";

export default function WorldBuff(): JSX.Element {
  const [buffData, setBuffData] = useState();
  useEffect(() => {});
  return (
    <div className="">
      {buffData && <p>{buffData}</p>}
      <p className="text-2xl">월드버프정보 지금 개발중</p>
    </div>
  );
}
