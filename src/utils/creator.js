import * as THREE from "three";

export const createBoxGeometry = ({position, size, color}) => {
  const geometry = new THREE.BoxGeometry(...size);
  const material = new THREE.MeshBasicMaterial({color});
  const box = new THREE.Mesh(geometry, material);

  return box;
};
