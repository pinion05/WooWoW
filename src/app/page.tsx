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
      <Image src={wowHardcoreLogo} alt="" />
      <ProfileArea />
    </main>
  );
}
