import { DescriptionList } from "./difficulty.styles";

const Difficulty = () => {
  const handleDifficulty = (difficulty: string) => {
    console.log(`Selected difficulty: ${difficulty}`);
  };

  return (
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
  );
};
export default Difficulty;
