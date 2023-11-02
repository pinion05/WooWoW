"use client";
import Image from "next/image";
import wowHardcoreLogo from "../img/WOW_Classic_Hardcore_Logo_enUS.png";
import ProfileArea from "@/components/ProfileArea";
import GameInfos from "./GameInfos";

export default function Home(): JSX.Element {
  return (
    <main className="min-w-full flex flex-col items-center justify-center">
      <div className="flex w-[100vw]">
        <GameInfos />
      </div>
      <Image src={wowHardcoreLogo} alt="" />
      <ProfileArea />
    </main>
  );
}
