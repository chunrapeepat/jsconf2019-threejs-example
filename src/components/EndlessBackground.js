import React, {useEffect} from "react";
import * as THREE from "three";
import styled from "styled-components";

import {createBoxGeometry} from "../utils/creator";
import {random} from "../utils/math";

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
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);

    camera.position.y = 5;

    camera.updateProjectionMatrix();

    // Create Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    renderEl.appendChild(renderer.domElement);

    // Add Hemisphere Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(-5, 10, -5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    // Create Ground
    for (let x = -100; x <= 100; x++) {
      for (let z = -100; z <= 100; z++) {
        scene.add(
          createBoxGeometry({
            position: [x * 0.2, Math.random() * 3, z * 0.2],
            size: [0.2, Math.random() * 5, 0.2],
            color: new THREE.Color(`hsl(${random(0, 360)}, 100%, 60%)`),
          }),
        );
      }
    }

    // Render!
    render();
  }, []);

  return <Canvas ref={mount => (renderEl = mount)}></Canvas>;
};

export default EndlessBackground;
