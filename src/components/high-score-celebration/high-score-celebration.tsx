import { HighScoreMessage } from "./high.score.celebration.styles";

// Renders celebratory UI when the user beats their best score.
const HighScoreCelebration = () => {
  return (
    <HighScoreMessage aria-live="polite">
      <span>🎉</span>
      <strong>High Score Smashed!</strong>
    </HighScoreMessage>
  );
};

export default HighScoreCelebration;
