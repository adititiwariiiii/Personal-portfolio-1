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

        // Initialize rotation values and quaternions
        this.rotationX = 0;
        this.rotationY = 0;
        this.currentQuaternion = new THREE.Quaternion();
        this.targetQuaternion = new THREE.Quaternion();

        this.sensitivity = 0.005; // Sensitivity for mouse movement

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
            0xffffff,
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
            // Calculate normalized mouse positions
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            // Calculate target rotation in radians
            this.rotationX = mouseX * Math.PI * 2; // Full 360 degrees
            this.rotationY = mouseY * Math.PI * 2; // Full 360 degrees

            // Create a new quaternion for the target rotation
            const targetEuler = new THREE.Euler(this.rotationY, this.rotationX, 0, 'YXZ');
            this.targetQuaternion.setFromEuler(targetEuler);
        });
    }

    resize() {}

    update() {
        // Smoothly interpolate between current and target quaternion
        this.currentQuaternion.slerp(this.targetQuaternion, 0.1); // Adjust the interpolation factor for smoothness

        // Apply the quaternion to the actualRoom
        this.actualRoom.quaternion.copy(this.currentQuaternion);

        // Update the animation mixer
        this.mixer.update(this.time.delta * 0.0009);
    }
}
