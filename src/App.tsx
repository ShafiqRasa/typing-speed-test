import { TextArea, Wrapper } from "./app.styles";
import NavBar, { CustomButton, Difficulty, Mode, Widget } from "./components";
import { useAppSelector } from "./store/hooks";

function App() {
  const typingText = useAppSelector((state) => state.typing.currentText);
  return (
    <Wrapper className="container">
      <NavBar />

      <div className="typing-container">
        <div className="score-and-settings">
          <div className="scores-container">
            <Widget label="WPM">0</Widget>
            <Widget label="Accuracy">0</Widget>
            <Widget label="Time">0</Widget>
          </div>
          <div className="settings-container">
            <Difficulty />
            <Mode />
          </div>
        </div>
        <TextArea
          className="typing-area"
          value={typingText}
          onChange={(e) => console.log(e.target.value)}
        />
        <div className="center-item">
          <CustomButton
            btnType="gray"
            handleButton={() => console.log("restart test!")}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
