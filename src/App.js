import React from "react";
import {createGlobalStyle} from "styled-components";

import HeaderText from "./components/HeaderText";
import WaveBackground from "./components/WaveBackground";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    background: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />

      <HeaderText />
      <WaveBackground />
    </>
  );
}

export default App;
