import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);
`;

const Heading = styled.h1`
  color: #fafafa;
  font-size: 4em;
  font-family: "Doppio One", sans-serif;

  margin: 0;
`;

const Description = styled.p`
  color: #ccc;
  font-size: 1.6em;
  font-family: "Doppio One", sans-serif;

  margin: 0;
`;

const HeaderText = () => {
  return (
    <Container>
      <Heading>JSConf.Asia 2019</Heading>
      <Description>Example of THREE.js with React.js</Description>
    </Container>
  );
};

export default HeaderText;
