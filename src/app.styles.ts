import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  border: 1px solid var(--gray-color);
  border-left-color: transparent;
  border-right-color: transparent;
  resize: none;
  color: white;
  z-index: 1;
`;

export const TypingArea = styled.div`
  position: relative;
  height: 100%;
  font-size: var(--font-lg);
  line-height: var(--line-height-normal);
  .shadow-text {
    position: absolute;
    inset: 0;
    filter: opacity(0.5);
    z-index: -1;
  }
`;
export const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;

  .typing-container {
    position: relative;
    align-self: center;
    min-height: 80vh;
    height: auto;
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: var(--space-lg);
    margin-top: var(--space-lg);

    .content {
      position: relative;

      .textarea-btn-container {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
        row-gap: 1rem;
      }
    }
    .score-and-settings {
      position: relative;
      z-index: 2;
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

    .typing-panel {
      position: relative;
      z-index: 1;
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
