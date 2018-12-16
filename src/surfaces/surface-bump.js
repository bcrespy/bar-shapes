/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * 
 **/

import Surface3D from "./surface-3D";


class SurfaceBump extends Surface3D {
  getZ (x, y, t) {
    return 0.05*Math.sin(5*x)*Math.cos(5*y);
  }
};

export default SurfaceBump;