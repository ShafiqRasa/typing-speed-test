import styled from "styled-components";

export const Wrapper = styled.p`
  color: gray;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  .wpm {
    color: var(--text-color);
  }
  .accuracy {
    color: var(--red-color);
  }
  .time {
    color: var(--yellow-color);
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    b {
      margin-left: var(--space-sm);
    }
  }
`;
