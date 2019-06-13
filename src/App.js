import React from "react";
import {createGlobalStyle} from "styled-components";
import EndlessBackground from "./components/EndlessBackground";

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

      <EndlessBackground />
    </>
  );
}

export default App;
