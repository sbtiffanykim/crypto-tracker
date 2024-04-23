import { Outlet } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
      font-family: "Source Sans 3", sans-serif;
      background-color: ${(props) => props.theme.surface_mixed_100};
      color: ${(props) => props.theme.textColor};
  }
  * {
      box-sizing: border-box;
  }
  a {
      text-decoration: none;
      color: inherit;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
