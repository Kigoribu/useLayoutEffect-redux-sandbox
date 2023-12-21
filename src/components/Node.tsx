import { FC, ForwardedRef, forwardRef, memo, useEffect, useLayoutEffect, useRef } from "react";
import { useAppDispatch } from "../hook";
import { updateNode } from "../store/nodeSlice";
import { getRandomValue } from "../utils/getRandomValue";

interface INodeProps {
  top: number;
  left: number;
  i: number;
}

const width = getRandomValue(50, 200);
const height = getRandomValue(50, 200);

export const Node: FC<INodeProps> = memo(function Node({ top, left, i }: any) {
  const myRef = useRef<HTMLDivElement>(null!);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    let elementInfo = myRef.current.getBoundingClientRect();
    dispatch(
      updateNode({
        id: i,
        top: elementInfo.top,
        left: elementInfo.left,
        endPoint: {
          x: elementInfo.left,
          y: elementInfo.top + elementInfo.height / 2,
        },
        startPoint: {
          x: elementInfo.left + elementInfo.width,
          y: elementInfo.top + elementInfo.height / 2,
        },
      })
    );
    let offsetX: number = left;
    let offsetY: number = top;
    const move = (e: any) => {
      elementInfo = myRef.current.getBoundingClientRect();
      myRef.current.style.left = `${e.clientX - offsetX}px`;
      myRef.current.style.top = `${e.clientY - offsetY}px`;
      dispatch(
        updateNode({
          id: i,
          top: elementInfo.top,
          left: elementInfo.left,
          endPoint: {
            x: elementInfo.left,
            y: elementInfo.top + elementInfo.height / 2,
          },
          startPoint: {
            x: elementInfo.left + elementInfo.width,
            y: elementInfo.top + elementInfo.height / 2,
          },
        })
      );
    };
    const mouseMoveHandler = (e: any) => {
      offsetX = e.clientX - myRef.current?.offsetLeft!;
      offsetY = e.clientY - myRef.current?.offsetTop!;
      document.addEventListener("mousemove", move);
    };
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", move);
    };
    myRef.current?.addEventListener("mousedown", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    return () => {
      myRef.current?.removeEventListener("mousedown", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  return (
    <div
      ref={myRef}
      style={{
        userSelect: "none",
        cursor: "move",
        backgroundColor: "gray",
        position: "absolute",
        width: width,
        height: height,
        top: top,
        left: left,
      }}
    >
      <p>{i}</p>
    </div>
  );
});
