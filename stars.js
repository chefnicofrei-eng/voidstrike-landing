const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((W * H) / 4000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    });
  }
}

function draw(ts) {
  ctx.clearRect(0, 0, W, H);

  for (const s of stars) {
    s.alpha += s.twinkleSpeed * s.twinkleDir;
    if (s.alpha > 0.85 || s.alpha < 0.1) s.twinkleDir *= -1;

    s.y += s.speed;
    if (s.y > H) { s.y = 0; s.x = Math.random() * W; }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,230,255,${s.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize();
initStars();
requestAnimationFrame(draw);
