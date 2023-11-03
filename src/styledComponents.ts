import { styled } from "styled-components";

interface SpacingProps {
  width?: number;
  height?: number;
}
export const Spacing = styled.div<SpacingProps>`
  display: block;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;
