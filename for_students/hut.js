import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Hut extends GrObject {
        /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor(params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || 1; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z
        /** @type {number} */ const a = params.a || 0; // Position z
        let bott_geometry = new T.BufferGeometry();
        let roof_geometry = new T.BufferGeometry();

        const vertices1 = new Float32Array( [
            //for front
            -1,-1,1,
            1,-1,1,
            -1,1,1,

            -1,1,1,
            1,-1,1,
            1,1,1,

            //for left
            -1,-1,-1, 
            -1,-1,1, 
            -1,1,-1,

            -1,1,-1,
            -1,-1,1,
            -1,1,1,

            //for right
            1,-1,1,
            1,-1,-1,
            1,1,1,

            1,1,1,
            1,-1,-1,
            1,1,-1,

            //for back
            1,-1,-1,
            -1,-1,-1,
            1,1,-1,

            1,1,-1,
            -1,-1,-1,
            -1,1,-1,
        ])


        const vertices2 = new Float32Array( [
            //for top front
            -1,1,1,
            1,1,1,
            0,2.5,0,

            //for top left
            -1,1,-1,
            -1,1,1,
            0,2.5,0,

            //for top right
            1,1,1,
            1,1,-1,
            0,2.5,0,

            //for top back
            1,1,-1,
            -1,1,-1,
            0,2.5,0
        ]);

        bott_geometry.setAttribute('position',new T.BufferAttribute(vertices1,3));
        bott_geometry.computeVertexNormals();

        roof_geometry.setAttribute('position',new T.BufferAttribute(vertices2,3));
        roof_geometry.computeVertexNormals();

        const uvs1 = new Float32Array([
            //front
            0.36,0,
            0.64,0,
            0.36,1,

            0.36,1,
            0.64,0,
            0.64,1,

            // left- 6
            0.08,0,
            0.4,0,
            0.08,1,

            0.08,1,
            0.4,0,
            0.4,1,

            //right- 5
            0.01,0.01,
            0.02,0.01,
            0.01,0.01,

            0.01,0.01,
            0.02,0.01,
            0.02,0.01,

            //back- 1
            0.01,0.01,
            0.02,0.01,
            0.01,0.01,

            0.01,0.01,
            0.02,0.01,
            0.02,0.01,
        ])

        const uvs2 = new Float32Array([
            //top front
            0.81,0.01,
            0.02,0.01,
            0.81,0.01,

            //top left
            0.81,0.01,
            0.02,0.01,
            0.81,0.01,

            //top right
            0.81,0.01,
            0.02,0.01,
            0.81,0.01,

            //top back
            0.81,0.01,
            0.02,0.01,
            0.81,0.01,
        ])

        bott_geometry.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        roof_geometry.setAttribute('uv',new T.BufferAttribute(uvs2,2));

        // @@Snippet:texuse
        let tl1 = new T.TextureLoader().load("../textures/house.png");
        let bott_material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl1,
            side: T.DoubleSide
        });

        // @@Snippet:texuse
        let tl2 = new T.TextureLoader().load("../textures/UV_Grid_Sm.jpg");
        let roof_material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            metalness: 0.5,
            map: tl2,
            side: T.DoubleSide
        });

        let bott_mesh = new T.Mesh(bott_geometry, bott_material);
        let roof_mesh = new T.Mesh(roof_geometry, roof_material);
        let pyramid_hip = new T.Group();
        pyramid_hip.add(bott_mesh);
        pyramid_hip.add(roof_mesh);
        pyramid_hip.position.set(x,y,z);
        pyramid_hip.rotateY(a);
        pyramid_hip.scale.set(1.5,1.2,1.5);

        //
        super("Hut", pyramid_hip);
    }
}