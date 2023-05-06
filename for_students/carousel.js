import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let carouselObCtr = 0;
// A Carousel.
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
  /**
   * @param {CarouselProperties} params
   */
  constructor(params = {}) {
    let width = 3;
    let carousel = new T.Group();
    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    carousel.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    let platform_geom = new T.CylinderGeometry(
      0.95 * width,
      0.95 * width,
      0.2,
      32
    );
    let platform_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.3,
      roughness: 0.8
    });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
    let cpole_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.8,
      roughness: 0.5
    });
    let cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    let top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3);

    let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
    let opole_mat = new T.MeshStandardMaterial({
      color: "#aaaaaa",
      metalness: 0.8,
      roughness: 0.5
    });
    let opole;
    let num_poles = 10;
    let poles = [];

    let horse_material = new T.MeshStandardMaterial({color:"red", roughness:1});
    
    class CustomSinCurve extends T.Curve {
      constructor( scale = 1 ) { 
        super();
        this.scale = scale;
      }
      getPoint( t, optionalTarget = new T.Vector3() ) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin( 2 * Math.PI * t );
        const tz = 0;
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
      }
    }
    
    const path = new CustomSinCurve( 10 );
    
    let horse = [];
    for (let i = 0; i < num_poles; i++) {
      opole = new T.Mesh(opole_geom, opole_mat);
      platform_group.add(opole);
      
      opole.translateY(1.5);
      opole.rotateY((2 * i * Math.PI) / num_poles);
      opole.translateX(0.8 * width);
      poles.push(opole);

      horse[i] = new T.Mesh(new T.TubeGeometry(path, 20, 2, 8, false),horse_material);
      horse[i].scale.set(0.08,0.08,0.08);

      platform_group.add(horse[i]);
      horse[i].translateY(1.5);
      horse[i].rotateY((2 * i * Math.PI) / num_poles);
      horse[i].translateX(0.8 * width);
      poles.push(horse[i]);

    }

    let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    let roof = new T.Mesh(roof_geom, base_mat);
    carousel.add(roof);
    roof.translateY(4.8);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Carousel-${carouselObCtr++}`, carousel);
    this.whole_ob = carousel;
    this.platform = platform_group;
    this.poles = poles;
    this.horses = horse;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    carousel.scale.set(scale, scale, scale);

    this.time = 0;
  }

  stepWorld(delta) {
    let f = 1;
    this.platform.rotateY(0.003 * delta);

    this.time += delta / 1000; // time in seconds
    // set the y position based on the time

    let t = this.time;
    let len = this.horses.length;

    for (let i = 0; i < len; i++)
      this.horses[i].position.y = Math.sin(t + (len*i)/(Math.PI))/2 + 1.5;
 }
}