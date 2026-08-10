gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particlesArray = [];
const numberOfParticles = 60;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 174, 239, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < numberOfParticles; i++) {
  particlesArray.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

gsap.from('.hero-title', {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.2
});

gsap.from('.hero-subtitle', {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.4
});

gsap.from('.hero-tagline, .hero-buttons', {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.6
});

gsap.utils.toArray('.section').forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%'
    }
  });
});

function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("show");
}

function closeMenu() {
  const menu = document.getElementById("dropdown-menu");
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
  }
}

document.addEventListener("click", (event) => {
  const menu = document.getElementById("dropdown-menu");
  const btn = document.querySelector(".hamburger-btn");
  
  if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
    menu.classList.remove("show");
  }
});
