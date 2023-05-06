import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Child3 extends GrObject {
        /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor(params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || -0.3; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z
        /** @type {number} */ const a = params.a || 0; // Position z

        let person = new T.Group();
        let skin_mat = new T.MeshBasicMaterial({color:"#f1c27d",roughness:0.6});

        let head = new T.Mesh(new T.SphereGeometry(0.4), skin_mat);
        head.position.y = 3;
        person.add(head);

        let cloth_mat = new T.MeshBasicMaterial({color:"cyan"});

        let stomach = new T.Mesh(new T.BoxGeometry(0.7,1.3), cloth_mat);
        stomach.position.y = 2;
        person.add(stomach);

        let rhand = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1), skin_mat);
        rhand.position.x = -0.7;
        rhand.position.z = 0.6;
        rhand.position.y = 2;
        rhand.rotateZ(-Math.PI/4);
        rhand.rotateY(Math.PI/7);
        person.add(rhand);
        let lhand = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1), skin_mat);
        rhand.position.x = -0.5;
        lhand.position.z = -0.6;
        lhand.position.y = 2;
        lhand.rotateZ(-Math.PI/4);
        rhand.rotateY(Math.PI/7);
        person.add(lhand);

        let rpant = new T.Mesh(new T.CylinderGeometry(0.1,0.1,1.5), cloth_mat);
        rpant.position.z = 0.2;
        rpant.position.y = 1;
        person.add(rpant);
        let lpant = new T.Mesh(new T.CylinderGeometry(0.1,0.1,1.5), cloth_mat);
        lpant.position.z = -0.2;
        lpant.position.y = 1;
        person.add(lpant);

        person.position.set(x,y,z);
        person.rotateY(a);
        super("Child3",person);

        this.dir = 1;
        this.angle = 0;
        this.ra = rpant;
        this.la = lpant;
        this.rh = rhand;
        this.lh = lhand;
        this.time = 0;
        this.man = person;
    }

    stepWorld(delta, timeOfDay) {
        this.time += delta / 1000; // time in seconds
        // set the y position based on the time
        let t = this.time % 1; // where are we in the cycle?
    
        if (t < 0.1 || t > 0.9) this.man.position.y = -0.3;
        else {
          this.man.position.y = -0.3 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
        }
      }
}