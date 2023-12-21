import { FC, useRef } from "react";
import { Coords } from "../store/nodeSlice";

interface IArrowProps {
  start: Coords;
  end: Coords;
}

export const Arrow: FC<IArrowProps> = ({ start, end }) => {
  const ref = useRef(null);

  return (
    <svg
      style={{
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    >
      <line
        ref={ref}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="black"
        strokeWidth="2"
      ></line>
    </svg>
  );
};
