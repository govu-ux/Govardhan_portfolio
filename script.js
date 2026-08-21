(() => {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add("show"));

  const links = [...document.querySelectorAll(".navbar-links a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const activate = (id) =>
    links.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`),
    );
  links.forEach((link) =>
    link.addEventListener("click", () =>
      activate(link.getAttribute("href").slice(1)),
    ),
  );

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activate(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => navObserver.observe(section));
  }
})();
