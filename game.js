'use strict';

// ===================== DATA =====================

const INGREDIENTS = {
  '밥':       { emoji: '🍚', id: 'rice' },
  '면':       { emoji: '🍜', id: 'noodle' },
  '빵':       { emoji: '🍞', id: 'bread' },
  '도우':     { emoji: '🥙', id: 'dough' },
  '김치':     { emoji: '🥬', id: 'kimchi' },
  '돼지고기': { emoji: '🥩', id: 'pork' },
  '두부':     { emoji: '🫙', id: 'tofu' },
  '대파':     { emoji: '🌿', id: 'greenonion' },
  '나물':     { emoji: '🥗', id: 'namul' },
  '계란':     { emoji: '🥚', id: 'egg' },
  '고추장':   { emoji: '🌶️', id: 'gochujang' },
  '짜장소스': { emoji: '⬛', id: 'jjajang' },
  '양파':     { emoji: '🧅', id: 'onion' },
  '당근':     { emoji: '🥕', id: 'carrot' },
  '간장':     { emoji: '🍶', id: 'soysauce' },
  '튀김가루': { emoji: '🌾', id: 'flour' },
  '탕수육소스':{ emoji: '🍯', id: 'tangsoosauce' },
  '토마토소스':{ emoji: '🍅', id: 'tomatosauce' },
  '치즈':     { emoji: '🧀', id: 'cheese' },
  '마늘':     { emoji: '🧄', id: 'garlic' },
  '패티':     { emoji: '🍖', id: 'patty' },
  '양상추':   { emoji: '🥬', id: 'lettuce' },
  '페퍼로니': { emoji: '🔴', id: 'pepperoni' },
  '버섯':     { emoji: '🍄', id: 'mushroom' },
};

const RECIPES = {
  korean: [
    {
      id: 'kimchi-jjigae',
      name: '김치찌개',
      emoji: '🍲',
      ingredients: ['김치', '돼지고기', '두부', '대파'],
      cookMethod: '끓이기',
      cookEmoji: '🔥',
      customerTime: 26,
      points: 100,
    },
    {
      id: 'bibimbap',
      name: '비빔밥',
      emoji: '🥗',
      ingredients: ['밥', '나물', '계란', '고추장'],
      cookMethod: '비비기',
      cookEmoji: '🥢',
      customerTime: 22,
      points: 90,
    },
    {
      id: 'ramen',
      name: '라면',
      emoji: '🍜',
      ingredients: ['면', '계란', '대파', '간장'],
      cookMethod: '끓이기',
      cookEmoji: '🔥',
      customerTime: 20,
      points: 80,
    },
    {
      id: 'jeyuk',
      name: '제육볶음',
      emoji: '🥘',
      ingredients: ['돼지고기', '고추장', '양파', '마늘'],
      cookMethod: '볶기',
      cookEmoji: '🍳',
      customerTime: 26,
      points: 100,
    },
  ],
  chinese: [
    {
      id: 'jjajangmyeon',
      name: '짜장면',
      emoji: '🍝',
      ingredients: ['면', '짜장소스', '양파', '돼지고기'],
      cookMethod: '볶기',
      cookEmoji: '🥄',
      customerTime: 26,
      points: 100,
    },
    {
      id: 'fried-rice',
      name: '볶음밥',
      emoji: '🍳',
      ingredients: ['밥', '계란', '당근', '간장'],
      cookMethod: '볶기',
      cookEmoji: '🥄',
      customerTime: 22,
      points: 90,
    },
    {
      id: 'tangsuyuk',
      name: '탕수육',
      emoji: '🥩',
      ingredients: ['돼지고기', '튀김가루', '당근', '탕수육소스'],
      cookMethod: '튀기기',
      cookEmoji: '🫕',
      customerTime: 30,
      points: 120,
    },
    {
      id: 'mapo-tofu',
      name: '마파두부',
      emoji: '🫕',
      ingredients: ['두부', '돼지고기', '양파', '마늘'],
      cookMethod: '볶기',
      cookEmoji: '🥄',
      customerTime: 26,
      points: 100,
    },
  ],
  western: [
    {
      id: 'pasta',
      name: '파스타',
      emoji: '🍝',
      ingredients: ['면', '토마토소스', '치즈', '마늘'],
      cookMethod: '끓이기',
      cookEmoji: '🔥',
      customerTime: 26,
      points: 100,
    },
    {
      id: 'hamburger',
      name: '햄버거',
      emoji: '🍔',
      ingredients: ['빵', '패티', '양상추', '치즈'],
      cookMethod: '조립',
      cookEmoji: '🍔',
      customerTime: 20,
      points: 80,
    },
    {
      id: 'pizza',
      name: '피자',
      emoji: '🍕',
      ingredients: ['도우', '토마토소스', '치즈', '페퍼로니'],
      cookMethod: '굽기',
      cookEmoji: '🔥',
      customerTime: 30,
      points: 120,
    },
    {
      id: 'salad',
      name: '샐러드',
      emoji: '🥗',
      ingredients: ['양상추', '당근', '치즈', '계란'],
      cookMethod: '섞기',
      cookEmoji: '🥗',
      customerTime: 16,
      points: 60,
    },
  ],
};

