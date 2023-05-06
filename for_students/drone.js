import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Drone extends GrObject{
            /**
   * The constructor
   * @param {Object} params Parameters
   */
    constructor() {

        let box_material = new T.MeshStandardMaterial({ color: "purple" });
        let box = new T.Mesh(new T.BoxGeometry(10,1,10,1,1,1),box_material);
        box.scale.set(0.1,0.1,0.1);
        box.position.y = 2;
        box.castShadow = true;

        let eyes_material = new T.MeshStandardMaterial({ color: "white", metalness:1 });
        let r_eye = new T.Mesh(new T.SphereGeometry(1),eyes_material);
        r_eye.scale.set(0.1,0.1,0.1);
        r_eye.position.x = box.position.x + 0.5;
        r_eye.position.y = 2;
        r_eye.position.z = box.position.z + 0.15;
        r_eye.castShadow = true;
        let l_eye = new T.Mesh(new T.SphereGeometry(1),eyes_material);
        l_eye.scale.set(0.1,0.1,0.1);
        l_eye.position.x = box.position.x + 0.5;
        l_eye.position.y = 2;
        l_eye.position.z = box.position.z - 0.15;
        l_eye.castShadow = true;

        let quadcopter = new T.Group();
        quadcopter.add(box);
        quadcopter.add(r_eye);
        quadcopter.add(l_eye);

        let propeller_material = new T.MeshStandardMaterial({ color: "orange" });

        let sphere = [];
        let fan = [];
        let propeller = [];
        for(let i = 0; i < 4; i++){
            sphere[i] = new T.Mesh(new T.SphereGeometry(1),propeller_material);
            sphere[i].scale.set(0.1,0.1,0.1);
            sphere[i].position.y = 2.1;
            sphere[i].castShadow = true;

            fan[i] = new T.Mesh(new T.CapsuleGeometry(1,10,8,3),box_material);
            fan[i].scale.set(0.05,0.05,0.05);
            fan[i].rotateX(Math.PI/2);
            fan[i].position.y = 2.1;
            fan[i].castShadow = true;

            propeller[i] = new T.Mesh(new T.TorusGeometry(4,0.6,6,6,6.3),propeller_material);
            propeller[i].scale.set(0.1,0.1,0.1);
            propeller[i].position.y = 2.1;
            propeller[i].rotateX(Math.PI/2);
            propeller[i].castShadow = true;
            quadcopter.add(propeller[i]);
            quadcopter.add(fan[i]);
            quadcopter.add(sphere[i]);
        }
        sphere[0].position.x = box.position.x + 0.5;
        sphere[0].position.z = box.position.z + 0.5;
        sphere[1].position.x = box.position.x - 0.5;
        sphere[1].position.z = box.position.z - 0.5;
        sphere[2].position.x = box.position.x + 0.5;
        sphere[2].position.z = box.position.z - 0.5;
        sphere[3].position.x = box.position.x - 0.5;
        sphere[3].position.z = box.position.z + 0.5;
        for(let i = 0; i < 4; i++){
            fan[i].position.x = sphere[i].position.x;
            fan[i].position.z = sphere[i].position.z;
            propeller[i].position.x = sphere[i].position.x;
            propeller[i].position.z = sphere[i].position.z;
        }
        quadcopter.position.y = 5;
        super("Drone", quadcopter);

        this.q = quadcopter;
        this.f = fan;
        this.pro = propeller;
        this.u = 0;
        // the fbx loader puts the car on the ground - we need a ride point above the ground
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.6);
        this.q.add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.theta = 0;
    }
    stepWorld(delta, timeOfDay) {
        this.theta = delta / 1000;

        if(this.u && this.q.position.z <= 10){
            this.q.position.z += 0.06;
        }
        else{
            if(this.q.position.z <= -10){
                this.u = 1;
            }
            else{
                this.u = 0;
                this.q.position.z -= 0.06;
            }
        }

        for(let i = 0; i < 4; i++){
            this.f[i].rotateOnWorldAxis(new T.Vector3(0,1,0), this.theta/20);
            this.pro[i].rotateOnWorldAxis(new T.Vector3(0,1,0), this.theta/20);
        }
      }
}