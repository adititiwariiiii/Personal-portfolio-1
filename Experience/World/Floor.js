
import * as THREE from "three";
import Experience from "../Experience.js";
import { Scene } from "three";
import GSAP from "gsap";

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xa68fe7,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.1;
        this.plane.receiveShadow =  true;
    }


    resize(){}

    update(){

    }
}