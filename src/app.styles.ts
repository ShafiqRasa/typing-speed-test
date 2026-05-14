import styled from "styled-components";

export const TextArea = styled.textarea`
  background: transparent;
  outline: none;
  border: 1px solid var(--gray-color);
  border-left-color: transparent;
  border-right-color: transparent;
  resize: none;
  color: white;
`;
export const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  .typing-container {
    align-self: center;
    height: 80vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    row-gap: var(--space-lg);
    margin-top: var(--space-lg);

    .score-and-settings {
      display: flex;
      flex-direction: column;
      row-gap: var(--space-lg);

      .scores-container {
        display: flex;
        align-items: center;
        row-gap: var(--space-sm);
        & > *:not(:last-child) {
          border-right: 1px solid gray;
        }
      }

      .settings-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: var(--space-sm);
      }

      & > div {
        flex-grow: 1;
      }
    }

    // lager screens
    @media screen and (min-width: 768px) {
      .score-and-settings {
        flex-direction: row;

        .settings-container {
          justify-content: flex-end;
        }
      }
    }
  }
`;
