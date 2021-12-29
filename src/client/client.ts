import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Render {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls

    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 2
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        window.addEventListener('resize', () => this.resize(), false)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.createScene()
    }

    createScene() {
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        })
        const cube = new THREE.Mesh(geometry, material)
        this.scene.add(cube)
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.draw()
    }

    loop() {
        this.controls.update()
        this.draw()
        requestAnimationFrame(() => this.loop())
    }

    draw() {
        console.log('draw')
        this.renderer.render(this.scene, this.camera)
    }
}


const render = new Render()
render.loop()