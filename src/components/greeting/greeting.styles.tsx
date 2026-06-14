import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  justify-content: center;
  padding: var(--space-lg);
  background: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  span {
    background: lightyellow;
    padding: 0.1rem;
    border-radius: 2px;
    color: var(--bg-color);
  }
`;
