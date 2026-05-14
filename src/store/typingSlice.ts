import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TypingState = {
  currentText: string;
};

const initialState: TypingState = {
  currentText: "",
};

export const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setCurrentText: (state, action: PayloadAction<string>) => {
      state.currentText = action.payload;
    },
  },
});

export const { setCurrentText } = typingSlice.actions;

export default typingSlice.reducer;
