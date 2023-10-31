import Image from "next/image";
import { Spacing } from "./styledComponents";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Spacing height={10} />
        <h1 className="p-[5px] bg-white rounded-lg ring-2 ring-black">
          로딩중..
        </h1>
        <Image
          src="https://i.namu.wiki/i/nzFreuEJ0CVPE-cL2GL87MOZp18-S5ceWM3KS6bufM-NmfAgFEsYB7ncI835taZCkx_zhDEzNiNlrSpVgfTGEQ.gif"
          alt=""
          width={200}
          height={200}
        />
        <Spacing height={100} />
      </div>
    </>
  );
}
