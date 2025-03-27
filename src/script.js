import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.show(false)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Galaxy
 */

const parameters = {}
parameters.count = 90000
parameters.size = 0.01
parameters.radius = 5
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 4
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'



let geometry = null
let material = null
let points = null


const generateGalaxy = () => {

    // Geometry
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)



    // destroy old galaxy
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    for (let i = 0; i < parameters.count; i++) {

        const i3 = i * 3

        // Position

        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)



        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius) // o segundo parametro é a interpolaçao das duas cores

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b




    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    // Material
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    // Points
    points = new THREE.Points(geometry, material)
    scene.add(points)
    points.position.y = -3
}
generateGalaxy()

const galaxyTweaks = gui.addFolder('Galaxy')
galaxyTweaks.close()

galaxyTweaks.add(parameters, 'count').min(100).max(1000000).step(1000).onFinishChange(generateGalaxy)
galaxyTweaks.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
galaxyTweaks.add(parameters, 'radius').min(0.001).max(20).step(0.001).onFinishChange(generateGalaxy)
galaxyTweaks.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
galaxyTweaks.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
galaxyTweaks.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
galaxyTweaks.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
galaxyTweaks.addColor(parameters, 'insideColor').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
galaxyTweaks.addColor(parameters, 'outsideColor').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)


// Anel 1
const parametersPlanet = {}
parametersPlanet.count = 600000
parametersPlanet.size = 0.01
parametersPlanet.radius = 11
parametersPlanet.spin = 1
parametersPlanet.randomnessX = 0.156
parametersPlanet.randomnessY = 0.536
parametersPlanet.randomnessZ = 0.5
parametersPlanet.randomness = 0.156
parametersPlanet.insideRadius = 3
parametersPlanet.PI = 2
parametersPlanet.randomnessPower = 4
parametersPlanet.insideColor = '#ff6030'
parametersPlanet.outsideColor = '#000000'

let anelGeometry = null
let anelMaterial = null
let anelMesh1 = null


const planeta = new THREE.Group()
scene.add(planeta)

// planeta.position.z = -50
// planeta.position.y = 15
// planeta.position.x = 10
planeta.rotation.x = 0.2

const planetaPosition = new THREE.Vector3(10, 15, -50)
planetaPosition.set(10, 15, -50)





const generatePlanet = () => {

    if (anelMesh1 !== null) {
        anelGeometry.dispose()
        anelMaterial.dispose()
        anel1.remove(anelMesh1)
    }

    //Anel
    anelGeometry = new THREE.BufferGeometry()
    const positionAnel = new Float32Array(parametersPlanet.count * 3)
    const colorInside = new THREE.Color(parametersPlanet.insideColor)
    const colorOutside = new THREE.Color(parametersPlanet.outsideColor)
    const color = new Float32Array(parametersPlanet.count * 3)

    for (let i = 0; i < parametersPlanet.count; i++) {

        const i3 = i * 3


        const angle = Math.random() * Math.PI * 2; // Gera um ângulo aleatório entre 0 e 360°
        const radius = parametersPlanet.insideRadius + Math.random() * parametersPlanet.radius; // Gera um raio aleatório

        const randomOffset = Math.random() * parametersPlanet.randomness; // Aleatoriedade radial
        const offsetX = Math.cos(angle) * randomOffset;
        const offsetZ = Math.sin(angle) * randomOffset;

        positionAnel[i3] = (Math.cos(angle) * radius) + offsetX;
        positionAnel[i3 + 1] = (Math.random() - 0.5) * parametersPlanet.randomnessY;
        positionAnel[i3 + 2] = (Math.sin(angle) * radius) + offsetZ;


        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parametersPlanet.radius)

        color[i3] = mixedColor.r
        color[i3 + 1] = mixedColor.g
        color[i3 + 2] = mixedColor.b

    }
    // anel 1
    anelGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionAnel, 3)
    )
    anelGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(color, 3)
    )
    anelMaterial = new THREE.PointsMaterial({
        size: parametersPlanet.size,
        sizeAttenuation: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })

    anelMesh1 = new THREE.Points(anelGeometry, anelMaterial)

    anelMesh1.rotation.z = Math.PI * 0.05

    planeta.add(anelMesh1)

    // Planeta

    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(2.8, 32, 32),
        new THREE.MeshBasicMaterial({
            color: "#000000"
        })
    )
    planeta.add(planet)

}
generatePlanet()

const planetTweaks = gui.addFolder('Anel')
planetTweaks.close()

