import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';

// you dont have to do this style to create shapes in three.js, 
// just demoing JS classes and static methods

class ShapeFactory {

  // Define some 'class methods', i.e. methods we can call 
  // directly on the class, withoyut creating an instance first:
  //  ShapeFactory.createPlane()
  // or in Rails ActiveRecord syntax:
  //  User.all 


  // static method - call it on the whole class
  // defined as a member of an object but is accessible directly from an API object's constructor, rather than from an object instance created via the constructor.

  static createPlane() {
    // 3D objects are built from two elements:
    //  1. a geometry, a.k.a a shape
    //  2. a material, a.k.a a surface or texture/covering

    // These are combined into a final 'mesh'
    const planeGeometry = new THREE.PlaneGeometry(120, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x990022 // dark red
    });

    // combine into a mesh:
    const planeMesh = new THREE.Mesh(
      planeGeometry,
      planeMaterial
    );

    planeMesh.position.distanceTo(15, 0, 0);
    planeMesh.rotation.x = -0.5 * Math.PI; // because of maths
    // planeMesh.receiveShadow = true; // opt-in to shadow cast onto this

    return planeMesh // return so we can use this in the main JS file ! 

  }

    static createCube(xSize, ySize, zSize, xPos, yPos, zPos){

      const cubeGeometry = new THREE.BoxGeometry(xSize, ySize, zSize);
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF8F00 // orangey
      })

      cubeMaterial.color.setHSL(
        Math.random(), // random hue
        1.0,
        0.5
      )

      const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial)

      cubeMesh.rotation.x = Math.random()

      cubeMesh.position.set(xPos, yPos, zPos)
      // cubeMesh.castShadow = true // opt in to this mesh casting shadows

      return cubeMesh

    } // createCube

    static createSphere( radius, xPos, yPos, zPos){

      const sphereGeometry =  new THREE.SphereGeometry(
        radius, // size
        40, // number of triangle segments on the X axis
        40, // number of triangle segments on the y axis
      )

      const texture = new THREE.TextureLoader().load('/img/earth.jpg')

      const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF, // blue-ish water planet
        map: texture,
        side: THREE.DoubleSide // show inside of earth
        // wireframe: true
      });

      const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial)
      sphereMesh.position.set( xPos, yPos, zPos);
      // sphereMesh.castShadow = true // opt-in

      return sphereMesh

    } //createSphere


}// class 

export default ShapeFactory;









