import * as THREE from 'three';

export function createOrbitTrack(item) {
    const orbitTrack = new THREE.Mesh(
        new THREE.RingGeometry(item.radius - 0.01, item.radius + 0.01, 60),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
    )
    orbitTrack.rotateX(Math.PI / 2)
    return orbitTrack
}