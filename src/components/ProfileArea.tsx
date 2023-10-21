"use client";

import axios from "axios";
import { RefObject, useEffect, useRef, useState } from "react";
import WoWCharacterProfile from "@/model/WoWCharacterProfile ";
import LevelStep from "./LevelStep.client";
import Character from "@/model/Characer";

interface ProfileAreaProps {}

export default function ProfileArea(): JSX.Element {
  const [originUserInfoArrayVal, setOriginUserInfoArrayVal] = useState<
    Character[]
  >([
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
      playerName: "와저씨",
      characterName: "솔뿌엉이",
    },

    {
      playerName: "릴파",
      characterName: "황제팬치육호기",
    },
  ]);
  //
  const searchRef = useRef(null);

  function groupByConsecutiveNumbers(
    characterInfoArray: WoWCharacterProfile[]
  ): WoWCharacterProfile[][] {
    const result: WoWCharacterProfile[][] = [];
    let temp: WoWCharacterProfile[] = [];

    for (let i = 0; i < characterInfoArray.length; i++) {
      if (
        i === 0 ||
        characterInfoArray[i].level === characterInfoArray[i - 1].level
      ) {
        // 첫 번째 요소거나 이전 요소와 같은 경우
        temp.push(characterInfoArray[i]); // 임시 배열에 추가
      } else {
        // 이전 요소와 다른 경우
        result.push(temp); // 임시 배열을 결과에 추가하고,
        temp = [characterInfoArray[i]]; // 새로운 숫자의 그룹을 시작합니다.
      }
    }

    if (temp.length) result.push(temp); // 마지막 그룹을 결과에 추가합니다.

    return result;
  }

  const [userInfos, setUserInfos] = useState<Array<WoWCharacterProfile>>();
  //

  let mounted = false;

  const fetchCharacters = async () => {
    try {
      //* promise[] 를 반환함
      const promises: Promise<WoWCharacterProfile>[] =
        originUserInfoArrayVal.map((user) => charaterAPI(user.characterName));
      console.log(
        "🚀 ~ file: ProfileArea.tsx:79 ~ fetchCharacters ~ promises:",
        promises
      );
      try {
        const dataArray = (await Promise.allSettled(promises)).filter(
          (result) => result.status === "fulfilled"
        );

        console.log(
          "🚀 ~ file: ProfileArea.tsx:85 ~ fetchCharacters ~ dataArray:",
          dataArray
        );

        const suitableArray = dataArray.map((data) => data.value);
        console.log(
          "🚀 ~ file: ProfileArea.tsx:96 ~ fetchCharacters ~ suitableArray:",
          suitableArray
        );


        suitableArray.sort((a: WoWCharacterProfile, b: WoWCharacterProfile) => {
          if (!b.level || !a.level) {
            throw new Error("level is undefined");
          }
          return b.level - a.level;
        });
  
        setUserInfos(suitableArray);
        return dataArray;

        // const resolveArray = dataArray.map((promise)=>promise.status)
      } catch (error) {
        console.log(error);
      }
      // prettier-ignore
    } catch (error) {
      console.error(error);
    }
  };

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
    } else {
    }
  }, []);

  async function charaterAPI(characterName: string): Promise<any> {
    try {
      characterName = encodeURIComponent(characterName);
      const response = await axios.get(
        `http://localhost:5000/search?charactername=${characterName}`
      );
      if (response.status === 500) {
        return;
      }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // or handle the error appropriately
    }
  }

  // if (userInfos) {
  //   console.log(groupByConsecutiveNumbers(userInfos));
  // }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchRef.current.value);

    if (e.currentTarget) {
      setOriginUserInfoArrayVal((pre) => [
        ...pre,
        {
          playerName: "",
          characterName: searchRef.current.value,
        },
      ]);
    }
  }

  useEffect(() => {
    console.log(originUserInfoArrayVal);
    fetchCharacters().then((data) => console.log(data));
  }, [originUserInfoArrayVal]);

  return (
    <>
      <form onSubmit={submit}>
        <input
          ref={searchRef}
          type="text"
          placeholder="캐릭터 이름을 검색하세요"
          className="p-[5px] rounded-md"
        />
      </form>
      {userInfos &&
        groupByConsecutiveNumbers(userInfos).map((ele, idx) => (
          <>
            <LevelStep
              playerName={originUserInfoArrayVal[idx].playerName}
              userInfoArray={ele}
            ></LevelStep>
          </>
        ))}
    </>
  );
}
