import * as Loaders from "../libs/CS559-Framework/loaders.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

export class Birds extends Loaders.FbxGrObject {
    constructor(track) {
      super({
        fbx: "./bird.fbx",
        norm: 4.0,
        name: "Bird",
      });
      this.track = track;
      this.u = 0;
      // the fbx loader puts the car on the ground - we need a ride point above the ground
      this.ridePoint = new T.Object3D();
      this.ridePoint.translateY(10);
      this.objects[0].add(this.ridePoint);
      this.rideable = this.ridePoint;
    }
    stepWorld(delta, timeOfDay) {
      this.u += delta / 4000;
      let pos = this.track.eval(this.u);
      this.objects[0].position.set(pos[0], pos[1] + 8, pos[2]);
      let dir = this.track.tangent(this.u);
      // since we can't easily construct the matrix, figure out the rotation
      // easy since this is 2D!
      let zAngle = -Math.atan2(dir[2], dir[0]);
      // turn the object so the Z axis is facing in that direction
      this.objects[0].rotation.y = -(-zAngle - Math.PI / 2);
    }
}