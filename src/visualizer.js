import * as THREE from "three";
import AudioData from "@creenv/audio/audio-analysed-data";

// the values of the config object will be modifier by user controls 
import config from "./config";

import Camera from "./camera";
import SurfacesAddition from "./surfaces-addition";

import { EffectComposer, EffectPass, RenderPass } from "postprocessing";



class Visualizer {
  constructor () {
  }

  init () {
    return new Promise((resolve, reject) => {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setClearColor(0x84ffd5, 1);
      this.camera = new Camera(this.scene, this.renderer);
      this._onResize();

      this.surfacesAddition = new SurfacesAddition(this.scene);

      /** LIGHTS */
      this.light1 = new THREE.DirectionalLight(0xffffff, 1.2);
      this.light1.position.set(1,1,1);
      this.light2 = new THREE.DirectionalLight(0xffffff, 0.1);
      this.light2.position.set(-1,1,-1);
      this.l3 = new THREE.AmbientLight(0xffffff, 0.1);
      this.scene.add(this.light1);
      this.scene.add(this.light2);
      this.scene.add(this.l3);

      /** EFFECT COMPOSER */
      this.composer = new EffectComposer(this.renderer, { depthTexture: true });

      this.renderPass = new RenderPass(this.scene, this.camera.get());
      this.renderPass.renderToScreen = true;

      this.composer.addPass(this.renderPass);
      /** END COMPOSER */

      document.body.appendChild(this.renderer.domElement); 


      // BINDIGNS 
      this._onResize = this._onResize.bind(this);

      // EVENTS 
      window.addEventListener("resize", this._onResize);

      resolve();
    });
  }

  _onResize () {
    this.camera._onResize();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
 
  /**
   * @param {number} deltaT the time elapsed since last frame call
   * @param {number} time the total elapsed time since the beginning of the app
   * @param {AudioData} audioData analysed audio data
   */
  render (deltaT, time, audioData) {
    //this.renderer.render(this.scene, this.camera.get());
    this.surfacesAddition.update(deltaT, time, audioData);
    this.composer.render(deltaT);
  }
}

export default Visualizer;