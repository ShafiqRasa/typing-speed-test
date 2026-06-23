import { Difficulty, Mode, Widget } from "..";

type ScoreSettingsPanelProps = {
  wpm: number;
  accuracy: number;
  mode: "time" | "passage";
  timeLeft: number;
  elapsedTime: number;
};

// Displays top-level metrics and test settings controls.
const ScoreSettingsPanel = ({
  wpm,
  accuracy,
  mode,
  timeLeft,
  elapsedTime,
}: ScoreSettingsPanelProps) => {
  return (
    <div className="score-and-settings container">
      <div className="scores-container">
        <Widget label="WPM">{wpm}</Widget>
        <Widget label="Accuracy">{accuracy}%</Widget>
        <Widget label="Time">
          {mode === "time" ? `${timeLeft}s` : `${elapsedTime}s`}
        </Widget>
      </div>
      <div className="settings-container">
        <Difficulty />
        <Mode />
      </div>
    </div>
  );
};

export default ScoreSettingsPanel;
