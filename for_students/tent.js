import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

export class Tent extends GrObject {
    /**
    * The constructor
    * @param {Object} params Parameters
    */
    constructor(params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || 0.08; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z
        /** @type {number} */ const a = params.a || 0; // Position z

        let tent = new T.Group();
        let tl = new T.TextureLoader().load("../textures/tent.jpeg");
        const len_geom = new T.PlaneGeometry(6,4);
        const tent_mat = new T.MeshStandardMaterial( {color: "red", side: T.DoubleSide,map:tl,shadowSide:true} );
        const plane = new T.Mesh( len_geom, tent_mat );
        plane.rotateX(Math.PI/2);

        const rplane = new T.Mesh( len_geom, tent_mat );
        rplane.rotateX(-Math.PI/5.8);
        rplane.translateZ(1.7);
        rplane.translateY(y+0.8);

        const lplane = new T.Mesh( len_geom, tent_mat );
        lplane.rotateX(Math.PI/5.8);
        lplane.translateZ(-1.7);
        lplane.translateY(y+0.8);

        tent.add(plane);
        tent.add(rplane);
        tent.add(lplane);

        let side_geom = new T.BufferGeometry();
        const side_vertices = new Float32Array([
            //back
            3,0.01,2,
            3,0.01,-2,
            3,3.3,0,
        ])
        side_geom.setAttribute('position',new T.BufferAttribute(side_vertices,3));
        side_geom.computeVertexNormals();
        tent.add(new T.Mesh(side_geom, tent_mat));

        const pole_geom = new T.CylinderGeometry(0.03,0.07,3); 
        const pole_mat = new T.MeshBasicMaterial( {color: "black",roughness:0.8} ); 
        let pole = new T.Mesh(pole_geom, pole_mat);
        pole.translateX(-3);
        pole.translateY(y+1.5);
        tent.add(pole);

        const rope_geom = new T.CylinderGeometry( 0.05, 0.05, 7);
        const rope = new T.Mesh( rope_geom, pole_mat ); 
        rope.translateX(-2);
        rope.translateY(1.5);
        rope.translateZ(-3);
        rope.rotateX(Math.PI/3);
        tent.add(rope);

        const rope2 = new T.Mesh( rope_geom, pole_mat ); 
        rope2.translateX(-2);
        rope2.translateY(1.5);
        rope2.translateZ(3);
        rope2.rotateX(-Math.PI/3);
        tent.add(rope2);

        tent.position.set(x,y,z);
        tent.rotateY(a);
        super("Tent", tent);
    }
}

