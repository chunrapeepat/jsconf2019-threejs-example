import React, {useEffect} from "react";
import * as THREE from "three";
import styled from "styled-components";
import {createBoxGeometry} from "../utils/creator";

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

    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;

    camera.updateProjectionMatrix();

    // Create Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    renderEl.appendChild(renderer.domElement);

    // Add Hemisphere Light
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    // Create Ground
    scene.add(
      createBoxGeometry({
        position: [0, 0, 0],
        size: [1, 1, 1],
        color: 0x00ff00,
      }),
    );

    // Render!
    render();
  }, []);

  return <Canvas ref={mount => (renderEl = mount)}></Canvas>;
};

export default EndlessBackground;
