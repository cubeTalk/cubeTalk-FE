import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  font-family: "Pretendard";
  }

  h1 {
    font-size: var(--font-size-xl);
    font-weight: 700;
  }

  h2 {
    font-size: var(--font-size-l);
    font-weight: 600;
  }

  h3 {
    font-size: var(--font-size-m);
    font-weight: 500;
  }

  h4 {
    font-size: var(--font-size-s);
    font-weight: 500;
  }

  h5, h6 {
    font-size: var(--font-size-xs);
    font-weight: 400;
  }
`;

export default GlobalStyle;
