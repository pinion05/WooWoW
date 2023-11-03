import { styled } from "styled-components";

interface TooltipProps {
  ChildComponent: JSX.Element;
  dir: Dir;
  quality: Quality ;
}

export default function Tooltip({
  ChildComponent,
  dir,
  quality,
}: TooltipProps) {
  return (
    <>
      <TooltipContainer
        dir={dir}
        className="max-sm:w-[150px]"
        quality={quality}
      >
        {ChildComponent}
      </TooltipContainer>
    </>
  );
}

function q_color(quality: Quality ) {
  const returnQuality = {
    [Quality.COMMON]: "white",
    [Quality.UNIQUE]: "#00ff00",
    [Quality.RARE]: "#0070dd",
    [Quality.EPIC]: "#9535e1",
  }
  if (!quality) return "gray"
  else return returnQuality[quality]
}

enum Quality {
  COMMON = "일반",
  UNIQUE = "고급",
  RARE = "희귀",
  EPIC = "영웅"
}

enum Dir {
  RIGHT = "right",
  LEFT = "left",
  TOP= "top",
  BOTTOM= "bottom",
}

interface TooltipContainer extends QualityProps {
  dir: Dir;
}

interface QualityProps {
  quality: Quality;
}

const TooltipContainer = styled.div<TooltipContainer>`
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
  @media (max-width: 768px) {
    width: 150px;
    left: ${(props) => (props.dir === Dir.LEFT ? "-160px" : "60px")};
  }
`;
