// Client-side label filter for the writing index. No dependencies.
(function () {
  const filters = document.querySelector("[data-filters]");
  const list = document.querySelector("[data-post-list]");
  if (!filters || !list) return;

  const chips = Array.from(filters.querySelectorAll(".chip"));
  const entries = Array.from(list.querySelectorAll(".entry"));
  const empty = document.querySelector("[data-empty]");

  function apply(tag) {
    let shown = 0;
    entries.forEach((entry) => {
      const tags = (entry.dataset.tags || "").split(" ").filter(Boolean);
      const match = tag === "*" || tags.includes(tag);
      entry.hidden = !match;
      if (match) shown++;
    });
    chips.forEach((chip) => {
      const active = chip.dataset.tag === tag;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    if (empty) empty.hidden = shown > 0;
  }

  chips.forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.classList.contains("is-active")));
    chip.addEventListener("click", () => apply(chip.dataset.tag));
  });
})();
