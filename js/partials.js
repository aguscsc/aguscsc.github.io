// Shared header/footer + category icons for every page.
// Each page includes this file, then calls renderSite("<nav-key>").
// Paths are root-relative (e.g. "/contact.html") since this is a
// username.github.io site served from the domain root.

const NAV_ITEMS = [
  { key: "home", href: "/index.html", label: "Home" },
  { key: "about", href: "/index.html#about", label: "About" },
  { key: "projects", href: "/projects/index.html", label: "Projects" },
  { key: "resume-en", href: "/assets/Resume_EN.pdf", label: "Résumé (EN)", external: true },
  { key: "resume-es", href: "/assets/Resume_ES.pdf", label: "Résumé (ES)", external: true },
  { key: "contact", href: "/contact.html", label: "Contact" }
];

// Small schematic-style icons (stroke-only, currentColor) for each category.
const ICONS = {
  control: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a8 8 0 1 1 3 6.2"/><path d="M4 20v-4h4"/></svg>`,
  power: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15h4l2-6 4 12 2-6h8"/></svg>`,
  monitoring: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2 7 4-14 2 7h8"/><circle cx="20" cy="6" r="2"/></svg>`,
  robotics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="19" r="2"/><path d="M5 17V11"/><circle cx="5" cy="9" r="2"/><path d="M7 8l7-3"/><circle cx="15" cy="4" r="2"/></svg>`
};

function headerHTML() {
  const links = NAV_ITEMS.map((item) => {
    const attrs = item.external ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${item.href}" data-key="${item.key}"${attrs}>${item.label}</a>`;
  }).join("");

  return `
    <div class="container header-inner">
      <a href="/index.html" class="logo" aria-label="Home">⚡</a>
      <nav class="nav">${links}</nav>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
    </div>
  `;
}

function footerHTML() {
  const links = NAV_ITEMS.filter((i) => !i.external)
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <div class="container footer-inner">
      <div class="footer-nav">${links}</div>
      <div class="footer-meta">
        <span>&copy; <span id="year"></span> Agustín</span>
        <a href="https://github.com/aguscsc" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  `;
}

function renderSite(activeKey) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.innerHTML = headerHTML();
  if (footer) footer.innerHTML = footerHTML();

  document.querySelectorAll(`[data-key="${activeKey}"]`).forEach((el) => el.classList.add("active"));

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll("[data-icon]").forEach((el) => {
    const icon = ICONS[el.getAttribute("data-icon")];
    if (icon) el.innerHTML = icon;
  });
}
