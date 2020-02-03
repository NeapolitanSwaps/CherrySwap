import React from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css
} from "styled-components";

const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
};

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    accumulator[size] = (...args) => css`
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${css(...args)}
      }
    `;
    return accumulator;
  },
  {}
);

export default function ThemeProvider({ children }) {
  return (
    <StyledComponentsThemeProvider theme={theme(false)}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

const theme = darkMode => ({
  white: "#fff",
  black: "#000",

  // Main theme colors:
  primaryPink: "#FFEBE2",
  togglePrimary: "#B23A48",
  toggleSecondary: "#FCB9B2",
  green: "#007713",

  greyAlpha: "rgba(70, 18, 32, 0.2)",
  darkCherry: "#461220",

  // Media queries
  mediaWidth: mediaWidthTemplates,

  // CSS snippets
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `
});

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }

  body > div {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

  html {
    font-size: 16px;
    font-variant: none;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  input,
  select,
  textarea,
  button {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    border: 0;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;
