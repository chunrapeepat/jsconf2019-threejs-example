import React from "react";
import {createGlobalStyle} from "styled-components";

import HeaderText from "./components/HeaderText";
import WaveBackground from "./components/WaveBackground";
import MusicVisualizer from "./components/MusicVisualizer";

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

      {/* <HeaderText /> */}
      {/* <Waveackground /> */}
      <MusicVisualizer />
    </>
  );
}

export default App;
