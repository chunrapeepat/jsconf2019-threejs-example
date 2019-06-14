import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 600px) {
    width: 90vw;
  }
`;

const Heading = styled.h1`
  color: #fafafa;
  font-size: 4em;
  font-family: "Doppio One", sans-serif;

  margin: 0;

  @media (max-width: 600px) {
    font-size: 2.2em;
  }
`;

const Description = styled.p`
  color: #ccc;
  font-size: 1.6em;
  font-family: "Doppio One", sans-serif;

  margin: 0;

  @media (max-width: 600px) {
    font-size: 1.2em;
  }
`;

const Author = styled.a`
  color: white;
  display: block;
  text-decoration: none;

  font-size: 1.2em;
  font-weight: lighter;
  font-family: sans-serif;

  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

const HeaderText = () => {
  return (
    <Container>
      <Heading>JSConf.Asia 2019</Heading>
      <Description>Example of THREE.js with React.js</Description>

      <div style={{marginTop: 30}}>
        <Author href="https://thechun.xyz" target="_blank">
          By Chun Rapeepat
        </Author>

        <Author
          href="https://github.com/chunza2542/jsconf2019-threejs-example"
          target="_blank">
          View Source Code on Github
        </Author>
      </div>
    </Container>
  );
};

export default HeaderText;