const CUSTOMERS = [
  { emoji: '👨', moods: ['맛있게 부탁해요!', '빨리요!', '배고파요~'] },
  { emoji: '👩', moods: ['맛있게 해주세요!', '서두르지 않아도 돼요 :)', '기대할게요!'] },
  { emoji: '👦', moods: ['빨리요!! 배고파요', '얼른 주세요~', '맛있겠다!'] },
  { emoji: '👧', moods: ['맛있으면 좋겠다~', '빨리 주세요!', '기대돼요!'] },
  { emoji: '🧑', moods: ['서둘러 주세요!', '잘 부탁합니다', '빨리 주세요~'] },
  { emoji: '👴', moods: ['천천히 해도 돼요', '맛있게 해주게나', '서두를 것 없어~'] },
  { emoji: '👵', moods: ['맛있게 해줘요~', '잘 부탁해요 :)', '기다릴게요!'] },
];

const GAME_DURATION = 180;
const COOK_TIME_MS  = 2000;

// ===================== STATE =====================

let state = {
  screen:            'menu',
  cuisine:           null,
  score:             0,
  customersServed:   0,
  timeouts:          0,
  combo:             0,
  gameTimeLeft:      GAME_DURATION,
  customerTimeLeft:  0,
  currentRecipe:     null,
  currentCustomer:   null,
  selectedIngredients: [],
  stage:             'selecting', // 'selecting' | 'cooking' | 'serving' | 'reaction'
  gameInterval:      null,
  customerInterval:  null,
  cookTimeout:       null,
};

// ===================== AUDIO =====================

let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
}

function playTone(freq, dur, type = 'sine', vol = 0.25) {
  if (!audioCtx) return;
  try {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch(e) {}
}

function sfx(name) {
  initAudio();
  switch (name) {
    case 'collect':
      playTone(523, 0.08);
      break;
    case 'wrong':
      playTone(200, 0.15, 'sawtooth', 0.2);
      break;
    case 'cookDone':
      playTone(523, 0.08);
      setTimeout(() => playTone(659, 0.08), 90);
      setTimeout(() => playTone(784, 0.15), 180);
      break;
    case 'serve':
      playTone(784, 0.08);
      setTimeout(() => playTone(1047, 0.18), 100);
      break;
    case 'timeout':
      playTone(196, 0.25, 'sawtooth', 0.2);
      break;
    case 'gameover':
      playTone(392, 0.15);
      setTimeout(() => playTone(330, 0.15), 160);
      setTimeout(() => playTone(262, 0.25), 320);
      break;
  }
}

// ===================== SCREENS =====================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.screen = id.replace('screen-', '');
}

// ===================== MENU =====================

function selectCuisine(cuisine) {
  initAudio();
  state.cuisine = cuisine;
  startGame();
}

function backToMenu() {
  clearTimers();
  showScreen('screen-menu');
}

// ===================== GAME INIT =====================

function startGame() {
  state.score            = 0;
  state.customersServed  = 0;
  state.timeouts         = 0;
  state.combo            = 0;
  state.gameTimeLeft     = GAME_DURATION;

  showScreen('screen-game');
  updateScoreUI();
  updateGameTimerUI();
  updateComboUI();

  state.gameInterval = setInterval(() => {
    state.gameTimeLeft--;
    updateGameTimerUI();
    if (state.gameTimeLeft <= 0) endGame();
  }, 1000);

  nextCustomer();
}

