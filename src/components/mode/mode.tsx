import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  DescriptionList as ModeList,
  Wrapper,
  Select,
} from "../difficulty/difficulty.styles";

import { setMode } from "../../store/typingSlice";
import { typingMode } from "../../utils/utils";

type ModeType = keyof typeof typingMode;

const Mode = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.typing.mode);

  const handleMode = (nextMode: ModeType) => {
    dispatch(setMode(nextMode));
  };

  return (
    <Wrapper>
      <Select
        value={mode}
        onChange={(e) => handleMode(e.target.value as ModeType)}
      >
        {Object.entries(typingMode).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </Select>

      <ModeList>
        <dt>Mode:</dt>
        {Object.entries(typingMode).map(([key, label]) => (
          <dd key={key}>
            <button
              onClick={() => handleMode(key as ModeType)}
              disabled={key === mode}
              data-selected={key === mode}
            >
              {label}
            </button>
          </dd>
        ))}
      </ModeList>
    </Wrapper>
  );
};

export default Mode;
