/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * 
 **/

import * as THREE from "three";
const OrbitControls = require('three-orbitcontrols')


class Camera {
  /**
   * 
   * @param {THREE.Scene} scene 
   * @param {THREE.Vector3} position 
   */
  constructor (scene, renderer, position = new THREE.Vector3(15, 15, 15)) {
    this.scene = scene;

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(position.x, position.y, position.z);
    this.camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(this.camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
  }

  _onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  get () {
    return this.camera;
  }

  update (deltaT, time) {

  }
};

export default Camera;