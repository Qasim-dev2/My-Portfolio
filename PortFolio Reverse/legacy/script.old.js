/* ============================================
   SYED ALI TURAB — Elite Growth Strategist
   Advanced Animation Engine
   GSAP + Three.js + Lenis + Split Text
   ============================================ */

// ═══════════════════════════════════════════
// 1. LOADING SCREEN
// ═══════════════════════════════════════════
(function initLoader() {
  const fill = document.getElementById('loaderFill');
  const number = document.getElementById('loaderNumber');
  const loader = document.getElementById('loader');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 10 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initEverything();
      }, 400);
    }
    fill.style.width = progress + '%';
    number.textContent = Math.floor(progress) + '%';
  }, 30);

  // Lock scroll during loading
  document.body.style.overflow = 'hidden';
})();

// ═══════════════════════════════════════════
// 2. MAIN INITIALIZATION
// ═══════════════════════════════════════════
function initEverything() {
  initLenis();
  initThreeJS();
  initTextSplit();
  initGSAPAnimations();
  animateHero();
  initCounters();
  initMagneticButtons();
  initRoleToggle();
}

// ═══════════════════════════════════════════
// 3. LENIS SMOOTH SCROLL
// ═══════════════════════════════════════════
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor link scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      if (id === '#') return;
      
      // Explicitly handle back-to-top to avoid Lenis body target bugs
      if (id === '#top') {
        lenis.scrollTo(0, { duration: 1.5 });
        return;
      }

      const target = document.querySelector(id);
      if (target) lenis.scrollTo(target, { offset: -60 });
    });
  });
}

// ═══════════════════════════════════════════
// 4. THREE.JS 3D PARTICLE FIELD
// ═══════════════════════════════════════════
function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  // Skip Three.js entirely on mobile for performance
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
  if (isMobile) {
    canvas.style.display = 'none';
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // === Floating particles (balanced for visuals + performance) ===
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    velocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: (Math.random() - 0.5) * 0.003,
      z: (Math.random() - 0.5) * 0.002,
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x008080,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // === Connection lines (reduced buffer) ===
  const maxLines = 1200;
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(maxLines * 6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x008080,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // === Ambient glow sphere ===
  const glowGeo = new THREE.SphereGeometry(2, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x008080,
    transparent: true,
    opacity: 0.015,
    side: THREE.BackSide,
  });
  const glowSphere = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glowSphere);

  // === Mouse interaction ===
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // === Visibility management ===
  let isPageVisible = true;
  let isCanvasVisible = true;
  let animationId = null;

  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible && isCanvasVisible) startAnimate();
    else stopAnimate();
  });

  // IntersectionObserver to pause when canvas scrolls out of view
  const observer = new IntersectionObserver((entries) => {
    isCanvasVisible = entries[0].isIntersecting;
    if (isCanvasVisible && isPageVisible) startAnimate();
    else stopAnimate();
  }, { threshold: 0 });
  observer.observe(canvas);

  function stopAnimate() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function startAnimate() {
    if (!animationId) animate();
  }

  // === Animate ===
  function animate() {
    animationId = requestAnimationFrame(animate);

    const pos = particles.geometry.attributes.position.array;
    let lineIndex = 0;
    const linePos = lines.geometry.attributes.position.array;
    const maxLineIndex = linePositions.length;

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3]     += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Wrap particles
      if (Math.abs(pos[i * 3]) > 7) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 7) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 4) velocities[i].z *= -1;

      // Connect nearby particles
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = dx * dx + dy * dy + dz * dz;

        if (dist < 3.24 && lineIndex < maxLineIndex - 6) {
          linePos[lineIndex++] = pos[i * 3];
          linePos[lineIndex++] = pos[i * 3 + 1];
          linePos[lineIndex++] = pos[i * 3 + 2];
          linePos[lineIndex++] = pos[j * 3];
          linePos[lineIndex++] = pos[j * 3 + 1];
          linePos[lineIndex++] = pos[j * 3 + 2];
        }
      }
    }

    // Clear remaining unused line vertices
    for (let i = lineIndex; i < maxLineIndex; i++) {
      linePos[i] = 0;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    lines.geometry.attributes.position.needsUpdate = true;

    // Subtle camera motion from mouse
    camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Pulse glow
    const t = Date.now() * 0.001;
    glowSphere.scale.setScalar(1 + Math.sin(t * 0.5) * 0.15);
    glowSphere.material.opacity = 0.012 + Math.sin(t * 0.3) * 0.005;

    renderer.render(scene, camera);
  }
  startAnimate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ═══════════════════════════════════════════
