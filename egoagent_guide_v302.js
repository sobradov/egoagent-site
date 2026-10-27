/* EgoAgent Guide (v302) - one guide for every page of the site.
   - A living EgoAgent mark on the right edge, vertically centred, clear of the reading column.
   - Three likely questions per page, with answers taken from what the site says.
   - Any other question, typed or spoken, is answered from the site's own text: the guide finds the passage that answers it and reads it aloud.
     It does not make anything up; when the site does not say, it says so. (The live AI guide replaces this matching later.)
   - On the registration page it can also fill in the form by voice, reading each answer back; the sworn affirmation stays the therapist's own tap.
   - In the working space it explains the screens and never reads patient material. */
(function () {
  if (window.__egoGuide) return; window.__egoGuide = true;
  var D = document, isDemo = /workspace_demo/.test(location.pathname);

  /* ---------- look ---------- */
  var css = '' +
  '.gd-fab{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:150;width:58px;height:72px;padding:0 0 0 6px;border:0;cursor:pointer;border-radius:36px 0 0 36px;background:radial-gradient(circle at 60% 45%,#16263C,#0B1420 75%);box-shadow:inset 2px 0 0 #E0B658,inset 0 2px 0 #E0B658,inset 0 -2px 0 #E0B658,-4px 6px 20px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}' +
  '@media (max-width:600px){.gd-fab{top:auto;bottom:calc(16vh + env(safe-area-inset-bottom));transform:none;width:44px;height:60px;padding-left:4px}.gd-fab svg{width:26px;height:26px}}' +
  '@media (min-width:1500px){.gd-fab{right:max(24px,calc((100vw - 1360px)/2 - 96px));width:72px;height:72px;padding:0;border-radius:50%;box-shadow:0 0 0 2px #E0B658,0 8px 24px rgba(0,0,0,.55)}}' +
  '.gd-fab svg{width:32px;height:32px;fill:none;stroke:#C8553D;stroke-width:4.6;stroke-linecap:round;stroke-linejoin:round;animation:gdBreathe 3.2s ease-in-out infinite}' +
  '.gd-fab:after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 0 0 rgba(224,182,88,.7);animation:gdRing 3.2s ease-out infinite;pointer-events:none}' +
  '.gd-fab:focus-visible{outline:3px solid #F0CF7E;outline-offset:3px}' +
  '@keyframes gdBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.09)}}' +
  '@keyframes gdRing{0%{box-shadow:0 0 0 0 rgba(224,182,88,.7)}70%,100%{box-shadow:0 0 0 14px rgba(224,182,88,0)}}' +
  '@keyframes gdGlow{0%,100%{filter:drop-shadow(0 0 0 rgba(224,182,88,0))}50%{filter:drop-shadow(0 0 10px rgba(224,182,88,.75))}}' +
  '@media (prefers-reduced-motion: reduce){.gd-fab svg,.gd-fab:after{animation:none}.gd-fab{animation:gdGlow 3.2s ease-in-out infinite}}' +
  'body.gd-open .gd-fab{display:none}' +
  '.gd-panel{position:fixed;right:max(12px,env(safe-area-inset-right));top:50%;transform:translateY(-50%);z-index:151;width:min(430px,calc(100vw - 24px));max-height:min(82vh,680px);display:flex;flex-direction:column;background:#0E1A2A;border:1.5px solid #E0B658;border-radius:16px;box-shadow:0 18px 48px rgba(0,0,0,.6);color:#F2F7F4;font-family:"Inter Tight",system-ui,sans-serif;font-size:17px;line-height:1.45;text-align:left}' +
  '@media (max-width:600px){.gd-panel{top:auto;bottom:max(10px,env(safe-area-inset-bottom));transform:none;max-height:78vh}}' +
  '.gd-panel[hidden]{display:none}' +
  '.gd-head{display:flex;align-items:center;gap:.6em;padding:.75em 1em .55em;border-bottom:1px solid #2A3D55}' +
  '.gd-head svg{width:26px;height:26px;fill:none;stroke:#C8553D;stroke-width:4.6;stroke-linecap:round;stroke-linejoin:round;flex:none}' +
  '.gd-head h2{margin:0;font-family:"Fraunces",Georgia,serif;font-weight:400;font-size:1.25em;color:#E0B658;flex:1;letter-spacing:0}' +
  '.gd-x{width:42px;height:42px;border-radius:50%;border:1.5px solid #E0B658;background:transparent;color:#E0B658;font-size:22px;line-height:1;cursor:pointer;flex:none}' +
  '.gd-log{flex:1;overflow:auto;padding:.7em 1em;display:flex;flex-direction:column;gap:.55em;min-height:90px}' +
  '.gd-msg{padding:.55em .8em;border-radius:12px;max-width:94%;white-space:pre-line}' +
  '.gd-msg.g{background:#16263C;align-self:flex-start}' +
  '.gd-msg.u{background:#24384C;align-self:flex-end;color:#FFFFFF}' +
  '.gd-msg .gd-src{display:block;margin-top:.35em;font-size:.8em;color:#A3B1C0}' +
  '.gd-acts{display:flex;flex-wrap:wrap;gap:.5em;padding:.6em 1em .5em;border-top:1px solid #2A3D55}' +
  '.gd-ask{display:flex;gap:.5em;padding:.2em 1em 1em;align-items:center}' +
  '.gd-ask input{flex:1;min-width:0;font:inherit;color:#fff;background:#08101A;border:1px solid #2A3D55;border-radius:10px;padding:.55em .75em}' +
  '.gd-ask input:focus{outline:none;border-color:#E0B658}' +
  '.gd-b{font-family:inherit;font-size:.95em;padding:.55em .95em;border-radius:10px;border:1.5px solid #3F73A2;background:#16263C;color:#F2F7F4;cursor:pointer;text-align:left}' +
  '.gd-b.q{border-color:#2A3D55}' +
  '.gd-b.main{background:#3E6B58;border-color:#3E6B58}' +
  '.gd-b:focus-visible{outline:2px solid #F0CF7E;outline-offset:2px}' +
  '.gd-mic{width:46px;height:46px;flex:none;border-radius:50%;border:1.5px solid #E0B658;background:#3E6B58;color:#fff;font-size:20px;cursor:pointer}' +
  '.gd-mic.on{background:#8E2F22;border-color:#F0CF7E}' +
  '.gd-send{flex:none}' +
  '.gd-lit{outline:3px solid #E0B658 !important;outline-offset:3px;border-radius:8px}';
  var st = D.createElement('style'); st.textContent = css; D.head.appendChild(st);

  var MARK = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M24 58 C10 50 6 26 20 13 C30 4 46 6 52 18 C58 30 54 47 46 58 C40 40 34 30 15 20 C22 9 40 6 50 15"/></svg>';
  var fab = D.createElement('button'); fab.type = 'button'; fab.className = 'gd-fab'; fab.setAttribute('aria-label', 'Ask the EgoAgent guide'); fab.innerHTML = MARK; D.body.appendChild(fab);
  var pan = D.createElement('div'); pan.className = 'gd-panel'; pan.hidden = true; pan.setAttribute('role', 'dialog'); pan.setAttribute('aria-label', 'EgoAgent guide');
  pan.innerHTML = '<div class="gd-head">' + MARK + '<h2>Ask EgoAgent</h2><button class="gd-x" type="button" aria-label="Close the guide">&times;</button></div>' +
    '<div class="gd-log" aria-live="polite"></div><div class="gd-acts"></div>' +
    '<div class="gd-ask"><input type="text" aria-label="Ask any question about EgoAgent" placeholder="Ask any question"><button class="gd-mic" type="button" aria-label="Ask by voice">🎙</button><button class="gd-b main gd-send" type="button">Ask</button></div>';
  D.body.appendChild(pan);
  var log = pan.querySelector('.gd-log'), acts = pan.querySelector('.gd-acts'), inp = pan.querySelector('.gd-ask input'), mic = pan.querySelector('.gd-mic');

  /* ---------- voice ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var LOC = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', it: 'it-IT', ar: 'ar-SA', sr: 'sr-RS', 'sr-Latn': 'sr-RS', 'sr-Cyrl': 'sr-RS' };
  function loc() { var l = (D.documentElement.lang || 'en'); return LOC[l] || LOC[l.split('-')[0]] || 'en-US'; }
  if (!SR) mic.hidden = true;
  function speak(t) { if (!window.speechSynthesis) return; try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = loc(); u.rate = 0.92; speechSynthesis.speak(u); } catch (e) {} }
  function hush() { try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} }
  function add(t, who, src) { var d = D.createElement('div'); d.className = 'gd-msg ' + (who || 'g'); d.textContent = t; if (src) { var s = D.createElement('span'); s.className = 'gd-src'; s.textContent = src; d.appendChild(s); } log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
  function say(t, src) { add(t, 'g', src); speak(t); }
  function btn(label, cls, fn) { var b = D.createElement('button'); b.type = 'button'; b.className = 'gd-b ' + (cls || ''); b.textContent = label; b.onclick = fn; acts.appendChild(b); return b; }
  function clearActs() { acts.innerHTML = ''; }
  var listenCb = null;
  function listen(cb) {
    if (!SR) return; hush();
    var r = new SR(); r.lang = loc(); r.interimResults = false; r.maxAlternatives = 1;
    mic.classList.add('on'); mic.setAttribute('aria-label', 'Listening');
    r.onresult = function (ev) { cb(ev.results[0][0].transcript); };
    r.onerror = function () { add('I did not catch that. Tap the microphone again, or type it.', 'g'); };
    r.onend = function () { mic.classList.remove('on'); mic.setAttribute('aria-label', 'Ask by voice'); };
    try { r.start(); } catch (e) { mic.classList.remove('on'); }
  }

  /* ---------- where are we ---------- */
  function view() {
    if (isDemo) return 'demo';
    var m = D.querySelector('main[id^="pane-"]:not([hidden])'); return m ? m.id.replace('pane-', '') : 'everyone';
  }
  var WORK = { casebook: 1, 'case': 1, hour: 1, profile: 1 };

  /* ---------- three likely questions per page (answers from what the site says) ---------- */
  var NOSEE = 'No. I explain the screens and take you where you want to go. I am built with no access to cases, transcripts, analyses or notes.';
  var CUR = {
    everyone: { hi: 'Hello. Ask me anything about EgoAgent, by voice or in writing. Or start with one of these.', qs: [
      ['How does EgoAgent work for patients?', 'With your written permission, your therapist records the session. The sound is turned into a written transcript and then permanently deleted. An AI reads the transcript and writes an analysis for your therapist alone, who decides what in it, if anything, is useful. It never speaks with you, and it costs you nothing.'],
      ['Is my session private?', 'No person at EgoAgent listens to your sessions or reads the transcript. The AI provider is held under a binding business agreement to keep the material private and to use it for nothing else, and the analysis goes to your therapist alone. Your transcripts are deleted six months after your last session.'],
      ['Do I have to agree to it?', 'Yes. EgoAgent is used only with your written permission, and you can change your mind. Nothing is recorded before you sign, and any session can go unrecorded if you ask.']] },
    therapists: { hi: 'Hello. Ask me anything about EgoAgent, by voice or in writing. Or start with one of these.', qs: [
      ['How does EgoAgent work for therapists?', 'You record the session with an app on your device, sound only, in the room or on the call. It arrives in that patient’s workspace transcribed and filed by date, and the audio exists only for transcription. Nothing is analyzed automatically: when you choose, the AI reads the material you select and writes an analysis in the perspectives you pick, a second perspective beside your own.'],
      ['What does my patient agree to?', 'You send them a unique invitation link. They read the patient page, then complete the written permission: what is recorded, what is done with it, and what stays their choice. Nothing is recorded before it is completed, and any session can go unrecorded if they ask.'],
      ['Who can register?', 'Licensed physicians, psychologists, clinical social workers and psychoanalysts, each license verified individually. New York is open first; other states follow. The subscription belongs to you, not to a practice or an institute.']] },
    register: { hi: 'Hello. I can fill in this form with you by voice, or answer any question about EgoAgent.', fill: true, qs: [
      ['How is my license checked?', 'Your license or registration number is checked against the public licensing record where you practice. In New York, that is the State Education Department’s record. Your sworn affirmation completes it.'],
      ['What happens after I register?', 'Your casebook opens: your cases, their hours, and the consultation on each. A sample hour is there if you want to try it first. Nothing is recorded and no patient is invited until you choose to.'],
      ['Can you see my patients?', NOSEE]] },
    signin: { hi: 'Hello. Ask me anything about EgoAgent, by voice or in writing.', qs: [
      ['What happens when I sign in?', 'Your casebook opens, with your cases, their hours and the consultation on each.'],
      ['I am not registered yet.', 'Tap Register under the sign-in button. Registration is free; your license is checked against the public licensing record and your sworn affirmation completes it.'],
      ['Can you see my patients?', NOSEE]] },
    work: { hi: 'Hello. I can explain any screen of your working space. I never read your cases.', qs: [
      ['How do I add a new case?', 'On the Casebook, tap + New case. Enter the patient’s first name and last initial, and one short line of your own. The case appears in your list.'],
      ['How do I analyze an hour?', 'Open the patient, tap a day on the calendar to open that hour, choose one or more perspectives, and tap Analyze. Each analysis is kept beside the transcript.'],
      ['Can you see my patients?', NOSEE]] },
    demo: { hi: 'Hello. Ask me anything about how the working space works, by voice or in writing. Or start with one of these.', qs: [
      ['How does it work, step by step?', 'Six steps. Set up your workspace. Each patient gets one space and one calendar of the treatment. After the session, the recording is transcribed, the sound file is deleted, and the transcript waits as a temporary item. You choose one or more perspectives for the AI’s analysis. You read, think, and save one process note for the day. Then the day is complete: the note is kept, and the transcript and analyses are deleted.'],
      ['What is kept, and what is deleted?', 'The sound file is deleted as soon as it is transcribed. The transcript and the analyses are temporary: when you save the process note for that day they are deleted, and if no note is saved within six months the transcript is deleted on its own. Your process note is kept for the treatment, under the same protection as your own process notes.'],
      ['Can the AI see my other patients?', 'Each patient has a separate space. The AI reads only the material you select for that analysis, and nothing is analyzed until you ask.']] }
  };
  function cur() { var v = view(); return CUR[v] || (WORK[v] ? CUR.work : CUR.everyone); }

  /* ---------- the site's own text, as passages to search ---------- */
  var KB = null;
  function clean(t) { return String(t || '').replace(/\s+/g, ' ').replace(/\s*(Expand all|Collapse all)\s*/g, ' ').trim(); }
  function harvest(root, where, out) {
    root.querySelectorAll('details').forEach(function (d) {
      if (d.querySelector('details')) return; var s = d.querySelector('summary'); if (!s) return;
      var c = d.cloneNode(true); var cs = c.querySelector('summary'); if (cs) cs.remove(); c.querySelectorAll('script,style,svg,button,select,input').forEach(function (x) { x.remove(); });
      var q = clean(s.textContent), a = clean(c.textContent); if (q && a.length > 20) out.push({ q: q, a: a, where: where, el: d, faq: true });
    });
    root.querySelectorAll('h1,h2,h3').forEach(function (h) {
      if (h.closest('details')) return; var parts = [], n = h.nextElementSibling, k = 0;
      while (n && k < 4 && !/^H[1-3]$/.test(n.tagName)) { if (n.tagName === 'P' || n.tagName === 'UL') parts.push(clean(n.textContent)); n = n.nextElementSibling; k++; }
      var a = parts.join(' '); if (a.length > 30) out.push({ q: clean(h.textContent), a: a, where: where, el: h });
    });
  }
  function buildKB(done) {
    var out = [];
    if (!isDemo) {
      [['everyone', 'the patient page'], ['therapists', 'the therapist page'], ['register', 'the registration page'], ['consent', 'the consent page']].forEach(function (p) { var m = D.getElementById('pane-' + p[0]); if (m) harvest(m, p[1], out); });
      KB = out; done && done(); return;
    }
    /* this page: each stage, two sentences at a time, leaving out the sample session's own words */
    D.querySelectorAll('section.screen, section.zone').forEach(function (sec) {
      var h = sec.querySelector('h2,h3'); if (!h) return;
      var bits = [];
      sec.querySelectorAll('p, .small, .box, li').forEach(function (el) {
        if (el.closest('.seg') || el.querySelector('.who') || el.querySelector('p, .small, .box')) return;
        var t = clean(el.textContent).replace(/^Stage \d of \d\s*\u00b7[^A-Z]*?(?=[A-Z][a-z])/, '').replace(/^[^\u00b7]{0,40}\u00b7\s*(?=[A-Z])/, ''); if (t.length > 25 && bits.indexOf(t) < 0) bits.push(t);
      });
      var sents = bits.join(' ').replace(/\b([A-Z])\.(?=\s)/g, '$1\u2024').split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(function (x) { return x.replace(/\u2024/g, '.'); });
      for (var i = 0; i < sents.length; i++) out.push({ q: clean(h.textContent), a: clean(sents[i] + ' ' + (sents[i + 1] || '')), where: 'this page', el: sec });
    });
    harvest(D.body, 'this page', out);
    fetch('index.html').then(function (r) { return r.text(); }).then(function (h) {
      var doc = new DOMParser().parseFromString(h, 'text/html');
      [['everyone', 'the patient page'], ['therapists', 'the therapist page'], ['register', 'the registration page']].forEach(function (p) { var m = doc.getElementById('pane-' + p[0]); if (m) harvest(m, p[1], out); });
    }).catch(function () {}).then(function () { KB = out; done && done(); });
  }
  var STOP = ' a an the and or of to in on for is are am be it its this that with as at by from my your you i me we our do does did can could would should will how what why when where who which whom there their they them if so not no yes about into than then also just have has had was were been any some more most such only own same very one ';
  function toks(t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-zЀ-ӿ؀-ۿ0-9]+/).filter(function (w) { return w.length > 1 && STOP.indexOf(' ' + w + ' ') < 0; }).map(function (w) { return w.length > 5 ? w.slice(0, 5) : w; }); }
  function search(qtext) {
    var qt = toks(qtext); if (!qt.length || !KB || !KB.length) return null;
    var df = {}; KB.forEach(function (d) { if (!d.tk) { d.tq = toks(d.q); d.tk = toks(d.q + ' ' + d.a); } var seen = {}; d.tk.forEach(function (w) { if (!seen[w]) { seen[w] = 1; df[w] = (df[w] || 0) + 1; } }); });
    var N = KB.length, best = null;
    KB.forEach(function (d) {
      var sc = 0, hit = 0;
      qt.forEach(function (w) { var idf = Math.log(1 + N / (1 + (df[w] || 0))); var inQ = d.tq.indexOf(w) >= 0, inA = d.tk.indexOf(w) >= 0; if (inQ) sc += 0.8 * idf; if (inA) sc += idf; if (inQ || inA) hit++; });
      sc = sc / Math.sqrt(4 + d.tk.length / 12) * (0.5 + hit / qt.length) * (d.faq ? 1.15 : 1) * (d.where === here() ? 1.6 : 1);
      if (!best || sc > best.sc) best = { d: d, sc: sc, hit: hit };
    });
    return best && best.hit >= Math.max(1, Math.ceil(qt.length * 0.34)) && best.sc > 0.9 ? best.d : null;
  }
  function here() { return isDemo ? 'this page' : onPage(); }
  function trimForVoice(t) { if (t.length <= 700) return t; var cut = t.slice(0, 700); var p = cut.lastIndexOf('. '); return (p > 300 ? cut.slice(0, p + 1) : cut + '…'); }

  /* ---------- answering ---------- */
  function onPage() { var v = view(); return { everyone: 'the patient page', therapists: 'the therapist page', register: 'the registration page', consent: 'the consent page' }[v] || (isDemo ? 'this page' : ''); }
  function ask(q) {
    q = String(q || '').trim(); if (!q) return; add(q, 'u'); inp.value = '';
    if (/\b(this page|on the page|page about|summar)/i.test(q)) {
      var heads = [], root = isDemo ? D.body : D.querySelector('main[id^="pane-"]:not([hidden])');
      if (root) root.querySelectorAll('h1,h2').forEach(function (h) { if (!h.closest('details')) { var t = clean(h.textContent); if (t && heads.indexOf(t) < 0) heads.push(t); } });
      if (heads.length) { say('This page has these parts:\n' + heads.slice(0, 8).join('\n')); return; }
    }
    if (WORK[view()] && /\b(patient|miriam|transcript|session|note|analys)/i.test(q) && /\b(said|say|wrote|read|show|tell|what did)/i.test(q)) { say(NOSEE); return; }
    var go = function () {
      var d = search(q);
      if (!d) { say('I could not find that on the EgoAgent site. Try asking it another way. If the site does not cover it, the Contact page reaches a person.'); home(false); return; }
      var body = trimForVoice(d.a);
      var m = add(body, 'g', 'From ' + d.where + (d.faq ? ': “' + d.q + '”' : '')); speak(body);
      if (d.el && d.el.isConnected && d.el.offsetParent !== null) { clearActs(); btn('Show me where', 'main', function () { show(d.el); }); btn('Back to the questions', '', home); }
    };
    if (!KB) buildKB(go); else go();
  }
  function show(el) {
    var det = el.tagName === 'DETAILS' ? el : el.closest('details'); var p = det; while (p) { if (p.tagName === 'DETAILS') p.open = true; p = p.parentElement; }
    D.querySelectorAll('.gd-lit').forEach(function (x) { x.classList.remove('gd-lit'); });
    var t = det || el; t.classList.add('gd-lit'); try { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
    setTimeout(function () { t.classList.remove('gd-lit'); }, 6000);
  }
  function home(greet) {
    clearActs(); var c = cur();
    if (greet !== false) say(c.hi);
    if (c.fill) btn('Fill in the form by voice', 'main', startFill);
    c.qs.forEach(function (q) { btn(q[0], 'q', function () { add(q[0], 'u'); say(q[1], 'From ' + (onPage() || 'EgoAgent')); }); });
  }
  var lastView = null;
  function open() { pan.hidden = false; D.body.classList.add('gd-open'); fab.setAttribute('aria-expanded', 'true'); if (lastView !== view()) { lastView = view(); log.innerHTML = ''; home(); } if (!KB) buildKB(); }
  function close() { pan.hidden = true; D.body.classList.remove('gd-open'); fab.setAttribute('aria-expanded', 'false'); hush(); }
  fab.onclick = open; pan.querySelector('.gd-x').onclick = function () { close(); fab.focus(); };
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pan.hidden) close(); });
  pan.querySelector('.gd-send').onclick = function () { ask(inp.value); };
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') ask(inp.value); });
  mic.onclick = function () { listen(function (t) { if (filling) fillAnswer(t); else ask(t); }); };
  /* hide behind full-screen films and tours; follow page changes */
  setInterval(function () {
    var cover = D.querySelector('.fsfilm:not([hidden])'); fab.style.display = cover ? 'none' : '';
    if (cover && !pan.hidden) close();
    if (!pan.hidden && lastView !== view()) { lastView = view(); log.innerHTML = ''; filling = false; home(); }
  }, 600);
  /* the site's text changes language: search it afresh */
  D.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-lang]')) KB = null; }, true);

  /* ---------- registration by voice ---------- */
  var filling = false, step = 0;
  var W = { zero: '0', oh: '0', o: '0', one: '1', two: '2', to: '2', too: '2', three: '3', four: '4', for: '4', five: '5', six: '6', seven: '7', eight: '8', ate: '8', nine: '9' };
  function cap(t) { return t.replace(/\s+/g, ' ').trim().split(' ').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); }
  var N = {
    name: function (t) { return cap(t.replace(/[.,!?]/g, '')); },
    email: function (t) { return t.toLowerCase().replace(/\s+at\s+/g, '@').replace(/\s+dot\s+/g, '.').replace(/\s+/g, '').replace(/[,!?]$/, ''); },
    num: function (t) { return t.toLowerCase().split(/[\s-]+/).map(function (w) { return W.hasOwnProperty(w) ? W[w] : w; }).join('').replace(/[^a-z0-9]/g, '').toUpperCase(); }
  };
  function pick(sel, t) {
    t = t.toLowerCase().replace(/[.,!?]/g, '').replace(/^the\s+/, '').trim(); var best = null, firsts = [];
    [].forEach.call(sel.options, function (o) {
      if (!o.value && o.disabled && /choose/i.test(o.text)) return; var n = o.text.split('·')[0].trim().toLowerCase(); if (!n) return;
      var sc = t === n ? 4 : (t.indexOf(n) >= 0 ? 3 : ((t.length >= 3 && n.indexOf(t) >= 0) ? 2 : 0));
      if (!sc && t.indexOf(n.split(' ')[0]) >= 0 && n.split(' ')[0].length > 4) firsts.push({ o: o, n: n });
      if (sc && (!best || sc > best.sc || (sc === best.sc && n.length > best.n.length))) best = { o: o, n: n, sc: sc };
    });
    if (!best && firsts.length === 1) best = firsts[0];
    return best && best.o;
  }
  var STEPS = [
    { id: 'fn', q: 'What is your first name?', f: N.name },
    { id: 'ln', q: 'And your last name?', f: N.name },
    { id: 'em', q: 'Your professional email? Say at and dot where they belong.', f: N.email, spell: true },
    { id: 'lcountry', q: 'Which country are you licensed in?', sel: true },
    { id: 'lstate', q: function () { var l = D.getElementById('lstate-lab'); return 'Which ' + (l ? l.textContent.toLowerCase() : 'state') + '?'; }, sel: true, skip: function () { var f = D.getElementById('lregion-f'); return f && f.hidden; } },
    { id: 'prof', q: 'Which profession are you licensed in? Physician, psychologist, clinical social worker, or psychoanalyst.', sel: true },
    { id: 'lic', q: 'And your license or registration number? Say it one character at a time.', f: N.num, spell: true }];
  function lit(e) { D.querySelectorAll('.gd-lit').forEach(function (x) { x.classList.remove('gd-lit'); }); var t = e.closest('.selw') || e.closest('.clw') || e; t.classList.add('gd-lit'); try { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (x) {} }
  function startFill() { filling = true; step = 0; nextStep(); }
  function nextStep() {
    while (step < STEPS.length && STEPS[step].skip && STEPS[step].skip()) step++;
    if (step >= STEPS.length) return finishFill();
    var s = STEPS[step], e = D.getElementById(s.id); if (!e) { step++; return nextStep(); }
    lit(e); clearActs(); say(typeof s.q === 'function' ? s.q() : s.q);
    add((SR ? 'Tap the microphone and answer, or type it below.' : 'Type your answer below.'), 'g');
    btn('Skip', 'q', function () { step++; nextStep(); }); btn('Stop filling in', 'q', function () { filling = false; home(false); });
  }
  function fillAnswer(t) {
    var s = STEPS[step], e = D.getElementById(s.id); add(t, 'u'); inp.value = ''; var v;
    if (s.sel) {
      var o = pick(e, t);
      if (!o) { say('I could not match “' + t + '” to the list. Please say it again.'); return; }
      if (o.disabled) { say(o.text.split('·')[0].trim() + ' is not open for registration yet. Only New York is open now.'); return; }
      e.value = o.value || o.text; e.dispatchEvent(new Event('change', { bubbles: true })); v = o.text.split('·')[0].trim();
    } else { v = s.f(t); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }
    clearActs(); var spoken = s.spell ? v.split('').join(' ').replace(/@/, 'at').replace(/\./g, 'dot') : v;
    say('I have: ' + spoken + '. Is that right?');
    btn('Yes, next', 'main', function () { step++; nextStep(); });
    btn('No, say it again', 'q', function () { e.value = ''; e.dispatchEvent(new Event('input', { bubbles: true })); nextStep(); });
  }
  function finishFill() {
    filling = false; clearActs(); var oath = D.querySelector('#pane-register .oath'); if (oath) lit(oath);
    say('That is everything I can fill in. The boxes under Your work, and the sworn affirmation, are yours to tick yourself. Then tap Register.');
    btn('Done', 'main', function () { home(false); });
  }
  /* while filling, typed answers go to the form */
  var plainAsk = ask;
  ask = function (q) { if (filling) { if (String(q || '').trim()) fillAnswer(q); return; } plainAsk(q); };
})();