function clearTimers() {
  clearInterval(state.gameInterval);
  clearInterval(state.customerInterval);
  clearTimeout(state.cookTimeout);
  state.gameInterval    = null;
  state.customerInterval = null;
  state.cookTimeout     = null;
}

// ===================== CUSTOMER FLOW =====================

function pickRandomRecipe() {
  const pool = RECIPES[state.cuisine];
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickRandomCustomer() {
  return CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
}

function nextCustomer() {
  state.selectedIngredients = [];
  state.stage               = 'selecting';
  state.currentRecipe       = pickRandomRecipe();
  state.currentCustomer     = pickRandomCustomer();
  state.customerTimeLeft    = state.currentRecipe.customerTime;

  renderCustomer();
  renderRecipeCard();
  renderIngredients();
  renderKitchen();

  hide('cook-btn');
  hide('serve-btn');
  hide('cook-progress-wrap');
  document.getElementById('pot-icon').textContent = '🍳';

  clearInterval(state.customerInterval);
  state.customerInterval = setInterval(() => {
    state.customerTimeLeft -= 0.5;
    updateCustomerTimerUI();
    if (state.customerTimeLeft <= 0) customerTimedOut();
  }, 500);
}

function customerTimedOut() {
  if (state.stage === 'reaction') return;
  clearInterval(state.customerInterval);
  state.stage = 'reaction';
  state.timeouts++;
  state.combo = 0;

  document.getElementById('customer-char').textContent = '😤';
  document.getElementById('customer-mood').textContent = '다음에 올게요...';
  sfx('timeout');
  showFeedback('⏰ 시간 초과!', '#e83e3e');
  updateComboUI();

  setTimeout(() => {
    if (state.screen === 'game') nextCustomer();
  }, 1600);
}

// ===================== RENDER =====================

function renderCustomer() {
  const c = state.currentCustomer;
  const r = state.currentRecipe;
  const mood = c.moods[Math.floor(Math.random() * c.moods.length)];

  document.getElementById('customer-char').textContent = c.emoji;
  document.getElementById('order-emoji').textContent   = r.emoji;
  document.getElementById('order-name').textContent    = r.name;
  document.getElementById('customer-mood').textContent = mood;
  document.getElementById('customer-timer-fill').style.width      = '100%';
  document.getElementById('customer-timer-fill').style.background = 'linear-gradient(90deg,#4caf50,#8bc34a)';
}

function renderRecipeCard() {
  const list = document.getElementById('recipe-list');
  list.innerHTML = '';

  state.currentRecipe.ingredients.forEach(ing => {
    const data = INGREDIENTS[ing];
    const div = document.createElement('div');
    div.className = 'recipe-item';
    div.id = 'ri-' + (data ? data.id : ing);
    div.innerHTML = `<span class="recipe-item-emoji">${data ? data.emoji : '🍴'}</span><span>${ing}</span>`;
    list.appendChild(div);
  });
}

function renderIngredients() {
  const grid = document.getElementById('ingredients-grid');
  grid.innerHTML = '';

  // Build a pool: all required + 3 random distractors
  const required = new Set(state.currentRecipe.ingredients);
  const allIngNames = Object.keys(INGREDIENTS);
  const distractors = allIngNames
    .filter(n => !required.has(n))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const pool = [...state.currentRecipe.ingredients, ...distractors]
    .sort(() => Math.random() - 0.5);

  pool.forEach(ing => {
    const data = INGREDIENTS[ing];
    if (!data) return;
    const btn = document.createElement('button');
    btn.className = 'ing-btn';
    btn.id = 'ibtn-' + data.id;
    btn.innerHTML = `<span class="ing-emoji">${data.emoji}</span><span class="ing-name">${ing}</span>`;
    btn.onclick = () => selectIngredient(ing);
    grid.appendChild(btn);
  });
}

function renderKitchen() {
  const zone = document.getElementById('selected-zone');
  if (state.selectedIngredients.length === 0) {
    zone.innerHTML = '<span class="placeholder-text">재료를 선택하세요</span>';
    return;
  }
  zone.innerHTML = '';
  state.selectedIngredients.forEach(ing => {
    const data = INGREDIENTS[ing];
    if (!data) return;
    const tag = document.createElement('div');
    tag.className = 'ingredient-tag';
    tag.title = '클릭해서 제거';
    tag.innerHTML = `${data.emoji} ${ing}`;
    tag.onclick = () => removeIngredient(ing);
    zone.appendChild(tag);
  });
}

// ===================== INGREDIENT INTERACTION =====================

function selectIngredient(ing) {
  if (state.stage !== 'selecting') return;
  const data = INGREDIENTS[ing];
  const isRequired = state.currentRecipe.ingredients.includes(ing);

  if (!isRequired) {
    const btn = document.getElementById('ibtn-' + data.id);
    if (btn) {
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 450);
    }
    sfx('wrong');
    showFeedback('❌ 재료가 아니에요!', '#e83e3e', 800);
    return;
  }

  if (state.selectedIngredients.includes(ing)) return; // already added

  state.selectedIngredients.push(ing);
  sfx('collect');

  const btn = document.getElementById('ibtn-' + data.id);
  if (btn) btn.classList.add('selected');

  const ri = document.getElementById('ri-' + data.id);
  if (ri) ri.classList.add('done');

  renderKitchen();
  checkAllCollected();
}

