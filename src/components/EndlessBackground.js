import React, {useEffect} from "react";
import * as THREE from "three";
import styled from "styled-components";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const EndlessBackground = () => {
  let renderEl;
  let scene, camera, renderer;

  const render = () => renderer.render(scene, camera);

  useEffect(() => {
    const width = renderEl.clientWidth;
    const height = renderEl.clientHeight;

    // Create Scene
    scene = new THREE.Scene();

    // Create Camera
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);
    camera.updateProjectionMatrix();

    // Create Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    renderEl.appendChild(renderer.domElement);
  }, []);

  return <Canvas ref={mount => (renderEl = mount)}></Canvas>;
};

export default EndlessBackground;
