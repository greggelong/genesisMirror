// brightness mirror
// see notebook
// smaller capture video draw to canvas not pixel but shape or character
let myvideo;
let vScale; // global video scaling variable
//let greyscale = [0,32,64,96,128,160,192,224,255,255,255,255,255]
let greyscale = [0, 32, 64, 96, 128, 160, 192, 224, 255];
let gw;
let gb;

function preload() {
  gw = loadImage("gw.png");
  gb = loadImage("gb.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // larger canvas to draw to

  if (width < height) {
    vScale = floor(width / 20); // vScale tied to window width so it can work on phone and computer
    console.log("by width");
  } else {
    vScale = floor(height / 20);
    console.log("by height");
  }
  pixelDensity(1);
  myvideo = createCapture(VIDEO);
  myvideo.size(width / vScale, height / vScale);
  myvideo.hide();
  gw.resize(vScale, 0);
  gb.resize(vScale, 0);
  // video dom element , the source, will be smaller by vScale which is 40 by 30 to improve performance
  frameRate(5);
}

function draw() {
  background(255);
  //posterize to make stark black and  white
  filter(POSTERIZE);

  // load the myvideo to pixel array
  myvideo.loadPixels(); // gets a pixes arry for video capture

  // loop through the small video capture
  for (let y = 0; y < myvideo.height; y++) {
    // for each y there are some x's
    for (let x = 0; x < myvideo.width; x++) {
      //this mirrors the index for see note book
      let index = (myvideo.width - x - 1 + y * myvideo.width) * 4;
      let r = myvideo.pixels[index + 0];
      let g = myvideo.pixels[index + 1];
      let b = myvideo.pixels[index + 2];

      let bright = floor((r + g + b) / 3); // the brightness or greyscale 0-255 is the average of the rgb
      let showimg;
      // just two values for posterize
      if (bright > 128) {
        image(gw, x * vScale, y * vScale);
      } else {
        image(gb, x * vScale, y * vScale);
      }
      //noStroke();
    }
  }

  //console.log('bing');
  //noLoop();
}

function keyPressed() {
  // this will download the first 25 seconds of the animation!
  //if (key === 'g') {
  //  saveGif('reflection.gif', 15);
  // }
  if (key === "s") {
    saveCanvas("squareB", "jpg");
  }
}
