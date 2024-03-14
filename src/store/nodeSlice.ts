import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Coords {
  x: number;
  y: number;
}

export interface INode {
  id: number;
  top: number;
  left: number;
  startPoint: Coords;
  endPoint: Coords | null;
  width: number;
  height: number;
}

interface IUpdateNode extends Partial<INode> {
  id: number;
}

const initialState: INode[] = [];

const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState,
  reducers: {
    addNode: (state: INode[], action: PayloadAction<INode>) => {
      state.push(action.payload);
    },
    updateNode: (state: INode[], action: PayloadAction<IUpdateNode>) => {
      const { id } = action.payload;
      state[id] = {
        ...state[id],
        ...action.payload,
      };
      state[id].endPoint = {
        x: state[id].left,
        y: state[id].top + state[id].height / 2,
      };
      state[id].startPoint = {
        x: state[id].left + state[id].width,
        y: state[id].top + state[id].height / 2,
      };
    },
    removeAllNodes: (state: INode[]) => {
      state.length = 0;
    },
  },
});

export default nodeSlice.reducer;

export const { addNode, updateNode, removeAllNodes } = nodeSlice.actions;
