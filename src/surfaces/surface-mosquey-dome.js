/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * 
 **/

import Surface3D from "./surface-3D";
import clamp from "clamp";


class SurfaceWindmill extends Surface3D {
  getZ (x, y, t) {
    x+=t/1000;
    return Math.sign(x*y) * Math.sign(1-Math.pow((x*9),2)+Math.pow((y*9),2))/9;
  }
};

export default SurfaceWindmill;