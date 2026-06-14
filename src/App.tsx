import { useEffect, useState } from "react";
import { TextArea, Wrapper, TypingArea } from "./app.styles";
import NavBar, {
  CustomButton,
  Difficulty,
  Greeting,
  Mode,
  Widget,
} from "./components";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setCurrentText } from "./store/typingSlice";

const FIRST_VISIT_KEY = "typing_app_first_visit";

function App() {
  const [hasVisited, setHasVisited] = useState(() => {
    return localStorage.getItem(FIRST_VISIT_KEY) === "true";
  });

  useEffect(() => {
    if (hasVisited) {
      localStorage.setItem(FIRST_VISIT_KEY, "true");
    }
  }, [hasVisited]);

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.typing);

  const [typing, setTyping] = useState<string>();

  const handleTyping: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setTyping(event.currentTarget.value);
  };

  return (
    <Wrapper className="">
      <NavBar />

      <div className="typing-container">
        <div className="score-and-settings container">
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
        <div className="content">
          {!hasVisited && <Greeting onStart={() => setHasVisited(true)} />}
          <div className="container textarea-btn-container">
            <TypingArea>
              <div className="shadow-text">{state.currentText}</div>

              <TextArea
                className="text-area"
                value={typing}
                onChange={(e) => handleTyping(e)}
              />
            </TypingArea>
            <div className="center-item">
              <CustomButton
                btnType="gray"
                handleButton={() => dispatch(setCurrentText(state.difficulty))}
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
