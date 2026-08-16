// Replace these sample projects with real case studies when they are ready.
const projects = [
  {
    id: "01",
    title: "妖しの湯物語",
    filter: "visual",
    color: "#1b1017",
    tags: ["# ChatGPT", "# Figma Motion"],
    summary: "此為 Slots 老虎機介面設計，採用日式溫泉與妖怪文化作為視覺主題，結合角色、符號與入場動態，營造鮮明且帶有奇幻氛圍的遊戲體驗。",
    thumbnail: {
      src: "assets/projects/ayashi-no-yu/cover-card.jpg",
      width: 960,
      height: 720
    },
    media: [
      {
        type: "image",
        src: "assets/projects/ayashi-no-yu/component.jpg",
        width: 1600,
        height: 878,
        alt: "妖しの湯物語遊戲元件與角色設計"
      },
      {
        type: "image",
        src: "assets/projects/ayashi-no-yu/player-entry.jpg",
        width: 1600,
        height: 900,
        alt: "妖しの湯物語玩家入場動態畫面"
      },
      {
        type: "video",
        src: "assets/projects/ayashi-no-yu/player-entry.webm",
        poster: "assets/projects/ayashi-no-yu/player-entry.jpg",
        width: 1920,
        height: 1080,
        label: "妖しの湯物語玩家入場動畫"
      }
    ]
  },
  {
    id: "02",
    title: "Member Experience",
    category: "UI/UX Design",
    filter: "uiux",
    year: "2026",
    color: "#b9d7ff",
    summary: "A member journey redesigned around speed, trust and a stronger sense of progress.",
    role: "UX/UI Designer",
    duration: "10 weeks",
    tools: "Figma · Research",
    challenge: "The existing journey hid key benefits and created friction across registration, account setup and returning use.",
    approach: "Combined journey mapping with usability checks, then rebuilt the experience around clear milestones and contextual guidance.",
    outcome: "A coherent end-to-end flow that makes status visible, reduces uncertainty and gives the brand a more confident digital presence."
  },
  {
    id: "03",
    title: "Commerce Redesign",
    category: "Product Design",
    filter: "product",
    year: "2025",
    color: "#ffb9a8",
    summary: "A conversion-minded shopping experience balancing discovery, product confidence and checkout speed.",
    role: "Lead Designer",
    duration: "14 weeks",
    tools: "Figma · Analytics",
    challenge: "Customers struggled to compare products and frequently lost context between discovery and checkout.",
    approach: "Reframed the content model, prioritized decision-making information, and connected browsing states through persistent, predictable interactions.",
    outcome: "A responsive commerce framework with stronger product storytelling and a more direct route from consideration to purchase."
  },
  {
    id: "04",
    title: "Brand Motion System",
    category: "Visual Design",
    filter: "visual",
    year: "2025",
    color: "#d5c6ff",
    summary: "A modular motion language that gives a digital brand rhythm without sacrificing clarity.",
    role: "Visual Designer",
    duration: "6 weeks",
    tools: "After Effects · Figma",
    challenge: "The brand looked consistent in static layouts but lacked a recognizable behavior across product and campaign touchpoints.",
    approach: "Defined motion principles, timing families and reusable transitions tied to the brand’s core visual geometry.",
    outcome: "A compact toolkit that helps teams create expressive, consistent movement across product, social and presentation formats."
  },
  {
    id: "05",
    title: "Service Booking",
    category: "UI/UX Design",
    filter: "uiux",
    year: "2025",
    color: "#a8ead5",
    summary: "A mobile-first booking flow designed to make complex service choices feel simple.",
    role: "UX Designer",
    duration: "8 weeks",
    tools: "Figma · Testing",
    challenge: "Multiple service types, schedules and pricing rules caused drop-off before confirmation.",
    approach: "Reduced early decisions, grouped options by user intent and tested plain-language summaries at every commitment point.",
    outcome: "A calmer booking experience with visible progress, recoverable choices and clear confirmation across screen sizes."
  },
  {
    id: "06",
    title: "Design System 2.0",
    category: "Product Design",
    filter: "product",
    year: "2025",
    color: "#ffe28a",
    summary: "A practical design system that aligns product quality with team speed.",
    role: "System Designer",
    duration: "16 weeks",
    tools: "Figma · Documentation",
    challenge: "Inconsistent components and undocumented decisions slowed delivery and made new features difficult to maintain.",
    approach: "Audited patterns, established semantic tokens, and worked with engineering to define accessible component behavior and ownership.",
    outcome: "A shared product language with flexible foundations, clearer contribution rules and better consistency between design and code."
  }
];

