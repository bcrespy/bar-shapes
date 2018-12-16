/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * 
 **/

import Surface3D from "./surface-3D";
import AudioData from "@creenv/audio/audio-analysed-data";
import clamp from "clamp";


class SurfaceWavy extends Surface3D {
  /**
   * 
   * @param {*} x 
   * @param {*} y 
   * @param {*} t 
   * @param {AudioData} audioData 
   */
  getZ (x, y, t, audioData) {
    x*= 4.0;
    y*= 4.0;
    return 0.00005*audioData.multibandEnergy[1]*(Math.cos(x+y) + (x*x)/6.0 - (y*y)/6.0);
  }
};

export default SurfaceWavy;