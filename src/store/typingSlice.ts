import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  randomIndex,
  getTextForDifficulty,
  type DifficultyLevel,
} from "../utils/typingText";

type TypingState = {
  difficulty: DifficultyLevel;
  mode: "time" | "passage";
  currentText: string;
};

const initialState: TypingState = {
  difficulty: "easy",
  mode: "passage",
  currentText: getTextForDifficulty("easy"),
};

export const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setCurrentText: (
      state,
      action: PayloadAction<"easy" | "medium" | "hard">,
    ) => {
      state.currentText = getTextForDifficulty(
        action.payload,
        randomIndex(state.difficulty),
      );
    },
    setDifficulty: (state, action: PayloadAction<DifficultyLevel>) => {
      state.difficulty = action.payload;
      state.currentText = getTextForDifficulty(action.payload);
    },
    setMode: (state, action: PayloadAction<TypingState["mode"]>) => {
      state.mode = action.payload;
    },
  },
});

export const { setCurrentText, setDifficulty, setMode } = typingSlice.actions;

export default typingSlice.reducer;
