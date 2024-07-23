import * as THREE from "three";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        // Initialize rotation values
        this.currentRotationY = 0;
        this.targetRotationY = 0;

        this.sensitivity = 0.005; // Sensitivity for mouse movement
        this.rotationSpeed = 0.1; // Speed of rotation smoothing

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }
        });

        const width = 1;
        const height = 1;
        const intensity = 0.5;
        const rectLight = new THREE.RectAreaLight(
            0xeeeeee,
            intensity,
            width,
            height
        );
        rectLight.position.set(0, 0, 0);
        this.actualRoom.add(rectLight);

        const rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.5, 0.5, 0.5);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            // Calculate normalized mouse position
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;

            // Calculate target rotation in radians
            this.targetRotationY = mouseX * Math.PI * 2; // Full 360 degrees

            // Debugging: log values to check calculations
            console.log('MouseX:', mouseX);
            console.log('Target RotationY:', this.targetRotationY);
        });
    }

    resize() {}

    update() {
        // Smoothly interpolate between current and target rotation
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * this.rotationSpeed;

        // Apply the rotation to the actualRoom
        this.actualRoom.rotation.y = this.currentRotationY;

        // Debugging: log rotation values
        console.log('Current RotationY:', this.currentRotationY);

        // Update the animation mixer
        this.mixer.update(this.time.delta * 0.0009);
    }
}
