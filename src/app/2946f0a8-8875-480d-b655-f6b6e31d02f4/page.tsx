"use client";

import {useRef} fomr 'react'
import axios from "axios";

export default function Page() {
  const adminkeyRef = useRef
  async function onclick() {
    console.log(`클릭`);
    try {
      await axios.post('/api/worldbuff',{adminKey : 'dd', buffData : 'dd'})
    } catch (error) {
      
    }
  }
  return (
    <div>
      <div className="flex flex-col w-[500px] h-[900px]">
        <input type="password" className="p-[20px]" placeholder="admin key" />
        <input type="text" className="p-[20px]" placeholder="일/시/장소/버프" />
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
