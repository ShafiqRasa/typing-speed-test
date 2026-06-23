import { useMemo } from "react";

type Mode = "time" | "passage";

interface TypingStats {
  correctCharacters: number;
  incorrectCharacters: number;
  accuracy: number;
  wpm: number;
}

export function useTypingStats(
  typing: string,
  currentText: string,
  mode: Mode,
  timeLeft: number,
  elapsedTime: number,
): TypingStats {
  const typedLength = Math.min(typing.length, currentText.length);

  const correctCharacters = useMemo(
    () =>
      typing
        .slice(0, typedLength)
        .split("")
        .reduce((count, char, index) => {
          return count + (char === currentText[index] ? 1 : 0);
        }, 0),
    [currentText, typedLength, typing],
  );

  const incorrectCharacters = Math.max(typedLength - correctCharacters, 0);

  const accuracy = typedLength
    ? Math.round((correctCharacters / typedLength) * 100)
    : 100;

  const elapsedSeconds = mode === "time" ? 60 - timeLeft : elapsedTime;
  const wpm =
    elapsedSeconds > 0
      ? Math.round(correctCharacters / 5 / (elapsedSeconds / 60))
      : 0;

  return { correctCharacters, incorrectCharacters, accuracy, wpm };
}
