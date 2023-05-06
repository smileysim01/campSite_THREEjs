import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Tree extends GrObject {
    /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor(params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || 2; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z

        let trunk_geometry = new T.CylinderGeometry(0.1,0.4,4);
        let top_geometry = new T.ConeGeometry(3.5,7,11);
        top_geometry.scale(0.5,0.5,0.5);
        let trunk_material = new T.MeshStandardMaterial({color: "brown", roughness: 0.7});
        let top_material = new T.MeshStandardMaterial({color: "green", roughness: 0.5});

        let trunk_mesh = new T.Mesh(trunk_geometry, trunk_material);
        let top_mesh = new T.Mesh(top_geometry, top_material);
        top_mesh.translateY(0.6);
        
        let tree = new T.Group();
        tree.add(trunk_mesh);
        tree.add(top_mesh);
        tree.position.set(x,y,z);
        tree.scale.set(1,1,1);
        //
        super("Tree", tree);
    }
}