function removeIngredient(ing) {
  if (state.stage !== 'selecting') return;
  state.selectedIngredients = state.selectedIngredients.filter(i => i !== ing);

  const data = INGREDIENTS[ing];
  if (data) {
    const btn = document.getElementById('ibtn-' + data.id);
    if (btn) btn.classList.remove('selected');
    const ri = document.getElementById('ri-' + data.id);
    if (ri) ri.classList.remove('done');
  }

  renderKitchen();
  checkAllCollected();
}

function checkAllCollected() {
  const allDone = state.currentRecipe.ingredients.every(
    ing => state.selectedIngredients.includes(ing)
  );

  if (allDone) {
    show('cook-btn');
  } else {
    hide('cook-btn');
  }
}

// ===================== COOKING & SERVING =====================

function cookDish() {
  if (state.stage !== 'selecting') return;
  state.stage = 'cooking';

  hide('cook-btn');
  show('cook-progress-wrap');

  const pot = document.getElementById('pot-icon');
  pot.textContent = state.currentRecipe.cookEmoji;

  const fill = document.getElementById('cook-progress-fill');
  fill.style.width = '0%';
  setTimeout(() => { fill.style.width = '100%'; }, 50);

  state.cookTimeout = setTimeout(() => {
    hide('cook-progress-wrap');
    pot.textContent = state.currentRecipe.emoji;
    state.stage = 'serving';
    show('serve-btn');
    sfx('cookDone');
    showFeedback('완성! 🎉', '#ff8c00', 900);
  }, COOK_TIME_MS + 100);
}

function serveDish() {
  if (state.stage !== 'serving') return;
  clearInterval(state.customerInterval);
  state.stage = 'reaction';

  const timeRatio   = Math.max(0, state.customerTimeLeft / state.currentRecipe.customerTime);
  const timeBonus   = Math.round(timeRatio * 50);
  state.combo++;
  const comboBonus  = state.combo >= 3 ? Math.floor(state.currentRecipe.points * 0.5 * Math.min(state.combo - 2, 3)) : 0;
  const earned      = state.currentRecipe.points + timeBonus + comboBonus;

  state.score += earned;
  state.customersServed++;

  hide('serve-btn');
  document.getElementById('customer-char').textContent = '😄';
  document.getElementById('customer-mood').textContent = '맛있어요! 감사합니다!';

  sfx('serve');
  updateScoreUI();
  updateComboUI();

  let msg = `+${earned}점 😄`;
  if (comboBonus > 0) msg += `\n🔥 콤보 보너스 +${comboBonus}!`;
  showFeedback(msg, '#4caf50');

  setTimeout(() => {
    if (state.screen === 'game') nextCustomer();
  }, 2000);
}

// ===================== UI UPDATES =====================

function updateScoreUI() {
  document.getElementById('score').textContent = state.score;
}

