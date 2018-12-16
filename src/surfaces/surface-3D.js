/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * A 3d surface returns a Z value given 3 parameters: x, y, t, x and y being spatial coordinates and t being time coordinate. 
 * 
 * @abstract
 **/

class Surface3D {
  constructor () {

  }

  /**
   * Returns a Z spatial coordinate given the parameters 
   * 
   * @param {number} x spatial coordinate
   * @param {number} y spatial coordinate 
   * @param {number} t time 
   * 
   * @abstract
   */
  getZ (x, y, t) {

  }
};

export default Surface3D;