import { Spacing } from "./styledComponents";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Spacing height={10} />
        <h1>로딩중..</h1>
        <img src="https://i.namu.wiki/i/nzFreuEJ0CVPE-cL2GL87MOZp18-S5ceWM3KS6bufM-NmfAgFEsYB7ncI835taZCkx_zhDEzNiNlrSpVgfTGEQ.gif" />
      </div>
    </>
  );
}
