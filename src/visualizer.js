import * as THREE from "three";
import AudioData from "@creenv/audio/audio-analysed-data";

// the values of the config object will be modifier by user controls 
import config from "./config";

import Camera from "./camera";
import SurfacesAddition from "./surfaces-addition";

import { EffectComposer, BlendFunction, EffectPass, RenderPass, NoiseEffect } from "postprocessing";
import DotsEffect from "./shaders/dots/dots.shader";
import StretchEffect from "./shaders/stretch/stretch.shader";
import AberrationEffect from "./shaders/aberration/aberration.shader";



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

      this.dotsEffect = new DotsEffect({
        pointSize: config.points.size,
        gap: config.points.gap,
        invert: config.points.invert,
        invertAll: config.points.invertAll,
        greyscale: config.points.greyscale,
        contrast: config.points.contrast,
      });

      this.noiseEffect = new NoiseEffect({
        blendFunction: BlendFunction.REFLECT,
        premultiply: true
      });

      this.stretchEffect = new StretchEffect({
        strength: 0.5,
        appliance: 1.0,
        distanceMin: config.distanceMin,
        distanceRange: config.distanceRange
      });

      this.aberrationEffect = new AberrationEffect({
        strength: 0.0
      });

      this.renderPass = new RenderPass(this.scene, this.camera.get());
      this.effectsPass = new EffectPass(this.camera.get(), this.dotsEffect);

      this.effectsPass2 = new EffectPass(this.camera.get(), this.stretchEffect, this.aberrationEffect, this.noiseEffect);
      this.effectsPass2.renderToScreen = true;

      this.composer.addPass(this.renderPass);
      this.composer.addPass(this.effectsPass);
      this.composer.addPass(this.effectsPass2);
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
  updatePasses (deltaT, time, audioData) {
    this.dotsEffect.pointSize = config.points.size;
    this.dotsEffect.gap = config.points.gap;
    this.dotsEffect.invert = config.points.invert;
    this.dotsEffect.invertAll = config.points.invertAll;
    this.dotsEffect.greyscale = config.points.greyscale;
    this.dotsEffect.contrast = config.points.contrast;

    if (audioData.peak.value == 1) 
      this.aberrationEffect.setRandomDirections();
    this.aberrationEffect.strength = audioData.peak.value * 0.01 * audioData.peak.energy/30.0;

    this.stretchEffect.distanceMin = config.distanceMin;
    this.stretchEffect.distanceRange = config.distanceRange;
    if (audioData.peak.value == 1) {
      this.stretchEffect.setRandomDirections();
    }
    this.stretchEffect.uniforms.get("appliance").value = audioData.peak.value * audioData.energy/30.0;
    this.stretchEffect.uniforms.get("strength").value = config.stretch * audioData.energy/20.0;
  }
 
  /**
   * @param {number} deltaT the time elapsed since last frame call
   * @param {number} time the total elapsed time since the beginning of the app
   * @param {AudioData} audioData analysed audio data
   */
  render (deltaT, time, audioData) {
    //this.renderer.render(this.scene, this.camera.get());
    this.camera.update(deltaT, time);
    this.surfacesAddition.update(deltaT, time, audioData);
    this.updatePasses(deltaT, time, audioData);
    this.composer.render(deltaT);
  }
}

export default Visualizer;