// 5. TEXT SPLIT (Letter-by-letter animation)
// ═══════════════════════════════════════════
function initTextSplit() {
  document.querySelectorAll('[data-split]').forEach(el => {
    // Use a DOM-based approach to correctly handle HTML entities
    function splitNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span');
          if (text[i] === ' ') {
            span.className = 'whitespace';
            span.textContent = ' ';
          } else {
            span.className = 'char';
            span.textContent = text[i];
          }
          fragment.appendChild(span);
        }
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Process child nodes (clone the list since we're modifying it)
        Array.from(node.childNodes).forEach(child => splitNode(child));
      }
    }
    splitNode(el);
    el.classList.add('split-text');
  });
}

// ═══════════════════════════════════════════
// 6. GSAP SCROLL ANIMATIONS
// ═══════════════════════════════════════════
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // General reveal: fade-in + slide-up
  gsap.utils.toArray('.gs-reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { y: 60, opacity: 0, visibility: 'hidden' },
      {
        y: 0, opacity: 1, visibility: 'visible',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
        delay: (i % 4) * 0.1,
      }
    );
  });

  // Split text letter-by-letter scroll animation
  document.querySelectorAll('.split-text').forEach(el => {
    const chars = el.querySelectorAll('.char');
    if (chars.length === 0) return;

    // Check if it's in the hero (animate immediately on hero entrance)
    if (el.closest('.hero')) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        chars.forEach((char, i) => {
          gsap.to(char, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.03,
          });
        });
      },
      once: true,
    });
  });

  // Navbar scroll effect
  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      const navbar = document.getElementById('navbar');
      if (self.scroll() > 100) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    },
  });

  // Parallax hero glow
  gsap.to('.hero-bg-glow', {
    y: 150,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
}

// ═══════════════════════════════════════════
// 7. HERO ENTRANCE (GSAP-powered)
// ═══════════════════════════════════════════
function animateHero() {
  const tl = gsap.timeline({ delay: 0.2 });

  // Image
  tl.fromTo('.hero-image',
    { opacity: 0, scale: 0.85, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out' },
    0
  );

  // Greeting
  tl.fromTo('.hero-greeting',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    0.3
  );

  // Name — letter-by-letter
  const nameChars = document.querySelectorAll('.hero-name .char');
  nameChars.forEach((char, i) => {
    tl.to(char, {
      opacity: 1, y: 0, rotation: 0,
      duration: 0.5, ease: 'power3.out',
    }, 0.5 + i * 0.04);
  });

  // Subtitle
  tl.fromTo('.hero-subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    0.8
  );

  // Roles
  tl.fromTo('.hero-roles',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
    1
  );

  // Glow pulse
  tl.fromTo('.hero-image-glow',
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
    0.8
  );
}

// ═══════════════════════════════════════════
// 8. ANIMATED COUNTERS
// ═══════════════════════════════════════════
function initCounters() {
  document.querySelectorAll('.result-value').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: function() {
            const current = this.targets()[0].val;
            if (isDecimal) {
              el.textContent = prefix + current.toFixed(1) + suffix;
            } else {
              el.textContent = prefix + Math.floor(current) + suffix;
            }
          }
        });
      },
    });
  });
}

// ═══════════════════════════════════════════
// 9. MAGNETIC BUTTONS
// ═══════════════════════════════════════════
function initMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ═══════════════════════════════════════════
// 10. ROLE TOGGLE ANIMATION
// ═══════════════════════════════════════════
function initRoleToggle() {
  const roleEls = document.querySelectorAll('.hero-role');
  if (roleEls.length < 2) return;

  setInterval(() => {
    roleEls.forEach(el => {
      el.classList.toggle('hero-role-stroke');
      el.classList.toggle('hero-role-fill');
    });
  }, 3000);
}

// ═══════════════════════════════════════════
// 11. FLOATING ORB (cursor follower)
// ═══════════════════════════════════════════
const orb = document.getElementById('orb');
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);

if (orb) {
  if (isTouchDevice) {
    orb.remove();
  } else {
    let orbX = 0, orbY = 0, mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateOrb() {
      orbX += (mouseX - orbX) * 0.07;
      orbY += (mouseY - orbY) * 0.07;
      orb.style.left = orbX + 'px';
      orb.style.top = orbY + 'px';
      requestAnimationFrame(updateOrb);
    }
    updateOrb();

    document.querySelectorAll('a, button, .work-card, .about-card, .tech-bubble, .experience-card, .result-card, .magnetic-btn').forEach(el => {
      el.addEventListener('mouseenter', () => orb.classList.add('hovering'));
      el.addEventListener('mouseleave', () => orb.classList.remove('hovering'));
    });
  }
}

// ═══════════════════════════════════════════
// 12. MOBILE MENU
// ═══════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ═══════════════════════════════════════════
// 13. DYNAMIC YEAR
// ═══════════════════════════════════════════
const yearEl = document.querySelector('.footer-credit');
if (yearEl) yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
