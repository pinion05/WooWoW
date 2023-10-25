"use client";
import Image from "next/image";
import wowHardcoreLogo from "../img/WOW_Classic_Hardcore_Logo_enUS.png";
import ProfileArea from "@/components/ProfileArea";
import GuildInfoArea from "@/components/GuildInfoArea";
import { Spacing } from "@/components/styledComponents";
import Footer from "@/components/Footer";
import WorldBuff from "@/components/WorldBuff";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <main className="min-w-full flex flex-col items-center justify-center p-24">
      <GuildInfoArea />
      <WorldBuff />
      <a
        className="text-violet-800 underline"
        href="https://cafe.naver.com/steamindiegame/13454124"
      >
        임시공지
      </a>
      <Image src={wowHardcoreLogo} alt="" />
      <ProfileArea />
    </main>
  );
}
