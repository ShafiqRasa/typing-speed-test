import { Wrapper, DescriptionList, Select } from "./difficulty.styles";

const Difficulty = () => {
  const handleDifficulty = (difficulty: string) => {
    console.log(`Selected difficulty: ${difficulty}`);
  };

  return (
    <Wrapper>
      <Select onChange={(e) => handleDifficulty(e.target.value)}>
        <option value="easy" defaultChecked={true}>
          Easy
        </option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </Select>
      <DescriptionList>
        <dt>Difficulty:</dt>
        <dd>
          <button onClick={() => handleDifficulty("easy")}>Easy</button>
        </dd>
        <dd>
          <button onClick={() => handleDifficulty("medium")}>Medium</button>
        </dd>
        <dd>
          <button onClick={() => handleDifficulty("hard")}>Hard</button>
        </dd>
      </DescriptionList>
    </Wrapper>
  );
};
export default Difficulty;
