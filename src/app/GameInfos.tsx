import GuildInfoArea from "@/components/GuildInfoArea";
import WorldBuff from "@/components/WorldBuff";

export default function GameInfos(): JSX.Element {
  return (
    <div className="bg-slate-900 p-[10px] rounded-md ring-gray-500 ring-[3px] m-[20px] shadow-md shadow-black">
      <GuildInfoArea />
      <WorldBuff />
    </div>
  );
}
