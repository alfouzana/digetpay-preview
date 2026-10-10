import "./style.css";

// mobile nav toggle
const btn = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-mobile-menu]");
btn?.addEventListener("click", () => menu?.classList.toggle("hidden"));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.add("hidden")));

// current year in footer
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

// reveal on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// personal / business tabs
const tabs = document.querySelectorAll("[data-tab]");
tabs.forEach((t) =>
  t.addEventListener("click", () => {
    tabs.forEach((x) => x.classList.remove("bg-white", "text-ink", "shadow"));
    t.classList.add("bg-white", "text-ink", "shadow");
    document.querySelectorAll("[data-panel]").forEach((p) => p.classList.toggle("hidden", p.dataset.panel !== t.dataset.tab));
  })
);

// bill split demo
const people = document.querySelectorAll("[data-person]");
people.forEach((p) =>
  p.addEventListener("click", () => {
    p.classList.toggle("paid");
    const badge = p.querySelector("[data-badge]");
    const paid = p.classList.contains("paid");
    badge.textContent = paid ? "دفع ✓" : "بانتظار الدفع";
    badge.className = paid
      ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600"
      : "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600";
    const done = document.querySelectorAll("[data-person].paid").length;
    document.querySelector("[data-progress]").style.width = `${(done / people.length) * 100}%`;
    document.querySelector("[data-count]").textContent = `${done} من ${people.length}`;
  })
);

// links to #business open the business tab
document.querySelectorAll('a[href="#business"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('[data-tab="business"]').click();
    document.getElementById("personal").scrollIntoView({ behavior: "smooth" });
  })
);
