// initial imports
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";

// internal imports
import { Wrapper } from "./app.styles";
import NavBar, { ScoreSettingsPanel, TypingTestPanel } from "./components";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  setCurrentText,
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

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.typing);

  const [typing, setTyping] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [celebrateHighScore, setCelebrateHighScore] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const previousSettings = useRef({
    difficulty: state.difficulty,
    mode: state.mode,
  });

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

  useEffect(() => {
    const difficultyChanged =
      previousSettings.current.difficulty !== state.difficulty;
    const modeChanged = previousSettings.current.mode !== state.mode;

    if (!difficultyChanged && !modeChanged) return undefined;

    const timeoutId = window.setTimeout(() => {
      setTyping("");
      setElapsedTime(0);
      setTimeLeft(60);
      setCompleted(false);
      setIsRunning(false);
      previousSettings.current = {
        difficulty: state.difficulty,
        mode: state.mode,
      };
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [state.difficulty, state.mode]);

  const typedLength = Math.min(typing.length, state.currentText.length);

  const correctCharacters = useMemo(
    () =>
      typing
        .slice(0, typedLength)
        .split("")
        .reduce((count, char, index) => {
          return count + (char === state.currentText[index] ? 1 : 0);
        }, 0),
    [state.currentText, typedLength, typing],
  );

  const incorrectCharacters = Math.max(typedLength - correctCharacters, 0);

  const accuracy = typedLength
    ? Math.round((correctCharacters / typedLength) * 100)
    : 100;

  const elapsedSeconds = state.mode === "time" ? 60 - timeLeft : elapsedTime;
  const wpm =
    elapsedSeconds > 0
      ? Math.round(correctCharacters / 5 / (elapsedSeconds / 60))
      : 0;

  useEffect(() => {
    if (!isRunning || completed) return undefined;

    if (state.mode === "time") {
      const timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(timer);
            setIsRunning(false);
            setCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => window.clearInterval(timer);
    }

    const timer = window.setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [completed, isRunning, state.mode]);

  const handleStart = () => {
    dispatch(setHasVisited(true));
    setCelebrateHighScore(false);
    setTyping("");
    setCompleted(false);
    setIsRunning(true);
    textAreaRef.current?.focus();
  };

  const handleRestart = () => {
    dispatch(setCurrentText(state.difficulty));
    setCelebrateHighScore(false);
    setTyping("");
    setElapsedTime(0);
    setTimeLeft(60);
    setCompleted(false);
    setIsRunning(true);
    textAreaRef.current?.focus();
  };

  const finishTest = () => {
    const previousHighScore = state.highScore;
    const nextHighScore = {
      wpm: Math.max(previousHighScore.wpm, wpm),
      accuracy: Math.max(previousHighScore.accuracy, accuracy),
    };

    const isNewBest =
      wpm > previousHighScore.wpm ||
      (wpm === previousHighScore.wpm && accuracy > previousHighScore.accuracy);

    if (isNewBest) {
      setCelebrateHighScore(true);
    }

    dispatch(setHighScore(nextHighScore));

    setIsRunning(false);
    setCompleted(true);
  };

  const handleTyping: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.currentTarget.value;

    if (!isRunning) {
      setIsRunning(true);
    }

    setTyping(value);

    if (value.length === state.currentText.length) {
      finishTest();
    }
  };

  const renderedText = state.currentText.split("").map((char, index) => {
    const typedChar = typing[index] ?? "";
    const isTyped = index < typing.length;
    const isCorrect = isTyped && typedChar === char;
    const isIncorrect = isTyped && typedChar !== char;
    const currentIndex = typing.length === 0 ? 0 : typing.length;
    const isCurrent = index === currentIndex && !completed;

    return (
      <span
        key={`${char}-${index}`}
        className={[
          "char",
          isCorrect ? "correct" : "",
          isIncorrect ? "incorrect" : "",
          isCurrent ? "current" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {char}
      </span>
    );
  });

  return (
    <Wrapper className="">
      <NavBar bestWpm={state.highScore.wpm} />

      <div className="typing-container">
        <ScoreSettingsPanel
          wpm={wpm}
          accuracy={accuracy}
          mode={state.mode}
          timeLeft={timeLeft}
          elapsedTime={elapsedTime}
        />

        <TypingTestPanel
          hasVisited={state.hasVisited}
          onStart={handleStart}
          textAreaRef={textAreaRef}
          typing={typing}
          onTypingChange={handleTyping}
          renderedText={renderedText}
          completed={completed}
          celebrateHighScore={celebrateHighScore}
          wpm={wpm}
          accuracy={accuracy}
          correctCharacters={correctCharacters}
          incorrectCharacters={incorrectCharacters}
          onRestart={handleRestart}
        />
      </div>
    </Wrapper>
  );
}

export default App;