function updateGameTimerUI() {
  const t    = Math.max(0, state.gameTimeLeft);
  const mins = Math.floor(t / 60);
  const secs = t % 60;
  document.getElementById('game-timer-text').textContent =
    `${mins}:${secs.toString().padStart(2, '0')}`;

  const pct  = t / GAME_DURATION;
  const fill = document.getElementById('game-timer-fill');
  fill.style.width = (pct * 100) + '%';

  if (pct < 0.25) {
    fill.style.background = 'linear-gradient(90deg,#e83e3e,#ff7043)';
  } else if (pct < 0.5) {
    fill.style.background = 'linear-gradient(90deg,#ff8c00,#ffd700)';
  } else {
    fill.style.background = 'linear-gradient(90deg,#4caf50,#8bc34a)';
  }
}

function updateCustomerTimerUI() {
  const pct  = Math.max(0, state.customerTimeLeft / state.currentRecipe.customerTime);
  const fill = document.getElementById('customer-timer-fill');
  fill.style.width = (pct * 100) + '%';

  const char = document.getElementById('customer-char');
  const mood = document.getElementById('customer-mood');

  if (pct < 0.25) {
    fill.style.background = 'linear-gradient(90deg,#e83e3e,#ff7043)';
    if (state.stage === 'selecting') {
      char.textContent = '😰';
      mood.textContent = '빨리요! 빨리!!!';
    }
  } else if (pct < 0.55) {
    fill.style.background = 'linear-gradient(90deg,#ff8c00,#ffd700)';
    if (state.stage === 'selecting') {
      char.textContent = '😐';
      mood.textContent = '서두르세요~';
    }
  }
}

function updateComboUI() {
  const box = document.getElementById('combo-box');
  if (state.combo >= 2) {
    box.style.display = 'flex';
    document.getElementById('combo-count').textContent = `x${state.combo}`;
  } else {
    box.style.display = 'none';
  }
}

// ===================== FEEDBACK =====================

function showFeedback(msg, color, duration = 1200) {
  const overlay = document.getElementById('feedback-overlay');
  const text    = document.getElementById('feedback-text');
  overlay.classList.remove('hidden');
  text.textContent  = msg;
  text.style.color  = color;

  // re-trigger animation
  text.style.animation = 'none';
  text.offsetHeight;
  text.style.animation = '';

  clearTimeout(state._feedbackTimeout);
  state._feedbackTimeout = setTimeout(() => overlay.classList.add('hidden'), duration);
}

// ===================== GAME OVER =====================

function endGame() {
  clearTimers();
  state.screen = 'gameover';
  sfx('gameover');

  let gradeEmoji, title, message;

  if (state.score >= 2500) {
    gradeEmoji = '👨‍🍳⭐⭐⭐'; title = '전설의 요리사!';
    message = '완벽해요! 프로 셰프 급이네요. 정말 대단해요! 🏆';
  } else if (state.score >= 1800) {
    gradeEmoji = '⭐⭐⭐'; title = '최고의 요리사!';
    message = '훌륭해요! 손님들이 아주 만족했어요. 😄';
  } else if (state.score >= 1200) {
    gradeEmoji = '⭐⭐'; title = '실력 있는 요리사!';
    message = '잘 했어요! 조금만 더 연습하면 완벽해요. 💪';
  } else if (state.score >= 600) {
    gradeEmoji = '⭐'; title = '나름 괜찮아요!';
    message = '좋아요! 다음엔 재료를 더 빨리 고르면 점수가 올라가요. 🌟';
  } else {
    gradeEmoji = '😊'; title = '요리 견습생!';
    message = '아직 초보지만 괜찮아요! 레시피를 잘 보고 다시 도전하세요. 🔄';
  }

  document.getElementById('go-emoji').textContent   = gradeEmoji;
  document.getElementById('go-title').textContent   = title;
  document.getElementById('go-grade').textContent   = '';
  document.getElementById('go-score').textContent   = state.score;
  document.getElementById('go-message').textContent = message;

  document.getElementById('go-stats').innerHTML = `
    <div class="stat">
      <div class="stat-val">${state.customersServed}</div>
      <div class="stat-lbl">서빙 완료</div>
    </div>
    <div class="stat">
      <div class="stat-val">${state.timeouts}</div>
      <div class="stat-lbl">시간 초과</div>
    </div>
    <div class="stat">
      <div class="stat-val">${Math.max(0, state.combo)}</div>
      <div class="stat-lbl">최고 콤보</div>
    </div>
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
