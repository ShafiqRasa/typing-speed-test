import {
  HighScoreMessage,
  HighScoredSmashed,
} from "./high.score.celebration.styles";

// Renders celebratory UI when the user beats their best score.
const HighScoreCelebration = () => {
  return (
    <>
      <HighScoreMessage aria-live="polite">
        <span>🎉</span>
        <strong>High Score Smashed!</strong>
      </HighScoreMessage>
      <HighScoredSmashed
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 50 }, (_, index) => (
          <span
            key={index}
            style={{
              position: "absolute",
              top: "8%",
              left: `${8 + (index % 6) * 14}%`,
              width: "8px",
              height: "18px",
              borderRadius: "999px",
              background:
                index % 3 === 0
                  ? "#ffd166"
                  : index % 3 === 1
                    ? "#7dd3fc"
                    : "#86efac",
              transform: `rotate(${index * 18}deg) translateY(${index % 2 === 0 ? "0" : "10px"})`,
              opacity: 0.95,
              animation: `confetti-fall ${1.4 + (index % 4) * 0.15}s ease-out forwards`,
            }}
          />
        ))}
      </HighScoredSmashed>
    </>
  );
};

export default HighScoreCelebration;
