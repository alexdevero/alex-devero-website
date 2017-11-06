// Example component
const iphoneRenderer = () => {
  // info: https://webdesign.tutsplus.com/tutorials/a-noobs-guide-to-threejs--cms-28639
  // yarn add threejs

  console.log('iPhone renderer is running')

  // Scene Setup
  const canvasEl = document.querySelector('.canvas-iphone')
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(-5, 12, 10)
  camera.lookAt(scene.position)

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasEl
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Trackball Controller
  const controls = new THREE.TrackballControls(camera)
  controls.rotateSpeed = 5.0
  // controls.zoomSpeed = 3.2
  controls.panSpeed = 0.8
  controls.noZoom = true
  controls.noPan = true
  controls.staticMoving = false
  controls.dynamicDampingFactor = 0.2

  // Lighting
  const iphone_color = '#fafafa'
  const ambientLight = new THREE.AmbientLight('#eee')
  const hemiLight = new THREE.HemisphereLight(iphone_color, iphone_color, 0)
  const light = new THREE.PointLight(iphone_color, 1, 100)

  hemiLight.position.set(0, 50, 0)
  light.position.set(0, 20, 10)

  scene.add(ambientLight)
  scene.add(hemiLight)
  scene.add(light)

  // Render Loop
  const renderPhone = () => {
    renderer.render(scene, camera)
  }

  // Render the scene when the controls have changed.
  // If you don’t have other animations or changes in your scene,
  // you won’t be draining system resources every frame to render a scene.
  controls.addEventListener('change', renderPhone)

  // Avoid constantly rendering the scene by only
  // updating the controls every requestAnimationFrame
  const animationLoop = () => {
    requestAnimationFrame(animationLoop)
    controls.update()
  }

  animationLoop()

  // Window Resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    controls.handleResize()
    renderPhone()
  }, false)

  // Object Loader
  const loader = new THREE.ColladaLoader()

  const loadCollada = (collada) => {
    const dae = collada.scene
    dae.position.set(0.4, 0, 0.8)

    scene.add(dae)

    renderPhone()
  }

  loader.options.convertUpAxis = true
  loader.load('./renders/iphone-six-model.dae', loadCollada)
}

export { iphoneRenderer }
