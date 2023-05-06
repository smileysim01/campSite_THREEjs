import { ObjGrObject } from "../libs/CS559-Framework/loaders.js";

export class Snowland extends ObjGrObject {
        /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor(params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || 0.0; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z
        /** @type {number} */ const a = params.a || 0; // Position z
        super({
            obj:'./patch-of-old-snow/source/Neve01_low/Neve01_low.obj',
            mtl:'patch-of-old-snow/source/Neve01_low/Neve01_low.mtl',
            norm:8,
            name:'Snowland'})
            
        this.objects[0].position.set(x,y,z);
        this.objects[0].rotateY(a);

      }
  }