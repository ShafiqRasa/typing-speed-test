import styled from "styled-components";

export const Wrapper = styled.p`
  color: gray;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wpm {
    color: var(--text-color);
  }
  .accuracy {
    color: var(--red-color);
  }
  .time {
    color: var(--yellow-color);
  }
`;
