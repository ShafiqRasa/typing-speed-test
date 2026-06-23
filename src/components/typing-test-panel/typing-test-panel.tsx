import { useEffect, useRef, useState, type ChangeEventHandler } from "react";
import { TextArea, TypingArea } from "../../app.styles";
import { CustomButton, Greeting, TestCompletedMessage } from "..";
import HighScoreCelebration from "../high-score-celebration/high-score-celebration";
import ScoreSettingsPanel from "../score-settings-panel/score-settings-panel";
import TypingRenderedText from "../typing-rendered-text/typing-rendered-text";
import { useTypingStats } from "../../hooks/useTypingStats";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCurrentText,
  setHasVisited,
  setHighScore,
} from "../../store/typingSlice";

// Owns all typing-session state and renders the full test UI.
const TypingTestPanel = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.typing);

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

  // Reset the session whenever the user changes difficulty or mode.
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

  const { correctCharacters, incorrectCharacters, accuracy, wpm } =
    useTypingStats(
      typing,
      state.currentText,
      state.mode,
      timeLeft,
      elapsedTime,
    );

  // Drive the countdown (time mode) or stopwatch (passage mode).
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

  return (
    <div className="typing-container">
      <ScoreSettingsPanel
        wpm={wpm}
        accuracy={accuracy}
        mode={state.mode}
        timeLeft={timeLeft}
        elapsedTime={elapsedTime}
      />

      <div className="content">
        {!state.hasVisited && <Greeting onStart={handleStart} />}
        <div className="container textarea-btn-container">
          <TypingArea onClick={() => textAreaRef.current?.focus()}>
            <div className="shadow-text">
              <TypingRenderedText
                currentText={state.currentText}
                typing={typing}
                completed={completed}
              />
            </div>

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
              <>
                {celebrateHighScore && <HighScoreCelebration />}
                <TestCompletedMessage
                  wpm={wpm}
                  accuracy={accuracy}
                  correctCharacters={correctCharacters}
                  incorrectCharacters={incorrectCharacters}
                  onRestart={handleRestart}
                />
              </>
            )}
            <CustomButton btnType="gray" handleButton={handleRestart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingTestPanel;
