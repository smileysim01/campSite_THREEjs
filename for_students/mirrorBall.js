import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";


export class mirror extends GrObject{
    /**
   * The constructor
   * @param {Object} params Parameters
   */
  constructor(world,params = {}) {
        /** @type {number} */ const x = params.x || 0; // Position x
        /** @type {number} */ const y = params.y || 1; // Position y
        /** @type {number} */ const z = params.z || 0; // Position z

      let geometry = new T.SphereGeometry(2);
      // let tl = new T.TextureLoader().load("../textures/skybox.jpeg");
      // let normal_tl = new T.TextureLoader().load("../textures/broken_mirror.jpg");
      let mirror_group = new T.Group();
      super("mirror",mirror_group);
      this.world = world;
      let map_tl = new T.CubeTextureLoader().setPath("../textures/").load([
          'right.png',
          'left.png',
          'top.png',
          'bottom.png',
          'front.png',
          'back.png'
      ])

      const target_cube = new T.WebGLCubeRenderTarget(128,{generateMipmaps:true,minFilter:T.LinearMipMapLinearFilter});
      this.cubeCam = new T.CubeCamera(1.1,100000,target_cube);

      this.mat = new T.MeshStandardMaterial({
          envMap: this.cubeCam.renderTarget.texture,
          color: "white",
          roughness:0.1,
          metalness:1
      });
      mirror_group.position.set(x,y,z);

      let mesh = new T.Mesh(geometry,this.mat);
      mirror_group.add(this.cubeCam);
      mirror_group.add(mesh);
      mirror_group.scale.set(0.5,0.5,0.5);
      mirror_group.translateY(3);
      mirror_group.rotateY(Math.PI/2);
      this.time = 0;
      this.m = mirror_group;
      
  }
  stepWorld(delta, timeOfDay) {
    this.cubeCam.update(this.world.renderer,this.world.scene);
    this.time += delta / 1000; // time in seconds
    // set the y position based on the time
    let t = this.time % 1; // where are we in the cycle?

    if (t < 0.1 || t > 0.9) this.m.position.y = 1;
    else {
      this.m.position.y = 1 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
    }
  }
}