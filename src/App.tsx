import NavBar from "./components";
import { useAppSelector } from "./store/hooks";

function App() {
  const typingText = useAppSelector((state) => state.typing.currentText);
  return (
    <main className="container">
      <NavBar />

      {typingText ? (
        <div className="typing-text">
          <p>{typingText}</p>
        </div>
      ) : (
        <div className="welcome-message">
          <h1>Welcome to the Typing Speed Test!</h1>
          <p>Start typing to see your speed and accuracy.</p>
        </div>
      )}
    </main>
  );
}

export default App;
