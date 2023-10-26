"use client";

import axios from "axios";
import { RefObject, useEffect, useRef, useState } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import LevelStep from "./LevelStep.client";
import Character from "@/model/Characer";
import { json } from "stream/consumers";
import { Spacing } from "./styledComponents";

export default function ProfileArea(): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);
  const inputVal = searchRef.current?.value as string;
  const [characterNames, setCharacterNames] = useState<string[]>([
    `줄건줘`,
    `응안줘`,
  ]);

  const [characterDatas, setChatacterDatas] = useState<null | any[]>(null);

  let mounted = false;

  useEffect(() => {
    if (mounted) return;
    featchCharacterDatas(characterNames);
    mounted = true;
  }, []);

  async function featchCharacterDatas(names: string[]) {
    const responseArray = names.map(async (name: string) => {
      try {
        const respons = await axios.get(
          `/api/character?charactername=${encodeURIComponent(name)}`
        );
        return respons.data;
      } catch (error) {}
    });
    const chacterDatas = await Promise.all(responseArray);
    setChatacterDatas(chacterDatas);
  }

  useEffect(() => {
    console.log(characterDatas);
  }, [characterDatas]);
  // prettier-ignore

  //

  // prettier-ignore
  function groupByConsecutiveNumbers(characterDatas: WoWCharacterProfile[]): WoWCharacterProfile[][] {
    const result: WoWCharacterProfile[][] = [];
    let temp: WoWCharacterProfile[] = [];
    for (let i = 0; i < characterDatas.length; i++) {
      if (
// prettier-ignore
        (i === 0) || (characterDatas[i].level) === (characterDatas[i - 1].level))
      {
        //* 첫 번째 요소거나 이전 요소와 같은 경우 임시 배열에 추가
        temp.push(characterDatas[i]); 
      } else {
        //* 이전 요소와 다른 경우
        result.push(temp); //* 임시 배열을 결과에 추가하고,
        temp = [characterDatas[i]]; // *새로운 숫자의 그룹을 시작합니다.
      }
    }
    if (temp.length) result.push(temp); // *마지막 그룹을 결과에 추가합니다.
    return result;
  }

  //

  return (
    <>
      <form onSubmit={() => {}}>
        <input
          ref={searchRef}
          type="text"
          placeholder="캐릭터 이름을 검색하세요"
          className="p-[5px] rounded-md shadow-gray-900 shadow-md"
        />
      </form>
      <Spacing height={20} />

      {characterDatas &&
        groupByConsecutiveNumbers(characterDatas).map(
          (sameLevelcharcters: WoWCharacterProfile[], idx) => (
            <>
              <LevelStep characterDatas={sameLevelcharcters}></LevelStep>
            </>
          )
        )}
    </>
  );
}
