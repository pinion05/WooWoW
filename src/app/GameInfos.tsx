import GuildInfoArea from "@/components/GuildInfoArea";
import WorldBuff from "@/components/WorldBuff";

export default function GameInfos(): JSX.Element {
  return (
    <div className="bg-slate-900 p-[10px] rounded-md ring-yellow-300 ring-[3px]">
      <GuildInfoArea />
      <WorldBuff />
    </div>
  );
}
