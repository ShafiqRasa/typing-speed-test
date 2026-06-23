import type { ChangeEventHandler, ReactNode, RefObject } from "react";
import { TextArea, TypingArea } from "../../app.styles";
import { CustomButton, Greeting, TestCompletedMessage } from "..";
import HighScoreCelebration from "../high-score-celebration/high-score-celebration";

type TypingTestPanelProps = {
  hasVisited: boolean;
  onStart: () => void;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  typing: string;
  onTypingChange: ChangeEventHandler<HTMLTextAreaElement>;
  renderedText: ReactNode[];
  completed: boolean;
  celebrateHighScore: boolean;
  wpm: number;
  accuracy: number;
  correctCharacters: number;
  incorrectCharacters: number;
  onRestart: () => void;
};

// Hosts the typing surface and test result actions below it.
const TypingTestPanel = ({
  hasVisited,
  onStart,
  textAreaRef,
  typing,
  onTypingChange,
  renderedText,
  completed,
  celebrateHighScore,
  wpm,
  accuracy,
  correctCharacters,
  incorrectCharacters,
  onRestart,
}: TypingTestPanelProps) => {
  return (
    <div className="content">
      {!hasVisited && <Greeting onStart={onStart} />}
      <div className="container textarea-btn-container">
        <TypingArea onClick={() => textAreaRef.current?.focus()}>
          <div className="shadow-text">{renderedText}</div>

          <TextArea
            ref={textAreaRef}
            className="text-area"
            value={typing}
            onChange={onTypingChange}
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
                onRestart={onRestart}
              />
            </>
          )}
          <CustomButton btnType="gray" handleButton={onRestart} />
        </div>
      </div>
    </div>
  );
};

export default TypingTestPanel;
