// Личный кабинет делегата и председателя. Пока сервера нет — демо: всё хранится в браузере (localStorage).
// Когда появится сервер, заменить store.load/store.save на запросы к API — разметка и логика останутся.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  Object.assign(I18N.ru, {
    "c.tab.home": "Главная", "c.free2": "свободно", "c.taken": "занята", "c.pick": "Нажмите на свободную страну — она подставится в заявку.", "c.ofN": "из", "c.chosen": "Выбрано", "c.tab.overview": "Обзор", "c.tab.app": "Заявка", "c.tab.paper": "Позиция и речь", "c.tab.schedule": "Расписание", "c.tab.inbox": "Сообщения",
    "c.tab.roster": "Комитет", "c.tab.apps": "Заявки", "c.tab.roll": "Перекличка", "c.tab.speakers": "Ораторы", "c.tab.vote": "Голосование", "c.tab.awards": "Награды",
    "c.session": "IV сессия · весна 2027", "c.demoCom": "Комитеты 2027 года ещё не объявлены — в демо используются комитеты 2026 года.",
    "c.st1": "Заявка", "c.st2": "Страна", "c.st3": "Позиционное письмо", "c.st4": "Регистрация на месте", "c.st5": "Сертификат",
    "c.yourCountry": "Ваша страна", "c.notAssigned": "ещё не назначена", "c.yourCom": "Комитет", "c.nextStep": "Следующий шаг",
    "c.ns.app": "Заполните заявку: комитет и три страны на выбор.", "c.ns.wait": "Заявка у председателя. Страну назначат и пришлют сообщение.", "c.ns.paper": "Загрузите позиционное письмо до начала сессии.", "c.ns.ready": "Всё готово. До встречи на открытии!",
    "c.fio": "ФИО", "c.uni": "Вуз", "c.year": "Курс", "c.contact": "Телефон или ВК", "c.pref": "Страны по приоритету", "c.exp": "Опыт моделей ООН", "c.exp0": "Впервые", "c.exp1": "1–2 модели", "c.exp2": "3 и больше",
    "c.save": "Отправить заявку", "c.saved": "Заявка сохранена", "c.update": "Обновить заявку",
    "c.paper": "Позиционное письмо", "c.paperHint": "Файл .docx или .pdf, до 2 страниц: позиция страны, что она предлагает, с кем готова работать.",
    "c.upload": "Выбрать файл", "c.uploaded": "Загружено", "c.speech": "Вступительная речь", "c.speechHint": "Напишите речь и проверьте, укладываетесь ли в минуту.", "c.start": "Старт", "c.stop": "Стоп", "c.words": "слов", "c.approx": "≈ при чтении вслух",
    "c.schedNote": "Расписание 2027 года появится ближе к сессии. Пока — как всё было в 2026.", "c.day": "День",
    "c.noMsg": "Сообщений пока нет.", "c.from": "Председатель",
    "c.pickCom": "Ваш комитет", "c.country": "Страна", "c.delegate": "Делегат", "c.status": "Статус", "c.free": "свободна", "c.paperOk": "письмо есть", "c.paperNo": "нет письма",
    "c.assign": "Назначить", "c.assignTo": "Назначить страну", "c.noApps": "Новых заявок нет. Заявки делегатов появятся здесь.", "c.prefs": "Хочет", "c.assigned": "Назначено",
    "c.present": "Присутствует", "c.pv": "Присутствует и голосует", "c.absent": "Отсутствует", "c.quorum": "Кворум", "c.simple": "Простое большинство", "c.twothirds": "Две трети", "c.reset": "Сбросить",
    "c.addSpeaker": "Добавить в список", "c.next": "Следующий", "c.time": "Время на речь, с", "c.list": "Список ораторов", "c.empty": "Список пуст",
    "c.voteOn": "Голосуем за", "c.voteDoc": "Проект резолюции 1.1", "c.for": "За", "c.against": "Против", "c.abst": "Воздержался", "c.passes": "Принято", "c.fails": "Не принято", "c.need": "нужно",
    "c.best": "Лучший делегат", "c.outstanding": "Выдающийся делегат", "c.honorable": "Почётное упоминание", "c.note": "Комментарий", "c.awardsSaved": "Сохранено. Секретариат увидит номинации.",
    "c.msgSend": "Написать делегату", "c.msgText": "Текст сообщения", "c.send": "Отправить", "c.sent": "Отправлено",
    "c.hint.role": "Председатели входят по приглашению секретариата. В демо можно войти и так.",
  });
  Object.assign(I18N.en, {
    "c.tab.home": "Home", "c.free2": "open", "c.taken": "taken", "c.pick": "Click an open country to put it into your application.", "c.ofN": "of", "c.chosen": "Selected", "c.tab.overview": "Overview", "c.tab.app": "Application", "c.tab.paper": "Position & speech", "c.tab.schedule": "Schedule", "c.tab.inbox": "Messages",
    "c.tab.roster": "Committee", "c.tab.apps": "Applications", "c.tab.roll": "Roll call", "c.tab.speakers": "Speakers", "c.tab.vote": "Voting", "c.tab.awards": "Awards",
    "c.session": "4th session · spring 2027", "c.demoCom": "The 2027 committees are not announced yet — the demo uses the 2026 committees.",
    "c.st1": "Application", "c.st2": "Country", "c.st3": "Position paper", "c.st4": "On-site check-in", "c.st5": "Certificate",
    "c.yourCountry": "Your country", "c.notAssigned": "not assigned yet", "c.yourCom": "Committee", "c.nextStep": "Next step",
    "c.ns.app": "Fill in the application: a committee and three countries.", "c.ns.wait": "Your application is with the chair. You'll get a message once a country is assigned.", "c.ns.paper": "Upload your position paper before the session.", "c.ns.ready": "All set. See you at the opening!",
    "c.fio": "Full name", "c.uni": "University", "c.year": "Year of study", "c.contact": "Phone or VK", "c.pref": "Countries by priority", "c.exp": "Model UN experience", "c.exp0": "First time", "c.exp1": "1–2 conferences", "c.exp2": "3 or more",
    "c.save": "Submit application", "c.saved": "Application saved", "c.update": "Update application",
    "c.paper": "Position paper", "c.paperHint": ".docx or .pdf, up to 2 pages: your country's position, proposals and partners.",
    "c.upload": "Choose file", "c.uploaded": "Uploaded", "c.speech": "Opening speech", "c.speechHint": "Write your speech and check it fits in a minute.", "c.start": "Start", "c.stop": "Stop", "c.words": "words", "c.approx": "≈ read aloud",
    "c.schedNote": "The 2027 schedule will appear closer to the session. For now — how it went in 2026.", "c.day": "Day",
    "c.noMsg": "No messages yet.", "c.from": "Chair",
    "c.pickCom": "Your committee", "c.country": "Country", "c.delegate": "Delegate", "c.status": "Status", "c.free": "open", "c.paperOk": "paper in", "c.paperNo": "no paper",
    "c.assign": "Assign", "c.assignTo": "Assign a country", "c.noApps": "No new applications. Delegates' applications will appear here.", "c.prefs": "Wants", "c.assigned": "Assigned",
    "c.present": "Present", "c.pv": "Present and voting", "c.absent": "Absent", "c.quorum": "Quorum", "c.simple": "Simple majority", "c.twothirds": "Two-thirds", "c.reset": "Reset",
    "c.addSpeaker": "Add to list", "c.next": "Next", "c.time": "Speaking time, s", "c.list": "Speakers' list", "c.empty": "The list is empty",
    "c.voteOn": "Voting on", "c.voteDoc": "Draft resolution 1.1", "c.for": "For", "c.against": "Against", "c.abst": "Abstain", "c.passes": "Adopted", "c.fails": "Not adopted", "c.need": "needed",
    "c.best": "Best delegate", "c.outstanding": "Outstanding delegate", "c.honorable": "Honourable mention", "c.note": "Comment", "c.awardsSaved": "Saved. The Secretariat will see the nominations.",
    "c.msgSend": "Message a delegate", "c.msgText": "Message", "c.send": "Send", "c.sent": "Sent",
    "c.hint.role": "Chairs sign in by invitation from the Secretariat. In the demo you can sign in anyway.",
  });

  // ---------- хранилище ----------
  const KEY = "lsumun.demo.v1";
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} },
  };
  let db = store.load();
  db.apps ??= [];      // заявки делегатов: {id, email, fio, uni, year, contact, com, prefs[3], exp, country, paper, at}
  db.msgs ??= [];      // сообщения председателя: {to, text, at}
  db.roll ??= {};      // перекличка по комитетам: {com: {country: 'p'|'pv'|'a'}}
  db.speakers ??= {};  // {com: [country]}
  db.votes ??= {};     // {com: {country: 'f'|'a'|'x'}}
  db.awards ??= {};    // {com: {best, outstanding, honorable, note}}
  const save = () => store.save(db);
  const com = (id) => MUN.committees.find((c) => c.id === id) || MUN.committees[0];

  // ---------- вход ----------
  const root = $("#cab");
  const loginView = () => {
    root.innerHTML = `<div class="cab-login">
      <div class="cab-intro"><span class="kicker">${t("c.session")}</span><h1>${t("cab.title")}</h1><p class="lead">${t("cab.lead")}</p></div>
      <form class="cab-card" id="login" autocomplete="on">
        <fieldset class="seg"><legend>${t("cab.role")}</legend>
          <label><input type="radio" name="role" value="delegate" checked><span>${t("cab.delegate")}</span></label>
          <label><input type="radio" name="role" value="chair"><span>${t("cab.chair")}</span></label>
        </fieldset>
        <div class="field"><label for="em">${t("cab.email")}</label><input id="em" type="email" required autocomplete="email"></div>
        <div class="field"><label for="pw">${t("cab.pass")}</label><input id="pw" type="password" required autocomplete="current-password" minlength="1"></div>
        <p class="note" id="rolehint">${t("cab.demo")}</p>
        <button class="btn btn-primary" type="submit">${t("cab.login")}</button>
      </form></div>`;
    const f = $("#login");
    f.addEventListener("change", () => { $("#rolehint").textContent = f.role.value === "chair" ? t("c.hint.role") + " " + t("cab.demo") : t("cab.demo"); });
    f.onsubmit = (e) => {
      e.preventDefault();
      db.session = { role: f.role.value, email: $("#em").value.trim().toLowerCase(), com: db.session?.com || "sc", tab: null };
      save(); render();
    };
  };

  // ---------- общая рамка ----------
  const shell = (tabs, body) => {
    const s = db.session;
    root.innerHTML = `<div class="cab-top">
        <div><span class="kicker">${t(s.role === "chair" ? "cab.chair" : "cab.delegate")} · ${t("c.session")}</span><h1 class="cab-h">${t("cab.hello")}${myApp()?.fio ? ", " + esc(myApp().fio.split(" ")[1] || myApp().fio) : ""}</h1><p class="muted">${esc(s.email)}</p></div>
        <button class="btn btn-ghost btn-s" id="logout">${t("cab.logout")}</button>
      </div>
      <div class="cab-demo">${t("cab.demo")}</div>
      <nav class="tabs" role="tablist">${tabs.map((k) => `<button role="tab" aria-selected="${k === s.tab}" data-tab="${k}">${t("c.tab." + k)}</button>`).join("")}</nav>
      <div class="cab-body">${body}</div>`;
    $("#logout").onclick = () => { delete db.session; save(); render(); };
    $$(".tabs button").forEach((b) => (b.onclick = () => { db.session.tab = b.dataset.tab; save(); render(); }));
  };

  const myApp = () => db.apps.find((a) => a.email === db.session?.email);

  // ---------- кабинет делегата ----------
  const D = {};
  // Главная кабинета: все комитеты, повестки, председатели и свободные страны — выбрать можно сразу.
  D.home = () => {
    const a = myApp();
    return `<p class="cab-demo">${t("c.demoCom")} ${t("c.pick")}</p><div class="cab-coms">${MUN.committees.map((c) => {
      const taken = holders(c), n = c.countries.ru.length, free = n - Object.keys(taken).length;
      return `<article class="cab-com">
        <header><img src="img/com/${c.id}.png" alt=""><div><h3>${esc(L(c.name))}</h3><p class="muted">${esc(L(c.agenda))}</p></div></header>
        <div class="cab-com-meta"><span class="tag${c.lang === "en" ? " en" : ""}">${t("com.lang." + c.lang)}</span>${c.chairs.map((p) => `<span class="tag">${t(p.role === "chair" ? "com.chair" : "com.cochair")}: ${esc(L(p.name))}</span>`).join("")}<span class="tag free">${t("c.free2")}: ${free} ${t("c.ofN")} ${n}</span></div>
        <div class="cab-countries">${L(c.countries).map((x, i) => { const own = a && a.com === c.id && a.prefs?.[0] === i + 1; const tk = taken[i + 1] && taken[i + 1].email !== db.session.email;
          return `<button type="button" data-pick="${c.id}:${i + 1}"${tk ? " disabled" : ""} class="${own ? "own" : ""}" title="${tk ? t("c.taken") : ""}">${esc(x.split(" — ")[0])}</button>`; }).join("")}</div>
      </article>`; }).join("")}</div>`;
  };
  D.overview = () => {
    const a = myApp()?.at ? myApp() : null;
    const step = !a ? 0 : !a.country ? 1 : !a.paper ? 2 : 3;
    const steps = ["c.st1", "c.st2", "c.st3", "c.st4", "c.st5"];
    const c = a ? com(a.com) : null;
    const msg = [t("c.ns.app"), t("c.ns.wait"), t("c.ns.paper"), t("c.ns.ready")][step];
    return `<ol class="track">${steps.map((k, i) => `<li class="${i < step ? "done" : i === step ? "now" : ""}"><span>${i + 1}</span>${t(k)}</li>`).join("")}</ol>
      <div class="cab-grid">
        <div class="cab-card placard-mini"><img src="${c ? `img/com/${c.id}.png` : "img/emblem.png"}" alt=""><small>${t("c.yourCountry")}</small><b>${a?.country ? esc(L(c.countries)[a.country - 1].split(" — ")[0]) : t("c.notAssigned")}</b><span>${c ? esc(L(c.name)) : ""}</span></div>
        <div class="cab-card"><small class="muted">${t("c.nextStep")}</small><p class="big">${msg}</p>
          <button class="btn btn-primary btn-s" data-go="${!a ? "app" : a.country && !a.paper ? "paper" : "inbox"}">${t(!a ? "c.tab.app" : a.country && !a.paper ? "c.tab.paper" : "c.tab.inbox")}</button></div>
      </div>`;
  };
  D.app = () => {
    const a = myApp() || {};
    const c = com(a.com || "sc");
    const opts = (sel) => L(c.countries).map((x, i) => `<option value="${i + 1}"${+sel === i + 1 ? " selected" : ""}>${esc(x)}</option>`).join("");
    return `<p class="cab-demo">${t("c.demoCom")}</p>
      <form class="cab-card form-grid" id="appf">
        <div class="field span2"><label for="fio">${t("c.fio")}</label><input id="fio" required value="${esc(a.fio)}" autocomplete="name"></div>
        <div class="field"><label for="uni">${t("c.uni")}</label><input id="uni" required value="${esc(a.uni)}"></div>
        <div class="field"><label for="yr">${t("c.year")}</label><select id="yr">${[1, 2, 3, 4, 5, 6].map((n) => `<option${+a.year === n ? " selected" : ""}>${n}</option>`).join("")}</select></div>
        <div class="field span2"><label for="ct">${t("c.contact")}</label><input id="ct" required value="${esc(a.contact)}"></div>
        <div class="field span2"><label for="cm">${t("c.yourCom")}</label><select id="cm">${MUN.committees.map((x) => `<option value="${x.id}"${x.id === c.id ? " selected" : ""}>${esc(L(x.name))} · ${t("com.lang." + x.lang)}</option>`).join("")}</select></div>
        <div class="field span2"><label>${t("c.pref")}</label><div class="three">${[0, 1, 2].map((i) => `<select id="p${i}" aria-label="${i + 1}">${opts(a.prefs?.[i] ?? i + 1)}</select>`).join("")}</div></div>
        <div class="field span2"><label for="ex">${t("c.exp")}</label><select id="ex">${["c.exp0", "c.exp1", "c.exp2"].map((k, i) => `<option value="${i}"${+a.exp === i ? " selected" : ""}>${t(k)}</option>`).join("")}</select></div>
        <div class="span2"><button class="btn btn-primary" type="submit">${t(a.at ? "c.update" : "c.save")}</button> <span class="ok" id="okm" hidden>${t("c.saved")}</span></div>
      </form>`;
  };
  D.paper = () => {
    const a = myApp() || {};
    return `<div class="cab-grid">
      <div class="cab-card"><h3>${t("c.paper")}</h3><p class="muted">${t("c.paperHint")}</p>
        <label class="btn btn-ghost btn-s file"><input type="file" id="pf" accept=".doc,.docx,.pdf" hidden>${t("c.upload")}</label>
        ${a.paper ? `<p class="ok">${t("c.uploaded")}: <b>${esc(a.paper.name)}</b> · ${new Date(a.paper.at).toLocaleDateString(LANG)}</p>` : ""}</div>
      <div class="cab-card"><h3>${t("c.speech")}</h3><p class="muted">${t("c.speechHint")}</p>
        <div class="field"><textarea id="sp" rows="6">${esc(a.speech || "")}</textarea></div>
        <div class="timer-row"><span class="timer" id="tm">1:00</span><button class="btn btn-primary btn-s" id="tgo">${t("c.start")}</button><span class="muted" id="wc"></span></div></div>
    </div>`;
  };
  D.schedule = () => `<p class="cab-demo">${t("c.schedNote")}</p><div class="sched">${MUN.sessions[0].schedule.map((p, i) => `<figure><img src="${p}" alt="${t("c.day")} ${i + 1}" data-zoom loading="lazy"></figure>`).join("")}</div>`;
  D.inbox = () => {
    const m = db.msgs.filter((x) => x.to === db.session.email);
    return m.length ? `<div class="msgs">${m.slice().reverse().map((x) => `<div class="cab-card msg"><small class="muted">${t("c.from")} · ${new Date(x.at).toLocaleString(LANG)}</small><p>${esc(x.text)}</p></div>`).join("")}</div>` : `<div class="cab-card"><p class="muted">${t("c.noMsg")}</p></div>`;
  };

  // ---------- кабинет председателя ----------
  const C = {};
  const chairCom = () => com(db.session.com);
  const comPicker = () => `<div class="field inline"><label for="cc">${t("c.pickCom")}</label><select id="cc">${MUN.committees.map((x) => `<option value="${x.id}"${x.id === db.session.com ? " selected" : ""}>${esc(L(x.name))}</option>`).join("")}</select></div>`;
  const holders = (c) => { const m = {}; db.apps.filter((a) => a.com === c.id && a.country).forEach((a) => (m[a.country] = a)); return m; };
  C.roster = () => {
    const c = chairCom(), h = holders(c);
    return `${comPicker()}<p class="cab-demo">${t("c.demoCom")}</p><div class="table-wrap"><table class="tbl"><thead><tr><th>${t("c.country")}</th><th>${t("c.delegate")}</th><th>${t("c.status")}</th></tr></thead><tbody>
      ${L(c.countries).map((x, i) => { const a = h[i + 1]; return `<tr><td><b>${esc(x)}</b></td><td>${a ? esc(a.fio) + `<br><small class="muted">${esc(a.uni)}</small>` : `<span class="muted">${t("c.free")}</span>`}</td><td>${a ? `<span class="pill ${a.paper ? "ok" : "warn"}">${t(a.paper ? "c.paperOk" : "c.paperNo")}</span>` : ""}</td></tr>`; }).join("")}
      </tbody></table></div>
      <form class="cab-card" id="msgf" style="margin-top:18px"><h3>${t("c.msgSend")}</h3>
        <div class="field"><label for="mto">${t("c.delegate")}</label><select id="mto">${Object.values(h).map((a) => `<option value="${esc(a.email)}">${esc(a.fio)}</option>`).join("")}</select></div>
        <div class="field"><label for="mtx">${t("c.msgText")}</label><textarea id="mtx" required></textarea></div>
        <button class="btn btn-primary btn-s"${Object.keys(h).length ? "" : " disabled"}>${t("c.send")}</button> <span class="ok" id="mok" hidden>${t("c.sent")}</span></form>`;
  };
  C.apps = () => {
    const c = chairCom(), h = holders(c);
    const list = db.apps.filter((a) => a.com === c.id && a.at);
    if (!list.length) return `${comPicker()}<div class="cab-card"><p class="muted">${t("c.noApps")}</p></div>`;
    return `${comPicker()}<div class="apps">${list.map((a) => `<div class="cab-card app">
        <div><b>${esc(a.fio)}</b><br><small class="muted">${esc(a.uni)} · ${esc(a.contact)} · ${t(["c.exp0", "c.exp1", "c.exp2"][a.exp || 0])}</small>
        <p style="margin-top:8px"><small class="muted">${t("c.prefs")}:</small> ${a.prefs.map((p) => esc(L(c.countries)[p - 1].split(" — ")[0])).join(", ")}</p></div>
        <div class="assign">${a.country ? `<span class="pill ok">${t("c.assigned")}: ${esc(L(c.countries)[a.country - 1].split(" — ")[0])}</span>` : ""}
          <select data-app="${esc(a.email)}" aria-label="${t("c.assignTo")}">${L(c.countries).map((x, i) => `<option value="${i + 1}"${(a.country || a.prefs.find((p) => !h[p]) || 0) === i + 1 ? " selected" : ""}${h[i + 1] && h[i + 1].email !== a.email ? " disabled" : ""}>${esc(x)}</option>`).join("")}</select>
          <button class="btn btn-primary btn-s" data-assign="${esc(a.email)}">${t("c.assign")}</button></div></div>`).join("")}</div>`;
  };
  const counts = (c) => {
    const r = db.roll[c.id] || {};
    const pres = Object.values(r).filter((v) => v === "p" || v === "pv").length;
    return { pres, quorum: Math.ceil((c.countries.ru.length * 2) / 3), simple: Math.floor(pres / 2) + 1, two: Math.ceil((pres * 2) / 3) };
  };
  C.roll = () => {
    const c = chairCom(), r = db.roll[c.id] || {}, k = counts(c);
    return `${comPicker()}<div class="kpis"><div><b>${k.pres}/${c.countries.ru.length}</b><span>${t("c.present")}</span></div><div><b>${k.quorum}</b><span>${t("c.quorum")}</span></div><div><b>${k.simple}</b><span>${t("c.simple")}</span></div><div><b>${k.two}</b><span>${t("c.twothirds")}</span></div></div>
      <div class="roll">${L(c.countries).map((x, i) => `<div class="roll-row"><b>${esc(x.split(" — ")[0])}</b><div class="seg3">${[["p", "c.present"], ["pv", "c.pv"], ["a", "c.absent"]].map(([v, l]) => `<button data-roll="${i + 1}" data-v="${v}" aria-pressed="${r[i + 1] === v}">${t(l)}</button>`).join("")}</div></div>`).join("")}</div>
      <button class="btn btn-ghost btn-s" id="rreset" style="margin-top:14px">${t("c.reset")}</button>`;
  };
  C.speakers = () => {
    const c = chairCom(), list = db.speakers[c.id] || [];
    const sec = db.session.secs || 60;
    return `${comPicker()}<div class="cab-grid">
      <div class="cab-card"><div class="speaker-now"><small class="muted">${list[0] ? "" : t("c.empty")}</small><b>${list[0] ? esc(L(c.countries)[list[0] - 1].split(" — ")[0]) : "—"}</b><span class="timer big" id="stm">${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}</span></div>
        <div class="timer-row"><button class="btn btn-primary btn-s" id="sgo"${list[0] ? "" : " disabled"}>${t("c.start")}</button><button class="btn btn-ghost btn-s" id="snext"${list[0] ? "" : " disabled"}>${t("c.next")}</button>
        <div class="field inline"><label for="ssec">${t("c.time")}</label><input id="ssec" type="number" min="15" max="300" step="15" value="${sec}" style="width:90px"></div></div></div>
      <div class="cab-card"><h3>${t("c.list")}</h3><ol class="slist">${list.map((p) => `<li>${esc(L(c.countries)[p - 1].split(" — ")[0])}</li>`).join("") || `<li class="muted" style="list-style:none">${t("c.empty")}</li>`}</ol>
        <div class="timer-row"><select id="sadd" aria-label="${t("c.country")}">${L(c.countries).map((x, i) => `<option value="${i + 1}">${esc(x.split(" — ")[0])}</option>`).join("")}</select><button class="btn btn-ghost btn-s" id="sbtn">${t("c.addSpeaker")}</button></div></div></div>`;
  };
  C.vote = () => {
    const c = chairCom(), v = db.votes[c.id] || {}, r = db.roll[c.id] || {};
    const f = Object.values(v).filter((x) => x === "f").length, a = Object.values(v).filter((x) => x === "a").length;
    const need = Math.ceil(((f + a) * 2) / 3); // регламент: резолюция принимается большинством в 2/3 голосов
    return `${comPicker()}<div class="cab-card"><small class="muted">${t("c.voteOn")}</small><h3>${t("c.voteDoc")}</h3>
      <div class="kpis"><div><b>${f}</b><span>${t("c.for")}</span></div><div><b>${a}</b><span>${t("c.against")}</span></div><div><b>${Object.values(v).filter((x) => x === "x").length}</b><span>${t("c.abst")}</span></div><div><b class="${f >= need && f + a > 0 ? "okc" : "badc"}">${f + a ? t(f >= need ? "c.passes" : "c.fails") : "—"}</b><span>${f + a ? `${need} ${t("c.need")}` : ""}</span></div></div></div>
      <div class="roll">${L(c.countries).map((x, i) => `<div class="roll-row"><b>${esc(x.split(" — ")[0])}</b><div class="seg3">${[["f", "c.for"], ["a", "c.against"], ["x", "c.abst"]].map(([k, l]) => `<button data-vote="${i + 1}" data-v="${k}" aria-pressed="${v[i + 1] === k}"${r[i + 1] === "pv" && k === "x" ? " disabled" : ""}${r[i + 1] === "a" ? " disabled" : ""}>${t(l)}</button>`).join("")}</div></div>`).join("")}</div>
      <button class="btn btn-ghost btn-s" id="vreset" style="margin-top:14px">${t("c.reset")}</button>`;
  };
  C.awards = () => {
    const c = chairCom(), w = db.awards[c.id] || {};
    const sel = (k) => `<div class="field"><label for="aw-${k}">${t("c." + k)}</label><select id="aw-${k}"><option value="">—</option>${L(c.countries).map((x, i) => `<option value="${i + 1}"${+w[k] === i + 1 ? " selected" : ""}>${esc(x.split(" — ")[0])}</option>`).join("")}</select></div>`;
    return `${comPicker()}<form class="cab-card" id="awf">${sel("best")}${sel("outstanding")}${sel("honorable")}
      <div class="field"><label for="aw-note">${t("c.note")}</label><textarea id="aw-note">${esc(w.note || "")}</textarea></div>
      <button class="btn btn-primary btn-s">${t("c.save").split(" ")[0]}</button> <span class="ok" id="aok" hidden>${t("c.awardsSaved")}</span></form>`;
  };

  // ---------- отрисовка и события ----------
  let timer = null;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
  const render = () => {
    clearInterval(timer);
    const s = db.session;
    if (!s) return loginView();
    const tabs = s.role === "chair" ? ["roster", "apps", "roll", "speakers", "vote", "awards"] : ["home", "overview", "app", "paper", "schedule", "inbox"];
    if (!tabs.includes(s.tab)) s.tab = tabs[0];
    shell(tabs, (s.role === "chair" ? C : D)[s.tab]());
    bind();
  };
  const bind = () => {
    $$("[data-go]").forEach((b) => (b.onclick = () => { db.session.tab = b.dataset.go; save(); render(); }));
    $$("[data-pick]").forEach((b) => (b.onclick = () => {
      const [cid, n] = b.dataset.pick.split(":");
      let a = myApp();
      if (!a) { a = { email: db.session.email, draft: true }; db.apps.push(a); }
      if (a.com !== cid) { a.com = cid; delete a.country; a.prefs = [+n, +n === 1 ? 2 : 1, +n <= 2 ? 3 : 2]; }
      else a.prefs = [+n, ...(a.prefs || []).filter((p) => p !== +n)].slice(0, 3);
      while (a.prefs.length < 3) a.prefs.push(a.prefs.length + 1);
      db.session.tab = "app"; save(); render();
    }));
    const cc = $("#cc");
    if (cc) cc.onchange = () => { db.session.com = cc.value; save(); render(); };
    // заявка
    const af = $("#appf");
    if (af) {
      $("#cm").onchange = () => { const a = myApp() || { email: db.session.email }; a.com = $("#cm").value; a.prefs = [1, 2, 3]; if (!myApp()) a.draft = true, db.apps.push(a); render(); };
      af.onsubmit = (e) => {
        e.preventDefault();
        let a = myApp();
        if (!a) { a = { email: db.session.email }; db.apps.push(a); }
        const old = a.com;
        Object.assign(a, { fio: $("#fio").value.trim(), uni: $("#uni").value.trim(), year: +$("#yr").value, contact: $("#ct").value.trim(), com: $("#cm").value, prefs: [0, 1, 2].map((i) => +$("#p" + i).value), exp: +$("#ex").value, at: a.at || Date.now() });
        delete a.draft;
        if (old && old !== a.com) delete a.country;
        save(); render(); $("#okm") && ($("#okm").hidden = false);
      };
    }
    // письмо и речь
    const pf = $("#pf");
    if (pf) pf.onchange = () => { const f = pf.files[0]; if (!f) return; let a = myApp(); if (!a?.at) { db.session.tab = "app"; save(); return render(); } a.paper = { name: f.name, size: f.size, at: Date.now() }; save(); render(); };
    const sp = $("#sp");
    if (sp) {
      const wc = () => { const n = (sp.value.match(/\S+/g) || []).length; $("#wc").textContent = `${n} ${t("c.words")} · ${fmt(Math.round(n / 2.2))} ${t("c.approx")}`; };
      sp.oninput = () => { const a = myApp(); if (a) { a.speech = sp.value; save(); } wc(); };
      wc();
      let left = 60, on = false;
      $("#tgo").onclick = () => {
        on = !on; $("#tgo").textContent = t(on ? "c.stop" : "c.start");
        if (on) { if (left <= 0) left = 60; timer = setInterval(() => { left--; $("#tm").textContent = fmt(left); $("#tm").classList.toggle("over", left <= 10); if (left <= 0) { clearInterval(timer); on = false; $("#tgo").textContent = t("c.start"); } }, 1000); }
        else clearInterval(timer);
      };
    }
    // председатель: назначение
    $$("[data-assign]").forEach((b) => (b.onclick = () => {
      const a = db.apps.find((x) => x.email === b.dataset.assign), sel = $(`select[data-app="${CSS.escape(b.dataset.assign)}"]`);
      a.country = +sel.value;
      const c = com(a.com);
      db.msgs.push({ to: a.email, at: Date.now(), text: (LANG === "en" ? `You represent ${L(c.countries)[a.country - 1].split(" — ")[0]} in the ${L(c.name)}. Please upload your position paper.` : `Вы представляете страну: ${L(c.countries)[a.country - 1].split(" — ")[0]} (${L(c.name)}). Загрузите позиционное письмо в кабинете.`) });
      save(); render();
    }));
    const mf = $("#msgf");
    if (mf) mf.onsubmit = (e) => { e.preventDefault(); db.msgs.push({ to: $("#mto").value, text: $("#mtx").value.trim(), at: Date.now() }); save(); $("#mtx").value = ""; $("#mok").hidden = false; };
    // перекличка
    $$("[data-roll]").forEach((b) => (b.onclick = () => { const c = chairCom(); (db.roll[c.id] ??= {})[b.dataset.roll] = b.dataset.v; save(); render(); }));
    $("#rreset") && ($("#rreset").onclick = () => { delete db.roll[chairCom().id]; save(); render(); });
    // голосование
    $$("[data-vote]").forEach((b) => (b.onclick = () => { const c = chairCom(); (db.votes[c.id] ??= {})[b.dataset.vote] = b.dataset.v; save(); render(); }));
    $("#vreset") && ($("#vreset").onclick = () => { delete db.votes[chairCom().id]; save(); render(); });
    // ораторы
    if ($("#sbtn")) {
      const c = chairCom();
      $("#sbtn").onclick = () => { (db.speakers[c.id] ??= []).push(+$("#sadd").value); save(); render(); };
      $("#ssec").onchange = () => { db.session.secs = Math.max(15, Math.min(300, +$("#ssec").value || 60)); save(); render(); };
      $("#snext").onclick = () => { (db.speakers[c.id] ??= []).shift(); save(); render(); };
      let left = db.session.secs || 60, on = false;
      $("#sgo").onclick = () => {
        on = !on; $("#sgo").textContent = t(on ? "c.stop" : "c.start");
        if (on) timer = setInterval(() => { left--; $("#stm").textContent = fmt(left); $("#stm").classList.toggle("over", left <= 10); if (left <= 0) { clearInterval(timer); on = false; $("#sgo").textContent = t("c.start"); } }, 1000);
        else clearInterval(timer);
      };
    }
    // награды
    const awf = $("#awf");
    if (awf) awf.onsubmit = (e) => { e.preventDefault(); db.awards[chairCom().id] = { best: $("#aw-best").value, outstanding: $("#aw-outstanding").value, honorable: $("#aw-honorable").value, note: $("#aw-note").value }; save(); $("#aok").hidden = false; };
  };

  const ap = window.applyLang;
  window.applyLang = () => { ap(); render(); };
  render();
})();
