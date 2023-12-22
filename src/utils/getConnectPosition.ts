import { Coords, INode } from "../store/nodeSlice";

interface IGetConnectPositionParams {
  node1: INode;
  node2: INode;
}

interface IGetConnectPosition {
  startPoint: Coords;
  endPoint: Coords;
}

export function getConnectPosition(node1: INode, node2: INode): IGetConnectPosition {
  const deltaTop = node1?.top - node2?.top;
  const deltaLeft = node1?.left - node2?.left;
  if (deltaTop < 0) {
    return {
      endPoint: {
        x: node1.left + node1.height / 2,
        y: node1.top,
      },
      startPoint: {
        x: node1.left + node1.height / 2,
        y: node1.top + node1.width,
      },
    };
  }
  return {
    endPoint: {
      x: node1.left,
      y: node1.top,
    },
    startPoint: {
      x: node1.left,
      y: node1.top,
    },
  };
}
