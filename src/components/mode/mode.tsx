import { DescriptionList as ModeList } from "../difficulty/difficulty.styles";

const Mode = () => {
  const handleMode = (mode: string) => {
    console.log(`Selected mode: ${mode}`);
  };

  return (
    <ModeList>
      <dt>Mode:</dt>
      <dd>
        <button onClick={() => handleMode("time")}>Timed (60s)</button>
      </dd>
      <dd>
        <button onClick={() => handleMode("passage")}>Passage</button>
      </dd>
    </ModeList>
  );
};
export default Mode;
