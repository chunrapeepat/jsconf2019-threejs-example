import React, {useEffect} from "react";
import * as THREE from "three";
import styled from "styled-components";

import {createBoxGeometry} from "../utils/creator";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const calculateLength = (x, z, t = 0) => {
  return (Math.cos(x / 5 + t) + Math.sin(z / 5 + t)) / 2;
};

const normalizeHsl = length => {
  return length * 90 + 90;
};

const EndlessBackground = () => {
  let renderEl;
  let time = 0;
  let scene, camera, renderer, boxes;

  const render = () => renderer.render(scene, camera);

  const renderGround = () => {
    const boxes = [];

    for (let x = -40; x <= 40; x++) {
      for (let z = -40; z <= 40; z++) {
        const length = calculateLength(x, z);

        const box = createBoxGeometry({
          position: [x * 0.2, length * 2, z * 0.2],
          size: [0.2, 1, 0.2],
          color: new THREE.Color(
            `hsl(${normalizeHsl(Math.abs(length))}, 100%, 60%)`,
          ),
        });

        scene.add(box);
        boxes.push(box);
      }
    }

    return boxes;
  };

  const updateGround = () => {
    boxes.forEach(box => {
      const {x, z} = box.position;

      const length = calculateLength(x / 0.2, z / 0.2, time / 50);

      box.position.y = length * 2;
    });
  };

  const animate = () => {
    render();
    requestAnimationFrame(animate);

    time += 1;
    updateGround();
  };

  useEffect(() => {
    const width = renderEl.clientWidth;
    const height = renderEl.clientHeight;

    // Create Scene
    scene = new THREE.Scene();

    // Create Camera
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);

    camera.position.y = 3;
    camera.rotation.x = -Math.PI / 6;

    camera.updateProjectionMatrix();

    // Create Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    renderEl.appendChild(renderer.domElement);

    // Add Hemisphere Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 10, -5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create Fog
    scene.fog = new THREE.Fog("black", 1, 7);

    // Render Ground
    boxes = renderGround();

    // Render!
    requestAnimationFrame(animate);
  }, []);

  return <Canvas ref={mount => (renderEl = mount)}></Canvas>;
};

export default EndlessBackground;
