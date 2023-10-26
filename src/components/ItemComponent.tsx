"use client";
import Item from "@/model/Item";
import itemOutline from "../img/default.png";
import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import React from "react";
import slotempty from "../img/slotempty.png";
import Tooltip from "./Tooltip";
import ItemDiscription from "./ItemDiscriptcion";
import { dir } from "console";

interface ItemComponentProps {
  item: Item | undefined;
  dir: "right" | "left" | "top" | "bottom";
}

export default function IconComponent({
  item,
  dir,
}: ItemComponentProps): JSX.Element {
  const [isMouseEnter, setMouseEnter] = useState<boolean>();
  const [itemImgUrl, setItemUrl] = useState<string>();
  const containerRef = useRef<any>();

  useEffect(() => {
    // console.log("아이템컴포 마운트");
    if (item?.media?.id) {
      // console.log("아이템아이디 존재");
    } else {
      console.log("미디어 존재하지않음");
    }
  }, [item]);

  function ContainerMouseenter() {
    setMouseEnter(true);
  }
  function ContainerMouseLeave() {
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
        {item && (
          <img src={item.media.url} alt="" className="w-[100%] h-[100%]" />
        )}
        {isMouseEnter && item && (
          <Tooltip
            dir={dir}
            quality={item.quality.name}
            ChildComponent={<ItemDiscription item={item} />}
          ></Tooltip>
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
  z-index: 100;
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
