let myvideo;
let vScale;
let cols = 45;
let rows;
let gw, ws;
let workerTiles = [];
let cnv;

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
  rows = floor(height / vScale);

  myvideo = createCapture(VIDEO);
  myvideo.size(cols, rows);
  myvideo.hide();
  noStroke();

  ws.resize(width, 0);
  makeWorkerTiles();

  frameRate(5);
}

function makeWorkerTiles() {
  workerTiles = [];
  for (let y = 0; y < height; y += vScale) {
    let row = [];
    for (let x = 0; x < width; x += vScale) {
      let tile = ws.get(x, y, vScale, vScale);
      row.push(tile);
    }
    workerTiles.push(row);
  }
}

function draw() {
  background(255);
  image(gw, 0, 0, width, height);
  myvideo.loadPixels();

  for (let y = 0; y < myvideo.height; y++) {
    for (let x = 0; x < myvideo.width; x++) {
      let index = (myvideo.width - x - 1 + y * myvideo.width) * 4;
      let r = myvideo.pixels[index + 0];
      let g = myvideo.pixels[index + 1];
      let b = myvideo.pixels[index + 2];
      let bright = floor((r + g + b) / 3);

      if (bright <= 128 && workerTiles[y] && workerTiles[y][x]) {
        image(workerTiles[y][x], x * vScale, y * vScale);
      }
    }
  }
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("brightnessMirror", "jpg");
  }
}