const grid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const closeButton = dialog.querySelector(".dialog-close");
const doneButton = dialog.querySelector(".dialog-done");
const dialogMedia = dialog.querySelector("#dialog-media");
const dialogRelated = dialog.querySelector("#dialog-related");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let lastProjectTrigger = null;
let dialogCloseTimer = null;
let lockedPageScroll = 0;

function lockPageScroll() {
  if (document.body.classList.contains("is-locked")) return;

  lockedPageScroll = window.scrollY;
  document.documentElement.classList.add("is-locked");
  document.body.style.top = `-${lockedPageScroll}px`;
  document.body.classList.add("is-locked");
}

function unlockPageScroll() {
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;

  document.documentElement.classList.remove("is-locked");
  document.documentElement.style.scrollBehavior = "auto";
  document.body.classList.remove("is-locked");
  document.body.style.removeProperty("top");
  window.scrollTo(0, lockedPageScroll);
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
}

function projectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.category = project.filter;
  article.style.animationDelay = `${index * 55}ms`;

  const thumbnail = project.thumbnail
    ? `<img class="project-thumb-image" src="${project.thumbnail.src}" width="${project.thumbnail.width}" height="${project.thumbnail.height}" alt="" loading="lazy" decoding="async" />`
    : `<span class="thumb-number">${project.id}</span>`;
  const projectMeta = project.tags
    ? `<p class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</p>`
    : `<p>${project.category}</p>`;
  const projectYear = project.year ? `<span class="project-year">${project.year}</span>` : "";

  article.innerHTML = `
    <button class="project-trigger" type="button" data-project="${project.id}" aria-label="Open ${project.title} case study">
      <span class="project-thumb${project.thumbnail ? " has-image" : ""}" style="--project-color: ${project.color}">
        ${thumbnail}
        <span class="thumb-icon"><i class="ph ph-arrow-up-right" aria-hidden="true"></i></span>
      </span>
      <span class="project-info">
        <span>
          <h3>${project.title}</h3>
          ${projectMeta}
        </span>
        ${projectYear}
      </span>
    </button>
  `;
  return article;
}

function renderProjects() {
  grid.replaceChildren(...projects.map(projectCard));
}

function renderProjectMediaItem(item) {
  if (item.type === "video") {
    return `
      <div class="dialog-media-item">
        <video controls loop muted playsinline preload="metadata" poster="${item.poster}" width="${item.width}" height="${item.height}" aria-label="${item.label}">
          <source src="${item.src}" type="video/webm" />
        </video>
      </div>
    `;
  }

  return `
    <div class="dialog-media-item">
      <img src="${item.src}" width="${item.width}" height="${item.height}" alt="${item.alt}" loading="lazy" decoding="async" />
    </div>
  `;
}

function getRelatedProjects(projectId) {
  const currentIndex = projects.findIndex((project) => project.id === projectId);
  const offsets = [-1, 1, 2];

  return offsets.map((offset) => {
    const relatedIndex = (currentIndex + offset + projects.length) % projects.length;
    return projects[relatedIndex];
  });
}

function renderRelatedProjects(projectId) {
  dialogRelated.innerHTML = getRelatedProjects(projectId).map((project) => {
    const preview = project.thumbnail
      ? `<img src="${project.thumbnail.src}" width="${project.thumbnail.width}" height="${project.thumbnail.height}" alt="" loading="lazy" decoding="async" />`
      : `<span class="dialog-related-placeholder" style="--related-color: ${project.color}">${project.id}</span>`;
    const category = project.tags ? project.tags.join(" · ") : project.category;

    return `
      <button class="dialog-related-card" type="button" data-related-project="${project.id}" aria-label="查看專案 ${project.title}">
        <span class="dialog-related-preview">${preview}</span>
        <span class="dialog-related-meta">
          <span>
            <span class="dialog-related-number">${project.id}</span>
            <strong>${project.title}</strong>
            <small>${category}</small>
          </span>
          <i class="ph ph-arrow-up-right" aria-hidden="true"></i>
        </span>
      </button>
    `;
  }).join("");
}

