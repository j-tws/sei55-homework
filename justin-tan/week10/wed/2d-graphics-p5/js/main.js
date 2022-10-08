// console.log('loaded', dat, p5);

const circles = [] // for storing all the drawn circles, so we can redraw and move them around

const controls = {
  velocityScale: 1.0
}

function setup(){

  // Create a control panel
  const gui = new dat.GUI();
  gui.add( controls, 'velocityScale', -2.0, 2.0)

  // Draw a circle
  // circle()

  // R, G, B  or  H, S, V depending on mode
  // grayscale
  createCanvas( windowWidth, windowHeight )
  background( 0 );

  // fill( 255, 0, 0 );

  // // strokeWeight( 10 )
  // // stroke( 0, 0, 255 ) 
  // noStroke()

  // //       x    y   w   h
  // ellipse( 200, 300, 100, 100 );

  // // square()
  // fill( 0, 0, 255 );
  // rect(200, 300, 150, 150)

  // fill( 0, 255, 0);
  // triangle(
  //   270, 100, // x, y position of first point
  //   150, 300,
  //   400, 300
  // )

  // stroke( 255, 0, 0);
  // strokeWeight(5)
  // line(100, 300, 600, 200)

  // strokeWeight(1)
  // point(500, 100)

  // Switch from RGB to HSB "color space"
  colorMode(HSB, 255)

}

// Paintr mode
function draw(){
  
  if( keyIsDown(SHIFT) ){
    
    noStroke()

    // const mouseXNormalized = mouseX / windowWidth; // 700 / 1400 == 0.5

    // const hue = mouseXNormalized * 255; // 0.5 * 255 == 127 

    // const hue = map(
    //   mouseY, // input value
    //   0, windowWidth, // input range
    //   0, 255 // output range
    // )

    const hue = frameCount % 256; // 256 % 255 == 1, 257 % 256 == 2
    const size = 50;

    const mouseXVel = mouseX - pwinMouseX
    const mouseYVel = mouseY - pwinMouseY

    const newCircle = {
      xPos: mouseX,
      yPos: mouseY,
      hue: hue,
      size: size,
      xVel: mouseXVel, //random(-20, 20),
      yVel: mouseYVel, //random(-20, 20)
      // velocity?
    }

    circles.push( newCircle )

    // fill( 
    //   // random(256),
    //   hue, 
    //   255, 
    //   255
    // )
    // ellipse(mouseX, mouseY, 100, 100)

  } // if key is down

  updateCircles()

} // draw

function updateCircles(){

  // TODO: press spacebar to clear screen, i.e. empty the circles array
  // Define a 'keyPressed(ev)' function

  // TODO: add a checkbox to the dat.gui controls so hat you can conditionally
  // endable or disable the background clearing-trails

  background(0); // clear screen

  // loop over each of the saved circles and redraw them
  for( const circle of circles){

    circle.xPos += circle.xVel * controls.velocityScale // scale up or down
    circle.yPos += circle.yVel * controls.velocityScale

    // bounce off edges!
    // if( circle.xPos > windowWidth || circle.xPos < 0){
    //   circle.xVel *= -1
    // }
    // if( circle.yPos > windowWidth || circle.yPos < 0){
    //   circle.yVel *= -1
    // }

    // wrap/warp across edges
    if( circle.xPos > windowWidth ){
      circle.xPos = 0;
    } else if( circle.xPos < 0){
      circle.xPos = windowWidth;
    }
    if( circle.yPos > windowHeight ){
      circle.yPos = 0;
    } else if( circle.yPos < 0){
      circle.yPos = windowHeight;
    }

    // TODO:
    // 1. Draw a line from the current circle to every other circle?
    // 1a. Draw a line ONLY to other circles that are "close enough", ie within a certain distance
    // Look up Pythagoras' Distance Formula
    // - what is "time complexity" of each frame draw once we are drawing these lines? (in Big-O notation)

    fill( circle.hue, 255, 255)
    ellipse( circle.xPos, circle.yPos, circle.size, circle.size );

  }

} // updateCircles()


// Screensaver mode
// function draw(){

//   // console.log('drawing!');

//   fill( 
//     random(256), // hue
//     255, // saturation
//     255, // brightness
//     127
//   )

//   const size = random(200)
//   noStroke()
//   ellipse( 
//     random(windowWidth),  // x
//     random(windowHeight),  // y

//     size,
//     size
  
//     )

// } // draw()
