import Profile from "./Profile";
import { ProfileProps } from "../model/ProfileProps";
import { ReactNode } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";

interface LevelStepProps {
  userInfoArray: WoWCharacterProfile[];
  playerName?: string;
}

export default function LevelStep({
  userInfoArray,
}: LevelStepProps): JSX.Element {
  return (
    <div className="outline-1 border-black-100 border-solid flex">
      {userInfoArray.map((userInfo, idx) => (
        <Profile info={userInfo} key={idx} />
      ))}
    </div>
  );
}
