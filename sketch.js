// create a variable for A-Frame world
var world;

// references to our markers (which are defined in the HTML document)
var hiroMarker, zbMarker;
var width = 800;

// how long has each marker been visible?
var hiroVisCount = 0;
var zbVisCount = 0;

// global flag to keep track of whether we should track new markers
// (we can pause this when the user wants to interact with the content)
var tracking = true;

// global to switch between track and tree of live
//var treeOfLife = true;
var canvasLength = 500;

// graphics we may need during 2D mode
var b1, b2, currentBird;

// a new drawing canvas (to overlay on top of the regular canvas)
var overlayCanvas;

//holder for all bird objects
var birds = [];
var firstbird, secondbird;

class Bird {
    constructor(name, description, xPos, yPos, sizex, sizey, status, image1, image2, image3) {
        this.name = name;
        this.description = description;

        this.x = xPos;
        this.y = yPos;

        this.sizex = sizex;
        this.sizey = sizey;

        this.status = status;

        this.images = [image1, image2, image3];
        this.imageIndex = 0;
    }

    getCurrentImage() {
        return this.images[this.imageIndex];
    }

    nextImage() {
        if (this.imageIndex >= 2) {
            this.imageIndex = -1;
        }
        this.imageIndex++;
    }

    prevImage() {
        if (this.imageIndex <= 0) {
            this.imageIndex = 3;
        }
        this.imageIndex--;
    }
}

function preload() {
    b1 = loadImage('bird1.png');
    b2 = loadImage('bird2.png');

    tree = loadImage("tree.jpg");
    bird1 = loadImage("bird1.png");
    bird2 = loadImage("bird2.png");
    bird3 = loadImage("bird3.png");
    bird4 = loadImage("bird4.png");
}

function setup() {
    world = new World("ARScene");

    setupBirds();
    setARMarkers();

    // create our overlay canvas (double the size as the regular canvas, which is 800x600)
    // this is because the canvas has to be scaled up to accomodate the AR video stream
    overlayCanvas = createGraphics(1600, 1200);
}

function setupBirds() {
    firstbird = new Bird('b1', 'description', 600, 250, 100, 100, 'hidden', b1, bird3, bird4);
    secondbird = new Bird('b2', 'description', 500, 260, 100, 100, 'hidden', b2, bird3, bird4);

    birds.push(firstbird);
    birds.push(secondbird);
}

function setARMarkers() {
    // grab a reference to our marker in the HTML document
    hiroMarker = world.getMarker("hiro");
    zbMarker = world.getMarker("zb");

    // put a painting on top of each marker
    var bird1 = new Plane({
        x: 0,
        y: 0,
        z: 0,
        width: 3,
        height: 2,
        rotationX: -90,
        asset: 'birds1'
    });

    var bird2 = new Plane({
        x: 0,
        y: 0,
        z: 0,
        width: 2,
        height: 1,
        rotationX: -90,
        asset: 'birds2'
    });

    hiroMarker.addChild(bird1);
    zbMarker.addChild(bird2);
}

function draw() {
    if (!tracking) {
        // erase the background of the world (hiding the video feed)
        world.clearDrawingCanvas();
        background(0, 200);

        // draw our painting
        drawImageCarousel(currentBird);
        displayBirds(birds);
        addCloseButton();

        // draw the overlay canvas
        imageMode(CORNER);
        image(overlayCanvas, 0, 0, overlayCanvas.width / 2, overlayCanvas.height / 2);
    }
}

function mousePressed() {
    if (tracking) {
        // see which marker is currently visible
        if (hiroMarker.isVisible()) {
            tracking = false;
            firstbird.status = 'visible';
            currentBird = firstbird;
        } else if (zbMarker.isVisible()) {
            tracking = false;
            secondbird.status = 'visible';
            currentBird = secondbird;
        }
    }
}

//function for displaying birds that have been scanned
function displayBirds(birds) {
    for (let i = 0; i < birds.length; i++) {
        var bird = birds[i];

        if (bird.status === 'visible') {
            image(bird.images[0], bird.x, bird.y, bird.sizex, bird.sizey);

            if (dist(mouseX, mouseY, bird.x, bird.y) <= 70) {
                console.log('triggered');
                textSize(28);
                fill(0, 255, 0);
                text(bird.name, bird.x, bird.y);
            }
        }
    }
}

function keyPressed() {
    if (tracking) {
        if (keyCode === LEFT_ARROW) {
            currentBird.prevImage();
            console.log(currentBird.imageIndex);
        } else if (keyCode === RIGHT_ARROW) {
            currentBird.nextImage();
            console.log(currentBird.imageIndex);
        }
    }
}

function drawImageCarousel(currentBird) {
    var bird = currentBird.getCurrentImage();

    imageMode(CENTER);
    image(bird, width / 2 - 200, height / 2, 300, 200);

    text('bird name', 250, 400);
    text('description', 250, 450);
    text('[press <- or -> to view more images]', 250, 500);

    rectMode(CENTER);
    image(tree, width / 2 + 200, height / 2, 350, 350);
}

function addCloseButton() {
    // draw a 'close' button
    fill(255);
    textSize(25);
    textAlign(CENTER);
    text("[ close ]", width / 2 - 50, 200);

    if (mouseIsPressed) {
        // how far are they from the close button?  If so, close the window
        if (dist(mouseX, mouseY, width / 2 - 50, 200) < 50) {
            tracking = true;
            overlayCanvas.clear();
            world.clearDrawingCanvas();
        }
    }
}
