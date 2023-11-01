"use client";

import axios from "axios";
import { RefObject, useRef } from "react";
import { SERVER_URL } from "../../serverurl";
import { Spacing } from "./styledComponents";

export default function WorldbuffInput() {
  const adminkeyRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buffDataRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const adminkeySaveRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

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
          buffData: buffDataVal,
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
        <div className="flex">
          <input type="checkbox" ref={adminkeySaveRef} defaultChecked />
          <p>admin key 저장</p>
        </div>
        <Spacing height={20} />
        <div className="flex">
          <input
            ref={buffDataRef}
            type="text"
            className="text-lg p-[10px] rounded-md w-[100%]"
            placeholder="일/시/장소/버프"
          />
        </div>
        <button
          onClick={() => onclick()}
          className="p-[20px] bg-slate-500 rounded-xl my-[20px] w-[100%]"
        >
          게시하기
        </button>
      </div>
    </div>
  );
}
