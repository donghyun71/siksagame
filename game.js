'use strict';

// ===================== DATA =====================

const INGREDIENTS = {
  '밥':        { emoji: '🍚', id: 'rice' },
  '면':        { emoji: '🍜', id: 'noodle' },
  '빵':        { emoji: '🍞', id: 'bread' },
  '도우':      { emoji: '🥙', id: 'dough' },
  '김치':      { emoji: '🥬', id: 'kimchi' },
  '돼지고기':  { emoji: '🥩', id: 'pork' },
  '두부':      { emoji: '🫙', id: 'tofu' },
  '대파':      { emoji: '🌿', id: 'greenonion' },
  '나물':      { emoji: '🥗', id: 'namul' },
  '계란':      { emoji: '🥚', id: 'egg' },
  '고추장':    { emoji: '🌶️', id: 'gochujang' },
  '짜장소스':  { emoji: '⬛', id: 'jjajang' },
  '양파':      { emoji: '🧅', id: 'onion' },
  '당근':      { emoji: '🥕', id: 'carrot' },
  '간장':      { emoji: '🍶', id: 'soysauce' },
  '튀김가루':  { emoji: '🌾', id: 'flour' },
  '탕수육소스':{ emoji: '🍯', id: 'tangsoosauce' },
  '토마토소스':{ emoji: '🍅', id: 'tomatosauce' },
  '치즈':      { emoji: '🧀', id: 'cheese' },
  '마늘':      { emoji: '🧄', id: 'garlic' },
  '패티':      { emoji: '🍖', id: 'patty' },
  '양상추':    { emoji: '🥬', id: 'lettuce' },
  '페퍼로니':  { emoji: '🔴', id: 'pepperoni' },
  '버섯':      { emoji: '🍄', id: 'mushroom' },
};

const RECIPES = {
  korean: [
    { id:'kimchi-jjigae', name:'김치찌개', emoji:'🍲',
      ingredients:['김치','돼지고기','두부','대파'],
      cookEmoji:'🔥', customerTime:26, points:100 },
    { id:'bibimbap', name:'비빔밥', emoji:'🥗',
      ingredients:['밥','나물','계란','고추장'],
      cookEmoji:'🥢', customerTime:22, points:90 },
    { id:'ramen', name:'라면', emoji:'🍜',
      ingredients:['면','계란','대파','간장'],
      cookEmoji:'🔥', customerTime:20, points:80 },
    { id:'jeyuk', name:'제육볶음', emoji:'🥘',
      ingredients:['돼지고기','고추장','양파','마늘'],
      cookEmoji:'🍳', customerTime:26, points:100 },
  ],
  chinese: [
    { id:'jjajangmyeon', name:'짜장면', emoji:'🍝',
      ingredients:['면','짜장소스','양파','돼지고기'],
      cookEmoji:'🥄', customerTime:26, points:100 },
    { id:'fried-rice', name:'볶음밥', emoji:'🍳',
      ingredients:['밥','계란','당근','간장'],
      cookEmoji:'🥄', customerTime:22, points:90 },
    { id:'tangsuyuk', name:'탕수육', emoji:'🥩',
      ingredients:['돼지고기','튼김가루','당근','탕수육소스'],
      cookEmoji:'🫕', customerTime:30, points:120 },
    { id:'mapo-tofu', name:'마파두부', emoji:'🫕',
      ingredients:['두부','돼지고기','양파','마늘'],
      cookEmoji:'🥄', customerTime:26, points:100 },
  ],
  western: [
    { id:'pasta', name:'파스타', emoji:'🍝',
      ingredients:['면','토마토소스','치즈','마늘'],
      cookEmoji:'🔥', customerTime:26, points:100 },
    { id:'hamburger', name:'햄버거', emoji:'🍔',
      ingredients:['빵','패티','양상추','치즈'],
      cookEmoji:'🍔', customerTime:20, points:80 },
    { id:'pizza', name:'피자', emoji:'🍕',
      ingredients:['도우','토마토소스','치즈','페퍼로니'],
      cookEmoji:'🔥', customerTime:30, points:120 },
    { id:'salad', name:'샘러드', emoji:'🥗',
      ingredients:['양상추','당근','치즈','계란'],
      cookEmoji:'🥗', customerTime:16, points:60 },
  ],
};

