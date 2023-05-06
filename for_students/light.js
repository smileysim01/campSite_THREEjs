import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Light extends GrObject {
        /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor(params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || 0; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z

        let lamp = new T.Group();

        let pole = new T.MeshStandardMaterial({color:"brown", roughness:1});
        let bulb = new T.MeshStandardMaterial({color:"#ffcf42", transparent:true, opacity:0.8});
        let stand = new T.Mesh(new T.CylinderGeometry(0.1,0.1,4),pole);
        stand.position.y = y + 2;
        lamp.add(stand);

        let light = new T.Mesh(new T.CylinderGeometry(0.4,0.4,1),bulb);
        light.position.y = stand.position.y + 2.25;
        lamp.add(light);

        let light_bulb = new T.Mesh(new T.SphereGeometry(0.2), new T.MeshStandardMaterial({color:"white"}));
        light_bulb.position.y = stand.position.y + 2.2;
        lamp.add(light_bulb);

        let spot = new T.SpotLight("yellow", 0.5);
        spot.angle = Math.PI / 8;
        spot.target = stand;
        spot.position.y = light_bulb.position.y;
        spot.castShadow = true;
        lamp.add(spot);
        lamp.position.set(x,y,z);
        super("Light",lamp);
    }
}