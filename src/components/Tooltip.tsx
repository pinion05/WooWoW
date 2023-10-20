import Item from "@/model/Item";

interface TooltipProps {
  ChildComponent: JSX.Element;
}

export default function Tooltip({ ChildComponent }: TooltipProps) {
  return <>{ChildComponent}</>;
}
