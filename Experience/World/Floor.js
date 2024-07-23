import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xa68fe7,
            side: THREE.DoubleSide, // Use DoubleSide to make the plane visible from both sides
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);

        // Add the plane to the scene
        this.scene.add(this.plane);

        // Set rotation and position
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.1;
        this.plane.position.z = 1; // Move the plane closer to the camera

        // Ensure the plane is rendered on top of other objects
        this.plane.renderOrder = 1;

        // Enable the plane to receive shadows
        this.plane.receiveShadow = true;
    }

    resize() {}

    update() {}
}
