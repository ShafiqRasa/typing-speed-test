import styled from "styled-components";

export const DescriptionList = styled.dl`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);

  dt {
    filter: brightness(0.8);
  }

  dd {
    button {
      border: 1px solid var(--text-color);
      background-color: transparent;
      color: var(--text-color);
    }
  }
`;
