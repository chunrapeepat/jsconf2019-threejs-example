import * as THREE from "three";

export const createBoxGeometry = ({position, size, color}) => {
  const geometry = new THREE.BoxGeometry(...size);
  const material = new THREE.MeshPhongMaterial({color});
  const box = new THREE.Mesh(geometry, material);

  box.position.x = position[0];
  box.position.y = position[1];
  box.position.z = position[2];

  return box;
};
