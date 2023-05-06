import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Snowman extends GrObject {
    /**
* The constructor
* @param {Object} params Parameters
*/
constructor(params = {}) {
    /** @type {number} */ const x = params.x || 0; // Position x
    /** @type {number} */ const y = params.y || 1; // Position y
    /** @type {number} */ const z = params.z || 0; // Position z
    /** @type {number} */ const a = params.a || 0; // Position z

    let snowman = new T.Group();

    let snow = new T.MeshStandardMaterial({color:"white", roughness: 1});
    let eyes = new T.MeshStandardMaterial({color:"grey", metalness:1});
    let mouth_mat = new T.MeshStandardMaterial({color:"#DC143C"});
    let carrot = new T.MeshStandardMaterial({color:"#ff781f", roughness:1});
    let branch = new T.MeshStandardMaterial({color:"brown", roughness:1});
    let cloth = new T.MeshStandardMaterial({color:"#9e4aef", roughness:1, metalness: 1});

    let body_bottom = new T.Mesh(new T.SphereGeometry(1), snow);
    body_bottom.position.x = x;
    body_bottom.position.y = y;
    body_bottom.position.z = z;
    body_bottom.scale.set(0.75,0.75,0.75);
    snowman.add(body_bottom);

    let body_mid = new T.Mesh(new T.SphereGeometry(0.75), snow);
    body_mid.position.x = x;
    body_mid.position.y = body_bottom.position.y + 1;
    body_mid.position.z = z;
    body_mid.scale.set(0.75,0.75,0.75);
    snowman.add(body_mid);

    let body_head = new T.Mesh(new T.SphereGeometry(0.5), snow);
    body_head.position.x = x;
    body_head.position.y = body_mid.position.y + 0.75;
    body_head.position.z = z;
    body_head.scale.set(0.75,0.75,0.75);
    snowman.add(body_head);

    let left_eye = new T.Mesh(new T.SphereGeometry(0.1), eyes);
    left_eye.position.x = x - 0.2;
    left_eye.position.y = body_mid.position.y + 0.85;
    left_eye.position.z = z + 0.3;
    left_eye.scale.set(0.75,0.75,0.75);
    snowman.add(left_eye);

    let right_eye = new T.Mesh(new T.SphereGeometry(0.1), eyes);
    right_eye.position.x = x + 0.2;
    right_eye.position.y = body_mid.position.y + 0.85;
    right_eye.position.z = z + 0.3;
    right_eye.scale.set(0.75,0.75,0.75);
    snowman.add(right_eye);

    let nose = new T.Mesh(new T.ConeGeometry(0.1,0.5), carrot);
    nose.position.x = x;
    nose.position.y = body_mid.position.y + 0.7;
    nose.position.z = z + 0.5;
    nose.rotateX(Math.PI/2);
    nose.scale.set(0.75,0.75,0.75);
    snowman.add(nose);

    let mouth = [];
    for(let i = -0.2; i<0.3; i = i + 0.1){
        mouth[i] = new T.Mesh(new T.SphereGeometry(0.05), mouth_mat);
        mouth[i].position.x = x + i;
        if(i == 0.2 || i== -0.2)    mouth[i].position.y = body_mid.position.y + 0.6;
        else    mouth[i].position.y = body_mid.position.y + 0.55;
        mouth[i].position.z = z + 0.3;
        mouth[i].scale.set(0.75,0.75,0.75);
        snowman.add(mouth[i]);
    }

    let left_arm2 = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1.5),branch);
    left_arm2.position.x = x + 0.75;
    left_arm2.position.y = body_mid.position.y + 0.25;
    left_arm2.position.z = z;
    left_arm2.rotateZ(Math.PI/1.5);
    left_arm2.scale.set(0.75,0.75,0.75);
    snowman.add(left_arm2);

    let right_arm2 = new T.Mesh(new T.CylinderGeometry(0.08,0.08,1.5),branch);
    right_arm2.position.x = x - 0.75;
    right_arm2.position.y = body_mid.position.y + 0.25;
    right_arm2.position.z = z;
    right_arm2.rotateZ(-Math.PI/1.5);
    right_arm2.scale.set(0.75,0.75,0.75);
    snowman.add(right_arm2);

    let hat_base = new T.Mesh(new T.CylinderGeometry(0.4,0.4,0.2),cloth);
    hat_base.position.x = x;
    hat_base.position.y = body_head.position.y + 0.35;
    hat_base.position.z = z;
    hat_base.scale.set(0.75,0.75,0.75);
    snowman.add(hat_base);

    let hat = new T.Mesh(new T.CylinderGeometry(0.3,0.3,0.5),cloth);
    hat.position.x = x;
    hat.position.y = body_head.position.y + 0.55;
    hat.position.z = z;
    hat.scale.set(0.75,0.75,0.75);
    snowman.add(hat);

    let buttons = [];
    for(let i = 0; i < 0.5; i+=0.2){
        buttons[i] = new T.Mesh(new T.SphereGeometry(0.08), cloth);
        buttons[i].position.x = x;
        buttons[i].position.y = body_mid.position.y + i;
        if(i>0.3)   buttons[i].position.z = z + 0.45;
        else    buttons[i].position.z = z + 0.58;
        buttons[i].scale.set(0.75,0.75,0.75);
        snowman.add(buttons[i]);
    }
    super("Snowman",snowman);

    this.dir = 1;
    this.angle = 0;
    this.ra = right_arm2;
    this.la = left_arm2;
    }
    stepWorld(delta){
        if(this.angle<=3*Math.PI/8 && this.angle>=Math.PI/4){
            if(this.dir==1){
                this.ra.rotateZ(-0.02);
                this.la.rotateZ(0.02);
                this.angle -= 0.02;
            }
            else{
                this.ra.rotateZ(0.02);
                this.la.rotateZ(-0.02);
                this.angle += 0.02;
            }
        }
        else if(this.angle < Math.PI/4){
            this.dir = 0;
            this.angle = Math.PI/4 + 0.02;
        }
        else if(this.angle > 3*Math.PI/8){
            this.dir = 1;
            this.angle = 3*Math.PI/8 - 0.02;
        }
    }


}