const sessionSize = 10;
const storageKey = "toeic-commute-progress-v10";

const sourceData = window.TOEIC_DATA || {};

const questionPools = {
  grammar: normalizeGrammar(sourceData.grammar || []),
  vocabulary: normalizeChoiceData(sourceData.vocabulary || [], "vocabulary"),
  idiom: normalizeChoiceData(sourceData.idioms || [], "idiom"),
  synonym: normalizeSynonymData(sourceData.synonyms || [])
};

const state = {
  mode: "grammar",
  session: [],
  index: 0,
  answered: false,
  progress: loadProgress()
};

const el = {
  tabs: document.querySelectorAll(".tab"),
  todayCount: document.querySelector("#todayCount"),
  newSession: document.querySelector("#newSession"),
  nextQuestion: document.querySelector("#nextQuestion"),
  speakButton: document.querySelector("#speakButton"),
  questionPanel: document.querySelector("#questionPanel"),
  partLabel: document.querySelector("#partLabel"),
  progressLabel: document.querySelector("#progressLabel"),
  questionText: document.querySelector("#questionText"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback")
};

function normalizeGrammar(items) {
  return items.map((item, index) => ({
    id: item.id || `grammar-${String(index + 1).padStart(4, "0")}`,
    label: item.label || "文法",
    sequence: index + 1,
    total: items.length,
    uniqueKey: item.id || item.text,
    text: item.text,
    choices: item.choices,
    answer: item.answer,
    explanation: item.explanation,
    examples: item.examples || []
  }));
}

function normalizeChoiceData(items, type) {
  return items.map((item, index) => {
    const choices = buildChoices(item, items, index);
    return {
      id: item.id || `${type}-${String(index + 1).padStart(4, "0")}`,
      label: type === "vocabulary" ? "単語" : "イディオム",
      sequence: index + 1,
      total: items.length,
      uniqueKey: item.base || item.term,
      text: item.term,
      choices,
      answer: choices.indexOf(item.meaning),
      explanation: `「${item.meaning}」という意味です。${item.note}`,
      examples: item.examples || []
    };
  });
}

function normalizeSynonymData(items) {
  return items.map((item, index) => ({
    id: item.id || `synonym-${String(index + 1).padStart(4, "0")}`,
    label: "類義語",
    sequence: index + 1,
    total: items.length,
    uniqueKey: item.root || item.term,
    text: item.term,
    choices: item.choices,
    answer: item.choices.indexOf(item.answer),
    explanation: `${item.term} は ${item.answer} と近い意味です。${item.note}`,
    examples: item.examples || []
  }));
}

function buildChoices(item, items, itemIndex) {
  const root = item.root || item.base || item.term;
  const distractors = [];
  const pools = [
    item.base ? shuffle(items.filter((entry) => entry.base === item.base)) : [],
    item.pos ? nearbyItems(items, itemIndex).filter((entry) => entry.pos === item.pos) : [],
    item.pos ? shuffle(items.filter((entry) => entry.pos === item.pos)) : [],
    nearbyItems(items, itemIndex),
    shuffle(items)
  ];

  pools.forEach((pool) => {
    pool.forEach((entry) => {
      if (distractors.length >= 3) return;
      const entryRoot = entry.root || entry.base || entry.term;
      if (entry.meaning === item.meaning) return;
      if (!item.base && entryRoot === root) return;
      if (distractors.includes(entry.meaning)) return;
      distractors.push(entry.meaning);
    });
  });

  return shuffle([item.meaning, ...distractors.slice(0, 3)]);
}

function nearbyItems(items, itemIndex) {
  return items
    .map((entry, index) => ({ entry, distance: Math.abs(index - itemIndex) }))
    .sort((a, b) => a.distance - b.distance)
    .map((item) => item.entry);
}

function shuffle(items) {
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress() {
  const fallback = {
    todayDate: today(),
    todayCount: 0,
    categoryCursor: {
      grammar: 0,
      vocabulary: 0,
      idiom: 0,
      synonym: 0
    }
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return {
      ...fallback,
      ...saved,
      categoryCursor: {
        ...fallback.categoryCursor,
        ...(saved?.categoryCursor || {})
      }
    };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state.progress));
}

function syncDate() {
  const current = today();
  if (state.progress.todayDate !== current) {
    state.progress.todayDate = current;
    state.progress.todayCount = 0;
  }
}

function updateStats() {
  syncDate();
  el.todayCount.textContent = state.progress.todayCount;
  saveProgress();
}

function beginSession() {
  const pool = questionPools[state.mode];
  if (!pool.length) {
    renderDataError();
    return;
  }

  const usedKeys = new Set();
  const session = [];
  let cursor = state.progress.categoryCursor[state.mode] || 0;
  let attempts = 0;

  while (session.length < Math.min(sessionSize, pool.length) && attempts < pool.length * 2) {
    const question = pool[cursor % pool.length];
    cursor = (cursor + 1) % pool.length;
    attempts += 1;

    if (usedKeys.has(question.uniqueKey)) continue;
    usedKeys.add(question.uniqueKey);
    session.push(question);
  }

  state.progress.categoryCursor[state.mode] = cursor;
  state.session = session;
  state.index = 0;
  state.answered = false;
  saveProgress();
  renderQuestion();
}

function renderDataError() {
  el.partLabel.textContent = "データ未読込";
  el.progressLabel.textContent = "0 / 0";
  el.questionText.textContent = "問題データを読み込めませんでした。";
  el.answers.innerHTML = "";
  el.feedback.textContent = "data.js が index.html より先に読み込まれているか確認してください。";
  el.nextQuestion.disabled = true;
  el.speakButton.hidden = true;
}

function currentQuestion() {
  return state.session[state.index];
}

function renderQuestion() {
  const question = currentQuestion();
  state.answered = false;
  el.questionPanel.classList.remove("is-correct", "is-wrong", "pulse");
  el.partLabel.textContent = question.label;
  el.progressLabel.textContent = `${question.sequence} / ${question.total}`;
  el.questionText.textContent = question.text;
  el.feedback.replaceChildren();
  el.speakButton.hidden = state.mode === "grammar";
  el.speakButton.disabled = state.mode === "grammar";
  el.nextQuestion.disabled = true;
  el.answers.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => answerQuestion(index));
    el.answers.append(button);
  });
}

