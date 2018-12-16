/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * This object is defined by a grid of rectangles which have a Y scale defined by the addition of parametric surfaces
 **/

import * as THREE from "three";
import AudioData from "@creenv/audio/audio-analysed-data";

import config from "./config";
import controls from "./controls";

import Surface3D from "./surfaces/surface-3D";
import SurfaceRipple from "./surfaces/surface-ripple";
import SurfaceBump from "./surfaces/surface-bump";
import SurfaceWavy from "./surfaces/surface-wavy";


class SurfacesAddition {
  /**
   * 
   * @param {THREE.Scene} scene 
   */
  constructor (scene) {
    this.scene = scene;
    this.updateGrid = this.updateGrid.bind(this);
    this.initGrid();
    config.updateGrid = this.updateGrid;

    /**
     * list of the surfaces applied to this grid 
     * @type {Array.<Surface3D>}
     */
    this.surfaces = [
      new SurfaceRipple(),
      new SurfaceBump(),
      new SurfaceWavy(),
    ];
  }

  initGrid () {
    this.grid = new Array(config.gridsize*config.gridsize);
    this.materials = new Array(config.gridsize*config.gridsize);
    
    this.gridDim = config.gridsize*(config.barSize+config.gap);

    // the grid is fullfilled with rectangles 
    for (let i = 0; i < this.grid.length; i++) {
      let x = i%config.gridsize;
      let y = Math.floor(i/config.gridsize);

      let rect = new THREE.BoxGeometry(config.barSize, 10.0, config.barSize);
      this.materials[i] = new THREE.MeshPhongMaterial({
        color: 0xff00ff
      });
      this.grid[i] = new THREE.Mesh(rect, this.materials[i]);
      this.grid[i].position.set(x*(config.barSize+config.gap)-this.gridDim/2, 0, y*(config.barSize+config.gap)-this.gridDim/2);
      this.scene.add(this.grid[i]);
    }
  }

  updateGrid () {
    for (let i = 0; i < this.grid.length; i++) {
      this.scene.remove(this.grid[i]);
    }
    this.initGrid();
  }

  update (deltaT, time, audioData) {
    // update of the positions 
    for (let i = 0; i < this.grid.length; i++) {
      let x = this.grid[i].position.x / (this.gridDim/2);
      let y = this.grid[i].position.z / (this.gridDim/2);
      
      let z = 0;
      for (let s = 0; s < this.surfaces.length; s++) {
        z+= this.surfaces[s].getZ(x, y, time, audioData);
      }
      
      this.grid[i].visible = (z != 0);
      this.grid[i].scale.setY(z);
    }
  }
}

export default SurfacesAddition;