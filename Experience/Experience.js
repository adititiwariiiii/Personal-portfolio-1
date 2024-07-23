import * as THREE from "three";
import Camera from "./Camera.js";
import Floor from "./Floor.js";

export default class Experience {
    constructor() {
        this.scene = new THREE.Scene();
        this.canvas = document.querySelector('canvas.webgl');
        this.sizes = { width: window.innerWidth, height: window.innerHeight, aspect: window.innerWidth / window.innerHeight };
        this.time = { delta: 0 }; // Placeholder for time management
        this.camera = new Camera();
        this.floor = new Floor();

        this.update();
        this.resize();
    }

    update() {
        this.floor.update();
        this.camera.update();

        requestAnimationFrame(() => this.update());
    }

    resize() {
        // Update sizes if window is resized
        this.camera.resize();
    }
}
