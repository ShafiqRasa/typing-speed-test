import styled from "styled-components";

export const PrimaryButton = styled.button`
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--blue-color);
  color: white;
  font-size: var(--font-md);
  line-height: var(--line-height-normal);
  cursor: pointer;
  border-radius: var(--radius);
`;
export const SecondaryGrayButton = styled(PrimaryButton)`
  background-color: var(--gray-color);
`;

export const TertiaryWhiteButton = styled(PrimaryButton)`
  background-color: var(--text-color);
  color: var(--bg-color);
`;
