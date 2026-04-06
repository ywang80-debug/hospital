let bg
let bot
let h1
let h2
let h3
let love
let lovee

let w = 1280
let h = 720

let b1 = { x: 350, y: 170, r: 30 };
let b2 = { x: 540, y: 170, r: 30 };
let b3 = { x: 820, y: 175, r: 30 };
let p1 = { x: 620, y: 360, w: 1200, h: 700 };
let p2 = { x: 630, y: 360, w: 1200, h: 700 };
let p3 = { x: 645, y: 355, w: 1200, h: 700 };
let botp = { x: 0, y: 100, w: 1280, h: 580 };
let lp = { x: 640, y: 300, w: 1280, h: 650 };
let lpp = { x: 640, y: 400, w: 1280, h: 600 }

let dot = 250
let safe = 120
let s1 = 1
let s2 = 4

let box = {
  w: 200,
  h: 30,
  x: 0,
  y: 80
}

let lay




function preload() {
  bg = loadImage("hospital.jpg")
  bot = loadImage("hospitalBottom.png")
  h1 = loadImage("head1.png")
  h2 = loadImage("head2.png");
  h3 = loadImage("head3.png")
  love = loadImage("love.png");
  lovee = loadImage("love2.png");
}




function setup() {
  createCanvas(w, h)

  box.x = width / 2 - box.w / 2
  box.y = height * 0.82

  lay = createGraphics(width, height);
  lay.clear()

  imageMode(CORNER);
  rectMode(CORNER);
  textAlign(LEFT, CENTER);

}


function draw() {
  background(0);
  image(bg, 0, 0, width, height);

  imageMode(CORNER)
  image(bot, botp.x, botp.y, botp.w, botp.h)

  if (!dotdot()) {
    noStroke()
    fill(0);

    for (let i = 0; i < dot; i++) {
      let xx = random(width)
      let yy = random(height)

      if (dist(xx, yy, mouseX, mouseY) > safe) {
        let ss = random(s1, s2)
        circle(xx, yy, ss)
      }
    }
  }

  let st = getState()

  noStroke()

  if (st.btn1Replaced) {
    imageMode(CENTER)
    image(h1, p1.x, p1.y, p1.w, p1.h)
    imageMode(CORNER)
  } else {
    fill(255)
    circle(b1.x, b1.y, b1.r * 2)
  }

  if (st.btn2Replaced) {
    imageMode(CENTER);
    image(h2, p2.x, p2.y, p2.w, p2.h);
    imageMode(CORNER)
  } else {
    fill(255)
    circle(b2.x, b2.y, b2.r * 2)
  }

  if (st.btn3Replaced) {
    imageMode(CENTER);
    image(h3, p3.x, p3.y, p3.w, p3.h);
    imageMode(CORNER);
  } else {
    fill(255)
    circle(b3.x, b3.y, b3.r * 2);
  }

  push()
  noStroke()
  fill(0, 150);
  rect(box.x, box.y, box.w, box.h, 10);

  stroke(255, 180)
  noFill()
  rect(box.x, box.y, box.w, box.h, 10)

  noStroke()
  fill(255)
  textSize(24);

  let t = st.typedText
  if (frameCount % 40 < 20) {
    t += "|"
  }

  text(t, box.x + 18, box.y + box.h / 2)
  pop()

  if (dotdot()) {
    lay.noStroke()
    lay.fill(255)

    for (let i = 0; i < dot; i++) {
      let xx = random(width);
      let yy = random(height);

      if (dist(xx, yy, mouseX, mouseY) > safe) {
        let ss = random(s1, s2)
        lay.circle(xx, yy, ss)
      }
    }

    image(lay, 0, 0)
  }

  if (love1()) {
    imageMode(CENTER);
    image(love, lp.x, lp.y, lp.w, lp.h);
    imageMode(CORNER);
  }

  if (love2()) {
    imageMode(CENTER);
    image(lovee, lpp.x, lpp.y, lpp.w, lpp.h);
    imageMode(CORNER);
  }

  push()
  fill(0)
  textAlign(CENTER, CENTER)
  textSize(20)
  text("Try to remember who they are.", width / 2, height - 30)
  pop()
}

function mousePressed() {
  let st = getState()

  if (!st.btn1Used && dist(mouseX, mouseY, b1.x, b1.y) < b1.r) {
    st.btn1Used = true
    saveState(st)
    allall()
    window.location.href = "memory1.html"
    return
  }

  if (!st.btn2Used && dist(mouseX, mouseY, b2.x, b2.y) < b2.r) {
    st.btn2Used = true
    saveState(st)
    allall()
    window.location.href = "memory2.html"
    return
  }

  if (!st.btn3Used && dist(mouseX, mouseY, b3.x, b3.y) < b3.r) {
    st.btn3Used = true
    saveState(st)
    allall()
    window.location.href = "memory3.html"
    return
  }
}

function keyPressed() {
  let st = getState()

  if (keyCode === ENTER) {
    let name = st.typedText.trim().toLowerCase()

    if (name === "leonard") {
      st.btn1Replaced = true
    } else if (name === "rebecca") {
      st.btn2Replaced = true
    } else if (name === "ingrid") {
      st.btn3Replaced = true
    }

    st.typedText = ""
    saveState(st)
  } 
  else if (keyCode === BACKSPACE) {
    st.typedText = st.typedText.substring(0, st.typedText.length - 1)
    saveState(st)
  } 
  else if (key.length === 1) {
    st.typedText += key
    saveState(st)
  }
}

function allall() {
  let st = getState()

  if (st.btn1Used && st.btn2Used && st.btn3Used && !st.endingStarted) {
    st.endingStarted = true
    st.endingStartTime = Date.now()
    saveState(st)
  }
}

function dotdot() {
  let st = getState()

  if (!st.endingStarted) {
    return false
  }

  return Date.now() - st.endingStartTime >= 10000
}

function love1() {
  let st = getState()

  if (!st.endingStarted) {
    return false
  }

  return Date.now() - st.endingStartTime >= 15000
}

function love2() {
  let st = getState()

  if (!st.endingStarted) {
    return false
  }

  let ok =
    st.btn1Replaced &&
    st.btn2Replaced &&
    st.btn3Replaced

  return ok && Date.now() - st.endingStartTime >= 20000
}
