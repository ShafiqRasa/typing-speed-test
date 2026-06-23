type TypingRenderedTextProps = {
  currentText: string;
  typing: string;
  completed: boolean;
};

// Paints each character with typing feedback styles (correct, incorrect, and current cursor position).
const TypingRenderedText = ({
  currentText,
  typing,
  completed,
}: TypingRenderedTextProps) => {
  return currentText.split("").map((char, index) => {
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
};

export default TypingRenderedText;
