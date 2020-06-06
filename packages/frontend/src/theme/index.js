import React from "react";
import { createGlobalStyle, css, ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
};

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  accumulator[size] = (...args) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export default function ThemeProvider({ children }) {
  return <StyledComponentsThemeProvider theme={theme(false)}>{children}</StyledComponentsThemeProvider>;
}

const theme = darkMode => ({
  maxWidth: "640px",

  white: "#fff",
  black: "#000",

  backgroundColor: "#fff",
  backgroundPink: "#FCEBEB77",

  textMedium: "#3B1C32",

  leftGradient: "linear-gradient(to right, #FFC0CB , #FFC0CB, #EFBCE3)",
  rightGradient: "linear-gradient(to right, #EFBCE3, #CCE8CC , #CCE8CC)",

  // I need to rename these ...

  // Main theme colors:
  green: "#41C61C",

  greyAlpha: "rgba(70, 18, 32, 0.05)",

  orange_00: "#FF595E",

  pink_00: "#FFC0CB",
  pink_10: "#C76D7E",
  pink_20: "#DE3163",

  red_00: "#db1935",
  red_10: "#461220",

  grey_00: "#edeef2",
  grey_10: "#888D9B",

  purple_00: "#3B1C32", // dark

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
    color: ${({ theme }) => theme.textMedium};
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
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15; 
    margin: 0; 
    border: 0;
    background: transparent;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;
