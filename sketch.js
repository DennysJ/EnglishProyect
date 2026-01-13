let dust = [];
let spells = [];
let mouseTrail = [];
let pulse = 0;

let isCover = true; // ⭐ SOLO TRUE EN LA PORTADA

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  for (let i = 0; i < 650; i++) {
    dust.push(createStar(random(width), random(height)));
  }
}

// ⭐ Crear estrella
function createStar(x, y) {
  return {
    x,
    y,
    size: random(1.8, 5.5),
    speed: random(0.03, 0.15),
    alpha: random(190, 255),
    drift: random(-0.08, 0.08),
    glow: random(0.01, 0.035),
    power: random() < 0.25
  };
}

function draw() {
  // 🌙 Fondo pergamino dorado
  pulse += 0.01;
  let bg = 178 + sin(pulse) * 6;
  background(bg, 145, 100);

  drawSpells();
  drawStars();

  if (isCover) {
    drawMouseTrail(); // ✨ SOLO EN PORTADA
  }
}

// ✨ Ondas mágicas
function drawSpells() {
  for (let i = spells.length - 1; i >= 0; i--) {
    let s = spells[i];
    s.radius += s.speed;
    s.alpha -= 4;

    noFill();
    stroke(255, 235, 190, s.alpha);
    strokeWeight(1);
    circle(s.x, s.y, s.radius);

    if (s.alpha <= 0) spells.splice(i, 1);
  }
  noStroke();
}

// ⭐ Estrellas del fondo
function drawStars() {
  for (let p of dust) {
    let fx = 0;
    let fy = 0;

    // Influencia suave del mouse
    let dMouse = dist(mouseX, mouseY, p.x, p.y);
    if (dMouse < 220) {
      let a = atan2(p.y - mouseY, p.x - mouseX);
      let f = (220 - dMouse) * 0.0008;
      fx += cos(a) * f * 12;
      fy += sin(a) * f * 12;
    }

    // Hechizos
    for (let s of spells) {
      let d = dist(s.x, s.y, p.x, p.y);
      if (d < s.radius + 60) {
        let a = atan2(p.y - s.y, p.x - s.x);
        let f = (s.radius - d) * 0.002;
        fx += cos(a) * f * 18;
        fy += sin(a) * f * 18;
        p.alpha = 255;
      }
    }

    p.x += fx;
    p.y += fy;

    let twinkle = sin(frameCount * p.glow) * (p.power ? 7 : 4);
    let a = constrain(p.alpha + twinkle, 180, 255);

    // Halo
    fill(255, 245, 215, a * 0.45);
    circle(p.x, p.y, p.size * (p.power ? 2.4 : 1.8));

    // Núcleo
    fill(255, 225, 170, a);
    circle(p.x, p.y, p.size);

    // Movimiento
    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < 0) {
      p.y = height;
      p.x = random(width);
    }
  }
}

// 🌟 RASTRO VISIBLE PERO ELEGANTE (SOLO PORTADA)
function drawMouseTrail() {
  if (frameCount % 1 === 0) {
    mouseTrail.push({
      x: mouseX + random(-3, 3),
      y: mouseY + random(-3, 3),
      size: random(2.2, 3.2),
      alpha: 140
    });
  }

  for (let i = mouseTrail.length - 1; i >= 0; i--) {
    let t = mouseTrail[i];
    t.alpha -= 5;

    fill(255, 235, 190, t.alpha);
    circle(t.x, t.y, t.size);

    if (t.alpha <= 0) mouseTrail.splice(i, 1);
  }
}

// ✨ CLICK = HECHIZO + BRILLOS (SOLO PORTADA)
function mousePressed() {
  if (!isCover) return;

  spells.push({
    x: mouseX,
    y: mouseY,
    radius: 18,
    speed: 6,
    alpha: 170
  });

  spawnSparkles(mouseX, mouseY);
}

// 🌟 Explosión de brillitos
function spawnSparkles(x, y) {
  let count = random(25, 40);

  for (let i = 0; i < count; i++) {
    let angle = random(TWO_PI);
    let dista = random(10, 65);

    let star = createStar(
      x + cos(angle) * dista,
      y + sin(angle) * dista
    );

    star.alpha = 255;
    star.size *= random(1.2, 1.6);
    dust.push(star);
  }

  if (dust.length > 1300) {
    dust.splice(0, dust.length - 1300);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
