// ===============================
// FADE-IN ON SCROLL
// ===============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});


// ===============================
// NAVBAR DINÁMICO (SCROLL)
// ===============================
const navbar = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===============================
// MENÚ MOBILE (HAMBURGUESA)
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navLinksEl = document.getElementById("navLinks");

function closeMobileMenu() {
  menuToggle.classList.remove("open");
  navLinksEl.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

function toggleMobileMenu() {
  const isOpen = navLinksEl.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
}

if (menuToggle && navLinksEl) {
  menuToggle.addEventListener("click", toggleMobileMenu);

  // cerrar el menú al elegir un link
  navLinksEl.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // si la pantalla vuelve a desktop, aseguramos que quede cerrado
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}


// ===============================
// SMOOTH SCROLL MEJORADO
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// ===============================
// ACTIVE LINK (SECCIÓN ACTUAL)
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// ===============================
// EFECTO HOVER DINÁMICO EN CARDS
// ===============================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});


// ===============================
// ANIMACIÓN HERO (ENTRADA)
// ===============================
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero");
  hero.classList.add("visible");

  // renderizar íconos de Lucide (mail, github, linkedin en contacto)
  if (window.lucide) {
    lucide.createIcons();
  }
});