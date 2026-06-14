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
        WPM: {wpm} • Accuracy: {accuracy}% • Correct: {correctCharacters} •
        Incorrect: {incorrectCharacters}
      </p>
      <CustomButton btnType="blue" handleButton={onRestart} />
    </article>
  );
};

export default withBlueOverlay(TestCompletedMessage);
