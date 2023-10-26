import Profile from "./Profile";
import { ProfileProps } from "../model/ProfileProps";
import { ReactNode } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";

interface LevelStepProps {
  characterDatas: WoWCharacterProfile[];
}

export default function LevelStep({
  characterDatas,
}: LevelStepProps): JSX.Element {
  return (
    <div className="outline-1 border-black-100 border-solid flex">
      {characterDatas.map((userInfo, idx) => (
        <Profile info={userInfo} key={idx} />
      ))}
    </div>
  );
}
