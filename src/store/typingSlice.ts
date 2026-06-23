import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  randomIndex,
  getTextForDifficulty,
  type DifficultyLevel,
} from "../utils/typingText";

export type HighScore = {
  wpm: number;
  accuracy: number;
};

type TypingState = {
  difficulty: DifficultyLevel;
  mode: "time" | "passage";
  currentText: string;
  hasVisited: boolean;
  highScore: HighScore;
};

const initialState: TypingState = {
  difficulty: "easy",
  mode: "passage",
  currentText: getTextForDifficulty("easy"),
  hasVisited: false,
  highScore: { wpm: 0, accuracy: 0 },
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
    setHasVisited: (state, action: PayloadAction<boolean>) => {
      state.hasVisited = action.payload;
    },
    setHighScore: (state, action: PayloadAction<HighScore>) => {
      state.highScore = action.payload;
    },
  },
});

export const {
  setCurrentText,
  setDifficulty,
  setMode,
  setHasVisited,
  setHighScore,
} = typingSlice.actions;

export default typingSlice.reducer;
