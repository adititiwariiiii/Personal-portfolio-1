import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );

        this.orthographicCamera.position.y = 3.5;
        this.orthographicCamera.position.z = 5;
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera);

        const size = 20;
        const divisions = 20;

        // Uncomment these lines if you need helpers for debugging
        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);
        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true; // Enable damping (inertia)
        this.controls.dampingFactor = 0.25; // Adjust damping factor
        this.controls.enableZoom = true; // Allow zooming
        this.controls.enablePan = true; // Allow panning
        this.controls.minDistance = 5; // Set minimum zoom distance
        this.controls.maxDistance = 500; // Set maximum zoom distance
        this.controls.maxPolarAngle = Math.PI; // Limit vertical rotation to avoid flipping
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}
