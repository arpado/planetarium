import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();
import vertexShader from "@/composables/shaders/vertex.glsl?raw";
import fragmentShader from "@/composables/shaders/fragment.glsl?raw";
import s_px from '@/assets/images/background/s_px.jpg'
import s_nx from '@/assets/images/background/s_nx.jpg'
import s_py from '@/assets/images/background/s_py.jpg'
import s_ny from '@/assets/images/background/s_ny.jpg'
import s_pz from '@/assets/images/background/s_pz.jpg'
import s_nz from '@/assets/images/background/s_nz.jpg'


const loader = new THREE.CubeTextureLoader()
// loader.setPath('/src/assets/images/background/')

export const textureCube = loader.load([
  s_px,
  s_nx,
  s_py,
  s_ny,
  s_pz,
  s_nz
])

// export const textureCube = loader.load([
//   's_px.jpg',
//   's_nx.jpg',
//   's_py.jpg',
//   's_ny.jpg',
//   's_pz.jpg',
//   's_nz.jpg'
// ])

// export function createBackground(radius, widthSegm, heightSegm, mapName) {
//     return new THREE.Mesh(
//         new THREE.SphereGeometry(radius, widthSegm, heightSegm),
//         // new THREE.MeshBasicMaterial({ color: 0xaaaaaa,  map: textureLoader.load(mapName), side: THREE.BackSide  }),
//         new THREE.ShaderMaterial({
//             vertexShader,
//             fragmentShader,
//             uniforms: {
//                 globeTexture: {
//                     value: new THREE.TextureLoader().load(mapName),
//                 },
//             },
//         })
//     )
// }

// backgorund
// const particleCount = 10000;
// const particleSize = 5;
// const canvas = document.createElement('canvas');
// const context = canvas.getContext('2d');
// canvas.width = canvas.height = particleSize * 2;
// canvas.fillStyle = '#000000'

// context.beginPath();
// context.arc(particleSize, particleSize, particleSize, 0, 2 * Math.PI);
// context.closePath();

// context.fillStyle = '#ffffff';
// context.fill();

// const texture = new THREE.CanvasTexture(canvas);
// // texture.background = new THREE.Color( 0xffffff );
// const geometry = new THREE.BufferGeometry();

// const positions = new Float32Array(particleCount * 3);

// function makePosition() {
//   const x = Math.random() * 2000 - 1000;
//   const y = Math.random() * 2000 - 1000;
//   const z = Math.random() * 2000 - 1000;

//   if (x < 1000 || y < 1000 || z < 1000) {
//       makePosition()
//   }

//   return {x, y, z}
// }

// for (let i = 0; i < particleCount; i++) {
// //   const x = Math.random() * 2000 - 1000;
// //   const y = Math.random() * 2000 - 1000;
// //   const z = Math.random() * 2000 - 1000;
//   const {x, y, z} = makePosition()
//   positions[i * 3] = x;
//   positions[i * 3 + 1] = y;
//   positions[i * 3 + 2] = z;
// }

// geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
// const material = new THREE.PointsMaterial({ size: particleSize, map: texture });
// const points = new THREE.Points(geometry, material);

// scene.add(points);

// background-box
// const loader = new THREE.TextureLoader();
// const texture = loader.load(starsTexture);

// const geometry = new THREE.BoxGeometry(1000, 1000, 1000);
// const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);