planetTweaks.add(parametersPlanet, 'count').min(100).max(1000000).step(1000).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'radius').min(0.001).max(20).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'spin').min(-5).max(5).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'randomnessX').min(0).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'randomnessY').min(0).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'randomnessZ').min(0).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'randomness').min(0).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'insideRadius').min(0).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'PI').min(0).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.add(parametersPlanet, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.addColor(parametersPlanet, 'insideColor').min(1).max(10).step(0.001).onFinishChange(generatePlanet)
planetTweaks.addColor(parametersPlanet, 'outsideColor').min(1).max(10).step(0.001).onFinishChange(generatePlanet)

// Anel 2

const planetaAnel_2 = {}
planetaAnel_2.count = 600000
planetaAnel_2.size = 0.01
planetaAnel_2.radius = 6
planetaAnel_2.spin = 1
planetaAnel_2.randomnessX = 0.156
planetaAnel_2.randomnessY = 0.536
planetaAnel_2.randomnessZ = 0.5
planetaAnel_2.randomness = 0.156
planetaAnel_2.insideRadius = 3
planetaAnel_2.PI = 2
planetaAnel_2.randomnessPower = 4
planetaAnel_2.insideColor = '#ff6030'
planetaAnel_2.outsideColor = '#000000'

let anelGeometry_2 = null
let anelMaterial_2 = null
let anelMesh_2 = null


// const anel_2 = new THREE.Group()
// scene.add(anel_2)




const generatePlanet_2 = () => {

    if (anelMesh_2 !== null) {
        anelGeometry_2.dispose()
        anelMaterial_2.dispose()
        anel_2.remove(anelMesh_2)
    }

    //Anel
    anelGeometry_2 = new THREE.BufferGeometry()
    const positionAnel = new Float32Array(planetaAnel_2.count * 3)
    const colorInside = new THREE.Color(planetaAnel_2.insideColor)
    const colorOutside = new THREE.Color(planetaAnel_2.outsideColor)
    const color = new Float32Array(planetaAnel_2.count * 3)

    for (let i = 0; i < planetaAnel_2.count; i++) {

        const i3 = i * 3


        const angle = Math.random() * Math.PI * 2; // Gera um ângulo aleatório entre 0 e 360°
        const radius = planetaAnel_2.insideRadius + Math.random() * planetaAnel_2.radius; // Gera um raio aleatório

        const randomOffset = Math.random() * planetaAnel_2.randomness; // Aleatoriedade radial
        const offsetX = Math.cos(angle) * randomOffset;
        const offsetZ = Math.sin(angle) * randomOffset;

        positionAnel[i3] = (Math.cos(angle) * radius) + offsetX;
        positionAnel[i3 + 1] = (Math.random() - 0.5) * planetaAnel_2.randomnessY;
        positionAnel[i3 + 2] = (Math.sin(angle) * radius) + offsetZ;


        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / planetaAnel_2.radius)

        color[i3] = mixedColor.r
        color[i3 + 1] = mixedColor.g
        color[i3 + 2] = mixedColor.b

    }
    // anel 1
    anelGeometry_2.setAttribute(
        'position',
        new THREE.BufferAttribute(positionAnel, 3)
    )
    anelGeometry_2.setAttribute(
        'color',
        new THREE.BufferAttribute(color, 3)
    )
    anelMaterial_2 = new THREE.PointsMaterial({
        size: planetaAnel_2.size,
        sizeAttenuation: true,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })

    anelMesh_2 = new THREE.Points(anelGeometry_2, anelMaterial_2)
    anelMesh_2.rotation.x = Math.PI * 1.5
    anelMesh_2.rotation.y = Math.PI * 1.75


    planeta.add(anelMesh_2)


}

generatePlanet_2()

const planetTweaks_2 = gui.addFolder('Anel_2')
planetTweaks_2.close()

