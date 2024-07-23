import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();

        // Convert 365 degrees to radians and apply rotation
        this.rotationAmount = 365 * (Math.PI / 180); // 365 degrees in radians
        this.currentRotation = 0; // Initialize current rotation
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xa68fe7,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2; // Ensure the plane is horizontal
        this.plane.position.y = -0.1;
        this.plane.receiveShadow = true;
    }

    resize() {}

    update() {
        // Incrementally rotate the floor by the amount needed
        this.currentRotation += this.rotationAmount * (1 / 60); // Rotate by a fraction each frame
        if (this.currentRotation >= this.rotationAmount) {
            this.currentRotation = this.rotationAmount; // Clamp to 365 degrees
        }
        this.plane.rotation.y = this.currentRotation;
    }
}
