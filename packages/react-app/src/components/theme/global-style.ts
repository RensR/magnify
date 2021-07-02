import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
      font-family: caecilia, sans-serif;
      font-weight: 700;
      font-style: normal;
      margin: 0;

      p {
          font-family: Open Sans, sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
      }
  }
`;
