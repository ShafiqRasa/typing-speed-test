import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  background: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
`;
