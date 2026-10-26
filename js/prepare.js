// Траектория делегата: шесть станций подготовки. Тексты — из постов группы (регистрация, позиция страны,
// что можно и нельзя, резолюция) и с оборотной стороны табличек (процедура). Отметки «готово» хранятся в браузере.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const KEY = "lsumun.path.v1";
  let done = {};
  try { done = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} };

  const UI = {
    ru: { step: "Станция", of: "из", done: "Готово", undo: "Отметить заново", next: "Дальше", prev: "Назад", progress: "Пройдено", all: "Вы готовы к сессии. До встречи на открытии!" },
    en: { step: "Stop", of: "of", done: "Done", undo: "Mark as not done", next: "Next", prev: "Back", progress: "Completed", all: "You are ready for the session. See you at the opening!" },
  };

  const STOPS = [
    {
      id: "reg", t: { ru: "Регистрация", en: "Registration" }, s: { ru: "Заявка, комитет, страна", en: "Application, committee, country" },
      body: {
        ru: `<p class="big">Регистрация открывается постом в группе: к нему прикреплено информационное письмо и ссылки на формы.</p>
          <ol class="tl">
            <li><b>Проверьте, что можете участвовать.</b> Студенты бакалавриата, магистратуры, специалитета и старших курсов СПО.</li>
            <li><b>Выберите комитет</b> и прочитайте доклад эксперта о его повестке. Обратите внимание на рабочий язык: в 2026 году ЕС и ЛАГ работали на английском.</li>
            <li><b>Выберите несколько стран</b> из списка в обсуждении комитета. Если все заняты, председатель или его заместитель напишет и предложит другую.</li>
            <li><b>Заполните форму</b> — Google или Яндекс, по одной из ссылок в посте.</li>
            <li><b>Дождитесь своего ФИО</b> напротив страны в обсуждении комитета.</li>
          </ol>`,
        en: `<p class="big">Registration opens with a post in the group: the information letter and form links are attached to it.</p>
          <ol class="tl">
            <li><b>Check you are eligible.</b> Bachelor's, master's and specialist students and senior college students.</li>
            <li><b>Choose a committee</b> and read the expert report on its agenda. Mind the working language: in 2026 the EU and LAS worked in English.</li>
            <li><b>Pick several countries</b> from the list in the committee's discussion. If all are taken, the chair or deputy will offer another one.</li>
            <li><b>Fill in the form</b> — Google or Yandex, any link from the post.</li>
            <li><b>Wait for your name</b> to appear next to a country in the committee's discussion.</li>
          </ol>`,
      },
      link: ["spring2027.html", { ru: "IV сессия · весна 2027", en: "4th session · spring 2027" }],
    },
    {
      id: "report", t: { ru: "Доклад эксперта", en: "Expert report" }, s: { ru: "Суть проблемы и вопросы", en: "The issue and the questions" },
      body: {
        ru: `<p class="big">Доклад эксперта — ваша отправная точка. Его публикуют в обсуждении комитета.</p>
          <ul class="tl dot"><li>В нём описана суть проблемы, ключевые документы и позиции сторон.</li><li>В нём же — вопросы, которые нужно затронуть в позиции страны.</li><li>Идеи для резолюции тоже ищите в докладе.</li></ul>`,
        en: `<p class="big">The expert report is your starting point. It is published in the committee's discussion.</p>
          <ul class="tl dot"><li>It sets out the problem, key documents and the parties' positions.</li><li>It lists the questions your country's position should cover.</li><li>Look for resolution ideas there too.</li></ul>`,
      },
      link: ["committees.html", { ru: "Комитеты и доклады", en: "Committees and reports" }],
    },
    {
      id: "position", t: { ru: "Позиция страны", en: "Country position" }, s: { ru: "1:30–2:00 у трибуны", en: "1:30–2:00 at the podium" },
      body: {
        ru: `<p class="big">На представление позиции у вас будет 1:30–2:00 минуты. Сдавать текст не нужно, но лучше написать его заранее — для уверенности.</p>
          <div class="cols">
            <div><h4>Главное</h4><ul class="tl dot"><li>Позиция правительства вашей страны, а не ваше личное мнение.</li><li>Говорите от первого лица множественного числа: «мы».</li><li>Кратко и ёмко: только то, что важно по повестке.</li></ul></div>
            <div><h4>Структура</h4><ol class="tl"><li><b>Приветствие</b> руководства комитета и делегатов.</li><li><b>Ответы на вопросы:</b> почему повестка актуальна сегодня? как с ней связана история страны? какова политика страны и чем она обоснована? какие действия, соглашения и резолюции? поддерживает ли страна действия организации? что нужно сделать в рамках организации? чего страна будет добиваться в резолюции и как может сдвинуться её позиция?</li><li><b>Заключение:</b> надежда, что совместными усилиями проблема будет решена.</li></ol></div>
          </div>
          <p class="hint">Проверьте грамотность и все факты. Пишите проще, без длинных конструкций. Без резкой критики других делегатов. И обязательно отрепетируйте речь — <a href="cabinet.html">в личном кабинете есть таймер</a>.</p>`,
        en: `<p class="big">You will have 1:30–2:00 minutes to present your position. You don't hand in a text, but writing one in advance gives confidence.</p>
          <div class="cols">
            <div><h4>Essentials</h4><ul class="tl dot"><li>Your government's position, not your personal view.</li><li>Speak in the first person plural: "we".</li><li>Brief and to the point.</li></ul></div>
            <div><h4>Structure</h4><ol class="tl"><li><b>Greet</b> the committee's chairs and the delegates.</li><li><b>Answer:</b> why is the agenda relevant today? how is your country's history connected to it? what is its policy and why? what has it done, signed or ratified? does it support the organisation's actions? what should the organisation do? what will your country seek in the resolution, and how might its position shift?</li><li><b>Conclude</b> with the hope that joint efforts will solve the problem.</li></ol></div>
          </div>
          <p class="hint">Check spelling and every fact. Keep sentences simple. No harsh criticism of other delegates. And rehearse — <a href="cabinet.html">your personal account has a timer</a>.</p>`,
      },
    },
    {
      id: "conduct", t: { ru: "Как себя вести", en: "Conduct" }, s: { ru: "Что можно и что нельзя", en: "Do's and don'ts" },
      body: {
        ru: `<div class="cols dd">
            <div class="do"><h4>Можно и нужно</h4><ul class="tl"><li>Активно участвовать и предлагать темы для контролируемых дебатов — так важное для вашей страны попадёт в резолюцию.</li><li>Искать единомышленников и союзников, чтобы позицию услышали и поддержали.</li><li>Знать как можно больше об официальной позиции государства по повестке.</li><li>Быть непредвзятым, пунктуальным, уважительным и креативным.</li><li>Говорить «мы» вместо «я» — это обязательно.</li></ul></div>
            <div class="dont"><h4>Нельзя</h4><ul class="tl"><li>Переходить на личности и оскорблять делегатов.</li><li>Придумывать факты или высказывать мнение, противоположное официальной позиции страны.</li><li>Пропускать сессии и опаздывать — это тормозит работу над резолюцией.</li></ul></div>
          </div>`,
        en: `<div class="cols dd">
            <div class="do"><h4>Do</h4><ul class="tl"><li>Take an active part and propose topics for moderated caucuses, so your country's priorities reach the resolution.</li><li>Find like-minded delegates and allies to get your position heard and supported.</li><li>Learn as much as you can about your state's official position.</li><li>Be impartial, punctual, respectful and creative.</li><li>Say "we", not "I" — it is mandatory.</li></ul></div>
            <div class="dont"><h4>Don't</h4><ul class="tl"><li>Get personal or insult other delegates.</li><li>Invent facts or voice opinions that contradict your state's official position.</li><li>Miss sessions or be late — it slows down the resolution.</li></ul></div>
          </div>`,
      },
    },
    {
      id: "session", t: { ru: "Заседание", en: "In session" }, s: { ru: "Предложения и вопросы", en: "Motions and points" },
      link: ["rules.html", { ru: "Полный регламент", en: "Full rules of procedure" }],
      body: {
        ru: `<p class="big">На обороте вашей таблички — шпаргалка: всё, что можно предложить или спросить, подняв её.</p>
          <div class="cols">
            <div><h4>Список предложений</h4><ul class="tl dot"><li>О начале контролируемых (контролируемых) дебатов</li><li>О начале свободных дебатов</li><li>О представлении рабочего документа</li><li>О представлении чернового варианта резолюции</li><li>О представлении поправок</li><li>О закрытии дебатов</li><li>О переносе дебатов</li></ul></div>
            <div><h4>Список вопросов</h4><ul class="tl dot"><li>Вопрос личной привилегии</li><li>Вопрос по порядку ведения заседания</li></ul>
              <h4 style="margin-top:22px">Словарик</h4><dl class="mini"><dt>Контролируемые дебаты</dt><dd>короткие выступления по подтеме, слово даёт председатель</dd><dt>Свободные дебаты</dt><dd>делегаты договариваются и пишут документы</dd><dt>Рабочий документ</dt><dd>черновик идей коалиции</dd></dl></div>
          </div>`,
        en: `<p class="big">The back of your placard is a cheat sheet: everything you can move or ask by raising it.</p>
          <div class="cols">
            <div><h4>List of motions</h4><ul class="tl dot"><li>Moderated caucus</li><li>Unmoderated caucus</li><li>Introducing working paper</li><li>Introducing draft resolution</li><li>Introducing amendments</li><li>Closing debates</li><li>Suspend debates</li></ul></div>
            <div><h4>List of points</h4><ul class="tl dot"><li>Point of information</li><li>Point of personal privilege</li><li>Point of order</li></ul>
              <h4 style="margin-top:22px">Glossary</h4><dl class="mini"><dt>Moderated caucus</dt><dd>short speeches on a sub-topic; the chair gives the floor</dd><dt>Unmoderated caucus</dt><dd>delegates negotiate and write documents</dd><dt>Working paper</dt><dd>a coalition's draft ideas</dd></dl></div>
          </div>`,
      },
    },
    {
      id: "resolution", t: { ru: "Резолюция", en: "Resolution" }, s: { ru: "Итоговый документ", en: "The final document" },
      body: {
        ru: `<p class="big">Резолюция — итоговый документ, согласованный всеми делегатами: конкретный план действий по повестке.</p>
          <div class="doc">
            <div class="doc-part"><span>Шапка</span><p>Название комитета, тема заседания (повестка), авторы (спонсоры) и подписанты, дата.</p></div>
            <div class="doc-part"><span>Преамбула</span><p>Вводные фразы: <i>Ссылаясь на…</i>, <i>Осознавая важность…</i>, <i>Принимая во внимание, что…</i> Здесь ссылки на соглашения ООН или вашей организации и важные факты, на которые опирается решение.</p></div>
            <div class="doc-part"><span>Основная часть</span><p>Инициативы для решения повестки, а в подпунктах — конкретные действия для их реализации. Идеи — в докладе эксперта.</p></div>
          </div>
          <p class="hint">Примеры резолюций прикреплены к посту в группе. Посмотреть, как выглядит документ, можно и <a href="spring2027.html">на нашей странице весны 2027</a> — она оформлена как проект резолюции.</p>`,
        en: `<p class="big">A resolution is the final document agreed by all delegates: a concrete plan of action on the agenda.</p>
          <div class="doc">
            <div class="doc-part"><span>Heading</span><p>Committee, topic (agenda), authors (sponsors) and signatories, date.</p></div>
            <div class="doc-part"><span>Preamble</span><p>Introductory phrases: <i>Recalling…</i>, <i>Aware of the importance…</i>, <i>Taking into account that…</i> Refer to UN or organisation agreements and key facts your decision rests on.</p></div>
            <div class="doc-part"><span>Operative part</span><p>Initiatives to solve the issue, with concrete actions in sub-clauses. Find ideas in the expert report.</p></div>
          </div>
          <p class="hint">Sample resolutions are attached to the group post. You can also see the format <a href="spring2027.html">on our spring 2027 page</a> — it is styled as a draft resolution.</p>`,
      },
    },
  ];

  const root = $("#path");
  let cur = 0;
  const render = () => {
    const u = UI[LANG] || UI.ru, n = STOPS.length, k = STOPS.filter((s) => done[s.id]).length, st = STOPS[cur];
    root.innerHTML = `
      <div class="path-head"><span class="kicker">${u.progress}: ${k} ${u.of} ${n}</span><div class="path-bar"><i style="width:${(k / n) * 100}%"></i></div></div>
      <div class="track-line" role="tablist" aria-label="${u.step}">
        <span class="line"><i style="width:${(cur / (n - 1)) * 100}%"></i></span>
        ${STOPS.map((s, i) => `<button role="tab" id="tab-${s.id}" aria-controls="panel" aria-selected="${i === cur}" class="${done[s.id] ? "is-done" : ""}${i < cur ? " passed" : ""}" data-i="${i}">
          <span class="node">${done[s.id] ? "✓" : i + 1}</span><span class="lbl"><b>${L(s.t)}</b><small>${L(s.s)}</small></span></button>`).join("")}
      </div>
      <article class="panel" id="panel" role="tabpanel" aria-labelledby="tab-${st.id}" tabindex="-1">
        <div class="panel-top"><span class="kicker">${u.step} ${cur + 1} ${u.of} ${n}</span><h2>${L(st.t)}</h2></div>
        <div class="panel-body">${L(st.body)}</div>
        <div class="panel-foot">
          <button class="btn ${done[st.id] ? "btn-ghost" : "btn-primary"}" id="mark">${done[st.id] ? u.undo : "✓ " + u.done}</button>
          ${st.link ? `<a class="btn btn-ghost" href="${st.link[0]}">${L(st.link[1])} ${ICONS.arrow}</a>` : ""}
          <span class="sp"></span>
          <button class="btn btn-ghost btn-s" id="prev"${cur === 0 ? " disabled" : ""}>← ${u.prev}</button>
          <button class="btn btn-primary btn-s" id="next"${cur === n - 1 ? " disabled" : ""}>${u.next} →</button>
        </div>
        ${k === n ? `<p class="all-done">${u.all}</p>` : ""}
      </article>`;
    $$(".track-line button", root).forEach((b) => (b.onclick = () => go(+b.dataset.i, true)));
    $(".track-line", root).onkeydown = (e) => {
      if (e.key === "ArrowRight") go(Math.min(n - 1, cur + 1), false, true);
      if (e.key === "ArrowLeft") go(Math.max(0, cur - 1), false, true);
    };
    $("#mark", root).onclick = () => { done[st.id] = !done[st.id]; save(); if (done[st.id] && cur < n - 1) cur++; render(); };
    $("#prev", root).onclick = () => go(cur - 1, true);
    $("#next", root).onclick = () => go(cur + 1, true);
  };
  const go = (i, focusPanel, focusTab) => {
    cur = i; render();
    history.replaceState(null, "", "#" + STOPS[cur].id);
    if (focusTab) $(`#tab-${STOPS[cur].id}`).focus();
    else if (focusPanel && innerWidth < 760) $("#panel").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const fromHash = STOPS.findIndex((s) => "#" + s.id === location.hash);
  if (fromHash >= 0) cur = fromHash;
  const ap = window.applyLang;
  window.applyLang = () => { ap(); render(); };
  render();
})();
