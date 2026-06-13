import { useState } from "react";
import { TextArea, Wrapper, TypingArea } from "./app.styles";
import NavBar, { CustomButton, Difficulty, Mode, Widget } from "./components";
import { useAppSelector } from "./store/hooks";

function App() {
  const typingText = useAppSelector((state) => state.typing.currentText);
  const typingTextArr = typingText.trim().split("");

  const [typing, setTyping] = useState<string>();

  const handleTyping: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setTyping(event.currentTarget.value);
  };

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
        <TypingArea>
          <div className="shadow-text">{typingText}</div>

          <TextArea
            className="text-area"
            value={typing}
            onChange={(e) => handleTyping(e)}
            autoFocus
          />
        </TypingArea>
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
