"use client";
import Item from "@/model/Item";
import itemOutline from "../img/default.png";
import tooltipBg from "../img/tooltip.png";
import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import React from "react";
import slotempty from "../img/slotempty.png";

interface ItemComponentProps {
  item: Item | undefined;
}

export default function IconComponent({
  item,
}: ItemComponentProps): JSX.Element {
  const [isMouseEnter, setMouseEnter] = useState<boolean>();
  const [itemImgUrl, setItemUrl] = useState<string>();
  const containerRef = useRef<any>();

  useEffect(() => {
    // console.log("아이템컴포 마운트");
    if (item?.media?.id) {
      // console.log("아이템아이디 존재");
      featchImg(item.media.id);
    } else {
      console.log("미디어 존재하지않음");
    }
  }, [item]);

  async function featchImg(mediaid: number) {
    try {
      const response = await axios.get("http://localhost:5000/media", {
        params: { mediaid: mediaid.toString() },
      });
      setItemUrl(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function ContainerMouseenter() {
    setMouseEnter(true);
  }
  function ContainerMouseLeave() {
    // console.log(rec);

    setMouseEnter(false);
  }

  return (
    <>
      <Container
        ref={containerRef}
        quality={item?.quality.name}
        onMouseEnter={() => {
          ContainerMouseenter();
        }}
        onMouseLeave={() => {
          ContainerMouseLeave();
        }}
      >
        {item && <img src={itemImgUrl} alt="" className="w-[100%] h-[100%]" />}

        {isMouseEnter && item && (
          <TooltipContainer quality={item.quality.name}>
            <ItemName quality={item.quality.name} className="flex">
              {item?.name}
            </ItemName>

            <span className="text-white">
              <ItemDiscription>{item.binding?.name}</ItemDiscription>

              <div className="flex justify-between">
                <ItemDiscription>{item.inventory_type?.name}</ItemDiscription>
                <ItemDiscription className="mr-[20px]">
                  {item.item_subclass?.name}
                </ItemDiscription>
              </div>

              <ItemDiscription>
                {item.armor?.display.display_string}
              </ItemDiscription>

              {item.stats?.map((stat, idx) => (
                <ItemDiscription key={idx}>
                  {stat.display.display_string}
                </ItemDiscription>
              ))}

              {item.durability && (
                <ItemDiscription>
                  {item.durability.display_string}
                </ItemDiscription>
              )}

              {item.weapon && (
                <>
                  <div className="flex justify-between">
                    <ItemDiscription>
                      {item.weapon.damage.display_string}
                    </ItemDiscription>
                    <ItemDiscription>
                      {item.weapon.attack_speed.display_string}
                    </ItemDiscription>
                  </div>
                  <ItemDiscription>
                    {item.weapon.dps.display_string}
                  </ItemDiscription>
                </>
              )}

              {item.requirements && (
                <>
                  <ItemDiscription>
                    {item.requirements.level?.display_string}
                  </ItemDiscription>
                </>
              )}

              {item.requirements && (
                <ItemDiscription>
                  {`아이템레벨 ${
                    Number(
                      item.requirements.level?.display_string.split(" ")[
                        item.requirements.level.display_string.split(" ")
                          .length - 1
                      ]
                    ) + 5
                  }`}
                </ItemDiscription>
              )}

              {item.spells?.map((spell, idx) => {
                return (
                  <ItemDiscription className="text-green-500" key={idx}>
                    {spell.description}
                  </ItemDiscription>
                );
              })}
            </span>
          </TooltipContainer>
        )}
      </Container>
    </>
  );
}

interface ContainerProps {
  quality: `일반` | `고급` | `희귀` | `영웅` | undefined;
}
const ItemName = styled.span<ContainerProps>`
  color: ${(props) => q_color(props.quality)};
  font-size: small;
`;

const ItemDiscription = styled.p`
  margin: 0;
  font-size: smaller;
`;

const TooltipContainer = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  width: 300px;
  height: auto;
  background-color: #080d21;
  left: 60px;
  top: -120px;
  outline: 2px solid ${(props) => q_color(props.quality)};
  border-radius: 5px;
  flex-flow: column;
  padding: 5px;
`;

function q_color(quality: string | undefined) {
  switch (quality) {
    case "일반":
      return "white";
      break;
    case "고급":
      return "#00ff00";
      break;
    case "희귀":
      return "#0070dd";
      break;
    case "영웅":
      return "#9535e1";
      break;
    default:
      return "gray";
      break;
  }
}

const Container = styled.div<ContainerProps>`
  width: 50px;
  height: 50px;
  background-color: #282828;
  outline: 2px solid ${(props) => q_color(props.quality)};
  border-radius: 9px;
`;
