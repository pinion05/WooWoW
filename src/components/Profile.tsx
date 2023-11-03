"use client";

import { styled } from "styled-components";
import wak from "../img/wak.jpg";
import tomb from "../img/coffin.png";
import bubsa from "../img/magicionIcon.webp";
import dotgu from "../img/thifeIcon.webp";
import paladin from "../img/paladinIcon.webp";
import saje from "../img/priestIcon.webp";
import blackbubsa from "../img/warlockIcon.webp";
import hunter from "../img/hunterIcon.webp";
import druid from "../img/druidIcon.webp";
import junsa from "../img/knightIcon.webp";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import Modal from "./Modal";

export interface CharacterProps {
  characterData: WoWCharacterProfile;
  closeFunction?: () => void;
}

const koongchan =
  "https://cafeptthumb-phinf.pstatic.net/MjAyMzA5MjVfMjA2/MDAxNjk1NjM2NDUzOTY5.5wHja-30rsUVDB3X0oLbDOdQcyw2GHvQ66SW7JWU0tog.rL5zQVM7AbH-SXAyZuAGiuEnP-AoELMAgPDJZwJSyYMg.PNG/%EB%B9%84%EC%B1%A4%EC%BF%B5%EC%95%BC.png?type=w1600";

const Profile = ({ characterData }: CharacterProps): JSX.Element => {
  //
  const [isModalon, setIsModalOn] = useState<boolean>(false);

  //
  function classIcon(className: string) {
    switch (className) {
      case "도적":
        return dotgu;
      case "마법사":
        return bubsa;
      case "성기사":
        return paladin;
      case "사제":
        return saje;
      case "흑마법사":
        return blackbubsa;
      case "사냥꾼":
        return hunter;
      case "드루이드":
        return druid;
      case "전사":
        return junsa;
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
      {/* <div
        className="w-[30px] h-[30px] absolute translate-x-[80px] translate-y-[10px] bg-red-700 rounded-tr-[10px] text-amber-400 flex justify-center items-center focus pointer-events-none z-100 rounded-bl-[10px ]"
        onClick={() => {
          console.log("닫기");
        }}
      >
        X
      </div> */}
      <Container
        onClick={(e) => {
          clickContainer();
        }}
        isghost={characterData.is_ghost.toString() as "true" | "false"}
      >
        <ProfileContainer>
          {/* <PlayerImg src={wak} /> */}
          <Image
            className="h-[100px] rounded-tl-[10px] rounded-tr-[10px]"
            src={wak}
            width={100}
            height={100}
            alt=""
          />
          {characterData.is_ghost && (
            <Image className="h-[100px] w-[100px] absolute" src={tomb} alt="" />
          )}

          <PlayerName className="text-black">{characterData.name}</PlayerName>
        </ProfileContainer>
        <Info>
          <Image
            className="rounded-bl-[10px] "
            src={classIcon(characterData.character_class.name)}
            width={30}
            height={30}
            alt=""
          />
          <span className="pointer-events-none text-black h-[100%] max-sm:text-[23px]">
            {characterData.level}레벨
          </span>
        </Info>
      </Container>
      {isModalon && (
        <Modal closeFunction={clickcloseModal} characterData={characterData} />
      )}
    </div>
  );
};

interface ContainerProps {
  isghost: "true" | "false";
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
  background-color: ${(props) => (props.isghost === "true" ? `gray` : "white")};
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

const PlayerName = styled.span`
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  justify-content: start;
  outline: 1px black solid;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
`;

export default Profile;