function openProject(projectId, trigger) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const isDialogOpen = dialog.open;
  const isMediaProject = Array.isArray(project.media);
  if (!isDialogOpen) lastProjectTrigger = trigger;
  dialog.querySelectorAll("video").forEach((video) => video.pause());
  dialog.classList.toggle("is-media-project", isMediaProject);
  document.querySelector("#dialog-kicker").textContent = project.tags
    ? project.tags.join("  ")
    : `${project.category} · ${project.year}`;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-summary").textContent = project.summary || "";
  document.querySelector("#dialog-challenge").textContent = project.challenge || "";
  document.querySelector("#dialog-approach").textContent = project.approach || "";
  document.querySelector("#dialog-outcome").textContent = project.outcome || "";

  dialogMedia.innerHTML = isMediaProject
    ? project.media.map(renderProjectMediaItem).join("")
    : "";

  document.querySelector("#dialog-meta").innerHTML = isMediaProject ? "" : `
    <div><span>Role</span><strong>${project.role}</strong></div>
    <div><span>Duration</span><strong>${project.duration}</strong></div>
    <div><span>Tools</span><strong>${project.tools}</strong></div>
  `;
  renderRelatedProjects(project.id);

  dialog.classList.remove("is-closing");
  if (!isDialogOpen) {
    dialog.showModal();
    lockPageScroll();
  }
  dialog.scrollTop = 0;
}

function closeProject() {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;

  if (prefersReducedMotion.matches) {
    dialog.close();
    return;
  }

  dialog.classList.add("is-closing");
  dialogCloseTimer = window.setTimeout(() => {
    if (dialog.open) dialog.close();
  }, 220);
}

renderProjects();

grid.addEventListener("click", (event) => {
  const trigger = event.target.closest(".project-trigger");
  if (trigger) openProject(trigger.dataset.project, trigger);
});

