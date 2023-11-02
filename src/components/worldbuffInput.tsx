import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { Spacing } from "./styledComponents";
import { log } from "console";

interface WorldbuffInputProps {
  arrayControl: Dispatch<SetStateAction<any[]>>;
  id: number;
  buffDatasControl: Dispatch<SetStateAction<any[]>>;
}

export default function WorldbuffInput({
  arrayControl,
  id,
  buffDatasControl,
}: WorldbuffInputProps): JSX.Element {
  const adminkeyRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buffDataRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const adminkeySaveRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const weekRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const ampmRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const timeRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  const [buffData, setBuffData] = useState<string>();

  function clickCheck() {
    const val = `${weekRef.current?.value} ${ampmRef.current?.value} ${timeRef.current?.value}  ${buffDataRef.current?.value}`;
    console.log(val);
    buffDatasControl((pre) => {
      const newArray = [...pre];
      newArray[id] = val;
      return newArray;
    });
    return val;
  }

  function syncValue() {
    const val = `${weekRef.current?.value} ${ampmRef.current?.value} ${timeRef.current?.value}  ${buffDataRef.current?.value}`;
    console.log(val);
    buffDatasControl((pre) => {
      const newArray = [...pre];
      newArray[id] = val;
      return newArray;
    });
    return val;
  }

  return (
    <div className="flex w-[100%] bg-slate-300 p-[10px] rounded-lg">
      <select
        name=""
        id=""
        className="rounded-md"
        ref={weekRef}
        onChange={() => {
          syncValue();
        }}
      >
        <option value="월요일">월요일</option>
        <option value="화요일">화요일</option>
        <option value="수요일">수요일</option>
        <option value="목요일">목요일</option>
        <option value="금요일">금요일</option>
        <option value="토요일">토요일</option>
        <option value="일요일">일요일</option>
      </select>
      <Spacing width={10} />
      <select
        name=""
        id=""
        className="rounded-md"
        ref={ampmRef}
        onChange={() => {
          syncValue();
        }}
      >
        <option value="오후">오후</option>
        <option value="오전">오전</option>
      </select>
      <Spacing width={10} />

      <select
        name=""
        id=""
        className="rounded-md"
        ref={timeRef}
        onChange={() => {
          syncValue();
        }}
      >
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
        onChange={() => {
          syncValue();
        }}
      />
    </div>
  );
}
