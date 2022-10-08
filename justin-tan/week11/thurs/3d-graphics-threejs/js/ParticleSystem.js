
import * as THREE from 'three'

class ParticleSystem {

  constructor( numParticles, particleDistribution ){

    this.numParticles = numParticles
    this.particleDistribution = particleDistribution

    const particleGeometry = new THREE.BufferGeometry()

    const positions = []
    const velocities = []

    for (let i = 0; i < this.numParticles; i++) {
      
      positions.push(
        // THREE.MathUtils.randInt(-this.particleDistribution, this.particleDistribution), // xpos
        20,
        THREE.MathUtils.randInt(-this.particleDistribution, this.particleDistribution), // ypos
        THREE.MathUtils.randInt(-this.particleDistribution, this.particleDistribution) // zpos
      )

      // positions.push(0, 0, 0)

      // velocities.push(
      //   THREE.MathUtils.randFloat(-0.3, 0.3), // x speed
      //   THREE.MathUtils.randFloat(-0.3, 0.3), // y speed
      //   THREE.MathUtils.randFloat(-0.3, 0.3) // z speed
      // )

      velocities.push(0, 0, 0)

    } // for

    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute( positions, 3 )
    )

    particleGeometry.setAttribute(
      'velocity',
      new THREE.Float32BufferAttribute( velocities, 3 )
    )

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 6,
      map: new THREE.TextureLoader().load('/img/snowflake.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
      alphaTest: 0.5
    })

    this.points = new THREE.Points( particleGeometry, particleMaterial );
    // instead of returning this mesh (we are in the constructor so it's not
    // up to us what it returns - it always reutrns an instance of ParticleSystem)
    // we save the points mesh as an instance variable

  } // constructor()

  animate( velocityScale ){

    const positions = this.points.geometry.attributes.position.array
    const velocities = this.points.geometry.attributes.velocity.array

    // first        second      third
    // [ 1, 2, 3,   7, 8, 9   10, 11, 12]

    for (let i = 0; i < this.numParticles; i++) {
      
      const xIndex = i * 3 + 0 // x
      const yIndex = i * 3 + 1 // y
      const zIndex = i * 3 + 2 // z

      // Ayo Newton! Gravitation
      // First we need to workout the distance of the current partciel
      // from the origin 0,0,0
      const xPos = positions[yIndex], yPos = positions[yIndex], zPos = positions[zIndex] 

      const distSquared = (xPos * xPos) + (yPos * yPos) + (zPos * zPos)

      if(distSquared > 15.0){
        const gravityForce = -0.2 * (1.0 / distSquared) // 'inverse square law'
  
        //Acceleration (i.e. gravity) is a force that changes velocity
        velocities[xIndex] += gravityForce * xPos
        velocities[yIndex] += gravityForce * yPos
        // velocities[zIndex] += gravityForce * zPos

      }


      // Every particle's Y position ('height') gets slightly smaller
      // on every animate frame
      positions[xIndex] += velocities[xIndex] * velocityScale
      positions[yIndex] += velocities[yIndex] * velocityScale
      positions[zIndex] += velocities[zIndex] * velocityScale

      // if( positions[yIndex] < -100){
      //   positions[yIndex] = 100
      // }
      
    } // for

    // Tell THREE.JS something has changed about the particle system data
    this.points.geometry.attributes.position.needsUpdate = true

  } // animate


} // class ParticleSystem

export default ParticleSystem