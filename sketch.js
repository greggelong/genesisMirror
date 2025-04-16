let myvideo;
let vScale = 10; // this will get set dynamically
let cols = 45; // number of columns you want
let gw, ws;
let convolverNode;

function preload() {
  gw = loadImage("gw.png");
  ws = loadImage("workerSqr.png");
}

function setup() {
  cnv = createCanvas(800, 800);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  pixelDensity(1);

  vScale = floor(width / cols);
  let rows = floor(height / vScale);

  myvideo = createCapture(VIDEO);
  myvideo.size(cols, rows);
  myvideo.hide();
  noStroke();

  //gw.resize(vScale, 0);
  ws.resize(cnv.width, 0);

  frameRate(5);
}

function draw() {
  background(255);
  image(gw, 0, 0, width, height);
  myvideo.loadPixels();

  for (let y = 0; y < myvideo.height; y++) {
    for (let x = 0; x < myvideo.width; x++) {
      // mirror index
      let index = (myvideo.width - x - 1 + y * myvideo.width) * 4;
      let r = myvideo.pixels[index + 0];
      let g = myvideo.pixels[index + 1];
      let b = myvideo.pixels[index + 2];
      let bright = floor((r + g + b) / 3);

      if (bright < 128) {
        //fill(255, 255, 0, 0); // fill with transparent
        //rect(x * vScale, y * vScale, vScale, vScale);
      } else {
        noFill();
        let workerimg = ws.get(x * vScale, y * vScale, vScale, vScale);
        image(workerimg, x * vScale, y * vScale);
      }
    }
  }
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("brightnessMirror", "jpg");
  }
}