closeButton.addEventListener("click", closeProject);
doneButton.addEventListener("click", closeProject);
dialogRelated.addEventListener("click", (event) => {
  const relatedProject = event.target.closest("[data-related-project]");
  if (relatedProject) openProject(relatedProject.dataset.relatedProject, relatedProject);
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeProject();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener("close", () => {
  window.clearTimeout(dialogCloseTimer);
  dialogCloseTimer = null;
  dialog.classList.remove("is-closing");
  dialog.querySelectorAll("video").forEach((video) => video.pause());
  dialogMedia.replaceChildren();
  unlockPageScroll();
  lastProjectTrigger?.focus();
});

function setMenuState(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  document.querySelector("#site-header").classList.toggle("is-menu-open", isOpen);
  document.body.classList.toggle("is-menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuButton.querySelector("i").className = isOpen ? "ph ph-x" : "ph ph-list";
}

menuButton.addEventListener("click", () => {
  setMenuState(!navigation.classList.contains("is-open"));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    setMenuState(false);
    menuButton.focus();
  }
});

window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) setMenuState(false);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("#home, #about-work, #experience, #contact");
const navLinks = document.querySelectorAll(".nav-link");
const siteHeader = document.querySelector("#site-header");
const contactSection = document.querySelector("#contact");
const contactParticlesCanvas = document.querySelector(".contact-particles");
const contactParticlesContext = contactParticlesCanvas.getContext("2d");
const desktopPointer = window.matchMedia("(min-width: 901px) and (pointer: fine)");
const contactParticles = [];
let contactParticleFrame = null;
let lastParticlePoint = null;
let lastParticleEmission = 0;

function resizeContactParticles() {
  if (!desktopPointer.matches) return;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = contactSection.clientWidth;
  const height = contactSection.clientHeight;
  contactParticlesCanvas.width = Math.round(width * pixelRatio);
  contactParticlesCanvas.height = Math.round(height * pixelRatio);
  contactParticlesContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function renderContactParticles() {
  contactParticlesContext.clearRect(0, 0, contactSection.clientWidth, contactSection.clientHeight);

  for (let index = contactParticles.length - 1; index >= 0; index -= 1) {
    const particle = contactParticles[index];
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.velocityY -= 0.004;
    particle.life -= particle.decay;

    if (particle.life <= 0) {
      contactParticles.splice(index, 1);
      continue;
    }

    contactParticlesContext.globalAlpha = particle.life;
    contactParticlesContext.fillStyle = "#d7ff3f";
    contactParticlesContext.beginPath();
    contactParticlesContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    contactParticlesContext.fill();
  }

  contactParticlesContext.globalAlpha = 1;

  if (contactParticles.length > 0) {
    contactParticleFrame = window.requestAnimationFrame(renderContactParticles);
  } else {
    contactParticleFrame = null;
  }
}

function emitContactParticles(event) {
  if (!desktopPointer.matches || prefersReducedMotion.matches) return;

  const contactBounds = contactSection.getBoundingClientRect();
  const isInsideContact = event.clientX >= contactBounds.left
    && event.clientX <= contactBounds.right
    && event.clientY >= contactBounds.top
    && event.clientY <= contactBounds.bottom;

  if (!isInsideContact) {
    lastParticlePoint = null;
    return;
  }

  const now = performance.now();
  if (now - lastParticleEmission < 18) return;
  lastParticleEmission = now;

  const point = {
    x: event.clientX - contactBounds.left,
    y: event.clientY - contactBounds.top
  };
  const distance = lastParticlePoint
    ? Math.hypot(point.x - lastParticlePoint.x, point.y - lastParticlePoint.y)
    : 12;
  const particleCount = Math.min(5, Math.max(1, Math.ceil(distance / 14)));

  for (let index = 0; index < particleCount; index += 1) {
    const progress = particleCount === 1 ? 1 : index / (particleCount - 1);
    const originX = lastParticlePoint
      ? lastParticlePoint.x + (point.x - lastParticlePoint.x) * progress
      : point.x;
    const originY = lastParticlePoint
      ? lastParticlePoint.y + (point.y - lastParticlePoint.y) * progress
      : point.y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.25 + Math.random() * 0.85;

    contactParticles.push({
      x: originX + (Math.random() - 0.5) * 7,
      y: originY + (Math.random() - 0.5) * 7,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed - 0.18,
      size: 1 + Math.random() * 2.4,
      life: 0.65 + Math.random() * 0.35,
      decay: 0.012 + Math.random() * 0.012
    });
  }

  if (contactParticles.length > 180) {
    contactParticles.splice(0, contactParticles.length - 180);
  }
  lastParticlePoint = point;

  if (contactParticleFrame === null) {
    contactParticleFrame = window.requestAnimationFrame(renderContactParticles);
  }
}

window.addEventListener("pointermove", emitContactParticles, { passive: true });
window.addEventListener("resize", resizeContactParticles, { passive: true });
resizeContactParticles();
const typingText = document.querySelector(".typing-text");
const typingMessage = "Have a project in mind?";
const typingCycleDuration = 6000;
let typingAnimationFrame = null;
let typingCycleStart = null;

function updateTypingAnimation(timestamp) {
  if (typingCycleStart === null) typingCycleStart = timestamp;

  const elapsed = (timestamp - typingCycleStart) % typingCycleDuration;
  let characterCount = 0;

  if (elapsed < 1800) {
    characterCount = Math.floor((elapsed / 1800) * (typingMessage.length + 1));
  } else if (elapsed < 4200) {
    characterCount = typingMessage.length;
  } else if (elapsed < 5400) {
    characterCount = Math.ceil(typingMessage.length * (1 - (elapsed - 4200) / 1200));
  }

  typingText.textContent = typingMessage.slice(0, characterCount);
  typingAnimationFrame = window.requestAnimationFrame(updateTypingAnimation);
}

function startTypingAnimation() {
  if (prefersReducedMotion.matches) {
    typingText.textContent = typingMessage;
    return;
  }
  if (typingAnimationFrame !== null) return;

  typingCycleStart = null;
  typingAnimationFrame = window.requestAnimationFrame(updateTypingAnimation);
}

function stopTypingAnimation() {
  if (typingAnimationFrame !== null) {
    window.cancelAnimationFrame(typingAnimationFrame);
    typingAnimationFrame = null;
  }
  typingCycleStart = null;
  typingText.textContent = typingMessage;
}

const typingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) startTypingAnimation();
    else stopTypingAnimation();
  });
}, { threshold: 0.1 });

typingObserver.observe(contactSection);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? scrollTop / scrollable : 0;
  const contactBounds = contactSection.getBoundingClientRect();
  const isHeaderOverContact = contactBounds.top <= siteHeader.offsetHeight && contactBounds.bottom > 0;
  document.querySelector(".scroll-progress").style.transform = `scaleX(${progress})`;
  siteHeader.classList.toggle("is-scrolled", scrollTop > 20);
  siteHeader.classList.toggle("is-contact", isHeaderOverContact);

  if (!prefersReducedMotion.matches && scrollTop < window.innerHeight * 1.2) {
    document.querySelector(".hero-orb-a").style.transform = `translate3d(0, ${scrollTop * 0.12}px, 0)`;
    document.querySelector(".hero-orb-b").style.transform = `translate3d(0, ${scrollTop * -0.07}px, 0)`;
  }
}

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener("resize", updateScrollEffects, { passive: true });

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateScrollEffects();
