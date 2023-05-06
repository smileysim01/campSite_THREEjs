import * as Loaders from "../libs/CS559-Framework/loaders.js";

export class Fisherman extends Loaders.FbxGrObject {
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
        fbx: "./fisherman-fishing/3d-model.fbx",
        norm: 4.0,
        name: "Fisherman",
      });
      this.objects[0].position.set(x,y,z);
      this.objects[0].rotateY(angle);
    }
  }

  