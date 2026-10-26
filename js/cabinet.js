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
        <header><img src="img/com/${c.id}.webp" alt=""><div><h3>${esc(L(c.name))}</h3><p class="muted">${esc(L(c.agenda))}</p></div></header>
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
        <div class="cab-card placard-mini"><img src="${c ? `img/com/${c.id}.webp` : "img/emblem.webp"}" alt=""><small>${t("c.yourCountry")}</small><b>${a?.country ? esc(L(c.countries)[a.country - 1].split(" — ")[0]) : t("c.notAssigned")}</b><span>${c ? esc(L(c.name)) : ""}</span></div>
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
  Object.assign(I18N.ru, {
    "c.tab.motions": "Моушены", "c.tab.speakers": "Дебаты", "c.tab.vote": "Резолюция",
    "c.holder": "Закреплена за", "c.applied": "Подали заявку", "c.choice": "-й выбор", "c.noOne": "никто", "c.seed": "Заполнить демо-заявками", "c.seedHint": "Заявок в этот комитет пока нет. Для пробы можно добавить вымышленных делегатов.",
    "c.allP": "Все присутствуют", "c.qYes": "есть", "c.qNo": "нет", "c.qNeed": "нужно", "c.noQuorum": "Кворума нет: нужно, чтобы присутствовали две трети стран-членов.", "c.rollFirst": "Перекличка ещё не проведена — голосуют все страны комитета.",
    "c.newMotion": "Новый моушен", "c.mType": "Вид", "c.mBy": "Кто предлагает", "c.mTopic": "Тема", "c.mTotal": "Общее время, мин", "c.mPer": "На оратора, с", "c.mAdd": "Внести",
    "c.mt.mod": "Контролируемые дебаты", "c.mt.unmod": "Неконтролируемые дебаты", "c.mt.agenda": "Установление повестки дня", "c.mt.suspend": "Приостановить заседание", "c.mt.resume": "Возобновить заседание", "c.mt.close": "Прекращение прений", "c.mt.other": "Другое",
    "c.min": "мин", "c.s": "с", "c.secPer": "с на оратора", "c.notVoted": "Не голосовали", "c.needFor": "Нужно «за»", "c.byCountry": "Голоса по странам", "c.restFor": "Остальные — за", "c.restAg": "Остальные — против",
    "c.mPass": "Прошёл", "c.mFail": "Не прошёл", "c.markPass": "Прошёл", "c.markFail": "Не прошёл", "c.change": "Изменить", "c.del": "Удалить", "c.sugPass": "по голосам проходит", "c.sugFail": "по голосам не проходит", "c.noMotions": "Моушенов пока не было. Внесите первый — он появится здесь с голосованием.", "c.procNote": "Процедурные голосования: только «за» или «против», воздерживаться нельзя.",
    "c.startDeb": "Начать дебаты", "c.endDeb": "Завершить дебаты", "c.gen": "Общий список ораторов", "c.left": "осталось", "c.total": "всего", "c.perSp": "на оратора",
    "c.now": "Сейчас говорит", "c.pause": "Пауза", "c.done": "Речь окончена", "c.qs": "Вопросы к оратору", "c.qAdd": "Отметить вопрос", "c.noQ": "Вопросов пока нет",
    "c.queue": "Очередь", "c.toQueue": "В очередь", "c.spoke": "Выступили", "c.used": "Время", "c.qFrom": "Вопросы от", "c.noSpoke": "Пока никто не выступал.", "c.timeUp": "Время дебатов вышло",
    "c.doc": "Документ", "c.record": "Записать в протокол", "c.protocol": "Протокол", "c.noAbst": "«Присутствует и голосует» — воздерживаться нельзя",
  });
  Object.assign(I18N.en, {
    "c.tab.motions": "Motions", "c.tab.speakers": "Debate", "c.tab.vote": "Resolution",
    "c.holder": "Assigned to", "c.applied": "Applied", "c.choice": " choice", "c.noOne": "nobody", "c.seed": "Fill with demo applications", "c.seedHint": "No applications to this committee yet. For a trial you can add fictional delegates.",
    "c.allP": "Everyone present", "c.qYes": "yes", "c.qNo": "no", "c.qNeed": "needed", "c.noQuorum": "No quorum: two-thirds of member states must be present.", "c.rollFirst": "Roll call not taken yet — all countries of the committee vote.",
    "c.newMotion": "New motion", "c.mType": "Type", "c.mBy": "Proposed by", "c.mTopic": "Topic", "c.mTotal": "Total time, min", "c.mPer": "Per speaker, s", "c.mAdd": "Add",
    "c.mt.mod": "Moderated caucus", "c.mt.unmod": "Unmoderated caucus", "c.mt.agenda": "Setting the agenda", "c.mt.suspend": "Suspend the meeting", "c.mt.resume": "Resume the meeting", "c.mt.close": "Closure of debate", "c.mt.other": "Other",
    "c.min": "min", "c.s": "s", "c.secPer": "s per speaker", "c.notVoted": "Not voted", "c.needFor": "Votes for needed", "c.byCountry": "Votes by country", "c.restFor": "Rest — for", "c.restAg": "Rest — against",
    "c.mPass": "Passed", "c.mFail": "Failed", "c.markPass": "Passed", "c.markFail": "Failed", "c.change": "Change", "c.del": "Delete", "c.sugPass": "passes by the votes", "c.sugFail": "fails by the votes", "c.noMotions": "No motions yet. Add the first one — it will appear here with its vote.", "c.procNote": "Procedural votes: for or against only, no abstentions.",
    "c.startDeb": "Start debate", "c.endDeb": "End debate", "c.gen": "General speakers' list", "c.left": "left", "c.total": "total", "c.perSp": "per speaker",
    "c.now": "Now speaking", "c.pause": "Pause", "c.done": "Speech over", "c.qs": "Questions to the speaker", "c.qAdd": "Mark a question", "c.noQ": "No questions yet",
    "c.queue": "Queue", "c.toQueue": "Add to queue", "c.spoke": "Spoke", "c.used": "Time", "c.qFrom": "Questions from", "c.noSpoke": "Nobody has spoken yet.", "c.timeUp": "Debate time is up",
    "c.doc": "Document", "c.record": "Record in the minutes", "c.protocol": "Minutes", "c.noAbst": "“Present and voting” — cannot abstain",
  });
  db.motions ??= {};   // {com: [{id, type, by, topic, total, per, votes: {country: 'f'|'a'}, res: 'pass'|'fail'|null, at}]}
  db.debate ??= {};    // {com: {mid, queue: [country], q: [country], log: [{n, used, q, mid}]}}
  db.resdoc ??= {};    // {com: название проекта резолюции}
  db.results ??= {};   // {com: [{doc, f, a, x, ok, at}]}
  const C = {};
  const chairCom = () => com(db.session.com);
  const cn = (c, n) => L(c.countries)[n - 1].split(" — ")[0];
  const hm = (ts) => new Date(ts).toLocaleTimeString(LANG, { hour: "2-digit", minute: "2-digit" });
  const tally = (v, k) => Object.values(v || {}).filter((x) => x === k).length;
  const comPicker = () => `<div class="field inline"><label for="cc">${t("c.pickCom")}</label><select id="cc">${MUN.committees.map((x) => `<option value="${x.id}"${x.id === db.session.com ? " selected" : ""}>${esc(L(x.name))}</option>`).join("")}</select></div>`;
  const holders = (c) => { const m = {}; db.apps.filter((a) => a.com === c.id && a.country).forEach((a) => (m[a.country] = a)); return m; };
  const wants = (c) => { const m = {}; db.apps.filter((a) => a.com === c.id && a.at).forEach((a) => (a.prefs || []).forEach((p, i) => (m[p] ??= []).push({ a, i }))); return m; };
  const cOpts = (c, list) => list.map((n) => `<option value="${n}">${esc(cn(c, n))}</option>`).join("");
  const all = (c) => c.countries.ru.map((_, i) => i + 1);
  // кто голосует: присутствующие по перекличке; пока перекличка пустая — все страны
  const voters = (c) => { const r = db.roll[c.id] || {}; return Object.keys(r).length ? all(c).filter((n) => r[n] === "p" || r[n] === "pv") : all(c); };

  C.roster = () => {
    const c = chairCom(), h = holders(c), w = wants(c);
    const seed = db.apps.some((a) => a.com === c.id && a.at) ? "" : `<div class="cab-card" style="margin-bottom:16px"><p class="muted">${t("c.seedHint")}</p><div><button class="btn btn-ghost btn-s" id="seed">${t("c.seed")}</button></div></div>`;
    return `${comPicker()}<p class="cab-demo">${t("c.demoCom")}</p>${seed}<div class="table-wrap"><table class="tbl"><thead><tr><th>${t("c.country")}</th><th>${t("c.holder")}</th><th>${t("c.applied")}</th></tr></thead><tbody>
      ${all(c).map((n) => { const a = h[n], ws = w[n] || []; return `<tr><td><b>${esc(L(c.countries)[n - 1])}</b></td>
        <td>${a ? `${esc(a.fio)}<br><small class="muted">${esc(a.uni)}</small><br><span class="pill ${a.paper ? "ok" : "warn"}">${t(a.paper ? "c.paperOk" : "c.paperNo")}</span>` : `<span class="muted">${t("c.free")}</span>`}</td>
        <td>${ws.length ? `<div class="wants">${ws.sort((x, y) => x.i - y.i).map(({ a: x, i }) => `<span class="want${x.country === n ? " on" : x.country ? " off" : ""}">${esc(x.fio)} <small>${i + 1}${t("c.choice")}</small></span>`).join("")}</div>` : `<span class="muted">${t("c.noOne")}</span>`}</td></tr>`; }).join("")}
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
        <p style="margin-top:8px"><small class="muted">${t("c.prefs")}:</small> ${a.prefs.map((p) => esc(cn(c, p))).join(", ")}</p></div>
        <div class="assign">${a.country ? `<span class="pill ok">${t("c.assigned")}: ${esc(cn(c, a.country))}</span>` : ""}
          <select data-app="${esc(a.email)}" aria-label="${t("c.assignTo")}">${L(c.countries).map((x, i) => `<option value="${i + 1}"${(a.country || a.prefs.find((p) => !h[p]) || 0) === i + 1 ? " selected" : ""}${h[i + 1] && h[i + 1].email !== a.email ? " disabled" : ""}>${esc(x)}</option>`).join("")}</select>
          <button class="btn btn-primary btn-s" data-assign="${esc(a.email)}">${t("c.assign")}</button></div></div>`).join("")}</div>`;
  };
  const counts = (c) => {
    const r = db.roll[c.id] || {}, N = c.countries.ru.length;
    const pres = Object.values(r).filter((v) => v === "p" || v === "pv").length;
    const quorum = Math.ceil((N * 2) / 3); // регламент: не менее двух третей государств-членов
    return { N, pres, quorum, ok: pres >= quorum, simple: Math.floor(pres / 2) + 1, two: Math.ceil((pres * 2) / 3) };
  };
  C.roll = () => {
    const c = chairCom(), r = db.roll[c.id] || {}, k = counts(c);
    return `${comPicker()}<div class="kpis"><div><b>${k.pres}/${k.N}</b><span>${t("c.present")}</span></div><div><b class="${k.ok ? "okc" : "badc"}">${t(k.ok ? "c.qYes" : "c.qNo")}</b><span>${t("c.quorum")} · ${t("c.qNeed")} ${k.quorum}</span></div><div><b>${k.simple}</b><span>${t("c.simple")}</span></div><div><b>${k.two}</b><span>${t("c.twothirds")}</span></div></div>
      <div class="roll">${all(c).map((n) => `<div class="roll-row"><b>${esc(cn(c, n))}</b><div class="seg3">${[["p", "c.present"], ["pv", "c.pv"], ["a", "c.absent"]].map(([v, l]) => `<button data-roll="${n}" data-v="${v}" aria-pressed="${r[n] === v}">${t(l)}</button>`).join("")}</div></div>`).join("")}</div>
      <div class="timer-row" style="margin-top:14px"><button class="btn btn-ghost btn-s" id="rall">${t("c.allP")}</button><button class="btn btn-ghost btn-s" id="rreset">${t("c.reset")}</button></div>`;
  };

  // моушены: процедурные — простое большинство присутствующих, прекращение прений — две трети
  const MT = { mod: ["s", "topic", "total", "per"], unmod: ["s", "total"], agenda: ["s", "topic"], suspend: ["s"], resume: ["s"], close: ["t"], other: ["s", "topic"] };
  const need = (c, m) => { const n = voters(c).length; return MT[m.type][0] === "t" ? Math.ceil((n * 2) / 3) : Math.floor(n / 2) + 1; };
  const mMeta = (m) => [m.topic && `«${esc(m.topic)}»`, m.total && `${m.total} ${t("c.min")}`, m.per && `${m.per} ${t("c.secPer")}`].filter(Boolean).join(" · ");
  C.motions = () => {
    const c = chairCom(), list = db.motions[c.id] || [], vs = voters(c), r = db.roll[c.id] || {};
    const form = `<form class="cab-card" id="mof"><h3>${t("c.newMotion")}</h3><div class="mo-grid">
        <div class="field"><label for="mo-t">${t("c.mType")}</label><select id="mo-t">${Object.keys(MT).map((k) => `<option value="${k}">${t("c.mt." + k)}</option>`).join("")}</select></div>
        <div class="field"><label for="mo-by">${t("c.mBy")}</label><select id="mo-by">${cOpts(c, vs)}</select></div>
        <div class="field" data-f="topic"><label for="mo-topic">${t("c.mTopic")}</label><input id="mo-topic" autocomplete="off"></div>
        <div class="field" data-f="total"><label for="mo-total">${t("c.mTotal")}</label><input id="mo-total" type="number" min="1" max="180" value="15"></div>
        <div class="field" data-f="per"><label for="mo-per">${t("c.mPer")}</label><input id="mo-per" type="number" min="15" max="300" step="15" value="60"></div>
      </div><div><button class="btn btn-primary btn-s">${t("c.mAdd")}</button></div></form>`;
    const card = (m) => {
      const f = tally(m.votes, "f"), a = tally(m.votes, "a"), nd = need(c, m), sug = f >= nd;
      const deb = (m.type === "mod" || m.type === "unmod") && m.res === "pass";
      return `<div class="cab-card mo${m.res ? " mo-" + m.res : ""}">
        <div class="mo-head"><div><small class="muted">${hm(m.at)} · ${esc(cn(c, m.by))}</small><h3>${t("c.mt." + m.type)}</h3>${mMeta(m) ? `<p class="mo-meta">${mMeta(m)}</p>` : ""}</div>
          ${m.res ? `<span class="pill ${m.res === "pass" ? "ok" : "bad"}">${t(m.res === "pass" ? "c.mPass" : "c.mFail")}</span>` : ""}</div>
        <div class="kpis"><div><b>${f}</b><span>${t("c.for")}</span></div><div><b>${a}</b><span>${t("c.against")}</span></div><div><b>${Math.max(0, vs.length - f - a)}</b><span>${t("c.notVoted")}</span></div><div><b class="${sug ? "okc" : "badc"}">${nd}</b><span>${t("c.needFor")}</span></div></div>
        ${m.res ? "" : `<details class="mo-votes" open><summary>${t("c.byCountry")}</summary>
          <div class="roll flat">${vs.map((n) => `<div class="roll-row"><b>${esc(cn(c, n))}</b><div class="seg3">${[["f", "c.for"], ["a", "c.against"]].map(([k, l]) => `<button data-mv="${m.id}:${n}" data-v="${k}" aria-pressed="${m.votes[n] === k}">${t(l)}</button>`).join("")}</div></div>`).join("")}</div>
          <div class="timer-row"><button class="btn btn-ghost btn-s" data-mrest="${m.id}" data-v="f">${t("c.restFor")}</button><button class="btn btn-ghost btn-s" data-mrest="${m.id}" data-v="a">${t("c.restAg")}</button></div></details>`}
        <div class="timer-row">${m.res
          ? `${deb ? `<button class="btn btn-primary btn-s" data-mstart="${m.id}">${t("c.startDeb")}</button>` : ""}<button class="btn btn-ghost btn-s" data-mres="${m.id}" data-v="">${t("c.change")}</button>`
          : `<button class="btn btn-primary btn-s" data-mres="${m.id}" data-v="pass">${t("c.markPass")}</button><button class="btn btn-ghost btn-s" data-mres="${m.id}" data-v="fail">${t("c.markFail")}</button><small class="muted">${t(sug ? "c.sugPass" : "c.sugFail")}</small>`}
          <button class="linkbtn" data-mdel="${m.id}">${t("c.del")}</button></div></div>`;
    };
    return `${comPicker()}${Object.keys(r).length ? (counts(c).ok ? "" : `<p class="cab-demo warnc">${t("c.noQuorum")}</p>`) : `<p class="cab-demo">${t("c.rollFirst")}</p>`}
      <div class="mo-wrap">${form}<p class="muted" style="margin:0">${t("c.procNote")}</p>
      ${list.length ? list.slice().reverse().map(card).join("") : `<div class="cab-card"><p class="muted">${t("c.noMotions")}</p></div>`}</div>`;
  };

  // дебаты: общий список, контролируемые или неконтролируемые; часы считаются от времени старта, переживают переключение вкладок
  const deb = (c) => (db.debate[c.id] ??= { mid: null, queue: db.speakers[c.id] || [], q: [], log: [] });
  const curM = (c) => (db.motions[c.id] || []).find((m) => m.id === deb(c).mid);
  let clock = { key: "", base: 0, t0: 0 }, ctick = null;
  const left = () => Math.ceil(clock.base - (clock.t0 ? (Date.now() - clock.t0) / 1000 : 0));
  const clockFor = (key, base) => { if (clock.key !== key) clock = { key, base, t0: 0 }; };
  const spent = (c, m) => deb(c).log.filter((x) => x.mid === m.id).reduce((s, x) => s + x.used, 0);
  C.speakers = () => {
    const c = chairCom(), d = deb(c), m = curM(c), vs = voters(c);
    if (m && m.type === "unmod") {
      clockFor(`${c.id}:u:${m.id}`, m.total * 60);
      return `${comPicker()}<div class="cab-card deb-head"><div><small class="muted">${esc(cn(c, m.by))}</small><h3>${t("c.mt.unmod")}</h3><p class="mo-meta">${mMeta(m)}</p></div><button class="btn btn-ghost btn-s" id="dend">${t("c.endDeb")}</button></div>
        <div class="cab-card speaker-now" style="margin-top:18px;text-align:center"><span class="timer big" id="stm" data-kind="unmod">${fmt(left())}</span>
          <div class="timer-row" style="justify-content:center"><button class="btn btn-primary btn-s" id="sgo">${t(clock.t0 ? "c.pause" : "c.start")}</button></div></div>`;
    }
    const per = m ? m.per : db.session.secs || 60;
    clockFor(`${c.id}:${m ? m.id : "gen"}:${d.log.length}`, per);
    const cur = d.queue[0], log = d.log.filter((x) => x.mid === (m ? m.id : null));
    const rest = m ? m.total * 60 - spent(c, m) : 0;
    return `${comPicker()}<div class="cab-card deb-head"><div>${m ? `<small class="muted">${esc(cn(c, m.by))}</small><h3>${t("c.mt.mod")}</h3><p class="mo-meta">${m.topic ? `«${esc(m.topic)}» · ` : ""}${t("c.total")} ${m.total} ${t("c.min")} · ${t("c.perSp")} ${m.per} ${t("c.s")} · <b id="dleft" data-rest="${rest}">${t("c.left")} ${fmt(rest)}</b></p>` : `<h3>${t("c.gen")}</h3>`}</div>
        ${m ? `<button class="btn btn-ghost btn-s" id="dend">${t("c.endDeb")}</button>` : `<div class="field inline"><label for="ssec">${t("c.time")}</label><input id="ssec" type="number" min="15" max="300" step="15" value="${per}" style="width:90px"></div>`}</div>
      <div class="cab-grid" style="margin-top:18px">
        <div class="cab-card"><div class="speaker-now"><small class="muted">${cur ? t("c.now") : t("c.empty")}</small><b>${cur ? esc(cn(c, cur)) : "—"}</b><span class="timer big" id="stm">${fmt(left())}</span></div>
          <div class="timer-row"><button class="btn btn-primary btn-s" id="sgo"${cur ? "" : " disabled"}>${t(clock.t0 ? "c.pause" : "c.start")}</button><button class="btn btn-ghost btn-s" id="sdone"${cur ? "" : " disabled"}>${t("c.done")}</button></div>
          <div class="qbox"><small class="muted">${t("c.qs")}</small><div class="wants">${d.q.length ? d.q.map((n, i) => `<span class="want">${esc(cn(c, n))} <button class="x" data-qdel="${i}" aria-label="${t("c.del")}">×</button></span>`).join("") : `<span class="muted">${t("c.noQ")}</span>`}</div>
            <div class="timer-row"><select id="qadd" aria-label="${t("c.country")}"${cur ? "" : " disabled"}>${cOpts(c, vs.filter((n) => n !== cur))}</select><button class="btn btn-ghost btn-s" id="qbtn"${cur ? "" : " disabled"}>${t("c.qAdd")}</button></div></div></div>
        <div class="cab-card"><h3>${t("c.queue")}</h3><ol class="slist">${d.queue.map((n, i) => `<li><span>${esc(cn(c, n))}</span>${i ? `<button class="x" data-sdel="${i}" aria-label="${t("c.del")}">×</button>` : ""}</li>`).join("") || `<li class="muted" style="list-style:none">${t("c.empty")}</li>`}</ol>
          <div class="timer-row"><select id="sadd" aria-label="${t("c.country")}">${cOpts(c, vs)}</select><button class="btn btn-ghost btn-s" id="sbtn">${t("c.toQueue")}</button></div></div></div>
      <div class="cab-card" style="margin-top:18px"><h3>${t("c.spoke")}</h3>${log.length ? `<div class="table-wrap"><table class="tbl"><thead><tr><th>#</th><th>${t("c.country")}</th><th>${t("c.used")}</th><th>${t("c.qFrom")}</th></tr></thead><tbody>
        ${log.map((x, i) => `<tr><td>${i + 1}</td><td><b>${esc(cn(c, x.n))}</b></td><td>${fmt(x.used)}</td><td>${x.q.length ? x.q.map((n) => esc(cn(c, n))).join(", ") : "—"}</td></tr>`).join("")}</tbody></table></div>` : `<p class="muted">${t("c.noSpoke")}</p>`}</div>`;
  };

  C.vote = () => {
    const c = chairCom(), v = db.votes[c.id] || {}, r = db.roll[c.id] || {}, vs = voters(c), k = counts(c);
    const f = tally(v, "f"), a = tally(v, "a"), x = tally(v, "x");
    const nd = Math.ceil(((f + a) * 2) / 3); // регламент: резолюция принимается большинством в две трети голосов
    const ok = f + a > 0 && f >= nd, hist = db.results[c.id] || [];
    return `${comPicker()}${Object.keys(r).length ? (k.ok ? "" : `<p class="cab-demo warnc">${t("c.noQuorum")}</p>`) : `<p class="cab-demo">${t("c.rollFirst")}</p>`}
      <div class="cab-card"><div class="field"><label for="rdoc">${t("c.doc")}</label><input id="rdoc" value="${esc(db.resdoc[c.id] || t("c.voteDoc"))}"></div>
      <div class="kpis"><div><b>${f}</b><span>${t("c.for")}</span></div><div><b>${a}</b><span>${t("c.against")}</span></div><div><b>${x}</b><span>${t("c.abst")}</span></div><div><b class="${f + a ? (ok ? "okc" : "badc") : ""}">${f + a ? t(ok ? "c.passes" : "c.fails") : "—"}</b><span>${f + a ? `${nd} ${t("c.need")} · ${t("c.notVoted").toLowerCase()} ${Math.max(0, vs.length - f - a - x)}` : ""}</span></div></div></div>
      <div class="roll" style="margin-top:16px">${vs.map((n) => `<div class="roll-row"><b>${esc(cn(c, n))}${r[n] === "pv" ? ` <small class="muted" title="${t("c.noAbst")}">· ${t("c.pv").toLowerCase()}</small>` : ""}</b><div class="seg3">${[["f", "c.for"], ["a", "c.against"], ["x", "c.abst"]].map(([kk, l]) => `<button data-vote="${n}" data-v="${kk}" aria-pressed="${v[n] === kk}"${r[n] === "pv" && kk === "x" ? ` disabled title="${t("c.noAbst")}"` : ""}>${t(l)}</button>`).join("")}</div></div>`).join("")}</div>
      <div class="timer-row" style="margin-top:14px"><button class="btn btn-primary btn-s" id="vrec"${f + a + x ? "" : " disabled"}>${t("c.record")}</button><button class="btn btn-ghost btn-s" id="vreset">${t("c.reset")}</button></div>
      ${hist.length ? `<div class="cab-card" style="margin-top:18px"><h3>${t("c.protocol")}</h3>${hist.slice().reverse().map((h) => `<p><span class="pill ${h.ok ? "ok" : "bad"}">${t(h.ok ? "c.passes" : "c.fails")}</span> <b>${esc(h.doc)}</b> <small class="muted">· ${hm(h.at)} · ${t("c.for")} ${h.f} · ${t("c.against")} ${h.a} · ${t("c.abst")} ${h.x}</small></p>`).join("")}</div>` : ""}`;
  };
  C.awards = () => {
    const c = chairCom(), w = db.awards[c.id] || {};
    const sel = (k) => `<div class="field"><label for="aw-${k}">${t("c." + k)}</label><select id="aw-${k}"><option value="">—</option>${all(c).map((n) => `<option value="${n}"${+w[k] === n ? " selected" : ""}>${esc(cn(c, n))}</option>`).join("")}</select></div>`;
    return `${comPicker()}<form class="cab-card" id="awf">${sel("best")}${sel("outstanding")}${sel("honorable")}
      <div class="field"><label for="aw-note">${t("c.note")}</label><textarea id="aw-note">${esc(w.note || "")}</textarea></div>
      <button class="btn btn-primary btn-s">${t("c.save").split(" ")[0]}</button> <span class="ok" id="aok" hidden>${t("c.awardsSaved")}</span></form>`;
  };

  // ---------- отрисовка и события ----------
  let timer = null;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
  const render = () => {
    clearInterval(timer); clearInterval(ctick);
    const s = db.session;
    if (!s) return loginView();
    const tabs = s.role === "chair" ? ["roster", "apps", "roll", "motions", "speakers", "vote", "awards"] : ["home", "overview", "app", "paper", "schedule", "inbox"];
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
    $("#rall") && ($("#rall").onclick = () => { const c = chairCom(), r = (db.roll[c.id] ??= {}); all(c).forEach((n) => (r[n] ??= "p")); save(); render(); });
    $("#seed") && ($("#seed").onclick = () => {
      const c = chairCom(), N = c.countries.ru.length, ru = LANG !== "en";
      for (let i = 1; i <= Math.min(8, N); i++) {
        const p1 = ((i * 3) % N) + 1, prefs = [p1, (p1 % N) + 1, ((p1 + 1) % N) + 1];
        db.apps.push({ email: `demo${i}.${c.id}@example.org`, fio: (ru ? "Демо-делегат " : "Demo delegate ") + i, uni: ru ? "ННГУ" : "UNN", year: 1 + (i % 4), contact: "—", com: c.id, prefs, exp: i % 3, at: Date.now() - i * 6e5, ...(i <= 4 ? { country: p1, paper: i % 2 ? { name: "position.pdf" } : undefined } : {}) });
      }
      save(); render();
    });
    // моушены
    const mof = $("#mof");
    if (mof) {
      const sync = () => { const k = MT[$("#mo-t").value]; $$("[data-f]", mof).forEach((el) => (el.hidden = !k.includes(el.dataset.f))); };
      $("#mo-t").onchange = sync; sync();
      mof.onsubmit = (e) => {
        e.preventDefault();
        const c = chairCom(), type = $("#mo-t").value, k = MT[type];
        (db.motions[c.id] ??= []).push({ id: Date.now().toString(36), type, by: +$("#mo-by").value, topic: k.includes("topic") ? $("#mo-topic").value.trim() : "", total: k.includes("total") ? Math.max(1, +$("#mo-total").value || 15) : 0, per: k.includes("per") ? Math.max(15, +$("#mo-per").value || 60) : 0, votes: {}, res: null, at: Date.now() });
        save(); render();
      };
    }
    const mot = (id) => (db.motions[chairCom().id] || []).find((m) => m.id === id);
    $$("[data-mv]").forEach((b) => (b.onclick = () => { const [id, n] = b.dataset.mv.split(":"), m = mot(id); m.votes[n] = m.votes[n] === b.dataset.v ? undefined : b.dataset.v; if (!m.votes[n]) delete m.votes[n]; save(); render(); }));
    $$("[data-mrest]").forEach((b) => (b.onclick = () => { const m = mot(b.dataset.mrest); voters(chairCom()).forEach((n) => (m.votes[n] ??= b.dataset.v)); save(); render(); }));
    $$("[data-mres]").forEach((b) => (b.onclick = () => { mot(b.dataset.mres).res = b.dataset.v || null; save(); render(); }));
    $$("[data-mdel]").forEach((b) => (b.onclick = () => { const c = chairCom(); db.motions[c.id] = db.motions[c.id].filter((m) => m.id !== b.dataset.mdel); if (deb(c).mid === b.dataset.mdel) deb(c).mid = null; save(); render(); }));
    $$("[data-mstart]").forEach((b) => (b.onclick = () => { const d = deb(chairCom()), m = mot(b.dataset.mstart); d.mid = m.id; d.q = []; d.queue = m.type === "mod" ? [m.by] : []; db.session.tab = "speakers"; save(); render(); }));
    // дебаты
    if ($("#stm")) {
      const c = chairCom(), d = deb(c), m = curM(c), stm = $("#stm"), dl = $("#dleft");
      const paint = () => {
        const l = left(); stm.textContent = fmt(l); stm.classList.toggle("over", l <= 10);
        if (dl) { const r = +dl.dataset.rest - (m.per - l); dl.textContent = r > 0 ? `${t("c.left")} ${fmt(r)}` : t("c.timeUp"); dl.classList.toggle("badc", r <= 0); }
        if (l <= 0 && clock.t0) { clock.base = 0; clock.t0 = 0; clearInterval(ctick); $("#sgo") && ($("#sgo").textContent = t("c.start")); }
      };
      paint(); if (clock.t0) ctick = setInterval(paint, 250);
      $("#sgo") && ($("#sgo").onclick = () => {
        if (clock.t0) { clock.base = left(); clock.t0 = 0; clearInterval(ctick); }
        else { if (left() <= 0) clock.base = m && m.type === "unmod" ? m.total * 60 : m ? m.per : db.session.secs || 60; clock.t0 = Date.now(); ctick = setInterval(paint, 250); }
        $("#sgo").textContent = t(clock.t0 ? "c.pause" : "c.start"); paint();
      });
      $("#sdone") && ($("#sdone").onclick = () => {
        const per = m ? m.per : db.session.secs || 60;
        d.log.push({ n: d.queue.shift(), used: Math.min(per, Math.max(0, per - left())), q: d.q, mid: m ? m.id : null }); d.q = [];
        clock = { key: "", base: 0, t0: 0 }; save(); render();
      });
      $("#qbtn") && ($("#qbtn").onclick = () => { d.q.push(+$("#qadd").value); save(); render(); });
      $$("[data-qdel]").forEach((b) => (b.onclick = () => { d.q.splice(+b.dataset.qdel, 1); save(); render(); }));
      $$("[data-sdel]").forEach((b) => (b.onclick = () => { d.queue.splice(+b.dataset.sdel, 1); save(); render(); }));
      $("#sbtn") && ($("#sbtn").onclick = () => { d.queue.push(+$("#sadd").value); save(); render(); });
      $("#ssec") && ($("#ssec").onchange = () => { db.session.secs = Math.max(15, Math.min(300, +$("#ssec").value || 60)); clock.key = ""; save(); render(); });
      $("#dend") && ($("#dend").onclick = () => { d.mid = null; d.q = []; clock = { key: "", base: 0, t0: 0 }; save(); render(); });
    }
    // резолюция
    $$("[data-vote]").forEach((b) => (b.onclick = () => { const v = (db.votes[chairCom().id] ??= {}), n = b.dataset.vote; v[n] === b.dataset.v ? delete v[n] : (v[n] = b.dataset.v); save(); render(); }));
    $("#rdoc") && ($("#rdoc").onchange = () => { db.resdoc[chairCom().id] = $("#rdoc").value.trim(); save(); });
    $("#vreset") && ($("#vreset").onclick = () => { delete db.votes[chairCom().id]; save(); render(); });
    $("#vrec") && ($("#vrec").onclick = () => {
      const c = chairCom(), v = db.votes[c.id] || {}, f = tally(v, "f"), a = tally(v, "a");
      (db.results[c.id] ??= []).push({ doc: $("#rdoc").value.trim() || t("c.voteDoc"), f, a, x: tally(v, "x"), ok: f + a > 0 && f >= Math.ceil(((f + a) * 2) / 3), at: Date.now() });
      delete db.votes[c.id]; save(); render();
    });
    // награды
    const awf = $("#awf");
    if (awf) awf.onsubmit = (e) => { e.preventDefault(); db.awards[chairCom().id] = { best: $("#aw-best").value, outstanding: $("#aw-outstanding").value, honorable: $("#aw-honorable").value, note: $("#aw-note").value }; save(); $("#aok").hidden = false; };
  };

  const ap = window.applyLang;
  window.applyLang = () => { ap(); render(); };
  render();
})();
