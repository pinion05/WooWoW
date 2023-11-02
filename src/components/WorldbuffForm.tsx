"use client";

import axios from "axios";
import { RefObject, useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../../serverurl";
import { Spacing } from "./styledComponents";
import Link from "next/link";
import WorldbuffInput from "./WorldbuffInput";
import GameInfos from "@/app/GameInfos";

export default function WorldbuffForm(): JSX.Element {
  const [buffDatas, setBuffDatas] = useState<any[]>([]);
  const [array, setArray] = useState<any[]>([null]);

  const adminkeyRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buffDataRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const adminkeySaveRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const weekRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const ampmRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const timeRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  useEffect(() => {}, []);

  async function onclick() {
    const firstIdx: string[] = buffDatas[0].split(" ");
    if (firstIdx[firstIdx.length] === "") {
      alert("정보를 입력하세요");
      return;
    }
    console.log();

    await axios.post(`${SERVER_URL}/api/worldbuff`, {
      adminKey: adminkeyRef.current?.value,
      buffData: JSON.stringify(buffDatas),
    });
    location.replace("/2946f0a8-8875-480d-b655-f6b6e31d02f4");
  }
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <GameInfos />

      <div className="flex flex-col w-[1000px] h-[auto] p-[20px] rounded-lg bg-slate-400 items-start">
        <input
          defaultValue={
            typeof window !== "undefined"
              ? localStorage.getItem("adminkey") ?? ""
              : ""
          }
          type="password"
          className="text-lg p-[10px] rounded-md w-[100%]"
          placeholder="admin key"
          ref={adminkeyRef}
          autoComplete="on"
        />
        <Spacing height={5} />
        <div className="flex ">
          <input type="checkbox" ref={adminkeySaveRef} defaultChecked />
          <p>admin key 저장</p>
        </div>
        <Spacing height={15} />
        {array.map((_, idx) => (
          <div key={idx} className="w-[100%]">
            <WorldbuffInput
              arrayControl={setArray}
              id={idx}
              buffDatasControl={setBuffDatas}
            />
            <Spacing height={10} />
          </div>
        ))}
        <Spacing height={10} />
        <div className="flex">
          <button
            className="p-[5px] rounded-md ring-1 ring-black bg-green-400"
            onClick={() => {
              setArray((pre) => [...pre, 1]);
            }}
          >
            +버프 추가하기
          </button>{" "}
          <Spacing width={20} />
          <button
            onClick={() => {
              setArray((pre) => pre.slice(0, pre.length - 1));
              setBuffDatas((pre) => pre.slice(0, pre.length - 1));
            }}
            className="p-[5px] rounded-md ring-1 ring-black bg-red-400"
          >
            -버프 제거하기
          </button>
        </div>
        <button
          onClick={() => onclick()}
          className="p-[20px] bg-slate-500 rounded-xl my-[20px] w-[100%]"
        >
          게시하기
        </button>
        <Link href={"/"}>메인으로 가기</Link>
      </div>
      <Spacing height={20} />
    </div>
  );
}
