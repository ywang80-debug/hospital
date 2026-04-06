let m1
let m2
let m3
let back
let w = 1280
let h = 720
let dot = 2500
let safe = 120
let s1 = 1
let s2 = 3
let r = 90
let bb = {
  w: 800,
  h: 500,
  x: 0,
  y: 0
}




let bg

function preload() {
  m1 = loadImage("memory1.jpg");
  m2 = loadImage("memory2.jpg");
  m3 = loadImage("memory3.jpg");
  back = loadImage("back.png");
}

function setup() {
  createCanvas(w, h);
  bb.x = width / 2 - bb.w / 2
  bb.y = height - 500
  if (MEMORY_INDEX === 1) bg = m1
  if (MEMORY_INDEX === 2) bg = m2
  if (MEMORY_INDEX === 3) bg = m3

  background(0)
  image(bg, 0, 0, width, height);
  imageMode(CORNER)
  rectMode(CORNER);
}

function draw() {
  noStroke()
  fill(255)

  for (let i = 0; i < dot; i++) {
    let x = random(width)
    let y = random(height)

    if (dist(x, y, mouseX, mouseY) > safe) {
      let s = random(s1, s2)
      circle(x, y, s)
    }
  }
  let dx = mouseX - r
  let dy = mouseY - r
  let dw = r * 2
  let dh = r * 2

  dx = constrain(dx, 0, width - dw)
  dy = constrain(dy, 0, height - dh)
  let sx = dx * (bg.width / width);
  let sy = dy * (bg.height / height);
  let sw = dw * (bg.width / width);
  let sh = dh * (bg.height / height)

  dx = floor(dx)
  dy = floor(dy)
  dw = floor(dw)
  dh = floor(dh)
  sx = floor(sx)
  sy = floor(sy)
  sw = floor(sw)
  sh = floor(sh)

  
  copy(bg, sx, sy, sw, sh, dx, dy, dw, dh)
  imageMode(CORNER)
  image(back, bb.x, bb.y, bb.w, bb.h)
}
function mousePressed() {

  if (
    mouseX > bb.x &&
    mouseX < bb.x + bb.w &&
    mouseY > bb.y &&
    mouseY < bb.y + bb.h
  ) {
    window.location.href = "hospital.html"
  }
}
