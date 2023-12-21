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
}

const initialState: INode[] = [];

const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState,
  reducers: {
    addNode: (state: INode[], action: PayloadAction<INode>) => {
      state.push(action.payload);
    },
    updateNode: (state: INode[], action: PayloadAction<any>) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export default nodeSlice.reducer;

export const { addNode, updateNode } = nodeSlice.actions;
