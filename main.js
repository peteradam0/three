import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

createAnimatedCube()
createLines()
load3DModel()

function load3DModel() {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth/2, window.innerHeight/2)
  document.body.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  const scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(0, 1, 5)
  camera.lookAt(0, 0, 0)

  loader.load(
    'assets/Duck.glb',
    function (gltf) {
      const model = gltf.scene
      scene.add(model)
      animate()
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    function (error) {
      console.error('An error occurred while loading the model:', error)
    }
  )

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

function createLines() {
  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  )
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  let scene = new THREE.Scene()

  let lineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff10 })

  const points = []
  points.push(new THREE.Vector3(-10, 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(10, 0, 0))
  points.push(new THREE.Vector3(0, -10, -10))
  points.push(new THREE.Vector3(-10, 0, 0))

  let lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  let line = new THREE.Line(lineGeometry, lineMaterial)

  scene.add(line)
  renderer.render(scene, camera)
}

function createAnimatedCube() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)

  document.body.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  function animate() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  renderer.setAnimationLoop(animate)
}
