// Replace these sample projects with real case studies when they are ready.
const projects = [
  {
    id: "01",
    title: "Fintech Dashboard",
    category: "Product Design",
    filter: "product",
    year: "2026",
    color: "#d7ff3f",
    summary: "A clearer, faster financial workspace that turns complex account data into confident daily decisions.",
    role: "Product Designer",
    duration: "12 weeks",
    tools: "Figma · Prototype",
    challenge: "Users needed to understand account performance quickly, but fragmented navigation and dense data made routine decisions slow and error-prone.",
    approach: "Mapped the highest-frequency jobs, simplified the information architecture, and tested progressive disclosure patterns through interactive prototypes.",
    outcome: "A focused dashboard system with clearer hierarchy, reusable data components, and a foundation that can scale across future financial products."
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
  },
  {
    id: "07",
    title: "Campaign Direction",
    category: "Visual Design",
    filter: "visual",
    year: "2024",
    color: "#ffcfdf",
    summary: "An adaptable visual campaign built to stay recognizable across a fast-moving launch.",
    role: "Art Director",
    duration: "5 weeks",
    tools: "Adobe CC · Figma",
    challenge: "The launch needed visual impact across many formats without fragmenting the core message.",
    approach: "Created one strong graphic idea, then developed flexible rules for typography, imagery, scale and motion.",
    outcome: "A consistent campaign family that moves comfortably from large-format moments to compact social placements."
  },
  {
    id: "08",
    title: "Operations Portal",
    category: "UI/UX Design",
    filter: "uiux",
    year: "2024",
    color: "#b8e0ef",
    summary: "A role-aware internal tool that helps teams see priorities and act with confidence.",
    role: "Product Designer",
    duration: "11 weeks",
    tools: "Figma · Workshops",
    challenge: "Teams relied on scattered tools and manual status checks, creating duplicated work and limited visibility.",
    approach: "Facilitated workflow workshops, modeled shared objects and designed role-specific views on top of one consistent system.",
    outcome: "A streamlined operational workspace with clear ownership, faster scanning and fewer handoff gaps."
  },
  {
    id: "09",
    title: "Future Concept",
    category: "Concept Design",
    filter: "visual",
    year: "2024",
    color: "#d3d3ce",
    summary: "An exploratory interface concept investigating what a quieter, more adaptive product could feel like.",
    role: "Concept Designer",
    duration: "4 weeks",
    tools: "Figma · Motion",
    challenge: "Explore a future-facing interaction model without losing the familiarity users depend on today.",
    approach: "Used speculative scenarios and motion prototypes to test adaptive information density and contextual controls.",
    outcome: "A tangible future vision that sparked product discussion and clarified which interaction ideas were ready for near-term testing."
  }
];

const grid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const closeButton = dialog.querySelector(".dialog-close");
const doneButton = dialog.querySelector(".dialog-done");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let lastProjectTrigger = null;

function projectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.category = project.filter;
  article.style.animationDelay = `${index * 55}ms`;
  article.innerHTML = `
    <button class="project-trigger" type="button" data-project="${project.id}" aria-label="Open ${project.title} case study">
      <span class="project-thumb" style="--project-color: ${project.color}">
        <span class="thumb-number">${project.id}</span>
        <span class="thumb-icon"><i class="ph ph-arrow-up-right" aria-hidden="true"></i></span>
      </span>
      <span class="project-info">
        <span>
          <h3>${project.title}</h3>
          <p>${project.category}</p>
        </span>
        <span class="project-year">${project.year}</span>
      </span>
    </button>
  `;
  return article;
}

function renderProjects(filter = "all") {
  const visibleProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.filter === filter);

  grid.replaceChildren(...visibleProjects.map(projectCard));
}

function openProject(projectId, trigger) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  lastProjectTrigger = trigger;
  document.querySelector("#dialog-kicker").textContent = `${project.category} · ${project.year}`;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-summary").textContent = project.summary;
  document.querySelector("#dialog-challenge").textContent = project.challenge;
  document.querySelector("#dialog-approach").textContent = project.approach;
  document.querySelector("#dialog-outcome").textContent = project.outcome;

  const visual = document.querySelector("#dialog-visual");
  visual.style.setProperty("--dialog-color", project.color);
  visual.innerHTML = `<span>${project.id}</span>`;

  document.querySelector("#dialog-meta").innerHTML = `
    <div><span>Role</span><strong>${project.role}</strong></div>
    <div><span>Duration</span><strong>${project.duration}</strong></div>
    <div><span>Tools</span><strong>${project.tools}</strong></div>
  `;

  dialog.showModal();
  document.body.classList.add("is-locked");
}

function closeProject() {
  if (dialog.open) dialog.close();
}

renderProjects();

grid.addEventListener("click", (event) => {
  const trigger = event.target.closest(".project-trigger");
  if (trigger) openProject(trigger.dataset.project, trigger);
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    renderProjects(button.dataset.filter);
  });
});

closeButton.addEventListener("click", closeProject);
doneButton.addEventListener("click", closeProject);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeProject();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("is-locked");
  lastProjectTrigger?.focus();
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuButton.querySelector("i").className = isOpen ? "ph ph-x" : "ph ph-list";
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.querySelector("i").className = "ph ph-list";
  });
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

const sections = document.querySelectorAll("#home, #about-work, #contact");
const navLinks = document.querySelectorAll(".nav-link");
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
  document.querySelector(".scroll-progress").style.transform = `scaleX(${progress})`;
  document.querySelector("#site-header").classList.toggle("is-scrolled", scrollTop > 20);

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

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateScrollEffects();
