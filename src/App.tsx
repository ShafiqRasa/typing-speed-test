import NavBar, { CustomButton } from "./components";

function App() {
  return (
    <main className="container">
      <NavBar />
      <CustomButton
        btnType="gray"
        handleButton={() => console.log("Button clicked!")}
      />
    </main>
  );
}

export default App;
