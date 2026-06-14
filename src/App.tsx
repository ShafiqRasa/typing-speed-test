import { useEffect, useMemo, useRef, useState } from "react";
import { TextArea, Wrapper, TypingArea } from "./app.styles";
import NavBar, {
  CustomButton,
  Difficulty,
  Greeting,
  Mode,
  TestCompletedMessage,
  Widget,
} from "./components";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setCurrentText, setDifficulty, setMode } from "./store/typingSlice";

const FIRST_VISIT_KEY = "typing_app_first_visit";
const SETTINGS_KEY = "typing-speed-test-settings";
const HIGH_SCORE_KEY = "typing-speed-test-high-score";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.typing);

  const [hasVisited, setHasVisited] = useState(
    () => localStorage.getItem(FIRST_VISIT_KEY) === "true",
  );
  const [typing, setTyping] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [highScore, setHighScore] = useState<{ wpm: number; accuracy: number }>(
    () => {
      try {
        const saved = localStorage.getItem(HIGH_SCORE_KEY);
        return saved ? JSON.parse(saved) : { wpm: 0, accuracy: 0 };
      } catch {
        return { wpm: 0, accuracy: 0 };
      }
    },
  );
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
        dispatch(setDifficulty(parsed.difficulty as never));
      if (parsed.mode) dispatch(setMode(parsed.mode));
    } catch {
      localStorage.removeItem(SETTINGS_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ difficulty: state.difficulty, mode: state.mode }),
    );
  }, [state.difficulty, state.mode]);

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

  const correctCharacters = useMemo(
    () =>
      typing.split("").reduce((count, char, index) => {
        return count + (char === state.currentText[index] ? 1 : 0);
      }, 0),
    [typing, state.currentText],
  );

  const accuracy = typing.length
    ? Math.round((correctCharacters / typing.length) * 100)
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
    setHasVisited(true);
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    setTyping("");
    setCompleted(false);
    setIsRunning(true);
    textAreaRef.current?.focus();
  };

  const handleRestart = () => {
    dispatch(setCurrentText(state.difficulty));
    setTyping("");
    setElapsedTime(0);
    setTimeLeft(60);
    setCompleted(false);
    setIsRunning(true);
    textAreaRef.current?.focus();
  };

  const finishTest = () => {
    setHighScore((prev) => {
      const next = {
        wpm: Math.max(prev.wpm, wpm),
        accuracy: Math.max(prev.accuracy, accuracy),
      };

      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(next));
      return next;
    });

    setIsRunning(false);
    setCompleted(true);
  };

  const handleTyping: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
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
      <NavBar bestWpm={highScore.wpm} />

      <div className="typing-container">
        <div className="score-and-settings container">
          <div className="scores-container">
            <Widget label="WPM">{wpm}</Widget>
            <Widget label="Accuracy">{accuracy}%</Widget>
            {/* <Widget label="Best WPM">{highScore.wpm}</Widget> */}
            {/* <Widget label="Best Accuracy">{highScore.accuracy}%</Widget> */}
            <Widget label="Time">
              {state.mode === "time" ? `${timeLeft}s` : `${elapsedTime}s`}
            </Widget>
          </div>
          <div className="settings-container">
            <Difficulty />
            <Mode />
          </div>
        </div>
        <div className="content">
          {!hasVisited && (
            <Greeting
              onStart={() => {
                handleStart();
              }}
            />
          )}
          <div className="container textarea-btn-container">
            <TypingArea onClick={() => textAreaRef.current?.focus()}>
              <div className="shadow-text">{renderedText}</div>

              <TextArea
                ref={textAreaRef}
                className="text-area"
                value={typing}
                onChange={handleTyping}
                autoFocus
              />
            </TypingArea>
            <div className="center-item">
              {completed && (
                <TestCompletedMessage
                  wpm={wpm}
                  accuracy={accuracy}
                  correctCharacters={correctCharacters}
                  incorrectCharacters={typing.length - correctCharacters}
                  onRestart={handleRestart}
                />
              )}
              <CustomButton btnType="gray" handleButton={handleRestart} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
