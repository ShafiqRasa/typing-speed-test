import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background: transparent;
  outline: none;
  border: 1px solid var(--gray-color);
  border-left-color: transparent;
  border-right-color: transparent;
  resize: none;
  color: transparent;
  caret-color: transparent;
  z-index: 2;
  text-shadow: none;
`;

export const TypingArea = styled.div`
  position: relative;
  height: 100%;
  font-size: var(--font-lg);
  line-height: var(--line-height-normal);

  .shadow-text {
    position: relative;
    inset: 0;
    color: rgba(189, 189, 189, 0.85);
    white-space: pre-wrap;
    word-break: break-word;
    z-index: 1;
  }

  .char {
    border-bottom: 1px solid transparent;
  }

  .char.correct {
    color: #5eff9d;
  }

  .char.incorrect {
    color: #ff7b7b;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: #ffb3b3;
  }

  .char.current {
    border-bottom-color: #8ecbff;
    background: rgba(73, 72, 72, 0.85);
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