function answerQuestion(choiceIndex) {
  if (state.answered) return;

  const question = currentQuestion();
  const buttons = [...document.querySelectorAll(".answer")];
  const isCorrect = choiceIndex === question.answer;
  state.answered = true;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    if (index === choiceIndex && !isCorrect) button.classList.add("wrong");
  });

  state.progress.todayCount += 1;
  el.questionPanel.classList.add(isCorrect ? "is-correct" : "is-wrong", "pulse");
  renderFeedback(isCorrect, question);
  el.nextQuestion.disabled = false;
  updateStats();
}

function renderFeedback(isCorrect, question) {
  el.feedback.replaceChildren();

  const summary = document.createElement("p");
  summary.className = "feedback-summary";
  summary.textContent = `${isCorrect ? "正解。" : "不正解。"}${question.explanation}`;
  el.feedback.append(summary);

  if (!question.examples?.length) return;

  const list = document.createElement("ol");
  list.className = "example-list";
  question.examples.slice(0, 3).forEach((example) => {
    const item = document.createElement("li");
    item.textContent = example;
    list.append(item);
  });
  el.feedback.append(list);
}

function speakCurrentQuestion() {
  const question = currentQuestion();
  if (!question || state.mode === "grammar" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(question.text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function nextQuestion() {
  if (state.index < state.session.length - 1) {
    state.index += 1;
    renderQuestion();
    return;
  }

  el.feedback.textContent = "10問完了しました。続ける場合は「新しい10問」を押してください。";
  el.nextQuestion.disabled = true;
}

function switchMode(mode) {
  state.mode = mode;
  el.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  beginSession();
}

el.tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchMode(tab.dataset.mode));
});

el.newSession.addEventListener("click", beginSession);
el.nextQuestion.addEventListener("click", nextQuestion);
el.speakButton.addEventListener("click", speakCurrentQuestion);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

syncDate();
beginSession();
updateStats();
