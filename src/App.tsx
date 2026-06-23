// initial imports
import { useEffect } from "react";

// internal imports
import { Wrapper } from "./app.styles";
import NavBar, { TypingTestPanel } from "./components";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  setDifficulty,
  setHasVisited,
  setHighScore,
  setMode,
} from "./store/typingSlice";
import type { DifficultyLevel } from "./utils/typingText";

// CONSTANTS
const FIRST_VISIT_KEY = "typing_app_first_visit";
const SETTINGS_KEY = "typing-speed-test-settings";
const HIGH_SCORE_KEY = "typing-speed-test-high-score";

// App is a pure layout controller.
// It handles persistence (localStorage) and renders the top-level shell.
// All typing-session logic lives in TypingTestPanel.
function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.typing);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        difficulty?: string;
        mode?: "time" | "passage";
      };

      if (parsed.difficulty)
        dispatch(setDifficulty(parsed.difficulty as DifficultyLevel));
      if (parsed.mode) dispatch(setMode(parsed.mode));
    } catch {
      localStorage.removeItem(SETTINGS_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setHasVisited(localStorage.getItem(FIRST_VISIT_KEY) === "true"));

    try {
      const savedScore = localStorage.getItem(HIGH_SCORE_KEY);
      if (!savedScore) return;

      const parsedScore = JSON.parse(savedScore) as {
        wpm?: number;
        accuracy?: number;
      };

      dispatch(
        setHighScore({
          wpm: parsedScore.wpm ?? 0,
          accuracy: parsedScore.accuracy ?? 0,
        }),
      );
    } catch {
      localStorage.removeItem(HIGH_SCORE_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ difficulty: state.difficulty, mode: state.mode }),
    );
  }, [state.difficulty, state.mode]);

  useEffect(() => {
    localStorage.setItem(FIRST_VISIT_KEY, String(state.hasVisited));
  }, [state.hasVisited]);

  useEffect(() => {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(state.highScore));
  }, [state.highScore]);

  return (
    <Wrapper>
      <NavBar bestWpm={state.highScore.wpm} />
      <TypingTestPanel />
    </Wrapper>
  );
}

export default App;
