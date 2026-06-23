// Renders celebratory UI when the user beats their best score.
const HighScoreCelebration = () => {
  return (
    <>
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          top: "0.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "grid",
          gap: "0.25rem",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "1rem", color: "#fff7a8" }}>🎉</span>
        <strong style={{ color: "#fff7a8", fontSize: "0.95rem" }}>
          High Score Smashed!
        </strong>
      </div>
      <div
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
      </div>
    </>
  );
};

export default HighScoreCelebration;
