import {
  DescriptionList as ModeList,
  Wrapper,
  Select,
} from "../difficulty/difficulty.styles";

const Mode = () => {
  const handleMode = (mode: string) => {
    console.log(`Selected mode: ${mode}`);
  };

  return (
    <Wrapper>
      <Select onChange={(e) => handleMode(e.target.value)}>
        <option value="time" defaultChecked={true}>
          Timed (60s)
        </option>
        <option value="passage">Passage </option>
      </Select>
      <ModeList>
        <dt>Mode:</dt>
        <dd>
          <button onClick={() => handleMode("time")}>Timed (60s)</button>
        </dd>
        <dd>
          <button onClick={() => handleMode("passage")}>Passage</button>
        </dd>
      </ModeList>
    </Wrapper>
  );
};
export default Mode;
