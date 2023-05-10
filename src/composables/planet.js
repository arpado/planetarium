import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();


// import earth from "@/assets/images/earth-map.jpg";


// export const planet = new THREE.Mesh(
//     new THREE.SphereGeometry(0.75, 20, 20),
//     new THREE.MeshStandardMaterial({ color: 0x008080,  map: textureLoader.load(earth)  }),
//     // new ShaderMaterial({
//     //   vertexShader,
//     //   fragmentShader,
//     //   uniforms: {
//     //     globeTexture: {
//     //       value: new TextureLoader().load(earth),
//     //     },
//     //   },
//     // })
//   );

// export function createPlanet(radius, widthSegm, heightSegm, mapName) {
//     return new THREE.Mesh(
//         new THREE.SphereGeometry(radius, widthSegm, heightSegm),
//         new THREE.MeshPhongMaterial({ /*color: 0x008080,*/  map: textureLoader.load(mapName)  }),
//     )
//     let center = new THREE.Object3D()

// }

export function createPlanet(radius, widthSegm, heightSegm, item) {
    let mesh =  new THREE.Mesh(
        new THREE.SphereGeometry(radius, widthSegm, heightSegm),
        new THREE.MeshPhongMaterial({ /*color: 0x008080,*/  map: textureLoader.load(item.mesh)  }),
    )
    let center = new THREE.Object3D()
    mesh.position.x = item.radius
    center.rotateY(THREE.MathUtils.degToRad(item.rotation))
    mesh.scale.set(item.size.scale, item.size.scale, item.size.scale)
    return { mesh, center }
}