const CUSTOMERS = [
  { emoji:'👨', moods:['맛있게 해주세요!','빨리 부탁해요~','배고파요!'] },
  { emoji:'👩', moods:['잘 부탁해요 :)','기대할게요!','맛있으면 좋겠다~'] },
  { emoji:'👦', moods:['빨리요!! 배고파요','얼른 주세요~','최고로 만들어줘요!'] },
  { emoji:'👧', moods:['맛있으면 좋겠다~','서두르지 않아도 돼요','기대돼요!'] },
  { emoji:'🧑', moods:['서둘러 주세요!','잘 부탁합니다','빨리 주세요~'] },
  { emoji:'👴', moods:['청천히 해도 돼요','맛있게 해주게나','여유 있게 해줘요~'] },
  { emoji:'👵', moods:['맛있게 해줘요~','잘 부탁해요 :)','기다릴게요!'] },
];

const STAFF = ['👨‍🍳','👩‍🍳'];
const WALKERS = ['👨','👩','🧑','👦','👧','🧔','👱','🧒'];

const GAME_DURATION = 180;
const COOK_TIME_MS  = 2200;

// ===================== STATE =====================

let state = {
  screen: 'menu',
  cuisine: null,
  score: 0,
  served: 0,
  timeouts: 0,
  combo: 0,
  orderCount: 0,
  gameTimeLeft: GAME_DURATION,
  custTimeLeft: 0,
  recipe: null,
  customer: null,
  selected: [],
  stage: 'selecting',
  gameInterval: null,
  custInterval:  null,
  cookTimeout:   null,
  steamInterval: null,
  feedbackTimer: null,
};

// ===================== AUDIO =====================

let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
}
function tone(freq, dur, type='sine', vol=0.25) {
  if (!audioCtx) return;
  try {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.start(); o.stop(audioCtx.currentTime + dur);
  } catch(e) {}
}
function sfx(name) {
  initAudio();
  if (name === 'collect')    { tone(523,.08); }
  if (name === 'wrong')      { tone(200,.15,'sawtooth',.2); }
  if (name === 'cookDone')   { tone(523,.08); setTimeout(()=>tone(659,.08),90); setTimeout(()=>tone(784,.18),180); }
  if (name === 'serve')      { tone(784,.08); setTimeout(()=>tone(1047,.2),100); }
  if (name === 'timeout')    { tone(196,.25,'sawtooth',.2); }
  if (name === 'gameover')   { tone(392,.15); setTimeout(()=>tone(330,.15),160); setTimeout(()=>tone(262,.25),320); }
}

// ===================== RESTAURANT SCENE =====================

function initScene() {
  const layer = document.getElementById('rs-walkers');
  layer.innerHTML = '';

  const count = 3 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    const goRight = Math.random() > 0.5;
    const isStaff = Math.random() < 0.25;
    const chars   = isStaff ? STAFF : WALKERS;
    const w = document.createElement('div');
    w.className = 'walker ' + (goRight ? 'right' : 'left') + (isStaff ? ' staff' : '');
    w.textContent = chars[Math.floor(Math.random() * chars.length)];
    const dur = 7 + Math.random() * 7;
    w.style.animationDuration   = dur + 's';
    w.style.animationDelay      = (-Math.random() * dur) + 's';
    w.style.bottom              = (2 + Math.random() * 12) + 'px';
    if (!goRight) w.style.right = '-40px';
    else          w.style.left  = '-40px';
    layer.appendChild(w);
  }

  const emojis = WALKERS;
  document.querySelectorAll('.sc').forEach(el => {
    if (Math.random() > 0.5) el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  });
}

// ===================== COOKING VISUALS =====================

