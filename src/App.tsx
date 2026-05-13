import NavBar, { Widget } from "./components";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Widget label="WPM">120</Widget>
      <Widget label="Accuracy">95%</Widget>
      <Widget label="Time">60s</Widget>
    </main>
  );
}

export default App;
