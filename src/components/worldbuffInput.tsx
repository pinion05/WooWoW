"use client";

import axios from "axios";
import { RefObject, useRef } from "react";
import { SERVER_URL } from "../../serverurl";
import { Spacing } from "./styledComponents";
import Link from "next/link";

export default function WorldbuffInput() {
  const adminkeyRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buffDataRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const adminkeySaveRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const weekRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const ampmRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const timeRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  async function onclick() {
    if (adminkeySaveRef.current?.checked && adminkeyRef.current) {
      localStorage.setItem("adminkey", adminkeyRef.current?.value);
    } else {
      localStorage.removeItem("adminkey");
    }

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
        await axios.post(`${SERVER_URL}/api/worldbuff`, {
          adminKey: adminkeyVAl,
          buffData: `${weekRef.current?.value} ${ampmRef.current?.value} ${timeRef.current?.value}  ${buffDataVal}`,
        });
        alert("게시성공");
      } catch (error) {
        alert(`게시 실패`);
      }
    }
  }
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex flex-col w-[1000px] h-[auto] p-[20px] rounded-lg bg-slate-400 items-start">
        <input
          defaultValue={localStorage.getItem("adminkey") ?? ""}
          type="password"
          className="text-lg p-[10px] rounded-md w-[100%]"
          placeholder="admin key"
          ref={adminkeyRef}
          autoComplete="on"
        />
        <div className="flex ">
          <input type="checkbox" ref={adminkeySaveRef} defaultChecked />
          <p>admin key 저장</p>
        </div>
        <Spacing height={20} />
        <div className="flex w-[100%]">
          <select name="" id="" className="rounded-md" ref={weekRef}>
            <option value="월요일">월요일</option>
            <option value="화요일">화요일</option>
            <option value="수요일">수요일</option>
            <option value="목요일">목요일</option>
            <option value="금요일">금요일</option>
            <option value="토요일">토요일</option>
            <option value="일요일">일요일</option>
          </select>
          <Spacing width={10} />
          <select name="" id="" className="rounded-md" ref={ampmRef}>
            <option value="오후">오후</option>
            <option value="오전">오전</option>
          </select>
          <Spacing width={10} />

          <select name="" id="" className="rounded-md" ref={timeRef}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num + `시`}>
                {num}시
              </option>
            ))}
          </select>
          <Spacing width={10} />

          <input
            ref={buffDataRef}
            type="text"
            className="text-lg p-[10px] rounded-md w-[100%]"
            placeholder="추가정보"
          />
        </div>
        <Spacing height={10} />
        <button className="">+버프 추가하기(준비중)</button>
        <button
          onClick={() => onclick()}
          className="p-[20px] bg-slate-500 rounded-xl my-[20px] w-[100%]"
        >
          게시하기
        </button>
        <Link href={"/"}>메인으로 가기</Link>
      </div>
    </div>
  );
}
