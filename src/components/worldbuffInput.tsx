"use client";

import axios from "axios";
import { RefObject, useRef } from "react";

export default function WorldbuffInput() {
  const adminkeyRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buffDataRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  async function onclick() {
    if (adminkeyRef.current && buffDataRef.current) {
      const adminkeyVAl = adminkeyRef.current.value;
      const buffDataVal = buffDataRef.current.value;
      if (buffDataVal === "" || adminkeyVAl === "") {
        alert("빈칸이 있습니다.");
        return;
      }
      console.log(adminkeyRef.current.value);
      console.log(buffDataRef.current.value);
      try {
        const response = await axios.post("https://woowow.xyz/api/worldbuff", {
          adminKey: adminkeyVAl,
          buffData: buffDataVal,
        });
        alert("게시성공");
      } catch (error) {
        alert(`게시 실패`);
      }
    }
  }
  return (
    <div>
      <div className="flex flex-col w-[500px] h-[900px]">
        <input
          type="password"
          className="p-[20px]"
          placeholder="admin key"
          ref={adminkeyRef}
        />
        <input
          ref={buffDataRef}
          type="text"
          className="p-[20px]"
          placeholder="일/시/장소/버프"
        />
        <button
          onClick={() => onclick()}
          className="p-[20px] bg-slate-500 rounded-xl"
        >
          게시하기
        </button>
      </div>
    </div>
  );
}
