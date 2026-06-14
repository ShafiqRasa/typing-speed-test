import styled from "styled-components";

export const Wrapper = styled.section`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.75rem;
  padding: var(--space-lg);
  border-radius: 18px;
  background: transparent;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 18px 40px rgba(0, 0, 0, 0.25);

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.82rem;
    color: #d8e6ff;
  }

  h3 {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.2;
  }

  .accent {
    display: inline-block;
    padding: 0.08em 0.35em;
    border-radius: 6px;
    background: linear-gradient(135deg, #fff6a8, #ffd86b);
    color: #10213d;
    font-weight: 700;
  }

  .description {
    max-width: 32rem;
    margin: 0;
    color: #e6efff;
    font-size: 0.98rem;
  }
`;
