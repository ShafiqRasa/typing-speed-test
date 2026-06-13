import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { easy } from "../utils/data.json";

type TypingState = {
  difficulty: "easy" | "medium" | "hard";
  mode: "time" | "passage";
  currentText: string;
};

const initialState: TypingState = {
  difficulty: "easy",
  mode: "passage",
  currentText: easy[0].text,
};

export const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setCurrentText: (state, action: PayloadAction<string>) => {
      state.currentText = action.payload;
    },
    setDifficulty: (
      state,
      action: PayloadAction<TypingState["difficulty"]>,
    ) => {
      state.difficulty = action.payload;
    },
    setMode: (state, action: PayloadAction<TypingState["mode"]>) => {
      state.mode = action.payload;
    },
  },
});

export const { setCurrentText, setDifficulty, setMode } = typingSlice.actions;

export default typingSlice.reducer;
