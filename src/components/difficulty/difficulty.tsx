import { Wrapper, DescriptionList, Select } from "./difficulty.styles";
import { setDifficulty } from "../../store/typingSlice";
import data from "../../utils/data.json";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type DifficultyLevel = "easy" | "medium" | "hard";

const Difficulty = () => {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector((state) => state.typing.difficulty);

  const handleDifficulty = (level: DifficultyLevel) => {
    dispatch(setDifficulty(level));
  };

  return (
    <Wrapper>
      <Select
        value={difficulty}
        onChange={(e) => handleDifficulty(e.target.value as DifficultyLevel)}
      >
        {Object.keys(data).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <DescriptionList>
        <dt>Difficulty:</dt>

        {Object.keys(data).map((key) => (
          <dd key={key}>
            <button
              onClick={() => handleDifficulty(key as DifficultyLevel)}
              disabled={key === difficulty}
              data-selected={key === difficulty}
            >
              {key}{" "}
            </button>
          </dd>
        ))}
      </DescriptionList>
    </Wrapper>
  );
};
export default Difficulty;
