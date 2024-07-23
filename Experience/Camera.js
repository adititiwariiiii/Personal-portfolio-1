import * as THREE from "three";
import Camera from "./Camera.js";

export default class Experience {
    constructor() {
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
            aspect: window.innerWidth / window.innerHeight,
            frustrum: 75
        };

        this.canvas = document.querySelector('canvas.webgl'); // Ensure this matches your actual canvas selector

        this.scene = new THREE.Scene();

        this.camera = new Camera();

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.animate();

        window.addEventListener('resize', () => {
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;
            this.sizes.aspect = window.innerWidth / window.innerHeight;

            this.camera.resize();
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.camera.update();
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
    }
}

const experience = new Experience();
