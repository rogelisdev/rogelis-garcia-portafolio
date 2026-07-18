// Header scroll state
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  navActions.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
    navActions.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(section => activeObserver.observe(section));

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

/* ===================== */
/* TRANSLATE — ES / EN toggle */
/* ===================== */
(function () {
  const STORAGE_KEY = "site-lang";

  const translations = {


    // NAVBAR
    "nav.home": { es: "Inicio", en: "Home" },
    "nav.about": { es: "Sobre mí", en: "About" },
    "nav.skills": { es: "Habilidades", en: "Skills" },
    "nav.projects": { es: "Proyectos", en: "Projects" },
    "nav.contact": { es: "Contacto", en: "Contact" },

    // SHARED
    "common.cv": { es: "Descargar CV", en: "Download CV" },
    "common.demo": { es: "Ver demo", en: "View demo" },
    "common.code": { es: "Código →", en: "Code →" },

    // HERO
    "hero.title": {
      es: 'Construyo soluciones backend <span class="accent">seguras, escalables y preparadas para crecer.</span>',
      en: 'I build backend solutions <span class="accent">that are secure, scalable, and built to grow.</span>',
    },

    "hero.lede": {
      es: "Ayudo a transformar ideas y procesos en productos digitales confiables mediante arquitecturas backend sólidas, automatización inteligente e integración de tecnologías modernas.",
      en: "I help turn ideas and processes into reliable digital products through solid backend architecture, smart automation, and integration of modern technologies.",
    },
    "hero.cta1": { es: "Ver casos de estudio →", en: "View case studies →" },
    "hero.stat1": { es: "Sistemas construidos", en: "Systems built" },
    "hero.stat2": { es: "Años en producción", en: "Years in production" },
    "hero.stat3": { es: "Código propio", en: "Own code" },
    "hero.stat4": { es: "En aprendizaje activo", en: "Actively learning" },

    // ABOUT
    "about.eyebrow": { es: "NODE_02 · ORIGEN", en: "NODE_02 · ORIGIN" },
    "about.title": {
      es: "Tecnología pensada para <em>resolver problemas reales.</em>",
      en: "Technology built to <em>solve real problems.</em>",
    },
    "about.p1": {
      es: "Soy desarrollador de software especializado en <strong>backend, automatización e inteligencia artificial</strong>. Me enfoco en diseñar soluciones mantenibles, eficientes y preparadas para evolucionar junto con las necesidades del negocio.",
      en: "I am a software developer specialized in <strong>backend development, automation, and artificial intelligence</strong>. I focus on designing maintainable, efficient solutions that can evolve alongside business needs."
    },

    "about.p2": {
      es: "Mi interés por la tecnología me llevó a formarme de manera intensiva en desarrollo de software a través de programas como Riwi y Generation Colombia, donde fortalecí mis conocimientos en Java, Spring Boot, bases de datos, desarrollo Full Stack y buenas prácticas de ingeniería.",
      en: "My passion for technology led me to pursue intensive software development training through programs such as Riwi and Generation Colombia, where I strengthened my skills in Java, Spring Boot, databases, Full Stack development, and software engineering best practices."
    },

    "about.p3": {
      es: "Disfruto construir APIs, diseñar arquitecturas limpias y automatizar procesos que generen impacto real. Me motiva enfrentar nuevos desafíos, aprender de forma constante y participar en proyectos donde la tecnología pueda convertirse en una herramienta para resolver problemas reales y aportar valor a las personas.",
      en: "I enjoy building APIs, designing clean architectures, and automating processes that create real impact. I am motivated by new challenges, continuous learning, and the opportunity to contribute to projects where technology becomes a tool for solving real-world problems and creating value for people."
    },

    // FORMATION
    "formation.title": { es: "Formación y credenciales", en: "Education & credentials" },
    "formation.desc1": {
      es: "Programa intensivo de formación tecnológica enfocado en desarrollo backend, bases de datos, arquitectura de software, metodologías ágiles y construcción de soluciones para entornos empresariales.",
      en: "Intensive tech training program focused on backend development, databases, software architecture, agile methodologies, and building solutions for enterprise environments.",
    },
    "formation.desc2": {
      es: "Bootcamp Full Stack Java enfocado en desarrollo de aplicaciones web, APIs REST, Spring Boot, bases de datos relacionales, frontend moderno y buenas prácticas de ingeniería de software.",
      en: "Full Stack Java bootcamp focused on web application development, REST APIs, Spring Boot, relational databases, modern frontend, and software engineering best practices.",
    },

    // LEDGER
    "ledger.title1": { es: "Diseño con visión de largo plazo", en: "Design built for the long run" },
    "ledger.desc1": {
      es: "Las decisiones técnicas correctas desde el inicio facilitan el crecimiento y mantenimiento del sistema.",
      en: "Getting the technical decisions right from day one makes a system easier to grow and maintain.",
    },
    "ledger.title2": { es: "Automatización orientada a eficiencia", en: "Automation focused on efficiency" },
    "ledger.desc2": {
      es: "Busco reducir tareas manuales mediante procesos automatizados que aporten consistencia y ahorro de tiempo.",
      en: "I look for ways to cut manual work through automated processes that add consistency and save time.",
    },
    "ledger.title3": { es: "IA aplicada a resultados", en: "AI applied to real results" },
    "ledger.desc3": {
      es: "La inteligencia artificial debe aportar valor tangible, optimizando procesos y mejorando la toma de decisiones.",
      en: "Artificial intelligence should deliver tangible value — optimizing processes and improving decision-making.",
    },

    // EXPERTISE
    "expertise.eyebrow": { es: "NODE_03 · ECOSISTEMA", en: "NODE_03 · ECOSYSTEM" },
    "expertise.title": {
      es: "Tecnologías que se integran para <em>crear soluciones completas.</em>",
      en: "Technologies that come together to <em>build complete solutions.</em>",
    },
    "expertise.card1.desc": {
      es: "Arquitectura de servicios limpia, mantenible y pensada para escalar sin reescribirse.",
      en: "Clean, maintainable service architecture, built to scale without a rewrite.",
    },
    "expertise.card2.desc": {
      es: "APIs REST documentadas, seguras y consistentes, listas para integrarse con cualquier cliente.",
      en: "Documented, secure, and consistent REST APIs, ready to integrate with any client.",
    },
    "expertise.card3.desc": {
      es: "Modelos y flujos de NLP aplicados a procesos reales: clasificación, análisis y respuesta automática.",
      en: "NLP models and workflows applied to real processes: classification, analysis, and automated response.",
    },
    "expertise.card4.desc": {
      es: "Despliegue y contenedores con Docker, pensados para entornos reproducibles y portables.",
      en: "Deployment and containers with Docker, built for reproducible, portable environments.",
    },
    "expertise.card5.desc": {
      es: "Cuando el proyecto lo exige, conecto ese backend con una interfaz igual de sólida.",
      en: "When a project calls for it, I connect that backend to a frontend just as solid.",
    },
    "expertise.card6.title": { es: "Sistemas Escalables", en: "Scalable Systems" },
    "expertise.card6.desc": {
      es: "Bases de datos y consultas optimizadas para crecer sin perder rendimiento.",
      en: "Databases and queries optimized to grow without losing performance.",
    },

    // BLOG
    "blog.eyebrow": { es: "NODE_05 · CONOCIMIENTOS", en: "NODE_05 · KNOWLEDGE" },
    "blog.title": {
      es: "Recursos, aprendizajes y <em>buenas prácticas.</em>",
      en: "Resources, learnings, and <em>best practices.</em>",
    },
    "blog.desc": {
      es: "Explora contenido técnico, conceptos fundamentales y recursos que han influido en mi crecimiento como desarrollador. Una colección de temas útiles sobre arquitectura, calidad de código y desarrollo de software moderno.",
      en: "Explore technical content, core concepts, and resources that have shaped my growth as a developer. A collection of useful topics on architecture, code quality, and modern software development.",
    },
    "blog.card1.title": { es: "Buenas prácticas en desarrollo de software", en: "Best practices in software development" },
    "blog.card1.desc": {
      es: "Principios y recomendaciones para escribir código más limpio, mantenible y fácil de escalar en proyectos reales.",
      en: "Principles and recommendations for writing cleaner, more maintainable code that's easy to scale in real projects.",
    },
    "blog.card2.title": { es: "Arquitectura y diseño de aplicaciones", en: "Application architecture and design" },
    "blog.card2.desc": {
      es: "Conceptos esenciales para estructurar sistemas robustos, separar responsabilidades y facilitar el mantenimiento.",
      en: "Essential concepts for structuring robust systems, separating concerns, and making maintenance easier.",
    },
    "blog.card3.title": { es: "Java moderno y ecosistema Spring", en: "Modern Java and the Spring ecosystem" },
    "blog.card3.desc": {
      es: "Recursos para profundizar en Java, Spring Boot, APIs REST y herramientas utilizadas en el desarrollo backend.",
      en: "Resources to go deeper into Java, Spring Boot, REST APIs, and tools used in backend development.",
    },
    "blog.link": { es: "Explorar recurso", en: "Explore resource" },

    // PROJECTS
    "projects.eyebrow": { es: "NODE_04 · CASOS DE ESTUDIO", en: "NODE_04 · CASE STUDIES" },
    "projects.title": {
      es: "Proyectos desarrollados para <em>resolver necesidades concretas.</em>",
      en: "Projects built to <em>solve real needs.</em>",
    },
    "case1.k1": { es: "Problema", en: "Problem" },
    "case1.v1": {
      es: "La gestión manual de PQRS dificultaba el seguimiento y aumentaba los tiempos de respuesta.",
      en: "Manual handling of complaints and requests made tracking difficult and slowed response times.",
    },
    "case1.k2": { es: "Solución", en: "Solution" },
    "case1.v2": {
      es: "Plataforma centralizada para registrar, gestionar y analizar solicitudes de manera eficiente.",
      en: "A centralized platform to log, manage, and analyze requests efficiently.",
    },
    "case1.k3": { es: "Arquitectura", en: "Architecture" },
    "case1.v3": {
      es: "Aplicación web integrada con APIs y automatizaciones mediante n8n.",
      en: "Web application integrated with APIs and automations built with n8n.",
    },
    "case1.k4": { es: "Resultado", en: "Result" },
    "case1.v4": {
      es: "Mayor trazabilidad, menos tareas manuales y procesos más ágiles.",
      en: "Better traceability, fewer manual tasks, and more agile processes.",
    },

    "case2.title": { es: "Próximos casos de estudio", en: "Upcoming case studies" },
    "case2.pendingtext": { es: "En construcción", en: "In progress" },
    "case2.copy": {
      es: "Estoy construyendo y desplegando nuevos proyectos, de prácticas dirigidas a productos completos. Mientras se suman a esta sección, puedes seguir el progreso, los prototipos y el código en curso directamente en mi GitHub.",
      en: "I'm building and shipping new projects, ranging from guided practice work to complete products. While they get added here, you can follow the progress, prototypes, and code in the making straight on my GitHub.",
    },
    "case2.tag1": { es: "En desarrollo", en: "In development" },
    "case2.tag2": { es: "Prototipos", en: "Prototypes" },
    "case2.tag3": { es: "Prácticas", en: "Practice projects" },
    "case2.github": { es: "Ver GitHub →", en: "View GitHub →" },

    // METHOD
    "method.eyebrow": { es: "NODE_05 · FLUJO", en: "NODE_05 · FLOW" },
    "method.title": { es: "Proceso de desarrollo y entrega", en: "Development & delivery process" },
    "method.desc": {
      es: "El único lugar del sitio donde el orden importa: cada proyecto pasa por estas seis etapas, en este orden.",
      en: "The one place on this site where order matters: every project moves through these six stages, in this order.",
    },
    "pipe1.title": { es: "Descubrir", en: "Discover" },
    "pipe1.desc": { es: "Entender el problema real", en: "Understand the real problem" },
    "pipe2.title": { es: "Diseñar", en: "Design" },
    "pipe2.desc": { es: "Definir el flujo de datos", en: "Define the data flow" },
    "pipe3.title": { es: "Arquitectar", en: "Architect" },
    "pipe3.desc": { es: "Modelar el sistema", en: "Model the system" },
    "pipe4.title": { es: "Construir", en: "Build" },
    "pipe4.desc": { es: "Construir e integrar", en: "Build and integrate" },
    "pipe5.title": { es: "Desplegar", en: "Deploy" },
    "pipe5.desc": { es: "Contenerizar y publicar", en: "Containerize and ship" },
    "pipe6.title": { es: "Escalar", en: "Scale" },
    "pipe6.desc": { es: "Optimizar bajo carga", en: "Optimize under load" },

    // CONTACT
    "contact.eyebrow": { es: "NODE_07 · CONTACTO", en: "NODE_07 · CONTACT" },
    "contact.title": { es: "¿Tienes un sistema que construir? Hablemos.", en: "Got a system to build? Let's talk." },
    "contact.desc": {
      es: "Cuéntame el problema que quieres resolver. Yo me encargo de la arquitectura, la automatización y todo lo que hay detrás.",
      en: "Tell me about the problem you want to solve. I'll take care of the architecture, automation, and everything behind it.",
    },
    "contact.cta": { es: "Escríbeme →", en: "Email me →" },
    // ===============================
    // CASE 2 - INVENTORY SYSTEM
    // ===============================
    "case2.title": {
      es: "Inventory Manager",
      en: "Inventory Manager",
    },

    "case2.k1": {
      es: "Problema",
      en: "Problem",
    },
    "case2.v1": {
      es: "La gestión manual de productos y existencias generaba errores, pérdida de control y falta de visibilidad en el inventario.",
      en: "Manual product and stock management caused errors, lack of control, and limited inventory visibility.",
    },

    "case2.k2": {
      es: "Solución",
      en: "Solution",
    },
    "case2.v2": {
      es: "Aplicación web para registrar productos, controlar stock y gestionar ventas desde una interfaz centralizada.",
      en: "Web application to register products, manage stock, and handle sales from a centralized interface.",
    },

    "case2.k3": {
      es: "Arquitectura",
      en: "Architecture",
    },
    "case2.v3": {
      es: "Aplicación frontend con almacenamiento local (LocalStorage), diseñada para ser ligera, rápida y adaptable.",
      en: "Frontend application using LocalStorage, designed to be lightweight, fast, and adaptable.",
    },

    "case2.k4": {
      es: "Resultado",
      en: "Result",
    },
    "case2.v4": {
      es: "Mejor control del inventario, reducción de errores manuales y acceso rápido a la información de productos.",
      en: "Improved inventory control, reduced manual errors, and faster access to product information.",
    },
  };

  function detectDefaultLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
    const browserLang = (navigator.language || navigator.userLanguage || "es").toLowerCase();
    return browserLang.startsWith("en") ? "en" : "es";
  }

  let currentLang = detectDefaultLang();

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const entry = translations[key];
      if (entry && entry[lang] != null) {
        el.innerHTML = entry[lang];
      }
    });

    const toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      toggleBtn.innerHTML =
        lang === "es"
          ? '<strong>Español</strong> / English'
          : 'Español / <strong>English</strong>';

      toggleBtn.setAttribute(
        "aria-label",
        lang === "es"
          ? "Switch to English"
          : "Cambiar a español"
      );
    }

    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(currentLang);

    const toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        applyLang(currentLang === "es" ? "en" : "es");
      });
    }
  });
})();