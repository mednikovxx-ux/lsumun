// Страница регламента: шпаргалка ключевых цифр, оглавление, поиск по тексту.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const slug = (p, s) => `r${p}-${s}`;
  const KEY = {
    ru: [["1:30", "вступительная речь — не больше полутора минут"], ["2/3", "делегаций нужно для кворума"], ["2/3", "голосов — чтобы принять резолюцию или закрыть прения"], ["4 + 1/5", "авторов и подписантов, чтобы внести проект резолюции"], ["30 мин", "на представление резолюции и вопросы"], ["1 мин", "на право на ответ"]],
    en: [["1:30", "opening speech — no longer than one and a half minutes"], ["2/3", "of member states for a quorum"], ["2/3", "of votes to adopt a resolution or close debate"], ["4 + 1/5", "sponsors and signatories to table a draft resolution"], ["30 min", "to present a resolution and answer questions"], ["1 min", "for a right of reply"]],
  };
  const T = {
    ru: { search: "Поиск по регламенту", found: "найдено", none: "Ничего не нашлось", key: "Главное в цифрах", toc: "Содержание", src: "Регламент Модели ООН ННГУ · карманный справочник делегата" },
    en: { search: "Search the rules", found: "found", none: "Nothing found", key: "Key numbers", toc: "Contents", src: "LSU MUN Rules of Procedure · delegate's handbook" },
  };
  const root = $("#rules");
  let q = "";
  const hl = (t) => { const e = esc(t); if (!q) return e; return e.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (m) => `<mark>${m}</mark>`); };
  const para = (t) => /^([a-zа-я]\)|\d+\.|-|•)/i.test(t) ? `<p class="li">${hl(t)}</p>` : `<p>${hl(t)}</p>`;
  const render = () => {
    const D = RULES[LANG] || RULES.ru, u = T[LANG] || T.ru;
    let hits = 0;
    const body = D.map((p, pi) => {
      const secs = p.sections.map((s, si) => {
        const txt = (s.title + " " + s.paras.join(" ")).toLowerCase();
        if (q && !txt.includes(q.toLowerCase())) return "";
        hits++;
        return `<article class="rule" id="${slug(pi, si)}"><h3>${hl(s.title)}</h3>${s.paras.map(para).join("")}</article>`;
      }).join("");
      return secs ? `<section class="rule-part"><h2>${esc(p.title)}</h2>${secs}</section>` : "";
    }).join("");
    root.innerHTML = `
      <div class="key-nums">${KEY[LANG].map(([n, d]) => `<div><b>${n}</b><span>${d}</span></div>`).join("")}</div>
      <div class="rules-grid">
        <nav class="rules-toc" aria-label="${u.toc}"><p class="sub">${u.toc}</p>${D.map((p, pi) => `<p class="tp">${esc(p.title)}</p><ol>${p.sections.map((s, si) => `<li><a href="#${slug(pi, si)}">${esc(s.title)}</a></li>`).join("")}</ol>`).join("")}</nav>
        <div>
          <div class="rules-search"><input type="search" id="rq" value="${esc(q)}" placeholder="${u.search}" aria-label="${u.search}"><span>${q ? (hits ? `${u.found}: ${hits}` : u.none) : ""}</span></div>
          <div class="rules-body">${body || `<p class="muted">${u.none}</p>`}</div>
          <p class="muted" style="margin-top:28px;font-size:14px">${u.src}</p>
        </div>
      </div>`;
    const inp = $("#rq");
    inp.oninput = () => { q = inp.value.trim(); const pos = inp.selectionStart; render(); const n = $("#rq"); n.focus(); n.setSelectionRange(pos, pos); };
  };
  const ap = window.applyLang;
  window.applyLang = () => { ap(); render(); };
  render();
})();
