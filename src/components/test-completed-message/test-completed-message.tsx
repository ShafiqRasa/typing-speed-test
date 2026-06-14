import { CustomButton } from "..";
import { withBlueOverlay } from "../hoc/withBlueOverlay";

type TestCompletedMessageProps = {
  wpm: number;
  accuracy: number;
  correctCharacters: number;
  incorrectCharacters: number;
  onRestart: () => void;
};

const TestCompletedMessage = ({
  wpm,
  accuracy,
  correctCharacters,
  incorrectCharacters,
  onRestart,
}: TestCompletedMessageProps) => {
  const accuracyTone = accuracy >= 80 ? "#2dd4bf" : "#ef4444";

  return (
    <article
      style={{ display: "grid", gap: "0.75rem", justifyItems: "center" }}
    >
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          fontSize: "0.82rem",
          color: "#d8e6ff",
          margin: 0,
        }}
      >
        Test complete
      </p>
      <h3 style={{ margin: 0, fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}>
        Great job — you finished the test.
      </h3>
      <p style={{ margin: 0, color: "#e6efff", maxWidth: "32rem" }}>
        WPM:{" "}
        <span
          className="wmp"
          style={{
            background: "#ffffff",
            color: "#0f172a",
            padding: "0.12rem 0.35rem",
            borderRadius: "999px",
            fontWeight: 700,
          }}
        >
          {" "}
          {wpm}
        </span>{" "}
        • Accuracy:{" "}
        <span
          className="accuracy"
          style={{
            background:
              accuracy >= 80
                ? "rgba(45, 212, 191, 0.14)"
                : "rgba(239, 68, 68, 0.12)",
            color: accuracyTone,
            padding: "0.12rem 0.35rem",
            borderRadius: "999px",
            fontWeight: 700,
          }}
        >
          {accuracy}%
        </span>{" "}
        • Correct:{" "}
        <span
          className="correct"
          style={{
            background: "rgba(34, 197, 94, 0.18)",
            color: "#86efac",
            padding: "0.12rem 0.35rem",
            borderRadius: "999px",
            fontWeight: 700,
          }}
        >
          {correctCharacters}
        </span>{" "}
        • Incorrect:{" "}
        <span
          className="incorrect"
          style={{
            background: "rgba(239, 68, 68, 0.18)",
            color: "#fca5a5",
            padding: "0.12rem 0.35rem",
            borderRadius: "999px",
            fontWeight: 700,
          }}
        >
          {incorrectCharacters}
        </span>
      </p>
      <CustomButton btnType="blue" handleButton={onRestart} />
    </article>
  );
};

export default withBlueOverlay(TestCompletedMessage);
