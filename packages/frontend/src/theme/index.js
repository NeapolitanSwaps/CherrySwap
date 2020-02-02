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
`;
