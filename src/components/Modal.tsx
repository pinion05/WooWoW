import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { CharacterProps } from "./Profile";
import axios from "axios";
import Item from "@/model/Item";
import IconComponent from "./ItemComponent";
import CharacterStatistics from "@/model/Statistics";
import wowHardcoreLogo from "../img/WOW_Classic_Hardcore_Logo_enUS.png";
import Image from "next/image";
import { Spacing } from "./styledComponents";
import Link from "next/link";
import Statistics from "@/model/Statistics";

export default function Modal({
  info,
  playerName,
  closeFunction,
}: CharacterProps): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  const equippedItems: Item[] = info.equipment.items;
  const statistics: Statistics = info.statistics.data;

  const [head, setHead] = useState<Item>();
  const [neak, setNeak] = useState<Item>();
  const [shoulders, setShoulders] = useState<Item>();
  const [under, setUnder] = useState<Item>();
  const [chest, setChest] = useState<Item>();
  const [waist, setWaist] = useState<Item>();
  const [legs, setLegs] = useState<Item>();
  const [feet, setFeet] = useState<Item>();
  const [wrist, setWrist] = useState<Item>();
  const [hand, setHand] = useState<Item>();
  const [finger1, setFinger1] = useState<Item>();
  const [finger2, setFinger2] = useState<Item>();
  const [trinket1, setTrinket1] = useState<Item>();
  const [trinket2, setTrinket2] = useState<Item>();
  const [back, setBack] = useState<Item>();
  const [mainHand, setMainHand] = useState<Item>();
  const [offHand, setOffHand] = useState<Item>();
  const [rangedWeapon, setRangedWeapon] = useState<Item>();
  const [out, setOut] = useState<Item>();

  let mount = false;

  useEffect(() => {
    if (mount) {
      return;
    }
    console.log(info.name + "마운트됨");
    clickContainer();
    mount = true;
  }, []);

  function clickContainer() {
    // console.log("컨테이너 클릭됨");
    modalRef.current?.showModal();
  }

  function clickCloseButton() {
    // console.log("닫기버튼 클릭됨");
    if (closeFunction) {
      closeFunction();
    }
  }

  useEffect(() => {
    console.log(
      "🚀 ~ file: Modal.tsx:81 ~ useEffect ~ equippedItems:",
      equippedItems
    );
    equippedItems?.forEach(
      (item: Item) => {
        switch (item.slot.name) {
          case "머리":
            setHead(item);
            break;
          case "목":
            setNeak(item);
            break;
          case "어깨":
            setShoulders(item);
            break;
          case "등":
            setBack(item);
            break;
          case "가슴":
            setChest(item);
            break;
          case "속옷":
            setUnder(item);
            break;
          case "겉옷":
            setOut(item);
            break;
          case "손목":
            setWrist(item);
            break;
          case "손":
            setHand(item);
            break;
          case "허리":
            setWaist(item);
            break;
          case "다리":
            setLegs(item);
            break;
          case "발":
            setFeet(item);
            break;
          case "반지 1":
            setFinger1(item);
            break;
          case "반지 2":
            setFinger2(item);
            break;
          case "장신구 1":
            setTrinket1(item);
            break;
          case "장신구 2":
            setTrinket2(item);
            break;
          case "주장비":
            setMainHand(item);
            break;
          case "원거리 장비":
            setRangedWeapon(item);
            break;
          case "보조장비":
            setOffHand(item);
            break;
        }
      },
      [equippedItems]
    );
  });

  interface RstatsProps {
    name: string;
    effective: string | number | undefined;
  }

  const rstats: RstatsProps[] = [
    { name: "전투력", effective: statistics?.attack_power },
    {
      name: "공격력",
      effective: `${Math.round(
        statistics?.main_hand_damage_min ?? 0
      )}-${Math.round(statistics?.main_hand_damage_max ?? 0)}`,
    },
    {
      name: "초당공격력",
      effective: Math.round(statistics?.main_hand_dps ?? 0),
    },
    {
      name: "최대체력",
      effective: Math.round(statistics?.health ?? 0),
    },
    {
      name: "최대마나",
      effective: Math.round(statistics?.power ?? 0),
    },
    {
      name: "데미지감소",
      effective: `${Math.round(
        ((statistics?.armor.effective ?? 0) /
          ((statistics?.armor.effective ?? 0) + 85 * info.level + 400)) *
          100
      )}%`,
    },
  ];

  return (
    <dialog
      id="modal"
      ref={modalRef}
      className="modal rounded-md overflow-visible max-sm:w-[90vw] "
    >
      <div
        id="container"
        className="modal-content w-[470px] h-auto flex flex-col bg-stone-900 rounded-lg max-sm:w-[100%]"
      >
        <div
          id="header"
          className="flex bg-stone-700 justify-between rounded-tr-lg rounded-tl-lg"
        >
          <p
            id="캐릭터이름"
            className=" relative left-[135px] text-white text-[23px] w-[200px] justify-center flex max-sm:left-[20vw]"
          >
            {info.name}
          </p>
          <button
            id="닫기버튼"
            onClick={() => {
              clickCloseButton();
            }}
            className="w-[50px] h-[35px] bg-red-800 justify-center items-center justify-self-end flex text-amber-300 cursor-pointer rounded-tr-lg"
          >
            X
          </button>
        </div>
        <div id="서브타이틀" className="flex flex-col justify-center w-[100%]">
          <p className=" flex justify-center text-xs text-amber-300 ">
            레벨{info.level} {info.race.name} {info.character_class.name}
          </p>
        </div>
        <div id="메인배열" className="flex ">
          <ItemList id="왼쪽아이템창" className="flex flex-col ">
            {[head, neak, shoulders, back, chest, under, out, wrist].map(
              (slot, idx) => {
                return (
                  <>
                    <IconComponent item={slot} key={idx} dir="right" />
                    <Spacing height={5} />
                  </>
                );
              }
            )}
          </ItemList>
          <div id="캐릭터렌더,스텟" className=" w-[100%] h-[500px] mt-[10px]">
            <div
              id="캐릭터렌더링"
              className="w-[100%] h-[51%] bg-neutral-900 ring-gray-500 ring-[2px] rounded-lg flex justify-end"
            >
              <p className="text-gray-50 absolute left-[100px] text-2xl top-[160px] max-sm:w-[100%] max-sm:left-[100px] max-sm:text-xs">
                WOOWOW_0.1.1
              </p>
              <div className="flex flex-col">
                <div className="w-[30px] h-[30px] rounded-sm bg-gray-400 m-[3px] ring-[2px] ring-gray-500">
                  <p className="text-white">
                    {statistics?.holy_resistance.effective}
                  </p>
                </div>
                <div className="w-[30px] h-[30px] rounded-sm bg-red-800 m-[3px] ring-[2px] ring-gray-500">
                  <p className="text-white">
                    {" "}
                    {statistics?.fire_resistance.effective}
                  </p>
                </div>
                <div className="w-[30px] h-[30px] rounded-sm bg-green-800 m-[3px] ring-[2px] ring-gray-500">
                  <p className="text-white">
                    {statistics?.nature_resistance.effective}
                  </p>{" "}
                </div>
                <div className="w-[30px] h-[30px] rounded-sm bg-blue-800 m-[3px] ring-[2px] ring-gray-500">
                  <p className="text-white">
                    {statistics?.arcane_resistance.effective}
                  </p>{" "}
                </div>
                <div className="w-[30px] h-[30px] rounded-sm bg-purple-800 m-[3px] ring-[2px] ring-gray-500">
                  <p className="text-white">
                    {statistics?.shadow_resistance.effective}
                  </p>{" "}
                </div>
              </div>
            </div>
            <div
              id="캐릭터스텟"
              className="w-[100%] h-[auto] mt-[10px]  rounded-lg outline-gray-500 flex justify-evenly"
            >
              <div
                id="캐릭터 코어스텟"
                className="w-[40%] h-[auto] bg-stone-950 flex flex-col justify-start ring-zinc-400 ring-2 rounded-lg p-[2px] mr-1"
              >
                {""}
                {[
                  { name: "힘", effective: statistics?.strength.effective },
                  { name: "민첩성", effective: statistics?.agility.effective },
                  { name: "체력", effective: statistics?.stamina.effective },
                  { name: "지능", effective: statistics?.intellect.effective },
                  { name: "정신력", effective: statistics?.spirit.effective },
                  { name: "방어도", effective: statistics?.armor.effective },
                ].map((stat) => {
                  return (
                    <>
                      <div className="flex justify-between m-[0]">
                        <p className="text-sm text-yellow-500 max-sm:text-xs">
                          {stat.name}
                        </p>
                        <p className="text-sm text-[#00ff00] max-sm:text-xs">
                          {stat.effective}
                        </p>
                      </div>
                    </>
                  );
                })}
                {""}
              </div>

              <div
                id="캐릭터 코어스텟"
                className="w-[50%] h-[auto] bg-stone-950 flex flex-col justify-start ring-zinc-400 ring-2 rounded-lg p-[2px]"
              >
                {rstats.map((stat) => {
                  return (
                    <>
                      <div className="flex justify-between m-[0]">
                        <p className="text-sm text-yellow-500 max-sm:text-xs">
                          {stat.name}{" "}
                        </p>
                        <p className="text-sm text-[#00ff00] max-sm:text-xs">
                          {stat.effective}
                        </p>
                      </div>
                    </>
                  );
                })}
                {""}
              </div>
            </div>
            <Spacing height={5} />
            <div id="하단아이템배열" className="flex justify-center">
              {[mainHand, offHand, rangedWeapon].map((slot, idx) => {
                return (
                  <>
                    <Spacing width={3} />
                    <IconComponent item={slot} key={idx} dir="left" />
                    <Spacing width={3} />
                  </>
                );
              })}
            </div>
          </div>
          <ItemList id="왼쪽아이템창">
            {[
              hand,
              waist,
              legs,
              feet,
              finger1,
              finger2,
              trinket1,
              trinket2,
            ].map((slot, idx) => {
              return (
                <>
                  <IconComponent item={slot} key={idx} dir="left" />
                  <Spacing height={5} />
                </>
              );
            })}
          </ItemList>
          <Link
            href={`/moreinfo`}
            className="p-[10px] bg-slate-300 absolute translate-x-[340px] max-sm:translate-x-[110px] max-sm:translate-y-[470px] translate-y-[48vh] text-[00ff00] rounded-md "
          >
            자세히보기
          </Link>
        </div>
      </div>
    </dialog>
  );
}

const ItemList = styled.div`
  padding: 5px;
  display: flex;
  flex-flow: column;
`;
