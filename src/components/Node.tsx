import { FC, memo, useLayoutEffect, useRef } from "react";
import { useAppDispatch } from "../hook";
import { INode, updateNode } from "../store/nodeSlice";

interface INodeProps {
  node: INode;
}

export const Node: FC<INodeProps> = memo(function Node({ node }) {
  const myRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (myRef.current) {
      //Ставим Arrow на свои места ДО отрисовки с помощью UseLayoutEffect
      let elementInfo = myRef.current.getBoundingClientRect();
      dispatch(
        updateNode({
          id: node.id,
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

      //Реализация drag`n`drop
      let offsetX: number = node.left;
      let offsetY: number = node.top;
      const mouseMoveHandler = (e: MouseEvent) => {
        if (myRef.current) {
          const top = e.clientX - offsetX;
          const left = e.clientY - offsetY;

          myRef.current.style.left = `${top}px`;
          myRef.current.style.top = `${left}px`;

          elementInfo = myRef.current.getBoundingClientRect();
          dispatch(
            updateNode({
              id: node.id,
              top: elementInfo.top,
              left: elementInfo.left,
            })
          );
        }
      };
      const mouseDownHandler = (e: MouseEvent) => {
        if (myRef.current) {
          offsetX = e.clientX - myRef.current.offsetLeft!;
          offsetY = e.clientY - myRef.current.offsetTop!;
          document.addEventListener("mousemove", mouseMoveHandler);
        }
      };
      const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
      };
      myRef.current?.addEventListener("mousedown", mouseDownHandler);
      document.addEventListener("mouseup", mouseUpHandler);
      return () => {
        myRef.current?.removeEventListener("mousedown", mouseDownHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };
    }
  }, []);

  return (
    <div
      ref={myRef}
      style={{
        userSelect: "none",
        cursor: "move",
        backgroundColor: "gray",
        position: "absolute",
        width: node.width,
        height: node.height,
        top: node.top,
        left: node.left,
      }}
    >
      <p>{node.id}</p>
    </div>
  );
});
