import React, {useEffect} from "react";
import * as THREE from "three";
import styled from "styled-components";

import {createBoxGeometry} from "../utils/creator";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

// Green to Blue Color normalize
const normalizeHsl = length => {
  return length * 90 + 90;
};

const MusicVisualizer = () => {
  let renderEl;

  let width, height;
  let scene, camera, renderer, boxes;

  let directionalLight;

  const render = () => renderer.render(scene, camera);

  const renderGround = () => {
    const boxes = [];

    for (let x = -16; x <= 16; x++) {
      for (let z = -16; z <= 16; z++) {
        const box = createBoxGeometry({
          position: [x * 0.2, 1, z * 0.2],
          size: [0.2, 1, 0.2],
          color: new THREE.Color(`hsl(${100}, 100%, 60%)`),
        });

        scene.add(box);
        boxes.push(box);
      }
    }

    return boxes;
  };

  const _soundAllow = stream => {
    window.persistAudioStream = stream;

    const audioContent = new AudioContext();
    const audioStream = audioContent.createMediaStreamSource(stream);
    const analyser = audioContent.createAnalyser();
    audioStream.connect(analyser);
    analyser.fftSize = 1024;

    const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

    function draw() {
      analyser.getByteFrequencyData(frequencyArray);

      let mean = 0;

      boxes.forEach((box, i) => {
        box.position.y = frequencyArray[i % 256] / 100;

        mean += frequencyArray[i] || 0;

        box.material.color.setHSL(box.position.y, 0.8, 0.5);
      });

      directionalLight.intensity = mean / 8000;

      camera.fov = 75 + mean / 1000;
      camera.updateProjectionMatrix();

      // Update the wave
      render();
      requestAnimationFrame(draw);
    }

    draw();
  };

  useEffect(() => {
    width = renderEl.clientWidth;
    height = renderEl.clientHeight;

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
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 10, -5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create Fog
    scene.fog = new THREE.Fog("black", 1, 6);

    // Render Ground
    boxes = renderGround();

    navigator.getUserMedia({audio: true}, _soundAllow, console.error);
  }, []);

  return <Canvas ref={mount => (renderEl = mount)}></Canvas>;
};

export default MusicVisualizer;
