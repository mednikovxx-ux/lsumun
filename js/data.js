// Всё содержимое сайта, которое меняется от сессии к сессии: комитеты, президиум, архив.
// Каждый текст — { ru, en }. Новую сессию добавляйте в SESSIONS, комитеты — в COMMITTEES.

window.MUN = {
  vk: "https://vk.com/lsumun",

  // Следующая сессия: даты и повестки ещё не объявлены.
  next: {
    title: { ru: "IV сессия · весна 2027", en: "4th session · spring 2027" },
    when: { ru: "Весна 2027 · даты объявим в группе", en: "Spring 2027 · dates to be announced" },
    short: { ru: "Весна 2027", en: "Spring 2027" },
    where: { ru: "ННГУ им. Н. И. Лобачевского, Нижний Новгород", en: "Lobachevsky University, Nizhny Novgorod" },
  },

  // Комитеты последней (III) сессии, 24–26 апреля 2026.
  committees: [
    {
      id: "sc", short: { ru: "СБ ООН", en: "UNSC" },
      name: { ru: "Совет Безопасности ООН", en: "UN Security Council" },
      agenda: { ru: "Политико-правовые последствия эскалации Венесуэльского кризиса", en: "Political and legal consequences of the escalation of the Venezuelan crisis" },
      lang: "ru", topic: "https://vk.com/topic-225230050_50503524",
      chairs: [{ role: "chair", name: { ru: "Дарья Меркулова", en: "Daria Merkulova" } }],
      countries: { ru: ["КНР", "Россия", "Великобритания", "США", "Франция", "Бахрейн", "Греция", "Дания", "ДР Конго", "Латвия", "Колумбия", "Либерия", "Сомали", "Пакистан", "Панама"], en: ["China", "Russia", "United Kingdom", "United States", "France", "Bahrain", "Greece", "Denmark", "DR Congo", "Latvia", "Colombia", "Liberia", "Somalia", "Pakistan", "Panama"] },
      story: { ru: "Две коалиции спорили, передавать ли президента Венесуэлы под юрисдикцию МУС, и всё решалось вопросом вето.", en: "Two coalitions argued over handing Venezuela's president to the ICC, and it all came down to the veto." },
      photo: "img/p19.webp",
    },
    {
      id: "sco", short: { ru: "ШОС", en: "SCO" },
      name: { ru: "Шанхайская организация сотрудничества", en: "Shanghai Cooperation Organisation" },
      agenda: { ru: "Влияние Кашмирского кризиса на повестку дня ШОС", en: "The impact of the Kashmir crisis on the SCO agenda" },
      lang: "ru", topic: "https://vk.com/topic-225230050_50503359",
      chairs: [
        { role: "chair", name: { ru: "Карина Тихомирова", en: "Karina Tikhomirova" } },
        { role: "cochair", name: { ru: "Елизавета Гудкова", en: "Elizaveta Gudkova" } },
      ],
      countries: { ru: ["Индия", "Иран", "Казахстан", "КНР", "Кыргызстан", "Пакистан", "Россия", "Таджикистан", "Узбекистан", "Беларусь"], en: ["India", "Iran", "Kazakhstan", "China", "Kyrgyzstan", "Pakistan", "Russia", "Tajikistan", "Uzbekistan", "Belarus"] },
      story: { ru: "Индия и Пакистан спорили до последнего часа, Кыргызстан и Узбекистан мирили их, а делегаты предлагали реформу РАТС.", en: "India and Pakistan argued to the last hour, Kyrgyzstan and Uzbekistan mediated, and delegates pushed a RATS reform." },
      photo: "img/p22.webp",
    },
    {
      id: "hc", short: { ru: "Кризис", en: "Crisis" },
      name: { ru: "Исторический кризис", en: "Historical Crisis" },
      agenda: { ru: "13 дней Карибского кризиса", en: "Thirteen days of the Cuban Missile Crisis" },
      lang: "ru", topic: "https://vk.com/topic-225230050_53308468",
      chairs: [{ role: "chair", name: { ru: "Михаил Белореков", en: "Mikhail Belorekov" } }],
      countries: { ru: ["СССР — Н. С. Хрущёв", "США — Дж. Кеннеди", "Куба — Ф. Кастро", "КНР — Мао Цзэдун", "Франция — Ш. де Голль", "Италия — А. Сеньи", "Индия — Д. Неру", "Великобритания — Г. Макмиллан", "Бразилия — Ж. Гуларт", "Югославия — И. Тито", "Мексика — А. Лопес Матеос", "Колумбия — А. Льерас", "Венесуэла — Р. Бетанкур", "Канада — Дж. Дифенбейкер"], en: ["USSR — N. Khrushchev", "USA — J. Kennedy", "Cuba — F. Castro", "PRC — Mao Zedong", "France — Ch. de Gaulle", "Italy — A. Segni", "India — J. Nehru", "UK — H. Macmillan", "Brazil — J. Goulart", "Yugoslavia — J. Tito", "Mexico — A. López Mateos", "Colombia — A. Lleras", "Venezuela — R. Betancourt", "Canada — J. Diefenbaker"] },
      story: { ru: "Каждый делегат — лидер 1962 года. Переговоры сорвались, и мир оказался на пороге третьей мировой.", en: "Every delegate is a 1962 leader. Talks collapsed and the world stood on the brink of a third world war." },
      photo: "img/p21.webp",
    },
    {
      id: "ec", short: { ru: "ЕС", en: "EUCO" },
      name: { ru: "Европейский совет", en: "European Council" },
      agenda: { ru: "Пересмотр торгового соглашения ЕС и США (июль 2025)", en: "Review of the European Union–US Trade Agreement, July 2025" },
      lang: "en", topic: "https://vk.com/topic-225230050_50503155",
      chairs: [
        { role: "chair", name: { ru: "Валерия Ручина", en: "Valeria Ruchina" } },
        { role: "cochair", name: { ru: "Анна Лапина", en: "Anna Lapina" } },
      ],
      countries: { ru: ["Австрия", "Бельгия", "Болгария", "Хорватия", "Кипр", "Чехия", "Дания", "Эстония", "Финляндия", "Франция", "Германия", "Греция", "Венгрия", "Ирландия", "Италия", "Латвия", "Литва", "Люксембург", "Мальта", "Нидерланды", "Польша", "Португалия", "Румыния", "Словакия", "Словения", "Испания", "Швеция"], en: ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "The Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"] },
      story: { ru: "Делегаты искали общий ответ на торговую сделку с США, а председатель вела канал с итогами в стиле твитов Трампа.", en: "Delegates looked for a common answer to the US trade deal, while the chair ran a recap channel in the style of Trump's tweets." },
      photo: "img/p07.webp",
    },
    {
      id: "las", short: { ru: "ЛАГ", en: "LAS" },
      name: { ru: "Лига арабских государств", en: "League of Arab States" },
      agenda: { ru: "Поиск решения блокировки Ормузского пролива", en: "Finding the solution for the block of the Hormuz Strait" },
      lang: "en", topic: "https://vk.com/topic-225230050_53308462",
      chairs: [{ role: "chair", name: { ru: "Алексей Данилин", en: "Alexey Danilin" } }],
      countries: { ru: ["Алжир", "Бахрейн", "Коморы", "Джибути", "Египет", "Ирак", "Иордания", "Кувейт", "Ливан", "Ливия", "Мавритания", "Марокко", "Оман", "Палестина", "Катар", "Саудовская Аравия", "Сомали", "Судан", "Сирия", "Тунис", "ОАЭ", "Йемен"], en: ["Algeria", "Bahrain", "Comoros", "Djibouti", "Egypt", "Iraq", "Jordan", "Kuwait", "Lebanon", "Libya", "Mauritania", "Morocco", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Somalia", "Sudan", "Syria", "Tunisia", "United Arab Emirates", "Yemen"] },
      story: { ru: "ОАЭ представили альтернативный маршрут через арабские страны, Сирии дали особые условия, обсуждали патруль в Баб-эль-Мандебском проливе.", en: "The UAE proposed an alternative route through Arab states, Syria got special terms, and a Bab-el-Mandeb patrol was discussed." },
      photo: "img/p33.webp",
    },
  ],

  // Президиум III сессии (2026).
  secretariat: [
    { role: "sg", name: { ru: "Валерия Ручина", en: "Valeria Ruchina" } },
    { role: "dsg", name: { ru: "Карина Тихомирова", en: "Karina Tikhomirova" } },
  ],

  // Приветствия на открытии. Фото и цитаты присылают организаторы: пока поля пустые, на сайте видна рамка.
  greetings: [
    {
      id: "rykhtik", lead: true, photo: "img/rykhtik.webp",
      name: { ru: "Михаил Иванович Рыхтик", en: "Mikhail Rykhtik" },
      title: { ru: "Доктор политических наук, профессор РАН, директор Института международных отношений и мировой истории ННГУ", en: "Doctor of Political Science, Professor of the Russian Academy of Sciences, Director of the Institute of International Relations and World History, UNN" },
      quote: {
        ru: "Университет — это социальный лифт и пространство, где студент может проявить себя в самых неожиданных ролях. Модель ООН — одна из таких возможностей: здесь дипломатию не изучают по учебнику, а проживают изнутри.",
        en: "A university is a social lift — a place where students can prove themselves in the most unexpected roles. Model UN is one of those chances: here diplomacy is not studied from a textbook, it is lived from the inside.",
      },
    },
    {
      id: "malov", photo: "img/malov.webp",
      name: { ru: "Сергей Геральдович Малов", en: "Sergey Malov" },
      title: { ru: "Представитель Министерства иностранных дел Российской Федерации в Нижнем Новгороде", en: "Representative of the Ministry of Foreign Affairs of the Russian Federation in Nizhny Novgorod" },
      quote: {
        ru: "Мир переживает время большой турбулентности, и умение разобраться в ней становится навыком, без которого не обойтись. Модель ООН учит не просто следить за новостями, а видеть за ними мотивы, причины и последствия — смотреть на мировую политику изнутри, глазами тех, кто принимает решения.",
        en: "The world is living through a time of great turbulence, and making sense of it has become an essential skill. Model UN teaches students not just to follow the news but to see the motives, causes and consequences behind it — to look at world politics from the inside, through the eyes of those who make the decisions.",
      },
    },
    {
      id: "guseva", photo: "img/guseva.webp",
      name: { ru: "Ольга Юрьевна Гусева", en: "Olga Guseva" },
      title: { ru: "Министр международных и межрегиональных связей Нижегородской области", en: "Minister of International and Interregional Relations of the Nizhny Novgorod Region" },
      quote: {
        ru: "Модель ООН — уникальная площадка для межкультурного диалога. Здесь встречаются студенты из разных стран и городов, и знакомства, которые начинаются за столом переговоров, сближают людей не только в стенах ННГУ, но и в Нижнем Новгороде, и во всей России.",
        en: "Model UN is a unique platform for intercultural dialogue. Students from different countries and cities meet here, and the connections that begin at the negotiating table bring people together not only at UNN, but across Nizhny Novgorod and all of Russia.",
      },
    },
    {
      id: "bedny", photo: "img/bedny.webp",
      name: { ru: "Александр Борисович Бедный", en: "Alexander Bedny" },
      title: { ru: "Проректор ННГУ по стратегическому развитию и международной деятельности", en: "Vice-Rector for Strategic Development and International Affairs, UNN" },
      quote: {
        ru: "Модели ООН давно стали частью подготовки студентов-международников по всей России. И то, что эту инициативу задумывают и воплощают сами студенты, лучше всего говорит о её значении: здесь рождаются профессиональные связи и растёт квалификация будущих специалистов.",
        en: "Model UN conferences have long been part of the training of international relations students across Russia. The fact that this initiative is conceived and run by the students themselves speaks best to its value: it builds professional connections and deepens the expertise of future specialists.",
      },
    },
  ],

  // Архив по годам: от новой к старой.
  sessions: [
    {
      id: "2026", n: "III", year: 2026,
      title: { ru: "III сессия · весна 2026", en: "3rd session · spring 2026" },
      dates: { ru: "24–26 апреля 2026", en: "24–26 April 2026" },
      place: { ru: "Пр. Гагарина, 23к1 (день 1) · ул. Ульянова, 2 (дни 2–3)", en: "23k1 Gagarin Ave (day 1) · 2 Ulyanova St (days 2–3)" },
      album: "https://vk.com/albums-225230050",
      facts: { delegates: 64, committees: 5, days: 3 },
      results: true,
      schedule: ["img/sched-24.webp", "img/sched-25.webp", "img/sched-26.webp"],
      photos: ["img/p41.webp", "img/p23.webp", "img/p39.webp", "img/p26.webp", "img/p17.webp", "img/p06.webp", "img/p35.webp", "img/p33.webp"],
    },
    {
      id: "2024a", n: "II", year: 2024,
      title: { ru: "II сессия · осень 2024", en: "2nd session · autumn 2024" },
      dates: { ru: "Осень 2024", en: "Autumn 2024" },
      full: { ru: "Модель ООН и международных организаций ННГУ", en: "LSU Model of the UN and International Organisations" },
      album: "https://vk.com/albums-225230050", albumSize: 573,
    },
    {
      id: "2024s", n: "I", year: 2024,
      title: { ru: "I сессия · весна 2024", en: "1st session · spring 2024" },
      dates: { ru: "Весна 2024", en: "Spring 2024" },
      album: "https://vk.com/albums-225230050", albumSize: 309,
    },
  ],

  // Призёры III сессии — из итогового поста группы.
  awards2026: {
    sc: { ru: ["Дарья Шаповалова — Латвия", "Анна Турутина — КНР", "Арина Павлова — Франция"], en: ["Daria Shapovalova — Latvia", "Anna Turutina — China", "Arina Pavlova — France"] },
    sco: { ru: ["Альбина Сиденина — Индия", "Иван Хилов — Пакистан", "Бобуржон Каримов — Узбекистан"], en: ["Albina Sidenina — India", "Ivan Khilov — Pakistan", "Boburjon Karimov — Uzbekistan"] },
    hc: { ru: ["Николай Евдокимов — СССР", "Сергей Радионов — США", "Аркадий Коленченко — Югославия"], en: ["Nikolay Evdokimov — USSR", "Sergey Radionov — USA", "Arkady Kolenchenko — Yugoslavia"] },
    ec: { ru: ["Роман Андропов — Франция", "Хорхе Ордоньес — Италия", "Эндрю Опарауго — Мальта"], en: ["Roman Andropov — France", "Jorge Andrés Ordóñez Guerrero — Italy", "Oparaugo Andrew Uchechukwu — Malta"] },
    las: { ru: ["Ребека Португал — Марокко", "Дмитрий Мухин — ОАЭ", "Виталия Петрова — Сирия"], en: ["Rebeca Portugal — Morocco", "Dmitri Muhin — UAE", "Vitaliya Petrova — Syria"] },
  },

  // Фото без привязки к году (обложки альбомов группы).
  gallery: ["img/p38.webp", "img/p07.webp", "img/p25.webp", "img/p24.webp", "img/p20.webp", "img/p31.webp", "img/p14.webp", "img/p02.webp"],
};
