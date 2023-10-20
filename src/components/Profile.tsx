"use client";

import { styled } from "styled-components";
import wak from "../img/wak.jpg";
import tomb from "../img/coffin.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import Modal from "./Modal";

export interface CharacterProps {
  info: WoWCharacterProfile;
  playerName?: string;
  closeFunction?: () => void;
}

const Profile = ({ info, playerName }: CharacterProps): JSX.Element => {
  //
  const [isModalon, setIsModalOn] = useState<boolean>(false);
  //
  function classIcon(className: string) {
    switch (className) {
      case "도적":
        return "https://i.namu.wiki/i/8Uvmcr2FAPyGoA_61zzO5VaAntOi_Rz2lUB1QU3xjq3bplgWOVNYXSKWgHba1eZz2WyXng3wIESlK1gE0qMjlA.webp";
      case "마법사":
        return "https://i.namu.wiki/i/-P6SC-CX-q4HHhWut_mgrgoPcDgE-IWPGlS67PH5KYM-8_Tg4_dKMvnBEL9Clgj6ZmKzocWEKYhMokf96AgDmw.webp";
      case "성기사":
        return "https://i.namu.wiki/i/xmh6KSENsSX9mzuYB9Ad1ckJ-k4IGzG1nvPhUzetQkHHWZZe_Ita6qs1ioGP9YzuHGOxGVNP9Gj3MA5x-P8Zww.webp";
      case "사제":
        return "https://i.namu.wiki/i/LsfDYjR4EpYG90YX4XmgOWVPgtmETrxvY8zkq1NnL18lLcU4KgcxygY2UOsPvKrIauEjU9_AAlpos5k1rclVPQ.webp";
      case "흑마법사":
        return "https://i.namu.wiki/i/_0xzaA9C7dCOhokQ2jzL-BbDNGyf1hfiSVsAh__MHEVYEXXJ1J2ac-og29tj9F2GZfNeNo_3REh0WkVQV5u0LA.webp";
      case "사냥꾼":
        return "https://i.namu.wiki/i/yZfxCQWZA126WW79miKIysB1lToZJMj1c6DoGDfxN2aae77AKJ-lls0HMsCjd3dvIh0WnCc4zfrkfeFZsuoJyw.webp";
      case "드루이드":
        return "https://i.namu.wiki/i/V8BUX1PiHSZi8a--qEHGrhfLerjGEsd9qIsMQY5ioMJNoEpJJHh1uxPfR7ceL7EXJwfsgfEaFg8aEfi4y0-2hw.webp";
      case "전사":
        return "https://i.namu.wiki/i/El5j2Pldj3Ctk9xDRSTuVDGpy0hSncwKwbHMd8b1y_BDae96BdEYX9GvqNYxUw68B9qHtOuNjuaP1ATv5_2dHQ.webp";
    }
    return "https://i.namu.wiki/i/8Uvmcr2FAPyGoA_61zzO5VaAntOi_Rz2lUB1QU3xjq3bplgWOVNYXSKWgHba1eZz2WyXng3wIESlK1gE0qMjlA.webp";
  }

  function clickContainer() {
    setIsModalOn(true);
  }
  function clickcloseModal() {
    setIsModalOn(false);
  }

  return (
    <div>
      <Container
        onClick={(e) => {
          clickContainer();
        }}
        isLive={!info.is_ghost}
      >
        <ProfileContainer>
          {/* <PlayerImg src={wak} /> */}
          <Image
            className="h-[100px] rounded-tl-[10px] rounded-tr-[10px]"
            src={wak}
            alt=""
          />
          {info.is_ghost && (
            <Image className="h-[100px] w-[100px] absolute" src={tomb} alt="" />
          )}
          <PlayerName>{info.name}</PlayerName>
        </ProfileContainer>
        <Info>
          <Image
            className="rounded-bl-[10px] "
            src={classIcon(info.character_class.name)}
            width={30}
            height={30}
            alt=""
          />
          <span>{info.level}레벨</span>
        </Info>
      </Container>
      {isModalon && (
        <Modal
          closeFunction={clickcloseModal}
          info={info}
          playerName={playerName}
        />
      )}
    </div>
  );
};

interface ContainerProps {
  isLive: boolean;
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: center;
  outline: black solid 1px;
  width: 100px;
  height: auto;
  margin: 10px;
  background-color: ${(props) => (props.isLive ? `white` : "gray")};
  border-radius: 10px;
  box-shadow: 0px 00px 10px 0px #575757;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: auto;
  height: auto;
  margin: 0;
`;

const PlayerImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 10px 10px 0px 0px;
`;

const Tomb = styled.img`
  height: 100px;
  position: absolute;
`;

const PlayerName = styled.span`
  font-size: 14px;
`;

const JobIcon = styled.img`
  height: 30px;
  border-radius: 0px 0px 0px 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: start;
  outline: 1px black solid;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
`;

export default Profile;