function potInsideEl()  { return document.getElementById('pot-inside'); }
function potAsmEl()     { return document.getElementById('pot-asm'); }
function burnerEl()     { return document.getElementById('burner'); }
function potLidEl()     { return document.getElementById('pot-lid'); }
function steamZoneEl()  { return document.getElementById('steam-zone'); }
function dishOverlay()  { return document.getElementById('dish-overlay'); }

function addChipToPot(ing) {
  const data = INGREDIENTS[ing];
  if (!data) return;
  const inside = potInsideEl();
  const ph = inside.querySelector('.pot-ph');
  if (ph) ph.remove();
  inside.classList.add('filled');
  const chip = document.createElement('span');
  chip.className = 'pot-chip';
  chip.textContent = data.emoji;
  inside.appendChild(chip);
}

function resetPot() {
  const inside = potInsideEl();
  inside.innerHTML = '<span class="pot-ph">냄비가 비어있어요</span>';
  inside.classList.remove('filled', 'cooking');
  potAsmEl().classList.remove('cooking');
  potLidEl().classList.remove('rattling');
  burnerEl().classList.remove('on');
  clearInterval(state.steamInterval);
  steamZoneEl().innerHTML = '';
  dishOverlay().classList.remove('show');
  dishOverlay().style.display = '';
}

function startCookingVisual() {
  burnerEl().classList.add('on');
  potAsmEl().classList.add('cooking');
  potLidEl().classList.add('rattling');
  potInsideEl().classList.add('cooking');

  const inside = potInsideEl();
  for (let i = 0; i < 5; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 4 + Math.random() * 6;
    b.style.cssText = `width:${size}px;height:${size}px;left:${10+Math.random()*80}%;bottom:5px;--dur:${.4+Math.random()*.5}s;--delay:${Math.random()*.4}s`;
    inside.appendChild(b);
  }

  const sz = steamZoneEl();
  sz.innerHTML = '';
  const addSteam = () => {
    if (!sz.isConnected) return;
    const s = document.createElement('div');
    s.className = 'steam';
    s.textContent = '💨';
    const x = -15 + Math.random() * 30;
    s.style.cssText = `left:${15+Math.random()*70}%;--dur:${1.1+Math.random()*.6}s;--delay:0s;--dx:${x}px`;
    sz.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  };
  addSteam();
  state.steamInterval = setInterval(addSteam, 280);
}

function stopCookingVisual() {
  burnerEl().classList.remove('on');
  potAsmEl().classList.remove('cooking');
  potLidEl().classList.remove('rattling');
  potInsideEl().classList.remove('cooking');
  clearInterval(state.steamInterval);
  setTimeout(() => { if (steamZoneEl()) steamZoneEl().innerHTML = ''; }, 600);
}

function showFinishedDish(recipe) {
  const inside = potInsideEl();
  inside.innerHTML = '';
  inside.classList.remove('filled', 'cooking');

  document.getElementById('dish-emoji').textContent = recipe.emoji;
  const spkWrap = document.getElementById('dish-sparkles');
  spkWrap.innerHTML = '';
  const spkList = ['✨','⭐','🌟','💫','🎊'];
  for (let i = 0; i < 7; i++) {
    const s = document.createElement('div');
    s.className = 'spk';
    const angle = (i / 7) * Math.PI * 2;
    const dist  = 52 + Math.random() * 28;
    s.textContent = spkList[Math.floor(Math.random() * spkList.length)];
    s.style.cssText = `left:50%;top:50%;--x:${Math.cos(angle)*dist}px;--y:${Math.sin(angle)*dist}px;--d:${Math.random()*.25}s`;
    spkWrap.appendChild(s);
  }
  const ov = dishOverlay();
  ov.style.display = 'flex';
  ov.classList.add('show');
}

// ===================== FLYING INGREDIENT =====================