planetTweaks_2.add(planetaAnel_2, 'count').min(100).max(1000000).step(1000).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'radius').min(0.001).max(20).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'spin').min(-5).max(5).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'randomnessX').min(0).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'randomnessY').min(0).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'randomnessZ').min(0).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'randomness').min(0).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'insideRadius').min(0).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'PI').min(0).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.add(planetaAnel_2, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.addColor(planetaAnel_2, 'insideColor').min(1).max(10).step(0.001).onFinishChange(generatePlanet_2)
planetTweaks_2.addColor(planetaAnel_2, 'outsideColor').min(1).max(10).step(0.001).onFinishChange(generatePlanet_2)


// linha Branca

const linhaParametros = {}
linhaParametros.count = 3000
linhaParametros.size = 0.5
linhaParametros.radius = 7
linhaParametros.insideRadius = 3

let linhaGeometry = null
let linhaMaterial = null
let linhaMesh = null

// const linhaGrupo = new THREE.Group()
// scene.add(linhaGrupo)



const linha = () => {

    if (linhaMesh !== null) {
        linhaGeometry.dispose()
        linhaMaterial.dispose()
        linhaGrupo.remove(linhaMesh)
    }

    linhaGeometry = new THREE.BufferGeometry()
    const positionsLinhas = new Float32Array(linhaParametros.count * 3)

    for (let i = 0; i < linhaParametros.count; i++) {
        const i3 = i * 3

        const radius = Math.random() * linhaParametros.radius

        positionsLinhas[i3] = Math.cos(radius) * linhaParametros.insideRadius
        positionsLinhas[i3 + 1] = 0
        positionsLinhas[i3 + 2] = Math.sin(radius) * linhaParametros.insideRadius
    }

    linhaGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionsLinhas, 3)
    )
    linhaMaterial = new THREE.PointsMaterial({
        size: linhaParametros.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })

    linhaMesh = new THREE.Points(linhaGeometry, linhaMaterial)
    planeta.add(linhaMesh)

    linhaMesh.rotation.x = Math.PI * 1.5
    linhaMesh.rotation.y = Math.PI * 1.75

}
linha()

const linhaTweaks = gui.addFolder('Linha')
linhaTweaks.close()

linhaTweaks.add(linhaParametros, 'count').min(100).max(1000000).step(1000).onFinishChange(linha)
linhaTweaks.add(linhaParametros, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(linha)
linhaTweaks.add(linhaParametros, 'radius').min(0.001).max(20).step(0.001).onFinishChange(linha)
linhaTweaks.add(linhaParametros, 'insideRadius').min(0).max(10).step(0.001).onFinishChange(linha)

// Estrelas

const parametrosEstrelas = {}
parametrosEstrelas.count = 3000
parametrosEstrelas.size = 0.001


let estrelaGeometry = null
let estrelaMaterial = null
let estrelaMesh = null

const estrelasGrupo = new THREE.Group()
scene.add(estrelasGrupo)



const estrelas = () => {

    if(estrelaMesh !== null){
        estrelaGeometry.dispose()
        estrelaMaterial.dispose()
        estrelasGrupo.remove(estrelaMesh)
    }

    estrelaGeometry = new THREE.BufferGeometry()
    const positionEstrela = new Float32Array(parametrosEstrelas.count * 3)

    for (let i = 0; i < parametrosEstrelas.count; i++) {
        const i3 = i * 3

        positionEstrela[i3] = (Math.random() - 0.5) * 100
        positionEstrela[i3 + 1] = (Math.random() - 0.5) * 100
        positionEstrela[i3 + 2] = (Math.random() - 0.5) * 100

    }
    estrelaGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionEstrela, 3)
    )
    
    estrelaMaterial = new THREE.PointsMaterial({
        size: parametrosEstrelas.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })

    estrelaMesh = new THREE.Points(estrelaGeometry, estrelaMaterial)
    estrelasGrupo.add(estrelaMesh)

}
estrelas()

const estrelaTweaks = gui.addFolder('Estrelas')
estrelaTweaks.close()

estrelaTweaks.add(parametrosEstrelas, 'count').min(100).max(1000000).step(1000).onFinishChange(estrelas)
estrelaTweaks.add(parametrosEstrelas, 'size').min(0.00001).max(0.1).step(0.001).onFinishChange(estrelas)














/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const cameraGroup = new THREE.Group()
scene.add(cameraGroup) 
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 4
camera.position.z = 15
cameraGroup.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * camera move
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
   cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate Camera
    const paralexX = cursor.x * 5
    const paralexY = cursor.y * 5

    cameraGroup.position.y += (paralexY - cameraGroup.position.y) * 5 * deltaTime
    cameraGroup.position.x += (paralexX - cameraGroup.position.x) * 5 * deltaTime

    // animacao galaxia
    points.position.y = Math.sin(elapsedTime) * 0.3
    points.position.x = Math.cos(elapsedTime) * 0.3
    points.rotation.y = elapsedTime * 0.3

    // Animacao planeta
    planeta.position.y = planetaPosition.y + Math.sin(elapsedTime) * 0.6
    planeta.position.x = planetaPosition.x + Math.cos(elapsedTime) * 0.6
    planeta.position.z = planetaPosition.z

    // anelMesh1.rotation.z = Math.PI * 0.05

    // anelMesh1.rotation.y = anelMesh1.rotation.z + elapsedTime * 1

    // Update controls
    //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()