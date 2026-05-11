import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 32px;
    height: 32px;
    background-image: url("/src/assets/images/logo-small.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .best-wpm {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  span {
    color: gray;
  }

  @media screen and (min-width: 768px) {
    .logo {
      width: 267px;
      height: 40px;
      background-image: url("/src/assets/images/logo-large.svg");
    }
  }
`;