function flyToPot(ing, btnEl) {
  const data = INGREDIENTS[ing];
  if (!data) return;

  const flyer   = document.getElementById('flyer');
  const btnRect = btnEl.getBoundingClientRect();
  const potEl   = document.getElementById('pot-asm');
  const potRect = potEl.getBoundingClientRect();

  flyer.textContent = data.emoji;
  flyer.style.transition = 'none';
  flyer.style.left    = (btnRect.left + btnRect.width / 2 - 18) + 'px';
  flyer.style.top     = (btnRect.top  + btnRect.height / 2 - 18) + 'px';
  flyer.style.transform = 'scale(1)';
  flyer.style.opacity   = '1';
  flyer.classList.remove('hidden');

  const tx = potRect.left + potRect.width  / 2 - 18;
  const ty = potRect.top  + potRect.height / 2 - 18;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    flyer.style.left      = tx + 'px';
    flyer.style.top       = ty + 'px';
    flyer.style.transform = 'scale(0.25)';
    flyer.style.opacity   = '0.3';
  }));

  setTimeout(() => {
    flyer.classList.add('hidden');
    addChipToPot(ing);
  }, 430);
}

// ===================== ORDER TICKET =====================

function updateTicket(recipe, customer) {
  state.orderCount++;
  document.getElementById('ot-emoji').textContent = recipe.emoji;
  document.getElementById('ot-name').textContent  = recipe.name;
  document.getElementById('ot-cust').textContent  = customer.emoji;
  document.getElementById('ot-num').textContent   = '#' + state.orderCount;

  const t = document.getElementById('order-ticket');
  t.style.animation = 'none';
  t.offsetHeight;
  t.style.animation = '';
}

// ===================== SCREENS =====================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.screen = id.replace('screen-', '');
}

function backToMenu() {
  clearAllTimers();
  showScreen('screen-menu');
}

// ===================== MENU =====================

function selectCuisine(cuisine) {
  initAudio();
  state.cuisine = cuisine;
  startGame();
}

// ===================== GAME =====================

function startGame() {
  state.score        = 0;
  state.served       = 0;
  state.timeouts     = 0;
  state.combo        = 0;
  state.orderCount   = 0;
  state.gameTimeLeft = GAME_DURATION;

  showScreen('screen-game');
  initScene();
  updateScoreUI();
  updateTimerUI();
  updateComboUI();

  state.gameInterval = setInterval(() => {
    state.gameTimeLeft--;
    updateTimerUI();
    if (state.gameTimeLeft <= 0) endGame();
  }, 1000);

  nextCustomer();
}

function clearAllTimers() {
  clearInterval(state.gameInterval);
  clearInterval(state.custInterval);
  clearInterval(state.steamInterval);
  clearTimeout(state.cookTimeout);
  clearTimeout(state.feedbackTimer);
  state.gameInterval = state.custInterval = state.steamInterval =
    state.cookTimeout = state.feedbackTimer = null;
}

// ===================== CUSTOMER FLOW =====================

function nextCustomer() {
  state.selected = [];
  state.stage    = 'selecting';
  state.recipe   = RECIPES[state.cuisine][Math.floor(Math.random() * RECIPES[state.cuisine].length)];
  state.customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  state.custTimeLeft = state.recipe.customerTime;

  resetPot();
  hide('cook-btn');
  hide('serve-btn');

  updateTicket(state.recipe, state.customer);
  renderRecipeCard();
  renderIngredients();
  updateCustTimerUI();

  clearInterval(state.custInterval);
  state.custInterval = setInterval(() => {
    state.custTimeLeft -= 0.5;
    updateCustTimerUI();
    if (state.custTimeLeft <= 0) customerTimedOut();
  }, 500);
}

function customerTimedOut() {
  if (state.stage === 'reaction') return;
  clearInterval(state.custInterval);
  state.stage = 'reaction';
  state.timeouts++;
  state.combo = 0;
  sfx('timeout');
  showFeedback('⏰ 시간 초과!\n😤 손님이 떠났어요', '#e83e3e');
  updateComboUI();
  setTimeout(() => { if (state.screen === 'game') nextCustomer(); }, 1700);
}

// ===================== RENDER =====================

