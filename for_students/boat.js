import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

export class Boat extends GrObject {
    constructor(track) {
        let boat = new T.Group();

        let boat_mat = shaderMaterial("./shaders/boat.vs", "./shaders/boat.fs", {
            side: T.DoubleSide,
            uniforms: {
              checks: { value: 4.0 },
              light: { value: new T.Vector3(0.707, 0.394, 0.113) },
              dark: { value: new T.Vector3(0.539, 0.2, 0.14) },
            },
          });

        const len_geom = new T.PlaneGeometry(2,1);
        //const boat_mat = new T.MeshBasicMaterial( {color: 0xffff00, side: T.DoubleSide} );
        const plane1 = new T.Mesh( len_geom, boat_mat );
        const plane2 = new T.Mesh( len_geom, boat_mat );
        const len2_geom = new T.PlaneGeometry(2.02,2);
        const plane3 = new T.Mesh( len2_geom, boat_mat );
        plane3.translateY(-0.49);
        plane3.rotateX(Math.PI/2);
        plane1.translateZ(-1);
        boat.add(plane1);
        plane2.translateZ(1);
        boat.add(plane2);
        boat.add(plane3);

        let side_geom = new T.BufferGeometry();
        const side_vertices = new Float32Array([
            //right front
            1,-0.5,1,
            2,0.5,0,
            1,0.5,1,
            //right mid
            1,-0.5,1,
            2,0.5,0,
            1,-0.5,-1,
            //right back
            1,-0.5,-1,
            2,0.5,0,
            1,0.5,-1,

            //left front
            -1,-0.5,1,
            -2,0.5,0,
            -1,0.5,1,
            //left mid
            -1,-0.5,1,
            -2,0.5,0,
            -1,-0.5,-1,
            //left back
            -1,-0.5,-1,
            -2,0.5,0,
            -1,0.5,-1,
        ])
        side_geom.setAttribute('position',new T.BufferAttribute(side_vertices,3));
        side_geom.computeVertexNormals();
        boat.add(new T.Mesh(side_geom, boat_mat));

        const pole_geom = new T.CylinderGeometry(0.03,0.05,2.5); 
        const pole_mat = new T.MeshBasicMaterial( {color: "black"} ); 
        let pole = new T.Mesh(pole_geom, pole_mat);
        pole.translateY(1);
        boat.add(pole);

        let sail_geom = new T.BufferGeometry();
        const sail_vertices = new Float32Array([
            //right
            0,0.7,0,
            1,0.7,0,
            0,2.2,0,
            //left
            -0,0.7,0,
            -1,0.7,0,
            -0,2.2,0,
        ])

        sail_geom.setAttribute('position',new T.BufferAttribute(sail_vertices,3));
        sail_geom.computeVertexNormals();
        const sail_mat = new T.MeshBasicMaterial( {color: "white", side: T.DoubleSide} );
        boat.add(new T.Mesh(sail_geom, sail_mat));

        boat.position.y = 0.6;
        super("Boat", boat);

        this.b = boat;

      this.track = track;
      this.u = 0;
      // the fbx loader puts the car on the ground - we need a ride point above the ground
      this.ridePoint = new T.Object3D();
      this.ridePoint.translateY(0.6);
      this.b.add(this.ridePoint);
      this.rideable = this.ridePoint;
}
    stepWorld(delta, timeOfDay) {
      this.u += delta / 8000;
      let pos = this.track.eval(this.u);
      this.b.position.set(pos[0], pos[1] + 0.5, pos[2]);
      let dir = this.track.tangent(this.u);
      // since we can't easily construct the matrix, figure out the rotation
      // easy since this is 2D!
      let zAngle = Math.atan2(dir[2], dir[0]);
      // turn the object so the Z axis is facing in that direction
      this.b.rotation.y = -zAngle - Math.PI / 2;
    }
}

