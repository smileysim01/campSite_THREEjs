import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

export class Lake extends GrObject {
    constructor() {
        // let shaderMat = new T.TextureLoader().load("../textures/lake.jpeg");
        
        let res= new T.Vector2(800,800);
        let shaderMat = shaderMaterial("./shaders/lake.vs", "./shaders/lake.fs", {
            side: T.DoubleSide,
            uniforms: {
            time: {value:0.0},
            resolution:{value: res}
            },
        });
        const lake_geometry = new T.CircleGeometry( 8, 32 ); 
        let mat = shaderMat;
        // const mat = new T.MeshStandardMaterial( { color: "white", map: lake_tl, bumpMap: lake_tl,side: T.DoubleSide} ); 
        const lake = new T.Mesh( lake_geometry, mat );
        lake.rotateX(Math.PI/2);
        lake.position.set(0,0.1,0);
        super("Lake",lake);
        this.l = lake;
        this.aniTime = 0;
        this.mat = shaderMat
    }
    stepWorld(delta){
        this.aniTime += delta;
        let newR = Math.sin(this.aniTime / 200) / 2 + 0.5; // get a number between 0-1
        this.mat.uniforms.resolution.value.x = newR;
        this.mat.uniforms.time.value = this.aniTime * 0.001; // pass in the time in seconds
    }
}