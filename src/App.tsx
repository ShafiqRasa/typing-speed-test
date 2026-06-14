import { useState } from "react";
import { TextArea, Wrapper, TypingArea } from "./app.styles";
import NavBar, { CustomButton, Difficulty, Mode, Widget } from "./components";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setCurrentText } from "./store/typingSlice";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.typing);

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
          <div className="shadow-text">{state.currentText}</div>

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
            handleButton={() => dispatch(setCurrentText(state.difficulty))}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
