import styled from "styled-components";

export const Select = styled.select`
  position: relative;
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid var(--text-color);
  border-radius: var(--radius);
  background-color: transparent;
  color: var(--text-color);
  outline: none;

  img {
    width: 26px;
    height: 26px;
    background: red;
  }
`;
export const DescriptionList = styled.dl`
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);

  display: none;

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

export const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    ${Select} {
      display: none;
    }
    ${DescriptionList} {
      display: flex;
    }
  }
`;