function renderRecipeCard() {
  const list = document.getElementById('recipe-list');
  list.innerHTML = '';
  state.recipe.ingredients.forEach(ing => {
    const d   = INGREDIENTS[ing];
    const div = document.createElement('div');
    div.className = 'ri';
    div.id = 'ri-' + (d ? d.id : ing);
    div.innerHTML = `<span class="ri-em">${d ? d.emoji : '🍴'}</span><span>${ing}</span>`;
    list.appendChild(div);
  });
}

function renderIngredients() {
  const grid = document.getElementById('ing-grid');
  grid.innerHTML = '';

  const required = new Set(state.recipe.ingredients);
  const distractors = Object.keys(INGREDIENTS)
    .filter(n => !required.has(n))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const pool = [...state.recipe.ingredients, ...distractors].sort(() => Math.random() - 0.5);

  pool.forEach(ing => {
    const d = INGREDIENTS[ing];
    if (!d) return;
    const btn = document.createElement('button');
    btn.className = 'ing-btn';
    btn.id = 'ibtn-' + d.id;
    btn.innerHTML = `<span class="ing-em">${d.emoji}</span><span class="ing-nm">${ing}</span>`;
    btn.onclick = (e) => selectIngredient(ing, e.currentTarget);
    grid.appendChild(btn);
  });
}

// ===================== INGREDIENT SELECTION =====================

function selectIngredient(ing, btnEl) {
  if (state.stage !== 'selecting') return;
  const d = INGREDIENTS[ing];
  const isRequired = state.recipe.ingredients.includes(ing);

  if (!isRequired) {
    if (btnEl) { btnEl.classList.add('wrong'); setTimeout(() => btnEl.classList.remove('wrong'), 450); }
    sfx('wrong');
    showFeedback('❌ 재료가 아니어요!', '#e83e3e', 750);
    return;
  }

  if (state.selected.includes(ing)) return;

  state.selected.push(ing);
  sfx('collect');

  if (btnEl) {
    flyToPot(ing, btnEl);
    setTimeout(() => btnEl.classList.add('sel'), 430);
  }

  const ri = d ? document.getElementById('ri-' + d.id) : null;
  if (ri) ri.classList.add('done');

  checkAllCollected();
}

function checkAllCollected() {
  const allIn = state.recipe.ingredients.every(ing => state.selected.includes(ing));
  if (allIn) show('cook-btn');
  else       hide('cook-btn');
}

// ===================== COOKING =====================

function cookDish() {
  if (state.stage !== 'selecting') return;
  state.stage = 'cooking';
  hide('cook-btn');
  startCookingVisual();

  state.cookTimeout = setTimeout(() => {
    stopCookingVisual();
    showFinishedDish(state.recipe);
    state.stage = 'serving';
    show('serve-btn');
    sfx('cookDone');
    showFeedback('완성! 🎉', '#ff8c00', 900);
  }, COOK_TIME_MS);
}

// ===================== SERVING =====================

function serveDish() {
  if (state.stage !== 'serving') return;
  clearInterval(state.custInterval);
  state.stage = 'reaction';

  const timeRatio  = Math.max(0, state.custTimeLeft / state.recipe.customerTime);
  const timeBonus  = Math.round(timeRatio * 50);
  state.combo++;
  const comboBonus = state.combo >= 3
    ? Math.floor(state.recipe.points * 0.5 * Math.min(state.combo - 2, 4))
    : 0;
  const earned = state.recipe.points + timeBonus + comboBonus;

  state.score += earned;
  state.served++;
  hide('serve-btn');
  sfx('serve');
  updateScoreUI();
  updateComboUI();

  let msg = `+${earned}점 😄`;
  if (comboBonus > 0) msg += `\n🔥 콤보 +${comboBonus}!`;
  showFeedback(msg, '#4caf50');

  setTimeout(() => { if (state.screen === 'game') nextCustomer(); }, 2000);
}

// ===================== UI UPDATES =====================

function updateScoreUI() {
  document.getElementById('score').textContent = state.score;
}

