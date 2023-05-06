/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";

import {Shed} from "./shed.js";
import { Mountain } from "./mountain.js";
import { Lake } from "./lake.js";
import { CircularTrack} from "../examples/track.js";
import { Boat } from "./boat.js";
import { Fisherman } from "./fisherman.js";
import { Tree } from "./tree.js";
import { Hut } from "./hut.js";
import { Drone } from "./drone.js";
import { Birds } from "./birds.js";
import { Snowland } from "./snowland.js";
import { Snowman } from "./snowman.js";
import { Light } from "./light.js";
import { Tent } from "./tent.js";
//import { Fisherman2 } from "./old_fisherman.js";
import { Child } from "./child.js";
import { Child2 } from "./child2.js";
import { GrCarousel } from "./carousel.js";

import {main} from "../examples/main.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20, // make the ground plane big enough for a world of stuff
});

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
//main(world);

//making a skybox
world.scene.background= new T.CubeTextureLoader().setPath("../textures/").load([
    'right.png',
    'left.png',
    'top.png',
    'bottom.png',
    'front.png',
    'back.png'
])

world.add(new Shed({x:-14, z:-10,a:Math.PI/2}));
world.add(new Mountain({x:16,z:-16}));
world.add(new Snowland({x:16,z:-8}));
world.add(new Snowland({x:8,z:-16}));
world.add(new Snowland({x:12,z:-12,a:Math.PI/4}));
world.add(new Snowland({x:16,z:-0.5}));
world.add(new Lake());
let track = new CircularTrack();
world.add(new Boat(track));
world.add(new Fisherman({x:0,y:0,z:-10}));
world.add(new Fisherman({x:-10,y:0,z:0,a:Math.PI/2}));
for (let i = -10; i < 10; i +=5) {
  world.add(new Tree({ x: -18, z: i }));
  world.add(new Tree({ x: -15, z: -i }));
}
world.add(new Hut({x:-14, z:14,a:Math.PI/2}));
world.add(new Hut({x:-14, z:-16,a:Math.PI/2}));
world.add(new Drone());
world.add(new Birds(track));
world.add(new Snowman({x:16}));
for (let i = -5; i < 5; i +=2) {
    world.add(new Light({ x: i, z: -18 }));
    world.add(new Light({ x: i, z: 18 }));
}
world.add(new Tent({x:15,z:15,a:-Math.PI/4}));
world.add(new Child({x:12,z:12,a:Math.PI/2}));
world.add(new Child2({x:14,a:Math.PI}));
world.add(new GrCarousel({z:15,size:0.6}));



// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
// highlight("SimpleHouse-5");
// highlight("Helicopter-0");
// highlight("Track Car");
// highlight("MorphTest");

///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
