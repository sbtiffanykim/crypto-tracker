import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
      font-family: "Source Sans 3", sans-serif;
      background-color: ${(props) => props.theme.bgColor};
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
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
