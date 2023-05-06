import * as Loaders from "../libs/CS559-Framework/loaders.js";

export class Mountain extends Loaders.FbxGrObject {
    /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor(params = {}) {
    /** @type {number} */ const x = params.x || 0; // Position x
    /** @type {number} */ const y = params.y || 0; // Position y
    /** @type {number} */ const z = params.z || 0; // Position z
    /** @type {number} */ const angle = params.a || 0; // Position z
      super({
        fbx: "./mountain/Mount Fuji.fbx",
        stl: "./mountain/Mount Fuji.stl",
        c4d: "./mountain/Mount Fuji.c4d",
        norm: 8.0,
        name: "Mountain",
      });
      this.objects[0].position.set(x,y,z);
      this.objects[0].rotateY(angle);
      this.objects[0].scale.set(1,2,1);
    }
  }