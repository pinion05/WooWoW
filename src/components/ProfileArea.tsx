"use client";

import axios from "axios";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import LevelStep from "./LevelStep.client";
import Character from "@/model/Characer";
import { json } from "stream/consumers";
import { Spacing } from "./styledComponents";
import Loading from "./Loading";
import { SERVER_URL } from "../../serverurl";

export default function ProfileArea(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [characterNames, setCharacterNames] = useState<string[]>([
    `줄건줘`,
    `지존아이네`,
    `드워프주르르`,
    `부가땅`,
    `뽀짝쿵야`,
  ]);

  const [characterDatas, setChatacterDatas] = useState<WoWCharacterProfile[]>();

  // let mounted = false;

  useEffect(() => {
    // if (mounted) return;
    featchCharacterDatas(characterNames);
    // mounted = true;
  }, []);

  async function featchCharacterDatas(names: string[]) {
    const responseArray = names.map(async (name: string, idx) => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/character?charactername=${encodeURIComponent(
            name
          )}`
        );
        if (response.status === 501) {
          alert(`네트워크에러발생`);
          return;
        }
        return response.data;
      } catch (error) {
        alert(`${name} 캐릭터를 찾을 수 없습니다.`);
        setCharacterNames((pre) => pre.filter((ele) => ele !== name));
      }
    });
    const chacterDatas = (await Promise.allSettled(responseArray)).filter(
      (result): result is PromiseFulfilledResult<WoWCharacterProfile> =>
        result.status === "fulfilled" && result.value !== undefined
    );

    const suitableArray = chacterDatas.map(
      (data: PromiseFulfilledResult<any>) => data.value
    );

    setChatacterDatas(suitableArray);
  }

  useEffect(() => {
    console.log(characterDatas);
  }, [characterDatas]);
  // prettier-ignore

  //

  function sortLevel (characters : WoWCharacterProfile[]) {
    return characters.sort((a,b)=> b.level - a.level )
  }

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

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputRef.current?.value);
    if (inputRef.current?.value === "") {
      console.log(`캐릭터 이름을 입력하세요`);
      return;
    }
    if (inputRef.current !== null) {
      setCharacterNames((pre) => [...pre, inputRef.current!.value]);
    }
  }

  useEffect(() => {
    console.log(characterNames);
    featchCharacterDatas(characterNames);
  }, [characterNames]);

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="캐릭터 이름을 검색하세요"
          className="p-[5px] rounded-md shadow-gray-900 shadow-md text-black"
        />
      </form>
      <Spacing height={20} />

      {!characterDatas && <Loading />}
      {characterDatas &&
        groupByConsecutiveNumbers(sortLevel(characterDatas)).map(
          (sameLevelcharcters: WoWCharacterProfile[], idx) => (
            <LevelStep
              characterDatas={sameLevelcharcters}
              key={idx}
            ></LevelStep>
          )
        )}
    </>
  );
}
