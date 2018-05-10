// create a variable for A-Frame world
var world;

// references to our markers (which are defined in the HTML document)
var zbMarker;

// how long has each marker been visible?
var hiroVisCount = 0;
var zbVisCount = 0;

// global flag to keep track of whether we should track new markers
// (we can pause this when the user wants to interact with the content)
var tracking = true;

// global to switch between track and tree of live
//var treeOfLife = true;
var canvasLength = 500;

// a new drawing canvas (to overlay on top of the regular canvas) a user interface
var overlayCanvas;

//keep track of score and timer 
var timer = 0;
var score = 0;

//holder for all bird objects
var moles = [];

class Mole {
  constructor(x, y, z, shape){
    this.x = x;
    this.y = y; 
    this.z = z;
    this.state = 'down';
    this.sphere = shape;
  }
}


function flipUp(mole){
	this.state = 'up';
	this.sphere.red = 0;
	this.sphere.green = 255;
}
function flipDown(mole){
	this.state = 'down';
	this.sphere.red = 255;
	this.sphere.green = 0;
}


//load all assets here so it can be used later 
function preload() {
  //mole = loadImage('mole.png');

}

//set up all images/ where everything goes before the program runs. Basically what frame 1 looks like
function setup() {
  //loads AR 
  world = new World("ARScene");

  // grab a reference to our marker in the HTML document
  zbMarker = world.getMarker("zb");

  var plane = new Plane({
    x:0, y:0, z:0,
    width: 2, height: 1,
    rotationX: -90
  });
  zbMarker.addChild( plane );

  var sphere1 = new Sphere({
    x: 1,
    y: 1,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere1);
  var mole1 = new Mole(1, 1, 0.5, sphere1);
  
  var sphere2 = new Sphere({
    x: 0,
    y: 1,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere2);
  var mole2 = new Mole(0, 1, 0.5, sphere2);

var sphere3 = new Sphere({
    x: -1,
    y: 1,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere3);
  var mole3 = new Mole(-1, 1, 0.5, sphere3);  

  var sphere4 = new Sphere({
    x: 1,
    y: 0,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere4);
  var mole4 = new Mole(1, 0, 0.5, sphere4);
  
  var sphere5 = new Sphere({
    x: 0,
    y: 0,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere2);
  var mole5 = new Mole(0, 0, 0.5, sphere5);

var sphere6 = new Sphere({
    x: -1,
    y: 0,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere6);
  var mole6 = new Mole(-1, 0, 0.5, sphere6);


  var sphere7 = new Sphere({
    x: 1,
    y: -1,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere7);
  var mole7 = new Mole(1, -1, 0.5, sphere7);
  
  var sphere8 = new Sphere({
    x: 0,
    y: -1,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere8);
  var mole8 = new Mole(0, -1, 0.5, sphere8);

var sphere9 = new Sphere({
    x: -1,
    y: -1,
    z: 0.5,
    radius: 0.1,
    red: 255,
    green: 0,
    blue: 0
  });
  zbMarker.addChild(sphere9);
  var mole9 = new Mole(-1, -1, 0.5, sphere9);  

  moles.push(mole1);
  moles.push(mole2);
  moles.push(mole3);
  moles.push(mole4);
  moles.push(mole5);
  moles.push(mole6);
  moles.push(mole7);
  moles.push(mole8);
  moles.push(mole9);


  // create our overlay canvas (double the size as the regular canvas, which is 800x600)
  // this is because the canvas has to be scaled up to accomodate the AR video stream
  overlayCanvas = createGraphics(1600, 1200);
}

//runs multiple times per second. DO NOT USE WHILE LOOPS. It will break the whole program. Use if statements. 
function draw() {

  // if we are in tracking mode we really don't need to do anything here
  if (tracking) {
  	if (zbMarker.isVisible()) {
      //put all code logic in here as the game is running
          // if the user is clicking the mouse
	    if (mouseIsPressed) {

	      //check mouse distance from each mole 
	      for(let i = 0; i < moles.length; i++){
		      if (dist(mouseX, mouseY, moles[i].x,moles[i].y) < 50) {
		        if(moles[i].state == 'down'){
		        	flipUp(moles[i]);
		        }
		        else{
		        	flipDown(moles[i]);
		        }
		      }
	      }
	    }
    }
  }

//   // we are in 2D mode (user interface) else if timer is 0 : game over screen
//   else {

//     // erase the background of the world (hiding the video feed)
//     world.clearDrawingCanvas();
//     background(0, 200);

//     // // in my AR system the canvas is ALWAYS 800 x 600, but it's scaled up/down as needed

//     // // figure out how large the painting should be (50% of the window)
//     // var desiredWidth = 400;
//     // var scalingFactor = desiredWidth/currentBird.width;

//     // draw our painting
//     //set x y coordinates by the center of the image
//     imageMode(CENTER);

//     text('something', 250, 400);
//     text('something', 250, 450);
//     rectMode(CENTER);
//     //put an image of a game over screen
//     //image(tree,width/2+200, height/2, 350, 350 );

//     // draw a 'play again button' button
//     fill(255);
//     textSize(25);
//     textAlign(CENTER);
//     text("[ play again? ]", width/2-50, 200 );
//     // draw the overlay canvas
//     imageMode(CORNER);
//     image(overlayCanvas, 0, 0, overlayCanvas.width/2, overlayCanvas.heigh
// t/2);
//   }

}

// function mousePressed() {
//   // are we currently in tracking mode?
//   if (tracking) {
//     // see which marker is currently visible
//     if (hiroMarker.isVisible()) {
//       tracking = false;
//       firstbird.status = 'visible';
//       currentBird = firstbird.image;
//     }
//     else if (zbMarker.isVisible()) {
//       tracking = false;
//       secondbird.status = 'visible';
//       currentBird = secondbird.image;
//     }
//   }
// }

/* when mouse is pressed, check distance between something and trigger an event 
function mousePressed() {
  var d = dist(mouseX, mouseY, 150, 150);
  if (d < 100) {
    //do something
  }
}
*/