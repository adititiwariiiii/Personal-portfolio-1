import * as THREE from "three";
import Experience from "../Experience.js";
import { Scene } from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach((groupchild) =>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
        });

        const width= 1;
        const height= 1;
        const intensity= 0.5;
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
        this.actualRoom.scale.set(0.5 , 0.5 , 0.5);
    }

    setAnimation() {
        // Initialize the AnimationMixer for this.actualRoom
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
    }
    
    onMouseMove() {
        // Variables to store rotation values
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
    
        // Add an event listener for mouse movement
        window.addEventListener("mousemove", (e) => {
            // Calculate rotation for X and Y axis
            mouseX = (e.clientX / window.innerWidth) * 2 - 1; // Normalized X [-1, 1]
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1; // Normalized Y [-1, 1]
    
            // Update target rotation values
            targetX = mouseX * Math.PI;  // X-axis rotation in radians
            targetY = mouseY * Math.PI;  // Y-axis rotation in radians
    
            // Set the targets for lerp (linear interpolation) to smooth rotation
            this.lerpX.target = targetX * 0.4;
            this.lerpY.target = targetY * 0.4;
        });
    }
    
    // Update method to apply the rotations
    update() {
        // Assuming `lerpX` and `lerpY` are instances of a lerping utility
        // Apply rotation based on interpolated values
        this.rotationX = THREE.MathUtils.lerp(this.rotationX, this.lerpX.target, 0.1);
        this.rotationY = THREE.MathUtils.lerp(this.rotationY, this.lerpY.target, 0.1);
    
        // Apply the rotation to your object
        this.actualRoom.rotation.x = this.rotationY;
        this.actualRoom.rotation.y = this.rotationX;
    }

}