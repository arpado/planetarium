import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();

// export function createStar(radius, widthSegm, heightSegm, mapName) {
//     return new THREE.Mesh(
//         new THREE.SphereGeometry(radius, widthSegm, heightSegm),
//         new THREE.MeshBasicMaterial({ /*color: 0x008080,*/  map: textureLoader.load(mapName)  }),
//     )
// }
// export function createStarVertex(radius) {
//     return new THREE.Mesh(
//         new THREE.SphereGeometry(radius, 3, 3)
//     )
// }

function createStar(radius, widthSegm, heightSegm, mapName) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, widthSegm, heightSegm),
        new THREE.MeshBasicMaterial({ /*color: 0x008080,*/  map: textureLoader.load(mapName)  }),
    )
}
function createStarVertex(radius) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, 3, 3)
    )
}
function createPointLightArray(starVertex) {
    const pointLightArray = [];
    for (let i = 0; i < starVertex.geometry.attributes.position.array.length; i += 3) {
        // create a new PointLight for each vertex
        const pointLight = new THREE.PointLight(
          0xffffff,
          3 / starVertex.geometry.attributes.position.array.length,
          0
        )
      
        // set the position of the PointLight to the position of the vertex
        pointLight.position.set(
          starVertex.geometry.attributes.position.array[i],
          starVertex.geometry.attributes.position.array[i + 1],
          starVertex.geometry.attributes.position.array[i + 2]
        )
      
        // add the PointLight to the scene
        // scene.add(pointLight)
        pointLightArray.push(pointLight)
    }
    return pointLightArray
}

// const {sun, starVertex} = 
function createSun(radius, widthSegm, heightSegm, mapName) {
    const mesh = createStar(radius, widthSegm, heightSegm, mapName)
    const starVertex = createStarVertex(radius)
    const pointLightArray = createPointLightArray(starVertex)
    return {mesh, pointLightArray}
}

export { createSun }