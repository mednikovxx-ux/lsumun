// Общие части всех страниц (шапка, подвал, язык, лайтбокс) и отрисовка разделов из data.js.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const page = document.body.dataset.page;
  const initials = (n) => { const w = n.split(" "); return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase(); };
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const user = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>';
  window.ICONS = { arrow, user };

  // Шапка
  const links = [["spring2027.html", "nav.spring", "spring"], ["committees.html", "nav.committees", "committees"], ["team.html", "nav.team", "team"], ["prepare.html", "nav.prepare", "prepare"], ["rules.html", "nav.rules", "rules"], ["archive.html", "nav.archive", "archive"]];
  const head = document.createElement("header");
  head.className = "site-head";
  head.innerHTML = `<div class="wrap head-in">
    <a class="brand" href="index.html"><img src="img/emblem.png" alt=""><span><b data-i18n="brand.name"></b><small data-i18n="brand.sub"></small></span></a>
    <nav class="nav" id="nav">${links.map(([h, k, p]) => `<a href="${h}" data-i18n="${k}"${p === page ? ' aria-current="page"' : ""}></a>`).join("")}</nav>
    <div class="lang" role="group" aria-label="Language"><button type="button" data-l="ru">RU</button><button type="button" data-l="en">EN</button></div>
    <a class="btn btn-primary btn-s head-cab" href="cabinet.html">${user}<span data-i18n="nav.cabinet"></span></a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span></button>
  </div>`;
  document.body.prepend(head);
  const burger = $(".burger", head), nav = $("#nav", head);
  burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  $$("a", nav).forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  addEventListener("scroll", () => head.classList.toggle("scrolled", scrollY > 8), { passive: true });
  $$(".lang button", head).forEach((b) => (b.onclick = () => setLang(b.dataset.l)));

  // Подвал
  const foot = document.createElement("footer");
  foot.className = "site-foot";
  foot.innerHTML = `<div class="wrap"><div class="foot-grid">
      <div class="foot-brand"><img src="img/emblem-white.png" alt=""><div><b data-i18n="brand.name"></b><span data-i18n="foot.text"></span></div></div>
      <a class="foot-org" href="https://www.unn.ru/" target="_blank" rel="noopener"><small data-i18n="org.label"></small><img src="img/unn-white.svg" alt="ННГУ им. Н. И. Лобачевского"></a>
      <nav class="foot-nav"><a href="index.html" data-i18n="nav.home"></a>${links.map(([h, k]) => `<a href="${h}" data-i18n="${k}"></a>`).join("")}<a href="${MUN.vk}" target="_blank" rel="noopener" data-i18n="foot.vk"></a></nav>
    </div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} · <span data-i18n="foot.made"></span></span><span>#UNITEDBYUN · #LSUMUN</span></div></div>`;
  document.body.append(foot);

  // Лайтбокс для фото
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>';
  document.body.append(lb);
  const closeLb = () => lb.classList.remove("open");
  lb.onclick = (e) => { if (e.target !== $("img", lb)) closeLb(); };
  addEventListener("keydown", (e) => e.key === "Escape" && closeLb());
  document.addEventListener("click", (e) => {
    const img = e.target.closest("[data-zoom]");
    if (!img) return;
    $("img", lb).src = img.dataset.zoom || img.src;
    lb.classList.add("open");
  });

  // Появление при прокрутке
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" }) : null;
  window.reveal = () => $$(".rv:not(.in)").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  // Цифры «набегают» от нуля, когда блок появляется на экране
  const countUp = () => {
    const els = $$("[data-count]:not([data-done])");
    if (!els.length) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (el) => {
      el.dataset.done = 1;
      const to = +el.dataset.count, suf = el.dataset.suffix || "";
      if (still) return void (el.textContent = to + suf);
      const dur = 1400 + Math.min(to, 300) * 2, t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(to * e) + (p === 1 ? suf : "");
        if (p < 1) requestAnimationFrame(step);
        else el.animate([{ transform: "scale(1.08)" }, { transform: "none" }], { duration: 260, easing: "ease-out" });
      };
      el.textContent = "0";
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) return els.forEach(run);
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io2.unobserve(e.target); run(e.target); } }), { threshold: 0.6 });
    els.forEach((el) => { if (!still) el.textContent = "0"; io2.observe(el); });
  };

  const chairsLine = (c) => c.chairs.map((p) => `${t(p.role === "chair" ? "com.chair" : "com.cochair")}: ${esc(L(p.name))}`).join(" · ");
  const langTag = (c) => `<span class="tag${c.lang === "en" ? " en" : ""}">${t("com.lang." + c.lang)}</span>`;

  /* ---------- Разделы ---------- */
  const R = {};

  R.comGrid = (el) => {
    el.innerHTML = MUN.committees.map((c) => `
      <a class="com-card rv" href="committees.html#${c.id}">
        <div class="ph"><img src="${c.photo}" alt="" loading="lazy"></div>
        <div class="body"><img class="com-emb" src="img/com/${c.id}.png" alt=""><h3>${esc(L(c.name))}</h3><p class="agenda">${esc(L(c.agenda))}</p>
        <div class="meta">${langTag(c)}<span class="tag">${c.countries.ru.length} ${t("com.seats")}</span></div></div>
      </a>`).join("");
  };

  R.comFull = (el) => {
    const aw = MUN.awards2026;
    el.innerHTML = MUN.committees.map((c) => `
      <article class="com-full rv" id="${c.id}">
        <div>
          <div class="ph"><img src="${c.photo}" alt="" loading="lazy" data-zoom></div>
          ${aw[c.id] ? `<div class="award" style="margin-top:14px"><h4>${t("arc.results")} · 2026</h4><ol>${L(aw[c.id]).map((w) => `<li>${esc(w)}</li>`).join("")}</ol></div>` : ""}
        </div>
        <div>
          <span class="kicker">${t("com.kicker")}</span>
          <div class="com-title"><img src="img/com/${c.id}.png" alt=""><h2>${esc(L(c.name))}</h2></div>
          <dl class="dl">
            <div><dt>${t("com.agenda")}</dt><dd>${esc(L(c.agenda))}</dd></div>
            <div><dt>${t("com.lang")}</dt><dd>${t("com.lang." + c.lang)}</dd></div>
            <div><dt>${t(c.chairs.length > 1 ? "com.chairs" : "com.chair")}</dt><dd>${c.chairs.map((p) => `${esc(L(p.name))}${p.role === "cochair" ? ` <span class="muted">(${t("com.cochair").toLowerCase()})</span>` : ""}`).join("<br>")}</dd></div>
          </dl>
          <div class="story"><b>${t("com.how")}</b>${esc(L(c.story))}</div>
          <p class="sub">${t("com.countries")} · ${c.countries.ru.length}</p>
          <div class="countries">${L(c.countries).map((x) => `<span>${esc(x)}</span>`).join("")}</div>
          <div class="com-nav"><a class="btn btn-ghost btn-s" href="${c.topic}" target="_blank" rel="noopener">${t("com.report")} ${arrow}</a></div>
        </div>
      </article>`).join("");
  };

  R.greet = (el) => {
    el.innerHTML = MUN.greetings.map((g) => {
      const q = L(g.quote);
      const ph = g.photo ? `<div class="gph has" style="background-image:url(${g.photo})" role="img" aria-label="${esc(L(g.name))}"></div>` : `<div class="gph" aria-hidden="true">${initials(L(g.name))}</div>`;
      const quote = `<blockquote class="${q ? "" : "soon"}">${q ? esc(q) : t("greet.quoteSoon")}</blockquote>`;
      const who = `<div><div class="gname">${esc(L(g.name))}</div><div class="gtitle">${esc(L(g.title))}</div></div>`;
      if (g.lead) return `<article class="greet rv lead-g${g.photo ? " with-photo" : ""}">${ph}<div class="gbody">${quote}${who}</div></article>`;
      return `<article class="greet sm rv"><div class="ghead">${ph}${who}</div>${quote}</article>`;
    }).join("");
  };

  R.gallery = (el) => {
    const pics = [...MUN.sessions[0].photos.slice(0, 5), ...MUN.gallery];
    el.innerHTML = pics.map((p) => `<figure class="rv"><img src="${p}" alt="" loading="lazy" data-zoom></figure>`).join("");
  };

  R.team = (el) => {
    const sec = MUN.secretariat.map((p) => `<article class="person big rv"><div class="av">${initials(L(p.name))}</div><div><div class="role">${t("team." + p.role)}</div><h3>${esc(L(p.name))}</h3></div></article>`).join("");
    const ch = MUN.committees.flatMap((c) => c.chairs.map((p) => `<article class="person rv"><div class="av">${initials(L(p.name))}</div><div class="role">${t(p.role === "chair" ? "com.chair" : "com.cochair")}</div><h3>${esc(L(p.name))}</h3><a class="com" href="committees.html#${c.id}">${esc(L(c.name))}</a></article>`)).join("");
    el.innerHTML = `<p class="sub">${t("team.secretariat")}</p><div class="people">${sec}</div><p class="sub" style="margin-top:48px">${t("team.chairs")}</p><div class="people">${ch}</div>`;
  };

  R.archive = (el) => {
    el.innerHTML = MUN.sessions.map((s) => {
      const head = `<div class="yr"><b>${s.year}</b><span>${s.n} ${LANG === "en" ? "session" : "сессия"}</span></div>`;
      if (!s.results) return `<article class="year rv" id="s${s.id}">${head}<div><h2>${esc(L(s.title))}</h2>${s.full ? `<p class="muted" style="margin-bottom:18px">${esc(L(s.full))}</p>` : ""}
        <div class="empty-year"><span>${t("arc.soon")}<br><b>${s.albumSize} ${t("arc.photosN")}</b></span><a class="btn btn-ghost btn-s" href="${s.album}" target="_blank" rel="noopener">${t("arc.album")} ${arrow}</a></div></div></article>`;
      const aw = MUN.awards2026;
      return `<article class="year rv" id="s${s.id}">${head}<div>
        <h2>${esc(L(s.title))}</h2>
        <dl class="dl"><div><dt>${t("arc.dates")}</dt><dd>${esc(L(s.dates))}</dd></div><div><dt>${t("arc.place")}</dt><dd>${esc(L(s.place))}</dd></div></dl>
        <div class="facts"><div><b data-count="${s.facts.committees}">${s.facts.committees}</b><span>${t("arc.committees")}</span></div><div><b data-count="${s.facts.days}">${s.facts.days}</b><span>${t("arc.days")}</span></div></div>
        <div class="story"><b>${t("arc.final")}</b>${t("arc.finalText")}</div>
        <p class="sub">${t("arc.opening")}</p>
        <ul class="muted" style="padding-left:20px;display:grid;gap:6px">${MUN.greetings.map((g) => `<li><b style="color:var(--ink)">${esc(L(g.name))}</b> — ${esc(L(g.title))}</li>`).join("")}<li><b style="color:var(--ink)">${LANG === "en" ? "Denis Leushkin" : "Денис Вячеславович Леушкин"}</b> — ${LANG === "en" ? "PhD in Political Science, Acting Head of the Department of Foreign Regional Studies and Local History" : "Кандидат политических наук, и. о. заведующего кафедрой зарубежного регионоведения и локальной истории"}</li></ul>
        <p class="sub">${t("arc.results")}</p>
        <div class="awards">${MUN.committees.map((c) => `<div class="award"><h4>${esc(L(c.name))}</h4><ol>${L(aw[c.id]).map((w) => `<li>${esc(w)}</li>`).join("")}</ol></div>`).join("")}</div>
        <p class="sub">${t("arc.schedule")}</p>
        <div class="sched">${s.schedule.map((p) => `<img src="${p}" alt="" loading="lazy" data-zoom>`).join("")}</div>
        <p class="sub">${t("arc.photos")}</p>
        <div class="strip">${s.photos.map((p) => `<img src="${p}" alt="" loading="lazy" data-zoom>`).join("")}</div>
        <p style="margin-top:18px"><a class="btn btn-ghost btn-s" href="${s.album}" target="_blank" rel="noopener">${t("arc.album")} ${arrow}</a></p>
      </div></article>`;
    }).join("");
  };

  // Табличка делегата
  R.placard = (root) => {
    const sc = $("#pl-com", root), cc = $("#pl-country", root), stage = $(".plac-stage", root), tent = $(".tent", root), front = $(".front", root);
    const pimg = $(".pimg", root), bimg = $(".bimg", root);
    const keep = sc.value;
    sc.innerHTML = MUN.committees.map((c) => `<option value="${c.id}">${esc(L(c.name))}</option>`).join("");
    if (keep) sc.value = keep;
    let ry = 0, spin = 0;
    const pose = () => tent.style.setProperty("--ry", `${ry + spin}deg`);
    const draw = (turn) => {
      const c = MUN.committees.find((x) => x.id === sc.value) || MUN.committees[0];
      const i = +cc.value || 0, country = L(c.countries)[i].split(" — ")[0];
      const put = () => {
        // настоящая табличка III сессии; если файла нет — рисованная
        front.classList.remove("fallback");
        pimg.alt = country;
        pimg.onerror = () => front.classList.add("fallback");
        pimg.src = `img/plac/${c.id}-${String(i + 1).padStart(2, "0")}.jpg`;
        bimg.src = `img/plac/back-${c.id}.jpg`;
        $(".pc", root).textContent = country;
        $(".pk", root).textContent = L(c.name);
        $(".pfb img", root).src = `img/com/${c.id}.png`;
      };
      if (!turn || matchMedia("(prefers-reduced-motion: reduce)").matches) return put();
      spin += 360; pose(); setTimeout(put, 280);
    };
    const fill = (turn) => {
      const c = MUN.committees.find((x) => x.id === sc.value) || MUN.committees[0];
      const prev = cc.value;
      cc.innerHTML = L(c.countries).map((x, i) => `<option value="${i}">${esc(x)}</option>`).join("");
      if (sc.dataset.last === sc.value && prev) cc.value = prev;
      sc.dataset.last = sc.value;
      draw(turn);
    };
    sc.onchange = () => fill(true); cc.onchange = () => draw(true);
    $("#pl-raise", root).onclick = () => stage.classList.toggle("raised");
    // покрутить табличку мышкой или пальцем
    if (!stage.dataset.bound) {
      stage.dataset.bound = 1;
      let drag = null;
      stage.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, r: ry }; stage.setPointerCapture(e.pointerId); stage.classList.add("dragging"); });
      stage.addEventListener("pointermove", (e) => { if (!drag) return; ry = Math.max(-170, Math.min(170, drag.r + (e.clientX - drag.x) * 0.5)); pose(); });
      const end = () => { drag = null; stage.classList.remove("dragging"); };
      stage.addEventListener("pointerup", end); stage.addEventListener("pointercancel", end);
    }
    pose();
    fill(false);
  };


  const run = () => {
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.l === LANG));
    $$("[data-render]").forEach((el) => R[el.dataset.render] && R[el.dataset.render](el));
    reveal();
    countUp();
  };
  window.MUNRender = R;
  onLang(() => {});
  applyLang();
  run();
  const orig = window.applyLang;
  window.applyLang = () => { orig(); run(); };
  // Переход к якорю после отрисовки (комитеты, архив)
  if (location.hash) setTimeout(() => { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }, 60);
})();