function updateTimerUI() {
  const t    = Math.max(0, state.gameTimeLeft);
  const mins = Math.floor(t / 60);
  const secs = t % 60;
  document.getElementById('timer-text').textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
  const pct  = t / GAME_DURATION;
  const fill = document.getElementById('timer-fill');
  fill.style.width = (pct * 100) + '%';
  if      (pct < 0.25) fill.style.background = 'linear-gradient(90deg,#e83e3e,#ff7043)';
  else if (pct < 0.5)  fill.style.background = 'linear-gradient(90deg,#ff8c00,#ffd700)';
  else                 fill.style.background = 'linear-gradient(90deg,#4caf50,#8bc34a)';
}

function updateCustTimerUI() {
  const pct  = Math.max(0, state.custTimeLeft / state.recipe.customerTime);
  const fill = document.getElementById('cust-timer-fill');
  fill.style.width = (pct * 100) + '%';
  if      (pct < 0.25) fill.style.background = 'linear-gradient(90deg,#e83e3e,#ff7043)';
  else if (pct < 0.55) fill.style.background = 'linear-gradient(90deg,#ff8c00,#ffd700)';
  else                 fill.style.background = 'linear-gradient(90deg,#4caf50,#8bc34a)';
}

function updateComboUI() {
  const box = document.getElementById('combo-box');
  if (state.combo >= 2) {
    box.style.display = '';
    document.getElementById('combo-num').textContent = state.combo;
  } else {
    box.style.display = 'none';
  }
}

// ===================== FEEDBACK =====================

function showFeedback(msg, color, duration = 1200) {
  const el   = document.getElementById('feedback');
  const inner = document.getElementById('fb-inner');
  inner.textContent = msg;
  inner.style.color = color;
  el.classList.remove('hidden');
  inner.style.animation = 'none';
  inner.offsetHeight;
  inner.style.animation = '';
  clearTimeout(state.feedbackTimer);
  state.feedbackTimer = setTimeout(() => el.classList.add('hidden'), duration);
}

// ===================== GAME OVER =====================

function endGame() {
  clearAllTimers();
  state.screen = 'gameover';
  sfx('gameover');

  let icon, title, grade, msg;
  if      (state.score >= 2500) { icon='👨‍🍳'; title='전설의 요리사!';    grade='⭐⭐⭐'; msg='완벽해요! 프로 셸프급이에요. 최고! 🏆'; }
  else if (state.score >= 1800) { icon='🎉'; title='최고의 요리사!';    grade='⭐⭐⭐'; msg='훌륭해요! 손님들이 아주 만족했어요. 😄'; }
  else if (state.score >= 1200) { icon='😄'; title='실력 있는 요리사!'; grade='⭐⭐';  msg='잘 했어요! 조금만 더 연습하면 완벽해요. 💪'; }
  else if (state.score >= 600)  { icon='😊'; title='나름 괴잘아요!';    grade='⭐';   msg='좋아요! 재료를 더 빨리 고르면 점수가 올라가요. 🌟'; }
  else                          { icon='😅'; title='요리 견습생!';      grade='🍳';   msg='아직 초보지만 괴슮아요! 레시피를 잘 보고 다시 도전! 🔄'; }

  document.getElementById('go-icon').textContent  = icon;
  document.getElementById('go-title').textContent = title;
  document.getElementById('go-grade').textContent = grade;
  document.getElementById('go-score').textContent = state.score;
  document.getElementById('go-msg').textContent   = msg;
  document.getElementById('go-stats').innerHTML   = `
    <div class="gs"><strong>${state.served}</strong><small>서빙 완료</small></div>
    <div class="gs"><strong>${state.timeouts}</strong><small>시간 초과</small></div>
    <div class="gs"><strong>${state.combo}</strong><small>최고 콤보</small></div>
  `;
  showScreen('screen-gameover');
}

function retryGame() {
  initAudio();
  startGame();
}

// ===================== HELPERS =====================

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// ===================== INIT =====================

window.addEventListener('load', () => showScreen('screen-menu'));
