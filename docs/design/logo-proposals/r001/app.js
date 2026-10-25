(() => {
  "use strict";
  const { proposals } = window.CONTAX_LOGOS;
  const grid = document.getElementById("proposal-grid");
  const dialog = document.getElementById("detail");
  const count = document.getElementById("selection-count");
  const selectionToggle = document.querySelector(".selection-toggle");
  let favorites = new Set();
  let onlyFavorites = false;
  let opener;
  const board = new URLSearchParams(location.search).get("view") === "board";
  if (board) document.body.classList.add("board");
  try { favorites = new Set(JSON.parse(localStorage.getItem("contax-logo-r001-candidates") || "[]").filter(id => proposals.some(p => p.id === id))); } catch { /* Optional review preference. */ }

  function render() {
    count.textContent = favorites.size;
    const visible = onlyFavorites ? proposals.filter(p => favorites.has(p.id)) : proposals;
    grid.innerHTML = visible.map(p => `<article class="proposal-card" id="proposal-${p.id}"><div class="card-heading"><div><span class="proposal-number">${p.id}</span><h2>${p.name}</h2></div><button class="favorite" data-favorite="${p.id}" aria-label="Marcar ${p.id} ${p.name} como candidata" aria-pressed="${favorites.has(p.id)}">${favorites.has(p.id) ? "★" : "☆"}</button></div><button class="logo-stage" data-open="${p.id}" aria-label="Ver propuesta ${p.id}: ${p.name}"><img src="${p.asset}" width="1471" height="340" alt="Propuesta ${p.id}: ${p.name}. Isotipo y O vórtice originales."></button><div class="card-description"><p class="family">${p.family}</p><p>${p.description}</p><div class="card-bottom"><div class="swatches" aria-label="Paleta de la propuesta">${p.colors.map(c => `<span style="--swatch:${c}" title="${c}"></span>`).join("")}</div><button data-open="${p.id}" class="expand">Ver detalle <span aria-hidden="true">↗</span></button></div></div></article>`).join("");
    document.getElementById("empty-selection").hidden = visible.length > 0;
  }
  function open(id) {
    const p = proposals.find(item => item.id === id);
    if (!p) return;
    opener = document.activeElement;
    const preserved = `<div class="preserved"><div><h3>Isotipo original</h3><svg viewBox="0 0 350 340" role="img" aria-label="Detalle del isotipo original de esta propuesta"><defs><clipPath id="detail-isotype"><rect width="350" height="340"/></clipPath></defs><image href="${p.asset}" width="1471" height="340" clip-path="url(#detail-isotype)"/></svg></div><div><h3>O vórtice original</h3><svg viewBox="570 84 160 196" role="img" aria-label="Detalle de la O vórtice conservada"><defs><clipPath id="detail-vortex"><rect x="570" y="84" width="160" height="196"/></clipPath></defs><image href="${p.asset}" width="1471" height="340" clip-path="url(#detail-vortex)"/></svg></div><p>Se conserva la forma del isotipo y la construcción original de la O. No se sustituyen por símbolos ni letras nuevos.</p></div>`;
    dialog.innerHTML = `<button class="close" aria-label="Cerrar detalle">×</button><p class="eyebrow">PROPUESTA ${p.id} · ${p.family}</p><h2 id="detail-title">${p.name}</h2><p class="detail-description">${p.description}</p><div class="detail-logo"><img src="${p.asset}" width="1471" height="340" alt="${p.name}: vista ampliada"></div><div class="size-tests"><div><h3>Cabecera · 238 px</h3><img style="width:238px" src="${p.asset}" width="1471" height="340" alt="${p.name} a tamaño de escritorio"></div><div><h3>Móvil · 175 px</h3><img style="width:175px" src="${p.asset}" width="1471" height="340" alt="${p.name} a tamaño móvil"></div></div>${preserved}<div class="detail-actions"><button class="candidate-button" data-favorite="${p.id}">${favorites.has(p.id) ? "★ Candidata guardada" : "☆ Guardar como candidata"}</button><a href="${p.asset}" download="contax-${p.id}-${p.slug}.svg">Descargar propuesta SVG ↓</a></div><p class="detail-note">Exploración de color a partir del PNG original. El SVG contiene la imagen y su tratamiento; no representa una vectorización ni modifica la landing.</p>`;
    document.body.classList.add("dialog-open");
    dialog.showModal();
  }
  function toggleFavorite(id) {
    const restoreGridFocus = !dialog.open;
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    try { localStorage.setItem("contax-logo-r001-candidates", JSON.stringify([...favorites])); } catch { /* Selection still works for this visit. */ }
    document.getElementById("announcer").textContent = `Propuesta ${id} ${favorites.has(id) ? "guardada como candidata" : "retirada de candidatas"}.`;
    render();
    if (restoreGridFocus) {
      const replacement = grid.querySelector(`[data-favorite="${id}"]`);
      (replacement ?? selectionToggle).focus({ preventScroll: true });
    }
    const button = dialog.querySelector(".candidate-button");
    if (button && button.dataset.favorite === id) button.textContent = favorites.has(id) ? "★ Candidata guardada" : "☆ Guardar como candidata";
  }
  document.addEventListener("click", event => {
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
    const detail = event.target.closest("[data-open]");
    if (detail) { open(detail.dataset.open); return; }
    const background = event.target.closest("[data-background]");
    if (background) {
      document.body.classList.toggle("light-review", background.dataset.background === "light");
      document.querySelectorAll("[data-background]").forEach(button => button.setAttribute("aria-pressed", button === background));
    }
    if (event.target.closest(".selection-toggle")) {
      onlyFavorites = !onlyFavorites;
      selectionToggle.setAttribute("aria-pressed", onlyFavorites);
      render();
    }
    if (event.target.closest(".close")) dialog.close();
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    else {
      const id = opener?.dataset.open;
      const replacement = id ? document.querySelector(`[data-open="${id}"]`) : null;
      (replacement ?? selectionToggle).focus({ preventScroll: true });
    }
  });
  render();
})();
