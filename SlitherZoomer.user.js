// ==UserScript==
// @name         SlitherZoomer
// @namespace    slitherzoomer
// @version      5.4
// @description  Zoom, render resolution, hide small food, fixed nickname for slither.io
// @license      MIT
// @homepageURL  https://github.com/Fiboczinajdid/SlitherZoomer
// @updateURL    https://raw.githubusercontent.com/Fiboczinajdid/SlitherZoomer/main/SlitherZoomer.user.js
// @downloadURL  https://raw.githubusercontent.com/Fiboczinajdid/SlitherZoomer/main/SlitherZoomer.user.js
// @match        *://slither.io/*
// @match        *://*.slither.io/*
// @match        *://slither.com/*
// @match        *://*.slither.com/*
// @grant        unsafeWindow
// @sandbox      raw
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function () {
  'use strict';
  const W = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const VERSION = '5.4';
  if (W.__slitherZoomer) return console.warn('SlitherZoomer: już działa wersja', W.__slitherZoomer, '- ta kopia (' + VERSION + ') się nie uruchomi');
  W.__slitherZoomer = VERSION;

  // ================= Tłumaczenia =================
  const LANGS = [
    ['en', 'English'], ['pl', 'Polski'], ['ru', 'Русский'], ['es', 'Español'], ['pt', 'Português'],
    ['fr', 'Français'], ['de', 'Deutsch'], ['tr', 'Türkçe'], ['id', 'Bahasa Indonesia'],
  ];
  const KEYS = ['zoom', 'auto', 'resetZoom', 'res', 'hideFood', 'hideInGame', 'settings', 'minimize', 'showMenu',
    'startZoom', 'nick', 'nickPh', 'language', 'sens', 'toast', 'controls', 'wheel', 'wheelLocked',
    'zoomIn', 'zoomOut', 'reset', 'menu', 'food', 'resCycle', 'none', 'keyHint', 'space',
    'toastDefault', 'foodHidden', 'foodShown', 'resToast'];
  const TR = {
    en: ['Zoom', 'auto', 'Reset zoom', 'Render resolution', 'Hide small food', 'Hide menu in game', 'Settings', 'Close menu', 'Show SlitherZoomer',
      'Zoom on start', 'Fixed nickname', 'Empty = off', 'Language', 'Wheel sensitivity', 'Zoom notifications', 'Controls', 'Wheel', "Mouse wheel zoom can't be changed",
      'Zoom in', 'Zoom out', 'Default zoom', 'Show / hide menu', 'Small food on / off', 'Change resolution', 'none', 'Click, then press a key · Esc cancels · Backspace clears', 'Space',
      'Zoom: default', 'Small food: hidden', 'Small food: visible', 'Resolution'],
    pl: ['Zoom', 'auto', 'Przywróć domyślny zoom', 'Rozdzielczość renderowania', 'Ukryj małe jedzenie', 'Ukryj menu podczas gry', 'Ustawienia', 'Zamknij menu', 'Pokaż SlitherZoomer',
      'Zoom przy starcie', 'Stały nick', 'Puste = wyłączone', 'Język', 'Czułość kółka', 'Powiadomienia o zoomie', 'Controls', 'Kółko', 'Zoomu kółkiem nie da się zmienić',
      'Przybliż', 'Oddal', 'Domyślny zoom', 'Pokaż / ukryj menu', 'Małe jedzenie wł. / wył.', 'Zmień rozdzielczość', 'brak', 'Kliknij i naciśnij klawisz · Esc anuluje · Backspace usuwa', 'Spacja',
      'Zoom: domyślny', 'Małe jedzenie: ukryte', 'Małe jedzenie: widoczne', 'Rozdzielczość'],
    ru: ['Зум', 'авто', 'Сбросить зум', 'Разрешение рендеринга', 'Скрыть мелкую еду', 'Скрывать меню в игре', 'Настройки', 'Закрыть меню', 'Показать SlitherZoomer',
      'Зум при старте', 'Постоянный ник', 'Пусто = выкл.', 'Язык', 'Чувствительность колёсика', 'Уведомления о зуме', 'Управление', 'Колёсико', 'Зум колёсиком изменить нельзя',
      'Приблизить', 'Отдалить', 'Зум по умолчанию', 'Показать / скрыть меню', 'Мелкая еда вкл. / выкл.', 'Сменить разрешение', 'нет', 'Нажмите и выберите клавишу · Esc — отмена · Backspace — удалить', 'Пробел',
      'Зум: по умолчанию', 'Мелкая еда: скрыта', 'Мелкая еда: видна', 'Разрешение'],
    es: ['Zoom', 'auto', 'Restablecer zoom', 'Resolución de renderizado', 'Ocultar comida pequeña', 'Ocultar menú en partida', 'Ajustes', 'Cerrar menú', 'Mostrar SlitherZoomer',
      'Zoom al empezar', 'Nick fijo', 'Vacío = desactivado', 'Idioma', 'Sensibilidad de la rueda', 'Avisos de zoom', 'Controles', 'Rueda', 'El zoom con la rueda no se puede cambiar',
      'Acercar', 'Alejar', 'Zoom por defecto', 'Mostrar / ocultar menú', 'Comida pequeña sí / no', 'Cambiar resolución', 'ninguna', 'Haz clic y pulsa una tecla · Esc cancela · Retroceso borra', 'Espacio',
      'Zoom: por defecto', 'Comida pequeña: oculta', 'Comida pequeña: visible', 'Resolución'],
    pt: ['Zoom', 'auto', 'Redefinir zoom', 'Resolução de renderização', 'Esconder comida pequena', 'Esconder menu no jogo', 'Configurações', 'Fechar menu', 'Mostrar SlitherZoomer',
      'Zoom ao iniciar', 'Nick fixo', 'Vazio = desativado', 'Idioma', 'Sensibilidade da roda', 'Avisos de zoom', 'Controles', 'Roda', 'O zoom pela roda não pode ser alterado',
      'Aproximar', 'Afastar', 'Zoom padrão', 'Mostrar / esconder menu', 'Comida pequena liga / desliga', 'Mudar resolução', 'nenhuma', 'Clique e pressione uma tecla · Esc cancela · Backspace apaga', 'Espaço',
      'Zoom: padrão', 'Comida pequena: escondida', 'Comida pequena: visível', 'Resolução'],
    fr: ['Zoom', 'auto', 'Réinitialiser le zoom', 'Résolution du rendu', 'Masquer la petite nourriture', 'Masquer le menu en jeu', 'Paramètres', 'Fermer le menu', 'Afficher SlitherZoomer',
      'Zoom au démarrage', 'Pseudo fixe', 'Vide = désactivé', 'Langue', 'Sensibilité de la molette', 'Notifications de zoom', 'Contrôles', 'Molette', 'Le zoom à la molette ne peut pas être modifié',
      'Zoomer', 'Dézoomer', 'Zoom par défaut', 'Afficher / masquer le menu', 'Petite nourriture oui / non', 'Changer la résolution', 'aucune', 'Cliquez puis appuyez sur une touche · Échap annule · Retour arrière efface', 'Espace',
      'Zoom : par défaut', 'Petite nourriture : masquée', 'Petite nourriture : visible', 'Résolution'],
    de: ['Zoom', 'auto', 'Zoom zurücksetzen', 'Render-Auflösung', 'Kleines Futter ausblenden', 'Menü im Spiel ausblenden', 'Einstellungen', 'Menü schließen', 'SlitherZoomer anzeigen',
      'Zoom beim Start', 'Fester Nickname', 'Leer = aus', 'Sprache', 'Mausrad-Empfindlichkeit', 'Zoom-Hinweise', 'Steuerung', 'Mausrad', 'Zoom per Mausrad kann nicht geändert werden',
      'Hineinzoomen', 'Herauszoomen', 'Standard-Zoom', 'Menü ein- / ausblenden', 'Kleines Futter an / aus', 'Auflösung wechseln', 'keine', 'Klicken, dann Taste drücken · Esc bricht ab · Rücktaste löscht', 'Leertaste',
      'Zoom: Standard', 'Kleines Futter: ausgeblendet', 'Kleines Futter: sichtbar', 'Auflösung'],
    tr: ['Zoom', 'otomatik', "Zoom'u sıfırla", 'Görüntü çözünürlüğü', 'Küçük yemleri gizle', 'Oyunda menüyü gizle', 'Ayarlar', 'Menüyü kapat', "SlitherZoomer'ı göster",
      "Başlangıç zoom'u", 'Sabit takma ad', 'Boş = kapalı', 'Dil', 'Tekerlek hassasiyeti', 'Zoom bildirimleri', 'Kontroller', 'Tekerlek', 'Tekerlekle zoom değiştirilemez',
      'Yakınlaştır', 'Uzaklaştır', 'Varsayılan zoom', 'Menüyü göster / gizle', 'Küçük yemler aç / kapa', 'Çözünürlüğü değiştir', 'yok', 'Tıklayın ve bir tuşa basın · Esc iptal · Backspace siler', 'Boşluk',
      'Zoom: varsayılan', 'Küçük yemler: gizli', 'Küçük yemler: görünür', 'Çözünürlük'],
    id: ['Zoom', 'otomatis', 'Atur ulang zoom', 'Resolusi render', 'Sembunyikan makanan kecil', 'Sembunyikan menu saat bermain', 'Pengaturan', 'Tutup menu', 'Tampilkan SlitherZoomer',
      'Zoom saat mulai', 'Nama tetap', 'Kosong = mati', 'Bahasa', 'Sensitivitas roda', 'Notifikasi zoom', 'Kontrol', 'Roda', 'Zoom dengan roda tidak bisa diubah',
      'Perbesar', 'Perkecil', 'Zoom bawaan', 'Tampilkan / sembunyikan menu', 'Makanan kecil nyala / mati', 'Ganti resolusi', 'tidak ada', 'Klik lalu tekan tombol · Esc batal · Backspace hapus', 'Spasi',
      'Zoom: bawaan', 'Makanan kecil: disembunyikan', 'Makanan kecil: terlihat', 'Resolusi'],
  };
  for (const l in TR) if (TR[l].length !== KEYS.length) console.error('SlitherZoomer: zła liczba tłumaczeń', l);
  const T = k => { const arr = TR[cfg.lang] || TR.en, i = KEYS.indexOf(k); return (arr && arr[i]) || TR.en[i] || k; };

  // ================= Ustawienia =================
  const ZMIN = 0.15, ZMAX = 2.0;
  const FOOD_MIN = 10; // zwykłe kropki mają rozmiar 3–9, masa po martwym wężu ok. 14

  const RES_ORDER = [100, 75, 50];
  const ACTIONS = ['zoomIn', 'zoomOut', 'reset', 'menu', 'food', 'res'];
  const DEFAULT_BINDS = {
    zoomIn:  { code: 'Equal',  label: '+' },
    zoomOut: { code: 'Minus',  label: '-' },
    reset:   { code: 'Digit0', label: '0' },
    menu:    { code: 'KeyM',   label: 'M' },
    food:    { code: 'KeyF',   label: 'F' },
    res:     { code: 'KeyR',   label: 'R' },
  };
  const DEFAULTS = { lang: 'en', zoom: null, res: 75, sens: 5, toast: true, hideFood: false, hideInGame: false, nick: '', binds: DEFAULT_BINDS };

  const cfg = JSON.parse(JSON.stringify(DEFAULTS));
  try {
    const s = JSON.parse(localStorage.getItem('slitherZoomer5') || localStorage.getItem('slitherZoomer4') || localStorage.getItem('slitherZoomer3') || '{}');
    Object.assign(cfg, s, { binds: Object.assign({}, DEFAULT_BINDS, s.binds || {}) });
    // Od 5.4 jedzenie i rozdzielczość mają domyślne klawisze F i R. Starsze zapisy miały tu „brak”,
    // więc raz uzupełniamy je domyślnymi, o ile ten klawisz nie jest zajęty przez inną akcję.
    if (!s.bindsV54) {
      for (const id of ['food', 'res']) {
        const d = DEFAULT_BINDS[id];
        const used = Object.values(cfg.binds).some(b => b && b.code === d.code);
        if (!cfg.binds[id] && !used) cfg.binds[id] = { code: d.code, label: d.label };
      }
      cfg.bindsV54 = true;
    }
    if (!TR[cfg.lang]) cfg.lang = 'en';
    cfg.sens = Number.isInteger(cfg.sens) ? Math.min(10, Math.max(1, cfg.sens)) : 5;
    if (typeof cfg.nick !== 'string') cfg.nick = '';
    if (cfg.zoom !== null) cfg.zoom = typeof cfg.zoom === 'number' ? Math.min(ZMAX, Math.max(ZMIN, cfg.zoom)) : null;
    if (!RES_ORDER.includes(cfg.res)) cfg.res = 75;
  } catch (e) {}
  const save = () => { try { localStorage.setItem('slitherZoomer5', JSON.stringify(cfg)); } catch (e) {} };

  // Zoom jest zapamiętywany, więc każda runda (i każde wejście na stronę) zaczyna się od niego.
  let target = cfg.zoom;       // null = domyślny zoom gry
  let menuShown = true;        // menu zamknięte do ikonki czy nie
  let forceShowInGame = false; // pokazanie menu w grze mimo „ukryj podczas gry”
  let settingsOpen = false;    // panel ustawień po prawej
  const step = () => 1 - 0.02 * cfg.sens;
  const R = () => cfg.res / 100;

  // ================= Logika gry =================
  const inGame = () => W.playing === true && !!W.slither;
  const clamp = v => Math.min(ZMAX, Math.max(ZMIN, v));
  const gameGsc = () => { const s = W.slither && W.slither.sct; return typeof s === 'number' ? 0.64285 + 0.514285714 / Math.max(1, (s + 16) / 36) : null; };
  const currentZoom = () => target ?? gameGsc() ?? 1.157;

  function setZoom(v) {
    target = v === null ? null : clamp(v);
    cfg.zoom = target === null ? null : Math.round(target * 100) / 100;
    save(); updateUI(); toast();
  }
  const zoomBy = f => setZoom(currentZoom() * f);

  // Gra rysuje na płótnie ~1800 px po przekątnej i rozciąga je na ekran.
  // Mniejsze płótno = mniej pikseli; skalę gsc mnożymy tak samo, więc widać ten sam obszar.
  let appliedR = 1, lastW = 0;
  function setCanvas(r) {
    const mc = W.mc, ww = W.ww, hh = W.hh;
    if (!mc || !ww || !hh || typeof W.trf !== 'function' || typeof W.mww !== 'number') return;
    const dl = Math.sqrt(ww * ww + hh * hh);
    let nw = Math.ceil(ww * 1800 / dl), nh = Math.ceil(hh * 1800 / dl);
    if (nw > 1500) { nh = Math.ceil(nh * 1500 / nw); nw = 1500; }
    if (nh > 1500) { nw = Math.ceil(nw * 1500 / nh); nh = 1500; }
    nw = Math.max(100, Math.ceil(nw * r)); nh = Math.max(100, Math.ceil(nh * r));
    if (W.mww !== nw || W.mhh !== nh) {
      W.mww = nw; W.mhh = nh; mc.width = nw; mc.height = nh;
      W.mwwp50 = nw + 50; W.mhhp50 = nh + 50; W.mwwp150 = nw + 150; W.mhhp150 = nh + 150;
      W.mww2 = nw / 2; W.mhh2 = nh / 2;
      if (typeof W.rdgbg === 'function') W.rdgbg();
    }
    const csc = Math.min(ww / nw, hh / nh);
    W.trf(mc, 'scale(' + csc + ',' + csc + ')');
    mc.style.left = Math.floor(ww / 2 - nw / 2) + 'px';
    mc.style.top = Math.floor(hh / 2 - nh / 2) + 'px';
    // Skala gsc musi iść razem z płótnem, np. po śmierci, gdy płótno wraca do 100%
    if (typeof W.gsc === 'number' && appliedR > 0) W.gsc *= r / appliedR;
    lastW = nw;
    appliedR = r;
  }

  function apply() {
    const base = target ?? gameGsc();
    // W menu gry zawsze pełna rozdzielczość. Płótno zmniejszamy tylko, gdy da się policzyć skalę.
    const r = inGame() && base !== null ? R() : 1;
    // Gra po zmianie okna sama ustawia pełne płótno, więc pilnujemy jego szerokości
    if (r !== appliedR || (appliedR !== 1 && W.mww !== lastW)) setCanvas(r);
    if (!inGame() || base === null) return;
    if (target !== null || appliedR !== 1) W.gsc = base * appliedR;
  }

  // Na czas rysowania klatki podmieniamy listę jedzenia na samą dużą masę.
  // Gra tylko czyta tę listę w redraw, więc po narysowaniu przywracamy oryginał.
  const foodBuf = [];
  function drawFrame(orig, self, args) {
    try { apply(); } catch (e) {} // błąd skryptu nigdy nie może zatrzymać rysowania gry
    const all = W.foods, n = W.foods_c;
    if (!cfg.hideFood || !inGame() || !Array.isArray(all) || typeof n !== 'number') return orig.apply(self, args);
    let k = 0;
    for (let i = 0; i < n; i++) { const fo = all[i]; if (fo && fo.sz >= FOOD_MIN) foodBuf[k++] = fo; }
    W.foods = foodBuf; W.foods_c = k;
    try { return orig.apply(self, args); }
    finally { W.foods = all; W.foods_c = n; }
  }

  // Stały nick: wpisujemy go w pole gry, chyba że gracz właśnie sam w nim pisze
  // (gra sama ustawia kursor w tym polu, więc samo „aktywne pole” nic nie znaczy)
  let nickTypedAt = 0;
  document.addEventListener('input', e => { if (e.target && e.target.id === 'nick') nickTypedAt = Date.now(); }, true);
  function applyNick() {
    if (!cfg.nick) return;
    const inp = document.getElementById('nick');
    if (!inp || inGame() || Date.now() - nickTypedAt < 5000) return;
    if (inp.value !== cfg.nick) inp.value = cfg.nick;
    try { if (localStorage.getItem('nick') !== cfg.nick) localStorage.setItem('nick', cfg.nick); } catch (e) {}
  }

  let wasInGame = false;
  setInterval(() => {
    const rd = W.redraw;
    if (typeof rd === 'function' && !rd.__sz) {
      const w = function () { return drawFrame(rd, this, arguments); };
      w.__sz = true; W.redraw = w;
    }
    const g = inGame();
    if (g !== wasInGame) { wasInGame = g; forceShowInGame = false; updateVisibility(); }
    applyNick();
    if (wrap) updateUI(true);
  }, 300);

  // ================= Wygląd =================
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@800&display=swap';
  document.head.appendChild(fontLink);

  const css = document.createElement('style');
  css.textContent = `
  #sz-wrap{position:fixed;left:14px;top:14px;z-index:2147483600;display:flex;align-items:flex-start;gap:8px;
    font:13px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#e5e7eb;user-select:none}
  #sz-wrap,#sz-mini{transition:transform .2s ease,opacity .2s ease,visibility 0s}
  #sz-wrap.sz-hidden,#sz-mini.sz-hidden{transform:translateX(calc(-100% - 40px));opacity:0;visibility:hidden;pointer-events:none;
    transition:transform .2s ease,opacity .2s ease,visibility 0s .2s}
  .sz-card{width:270px;max-height:calc(100vh - 28px);overflow-y:auto;overflow-x:hidden;box-sizing:border-box;
    background:rgb(19,22,31);border:1px solid rgba(255,255,255,.08);border-radius:14px;
    box-shadow:0 8px 30px rgba(0,0,0,.45);scrollbar-width:thin;scrollbar-color:#4b5563 transparent}
  #sz-side{display:none;width:262px}
  #sz-wrap.sz-cfg #sz-side{display:block;animation:szin .18s ease-out}
  @keyframes szin{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
  .sz-head{display:flex;align-items:center;gap:6px;padding:9px 10px 4px 12px}
  .sz-logo{flex:1;font:800 27px/1 "Baloo 2","Arial Rounded MT Bold","Trebuchet MS",sans-serif;white-space:nowrap}
  .sz-logo span,#sz-mini span{-webkit-background-clip:text;background-clip:text;color:transparent}
  .sz-logo span{filter:drop-shadow(0 3px 2px rgba(0,0,0,.6))}
  .sz-g{background-image:linear-gradient(180deg,#a7f3c0 0%,#4ade80 35%,#16a34a 75%,#0f7a37 100%)}
  .sz-p{background-image:linear-gradient(180deg,#e9d5ff 0%,#c084fc 35%,#8b5cf6 75%,#6d28d9 100%)}
  .sz-title{flex:1;font-weight:700;font-size:14px;color:#e9d5ff;padding:4px 0}
  .sz-ibtn{flex:none;width:28px;height:28px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);
    display:flex;align-items:center;justify-content:center;cursor:pointer;color:#cbd5e1;transition:background .15s,color .15s}
  .sz-ibtn:hover{background:rgba(255,255,255,.12);color:#fff}
  .sz-ibtn svg{width:16px;height:16px}
  #sz-close:hover{background:rgba(239,68,68,.2);color:#fca5a5;border-color:rgba(239,68,68,.4)}
  #sz-gear svg{transition:transform .35s}
  #sz-wrap.sz-cfg #sz-gear{background:rgba(139,92,246,.25);color:#e9d5ff;border-color:rgba(139,92,246,.5)}
  #sz-wrap.sz-cfg #sz-gear svg{transform:rotate(90deg)}
  .sz-view{padding:2px 12px 12px}
  .sz-row{margin-top:10px}
  .sz-lbl{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:2px;color:#cbd5e1}
  .sz-lbl svg{width:14px;height:14px;vertical-align:-2px;margin-right:5px;color:#a78bfa}
  .sz-val{color:#d8b4fe;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
  .sz-range{-webkit-appearance:none;appearance:none;display:block;width:100%;height:6px;margin:9px 0 6px;border-radius:99px;outline:none;cursor:pointer;
    background:linear-gradient(90deg,#6d28d9,#a855f7 60%,#d8b4fe) 0 0/var(--p,50%) 100% no-repeat,rgba(255,255,255,.1)}
  .sz-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;
    border:3px solid #a855f7;box-shadow:0 0 0 4px rgba(168,85,247,.18),0 2px 6px rgba(0,0,0,.5);transition:transform .12s,box-shadow .12s}
  .sz-range:hover::-webkit-slider-thumb{box-shadow:0 0 0 6px rgba(168,85,247,.25),0 2px 6px rgba(0,0,0,.5)}
  .sz-range:active::-webkit-slider-thumb{transform:scale(1.15)}
  .sz-range::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background:#fff;border:3px solid #a855f7;box-shadow:0 0 0 4px rgba(168,85,247,.18)}
  .sz-in,.sz-sel{width:100%;box-sizing:border-box;padding:6px 8px;border-radius:8px;border:1px solid rgba(255,255,255,.12);
    background:rgba(255,255,255,.06);color:#f3f4f6;font:inherit;outline:none}
  .sz-in:focus,.sz-sel:focus{border-color:#8b5cf6}
  .sz-in::placeholder{color:#6b7280}
  .sz-sel option{background:#111827;color:#f3f4f6}
  .sz-seg{display:flex;gap:6px}
  .sz-btn{flex:1;padding:5px 0;border:1px solid rgba(255,255,255,.1);border-radius:8px;
    background:rgba(255,255,255,.05);color:#e5e7eb;font:inherit;cursor:pointer}
  .sz-btn:hover{background:rgba(255,255,255,.1)}
  .sz-btn.sz-on{background:linear-gradient(180deg,#4ade80,#16a34a);color:#052e16;border-color:transparent;font-weight:700}
  .sz-wide{width:100%}
  .sz-tog{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:10px;cursor:pointer}
  .sz-sw{flex:none;width:34px;height:18px;border-radius:9px;background:#374151;position:relative;transition:background .2s}
  .sz-sw:after{content:"";position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .2s}
  .sz-tog.sz-on .sz-sw{background:#8b5cf6}
  .sz-tog.sz-on .sz-sw:after{left:18px}
  .sz-h{margin:14px 0 2px;font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#a78bfa}
  .sz-ctl{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:4px 0;color:#cbd5e1}
  .sz-key{flex:none;min-width:46px;padding:3px 8px;border-radius:7px;border:1px solid rgba(255,255,255,.14);
    background:rgba(255,255,255,.06);color:#f3f4f6;font:600 12px ui-monospace,Consolas,monospace;text-align:center;cursor:pointer;
    display:inline-flex;align-items:center;justify-content:center;gap:5px}
  .sz-key:hover{border-color:#8b5cf6}
  .sz-key svg{width:12px;height:12px;color:#9ca3af}
  .sz-key.sz-none{color:#6b7280;font-weight:400}
  .sz-key.sz-fixed{cursor:not-allowed;opacity:.75;border-style:dashed}
  .sz-key.sz-fixed:hover{border-color:rgba(255,255,255,.14)}
  .sz-key.sz-listen{border-color:#a855f7;color:#d8b4fe;animation:szp 1s infinite}
  @keyframes szp{50%{opacity:.5}}
  #sz-mini{position:fixed;left:14px;top:14px;z-index:2147483600;width:40px;height:40px;border-radius:12px;cursor:pointer;box-sizing:border-box;
    background:rgb(19,22,31);border:1px solid rgba(255,255,255,.12);box-shadow:0 4px 14px rgba(0,0,0,.4);
    display:flex;align-items:center;justify-content:center;font:800 19px/1 "Baloo 2","Arial Rounded MT Bold",sans-serif;
    opacity:.85}
  #sz-mini:not(.sz-hidden):hover{opacity:1;transform:scale(1.06)}
  #sz-toast{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:2147483600;
    font:600 13px system-ui,"Segoe UI",Arial,sans-serif;color:#fff;background:rgba(17,20,28,.85);
    padding:6px 12px;border-radius:999px;pointer-events:none;opacity:0;transition:opacity .25s}
  `;
  document.head.appendChild(css);

  // ================= Ikony =================
  const SVG = p => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  const I_GEAR = SVG('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>');
  const I_X = SVG('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>');
  const I_LOCK = SVG('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>');
  const I_GLOBE = SVG('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>');
  const I_USER = SVG('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>');

  // ================= Menu =================
  let wrap, mini, el = {}, listening = null;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fill = r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%');

  function buildMenu() {
    if (wrap) wrap.remove();
    wrap = document.createElement('div');
    wrap.id = 'sz-wrap';
    if (settingsOpen) wrap.classList.add('sz-cfg');
    wrap.innerHTML = `
      <div class="sz-card" id="sz-main">
        <div class="sz-head">
          <div class="sz-logo"><span class="sz-g">Slither</span><span class="sz-p">Zoomer</span></div>
          <div class="sz-ibtn" id="sz-gear" title="${esc(T('settings'))}">${I_GEAR}</div>
          <div class="sz-ibtn" id="sz-close" title="${esc(T('minimize'))}">${I_X}</div>
        </div>
        <div class="sz-view">
          <div class="sz-row">
            <div class="sz-lbl"><span>${esc(T('startZoom'))}</span><span class="sz-val" id="sz-zv"></span></div>
            <input type="range" class="sz-range" id="sz-zoom" min="${ZMIN}" max="${ZMAX}" step="0.01">
          </div>
          <div class="sz-row"><button class="sz-btn sz-wide" id="sz-reset">${esc(T('resetZoom'))}</button></div>
          <div class="sz-row">
            <div class="sz-lbl" style="margin-bottom:5px"><span>${esc(T('res'))}</span><span class="sz-val" id="sz-rv"></span></div>
            <div class="sz-seg">
              ${RES_ORDER.map(r => `<button class="sz-btn" data-res="${r}">${r}%</button>`).join('')}
            </div>
          </div>
          <div class="sz-tog" data-opt="hideFood"><span>${esc(T('hideFood'))}</span><div class="sz-sw"></div></div>
          <div class="sz-tog" data-opt="hideInGame"><span>${esc(T('hideInGame'))}</span><div class="sz-sw"></div></div>
          <div class="sz-row">
            <div class="sz-lbl" style="margin-bottom:5px"><span>${I_USER}${esc(T('nick'))}</span></div>
            <input class="sz-in" id="sz-nick" maxlength="24" placeholder="${esc(T('nickPh'))}" spellcheck="false" autocomplete="off">
          </div>
        </div>
      </div>
      <div class="sz-card" id="sz-side">
        <div class="sz-head"><div class="sz-title">${esc(T('settings'))}</div></div>
        <div class="sz-view">
          <div class="sz-row">
            <div class="sz-lbl" style="margin-bottom:5px"><span>${I_GLOBE}${esc(T('language'))}</span></div>
            <select class="sz-sel" id="sz-lang">${LANGS.map(([c, n]) => `<option value="${c}">${esc(n)}</option>`).join('')}</select>
          </div>
          <div class="sz-row">
            <div class="sz-lbl"><span>${esc(T('sens'))}</span><span class="sz-val" id="sz-sv"></span></div>
            <input type="range" class="sz-range" id="sz-sens" min="1" max="10" step="1">
          </div>
          <div class="sz-tog" data-opt="toast"><span>${esc(T('toast'))}</span><div class="sz-sw"></div></div>
          <div class="sz-h">${esc(T('controls'))}</div>
          <div class="sz-ctl"><span>${esc(T('zoom'))}</span><span class="sz-key sz-fixed" title="${esc(T('wheelLocked'))}">${I_LOCK}${esc(T('wheel'))}</span></div>
          ${ACTIONS.map(a => `<div class="sz-ctl"><span>${esc(T(a === 'res' ? 'resCycle' : a))}</span><span class="sz-key" data-act="${a}" title="${esc(T('keyHint'))}"></span></div>`).join('')}
        </div>
      </div>`;
    document.body.appendChild(wrap);
    shield(wrap);

    const $ = s => wrap.querySelector(s);
    el = {
      zoom: $('#sz-zoom'), zv: $('#sz-zv'), sens: $('#sz-sens'), sv: $('#sz-sv'), rv: $('#sz-rv'), nick: $('#sz-nick'), lang: $('#sz-lang'),
      res: wrap.querySelectorAll('[data-res]'), togs: wrap.querySelectorAll('[data-opt]'), keys: wrap.querySelectorAll('[data-act]'),
    };

    $('#sz-gear').addEventListener('click', () => { stopListening(); settingsOpen = !settingsOpen; wrap.classList.toggle('sz-cfg', settingsOpen); });
    $('#sz-close').addEventListener('click', hideMenu);
    el.zoom.addEventListener('input', () => { fill(el.zoom); setZoom(+el.zoom.value); });
    $('#sz-reset').addEventListener('click', () => setZoom(null));
    el.sens.addEventListener('input', () => { fill(el.sens); cfg.sens = +el.sens.value; save(); updateUI(); });
    el.res.forEach(b => b.addEventListener('click', () => { cfg.res = +b.dataset.res; save(); updateUI(); }));
    el.togs.forEach(t => t.addEventListener('click', () => {
      const o = t.dataset.opt; cfg[o] = !cfg[o]; save(); updateUI(); updateVisibility();
    }));
    el.nick.value = cfg.nick;
    el.nick.addEventListener('input', () => { cfg.nick = el.nick.value.slice(0, 24); save(); nickTypedAt = 0; applyNick(); });
    el.nick.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === 'Escape') el.nick.blur(); e.stopPropagation(); });
    el.lang.value = cfg.lang;
    el.lang.addEventListener('change', () => { cfg.lang = el.lang.value; save(); buildMenu(); });
    el.keys.forEach(k => k.addEventListener('click', () => (listening === k.dataset.act ? stopListening() : startListening(k.dataset.act))));

    updateUI();
    updateVisibility();
  }

  function buildMini() {
    mini = document.createElement('div');
    mini.id = 'sz-mini';
    mini.className = 'sz-hidden';
    mini.innerHTML = '<span class="sz-g">S</span><span class="sz-p">Z</span>';
    mini.addEventListener('click', showMenu);
    document.body.appendChild(mini);
    shield(mini);
  }

  // Kliknięcia i ruch myszy nad menu nie sterują wężem i nie włączają przyspieszenia
  function shield(node) {
    // Puszczenia przycisku (mouseup/pointerup) celowo przepuszczamy, żeby przyspieszenie nie mogło się zaciąć
    ['mousedown', 'mousemove', 'pointerdown', 'touchstart', 'touchmove', 'contextmenu']
      .forEach(t => node.addEventListener(t, e => e.stopPropagation()));
  }

  function startListening(id) { listening = id; renderBinds(); }
  function stopListening() { listening = null; renderBinds(); }

  function renderBinds() {
    if (!el.keys) return;
    el.keys.forEach(k => {
      const id = k.dataset.act, b = cfg.binds[id];
      k.classList.toggle('sz-listen', listening === id);
      k.classList.toggle('sz-none', listening !== id && !b);
      k.textContent = listening === id ? '...' : (b ? (b.code === 'Space' ? T('space') : b.label) : T('none'));
    });
  }

  const menuVisible = () => menuShown && !(cfg.hideInGame && inGame() && !forceShowInGame);
  function showMenu() { menuShown = true; if (cfg.hideInGame && inGame()) forceShowInGame = true; updateVisibility(); }
  function hideMenu() { if (cfg.hideInGame && inGame()) forceShowInGame = false; else menuShown = false; updateVisibility(); }
  function updateVisibility() {
    if (!wrap || !mini) return;
    const vis = menuVisible();
    // Najpierw chowamy to, co znika, potem pokazujemy drugie, żeby nigdy nie były widoczne naraz
    if (vis) { mini.classList.add('sz-hidden'); wrap.classList.remove('sz-hidden'); }
    else { wrap.classList.add('sz-hidden'); mini.classList.remove('sz-hidden'); stopListening(); }
    mini.title = T('showMenu');
  }

  function updateUI(onlyZoom) {
    if (!wrap) return;
    const z = currentZoom();
    if (document.activeElement !== el.zoom) { el.zoom.value = z; fill(el.zoom); }
    el.zv.textContent = target !== null ? z.toFixed(2) + 'x' : (W.slither ? T('auto') + ' (' + z.toFixed(2) + 'x)' : T('auto'));
    if (onlyZoom) return;
    el.sens.value = cfg.sens; fill(el.sens); el.sv.textContent = cfg.sens + '/10';
    el.rv.textContent = cfg.res + '%';
    el.res.forEach(b => b.classList.toggle('sz-on', +b.dataset.res === cfg.res));
    el.togs.forEach(t => t.classList.toggle('sz-on', !!cfg[t.dataset.opt]));
    renderBinds();
  }

  let toastEl;
  function toast(text) {
    if (!cfg.toast && !text) return;
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.id = 'sz-toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = text || (target === null ? T('toastDefault') : T('zoom') + ': ' + target.toFixed(2) + 'x');
    toastEl.style.opacity = '1';
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (toastEl.style.opacity = '0'), 1200);
  }

  // ================= Akcje =================
  const run = {
    zoomIn:  () => zoomBy(1 / step()),
    zoomOut: () => zoomBy(step()),
    reset:   () => setZoom(null),
    menu:    () => (menuVisible() ? hideMenu() : showMenu()),
    food:    () => { cfg.hideFood = !cfg.hideFood; save(); updateUI(); toast(T(cfg.hideFood ? 'foodHidden' : 'foodShown')); },
    res:     () => { cfg.res = RES_ORDER[(RES_ORDER.indexOf(cfg.res) + 1) % RES_ORDER.length]; save(); updateUI(); toast(T('resToast') + ': ' + cfg.res + '%'); },
  };

  function keyLabel(e) {
    if (e.code.startsWith('Numpad')) return 'Num ' + e.code.slice(6).replace('Add', '+').replace('Subtract', '-').replace('Multiply', '*').replace('Divide', '/');
    if (e.key && e.key.length === 1) return e.key.toUpperCase();
    return e.key || e.code;
  }

  // ================= Sterowanie =================
  window.addEventListener('wheel', e => {
    if ((wrap && wrap.contains(e.target)) || (mini && mini.contains(e.target))) return;
    if (!inGame() || !e.deltaY) return; // ruch poziomy (Shift + kółko, touchpad) nie zmienia zoomu
    e.preventDefault();
    zoomBy(e.deltaY > 0 ? step() : 1 / step());
  }, { passive: false, capture: true });

  window.addEventListener('keydown', e => {
    if (listening) { // ustawianie nowego skrótu
      e.preventDefault(); e.stopPropagation();
      if (e.code === 'Escape') return stopListening();
      if (e.code === 'Backspace' || e.code === 'Delete') { cfg.binds[listening] = null; save(); return stopListening(); }
      if (/^(Shift|Control|Alt|Meta)/.test(e.code)) return;
      for (const id in cfg.binds) if (cfg.binds[id] && cfg.binds[id].code === e.code) cfg.binds[id] = null; // bez duplikatów
      cfg.binds[listening] = { code: e.code, label: keyLabel(e) };
      save();
      return stopListening();
    }
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    for (const id in cfg.binds) {
      const b = cfg.binds[id];
      if (b && b.code === e.code) {
        if (e.repeat && id !== 'zoomIn' && id !== 'zoomOut') return; // przytrzymany klawisz nie przełącza w kółko
        if (typeof run[id] === 'function') run[id]();
        return;
      }
    }
  }, true);

  // Kliknięcie gdziekolwiek poza polem skrótu kończy czekanie na klawisz
  document.addEventListener('mousedown', e => {
    if (listening && !(e.target.closest && e.target.closest('[data-act]'))) stopListening();
  }, true);

  // Po puszczeniu myszy (także poza elementem) oddajemy klawiaturę grze,
  // żeby strzałki nie przesuwały suwaka, a Spacja nie wciskała przycisku menu
  window.addEventListener('mouseup', () => {
    const a = document.activeElement;
    if (wrap && a && wrap.contains(a) && a.matches('input[type=range],button')) setTimeout(() => a.blur(), 0);
  }, true);

  // Przy @run-at document-idle strona jest już gotowa
  document.querySelectorAll('#sz-wrap,#sz-mini,#sz-panel').forEach(n => n.remove()); // resztki starszych wersji
  buildMini(); buildMenu(); applyNick();
})();
