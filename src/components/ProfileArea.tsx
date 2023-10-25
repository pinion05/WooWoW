"use client";

import axios from "axios";
import { RefObject, useEffect, useRef, useState } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import LevelStep from "./LevelStep.client";
import Character from "@/model/Characer";
import { json } from "stream/consumers";
import { Spacing } from "./styledComponents";

export default function ProfileArea(): JSX.Element {
  let mounted = false;

  useEffect(() => {
    if (!mounted) {
      try {
        fetchCharacters().then(() => {
          console.log("플레이어데이터 로딩완료");
          mounted = !mounted;
        });
      } catch (error) {
        console.error(error);
      }
    } else return;
  }, []);

  // prettier-ignore
  const [originUserInfoArrayVal, setOriginUserInfoArrayVal] = useState<Character[]>([
    {
      playerName: "우왁굳",
      characterName: "줄건줘",
    },
    {
      playerName: "천양",
      characterName: "응안줘",
    },
    {
      playerName: "비챤",
      characterName: "뽀짝쿵야",
    },
    {
      playerName: "징버거",
      characterName: "부가땅",
    },
    {
      playerName: "드워프주르르",
      characterName: "드워프주르르",
    },
    {
      playerName: "와저씨",
      characterName: "솔뿌엉이",
    },
  ]);
  //
  const searchRef = useRef<HTMLInputElement>(null);

  // prettier-ignore
  //*캐릭터 레벨별로 [[]]를 묶어주는함수  parameter 는 캐릭터들이 레벨별 정렬된 하나의 배열을 받는다
  function groupByConsecutiveNumbers(characterInfoArray: WoWCharacterProfile[]): WoWCharacterProfile[][] {
    const result: WoWCharacterProfile[][] = [];
    let temp: WoWCharacterProfile[] = [];
    for (let i = 0; i < characterInfoArray.length; i++) {
      if (
// prettier-ignore
        (i === 0) || (characterInfoArray[i].level) === (characterInfoArray[i - 1].level))
      {
        //* 첫 번째 요소거나 이전 요소와 같은 경우 임시 배열에 추가
        temp.push(characterInfoArray[i]); 
      } else {
        //* 이전 요소와 다른 경우
        result.push(temp); //* 임시 배열을 결과에 추가하고,
        temp = [characterInfoArray[i]]; // *새로운 숫자의 그룹을 시작합니다.
      }
    }
    if (temp.length) result.push(temp); // *마지막 그룹을 결과에 추가합니다.
    return result;
  }

  const [userInfos, setUserInfos] = useState<WoWCharacterProfile[]>();
  //

  const fetchCharacters = async () => {
    try {
      // prettier-ignore
      //* promise[] 를 반환함
      const promises: Promise<WoWCharacterProfile | undefined>[] = originUserInfoArrayVal.map((user) => charaterAPI(user.characterName));

      try {
        // prettier-ignore
        const dataArray = (await Promise.allSettled(promises))
        .filter((result): result is PromiseFulfilledResult<any>  => result.status === "fulfilled" && result.value !== undefined);
        const suitableArray = dataArray.map(
          (data: PromiseFulfilledResult<any>) => data.value
        );
        suitableArray.sort((a: WoWCharacterProfile, b: WoWCharacterProfile) => {
          if (!b.level || !a.level || !a || !b) {
            throw new Error("level is undefined");
          }
          return b.level - a.level;
        });
        setUserInfos(suitableArray);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function charaterAPI(
    characterName: string
  ): Promise<WoWCharacterProfile | undefined> {
    try {
      const encodedCharacterName = encodeURIComponent(characterName);
      const response = await axios.get(
        `/api/search?charactername=${encodedCharacterName}`
      );
      if (response.status === 500) {
        throw new Error("Server responded with status code 500");
      }
      return response.data;
    } catch (error) {
      console.error(error);
      console.log(`캐릭터 검색중 badresponse`);
      console.log(` ${characterName} 이름이 존재하지 않습니다.`);
      //* 캐릭터 검색 실패시 캐릭터 배열에서 삭제 => useEffect[OriginUserInfoArrayVal]실행
      setOriginUserInfoArrayVal((prev) =>
        prev.filter((user) => user.characterName !== characterName)
      );
      throw error; // or handle the error appropriately
    }
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    localStorage.setItem("1", "1");

    e.preventDefault();
    if (e.currentTarget) {
      setOriginUserInfoArrayVal((pre) => {
        if (!searchRef.current?.value) {
          alert("캐릭터이름을 입력하세요");
          return pre;
        }
        // prettier-ignore
        //* 캐릭터 이름을 캐릭터 이름 배열에 마지막에 추가함  -> setState를 통해서 리랜더링과 fetchCharacters 호출
        return [...pre,
          {
            playerName: "",
            characterName: searchRef.current.value,
          }];
      });
    }
    // localStorage.setItem("1", JSON.stringify(originUserInfoArrayVal));
  }

  useEffect(() => {
    console.log(
      "🚀 ~ file: ProfileArea.tsx:152 ~ ProfileArea ~ originUserInfoArrayVal:",
      originUserInfoArrayVal
    );
    fetchCharacters();
  }, [originUserInfoArrayVal]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: ProfileArea.tsx:156 ~ ProfileArea ~ useState ~ userInfos:",
      userInfos
    );
  }, [userInfos]);

  return (
    <>
      <form onSubmit={submit}>
        <input
          ref={searchRef}
          type="text"
          placeholder="캐릭터 이름을 검색하세요"
          className="p-[5px] rounded-md shadow-gray-900 shadow-md"
        />
      </form>
      <Spacing height={20} />

      {userInfos &&
        groupByConsecutiveNumbers(userInfos).map((ele, idx) => (
          <>
            <LevelStep
              // playerName={originUserInfoArrayVal[idx].playerName}
              userInfoArray={ele}
            ></LevelStep>
          </>
        ))}
    </>
  );
}
