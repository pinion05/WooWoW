"use client";
import Item from "@/model/Item";
import itemOutline from "../img/default.png";
import { styled } from "styled-components";
import { useRef, useState } from "react";
import React from "react";
import Tooltip from "./Tooltip";
import ItemDiscription from "./ItemDiscriptcion";

interface ItemComponentProps {
  item: Item | undefined;
  dir: "right" | "left" | "top" | "bottom";
}

export default function IconComponent({
  item,
  dir,
}: ItemComponentProps): JSX.Element {
  const [isMouseEnter, setMouseEnter] = useState<boolean>();
  const containerRef = useRef<any>();

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

const Container = styled.div<Quality>`
  width: 50px;
  height: 50px;
  background-color: #282828;
  outline: 2px solid ${(props) => q_color(props.quality)};
  border-radius: 9px;
`;

interface Quality {
  quality: `일반` | `고급` | `희귀` | `영웅` | undefined;
}

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
