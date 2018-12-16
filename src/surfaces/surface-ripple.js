/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * 
 **/

import Surface3D from "./surface-3D";


class SurfaceRipple extends Surface3D {
  getZ (x, y, t, audioData) {
    let time = t/1000 + audioData.energy / 50.0;
    return Math.sin(10*(x*x+y*y)+(time))/5 * (0.5+audioData.multibandEnergy[5]/20.0);
  }
};

export default SurfaceRipple;