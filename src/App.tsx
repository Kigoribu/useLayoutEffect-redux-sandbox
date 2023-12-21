import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { Node } from "./components/Node";
import { getRandomValue } from "./utils/getRandomValue";
import { Arrow } from "./components/Arrow";
import { INode, addNode } from "./store/nodeSlice";

function App() {
  const nodes = useAppSelector((state) => state.nodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    for (let i = 0; i < getRandomValue(2, 10); i++) {
      let y = getRandomValue(1, 800);
      let x = getRandomValue(1, 1600);
      dispatch(
        addNode({ id: i, top: y, left: x, startPoint: { x: x, y: y }, endPoint: { x: x, y: y } })
      );
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {nodes.map((node: INode, i: number) => (
        <Fragment key={i}>
          <Node top={node.top} left={node.left} i={i} />
          {i + 1 < nodes.length ? (
            <Arrow start={node.startPoint} end={nodes[i + 1]?.endPoint!} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

export default App;
