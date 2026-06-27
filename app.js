const questions = [
  {
    part: "Part 5",
    text: "The new printer is more efficient than the one it -------.",
    choices: ["replaced", "replacement", "replacing", "replace"],
    answer: 0,
    explanation: "空所は動詞の過去形が必要です。the one it replaced で「それが置き換えたもの」。"
  },
  {
    part: "Part 5",
    text: "Please submit the report ------- Friday afternoon.",
    choices: ["within", "by", "during", "along"],
    answer: 1,
    explanation: "期限を表す場合は by を使います。by Friday afternoon は「金曜午後までに」。"
  },
  {
    part: "Part 5",
    text: "Ms. Tanaka has been ------- for the overseas sales team since April.",
    choices: ["responsible", "responsibly", "responsibility", "respond"],
    answer: 0,
    explanation: "be responsible for で「担当している」。形容詞 responsible が入ります。"
  },
  {
    part: "Part 5",
    text: "The seminar was canceled ------- fewer than ten people registered.",
    choices: ["because", "although", "unless", "despite"],
    answer: 0,
    explanation: "理由を表す接続詞 because が自然です。despite は名詞句を続けます。"
  },
  {
    part: "Part 5",
    text: "All employees are required to wear their ID badges ------- entering the building.",
    choices: ["while", "until", "before", "beside"],
    answer: 2,
    explanation: "建物に入る前にIDを着用する、という意味なので before が正解です。"
  },
  {
    part: "Part 5",
    text: "The manager asked the staff to review the document -------.",
    choices: ["care", "careful", "carefully", "caring"],
    answer: 2,
    explanation: "動詞 review を修飾する副詞 carefully が必要です。"
  }
];

const words = [
  { front: "negotiate", back: "交渉する。例: negotiate a contract 契約交渉をする" },
  { front: "deadline", back: "締め切り。TOEICでは submit / meet と一緒に出やすい語です。" },
  { front: "inventory", back: "在庫、棚卸し。retail や warehouse の文脈で頻出です。" },
  { front: "mandatory", back: "義務的な、必須の。required と近い意味です。" },
  { front: "venue", back: "会場。conference / seminar と一緒に出やすい語です。" },
  { front: "reimburse", back: "払い戻す、精算する。travel expenses とよく使われます。" },
  { front: "approximately", back: "およそ、約。数字の前に置かれます。" },
  { front: "postpone", back: "延期する。cancel と区別して覚えると便利です。" }
];

const storageKey = "toeic-commute-progress-v1";

const state = {
  currentQuestion: 0,
  currentCard: 0,
  cardRevealed: false,
  secondsLeft: 600,
  timerId: null,
  progress: loadProgress()
};

const el = {
  tabs: document.querySelectorAll(".tab"),
  views: document.querySelectorAll(".view"),
  todayCount: document.querySelector("#todayCount"),
  accuracy: document.querySelector("#accuracy"),
  reviewCount: document.querySelector("#reviewCount"),
  streakDays: document.querySelector("#streakDays"),
  sessionLength: document.querySelector("#sessionLength"),
  newQuestion: document.querySelector("#newQuestion"),
  partLabel: document.querySelector("#partLabel"),
  timer: document.querySelector("#timer"),
  questionText: document.querySelector("#questionText"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"),
  flashcard: document.querySelector("#flashcard"),
  cardFront: document.querySelector("#cardFront"),
  cardBack: document.querySelector("#cardBack"),
  shuffleCards: document.querySelector("#shuffleCards"),
  knownCard: document.querySelector("#knownCard"),
  reviewList: document.querySelector("#reviewList"),
  clearReview: document.querySelector("#clearReview")
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress() {
  const fallback = {
    total: 0,
    correct: 0,
    todayDate: today(),
    todayCount: 0,
    activeDays: [],
    reviewIds: []
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey)) };
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

function markActiveDay() {
  const current = today();
  if (!state.progress.activeDays.includes(current)) {
    state.progress.activeDays.push(current);
    state.progress.activeDays = state.progress.activeDays.slice(-60);
  }
}

function countStreak() {
  const days = new Set(state.progress.activeDays);
  let count = 0;
  const cursor = new Date();

  while (days.has(cursor.toISOString().slice(0, 10))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return count;
}

function updateStats() {
  syncDate();
  const accuracy = state.progress.total
    ? Math.round((state.progress.correct / state.progress.total) * 100)
    : 0;

  el.todayCount.textContent = state.progress.todayCount;
  el.accuracy.textContent = `${accuracy}%`;
  el.reviewCount.textContent = state.progress.reviewIds.length;
  el.streakDays.textContent = countStreak();
  renderReview();
  saveProgress();
}

function startTimer() {
  clearInterval(state.timerId);
  state.secondsLeft = Number(el.sessionLength.value) * 60;
  renderTimer();
  state.timerId = setInterval(() => {
    state.secondsLeft = Math.max(0, state.secondsLeft - 1);
    renderTimer();
    if (state.secondsLeft === 0) {
      clearInterval(state.timerId);
      el.feedback.textContent = "時間です。次の通勤では、復習タブから間違えた問題だけ確認しましょう。";
    }
  }, 1000);
}

function renderTimer() {
  const minutes = String(Math.floor(state.secondsLeft / 60)).padStart(2, "0");
  const seconds = String(state.secondsLeft % 60).padStart(2, "0");
  el.timer.textContent = `${minutes}:${seconds}`;
}

function renderQuestion() {
  const question = questions[state.currentQuestion];
  el.partLabel.textContent = question.part;
  el.questionText.textContent = question.text;
  el.feedback.textContent = "選択肢を選ぶと解説が表示されます。";
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
  const question = questions[state.currentQuestion];
  const buttons = [...document.querySelectorAll(".answer")];
  const isCorrect = choiceIndex === question.answer;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    if (index === choiceIndex && !isCorrect) button.classList.add("wrong");
  });

  state.progress.total += 1;
  state.progress.todayCount += 1;
  if (isCorrect) {
    state.progress.correct += 1;
    state.progress.reviewIds = state.progress.reviewIds.filter((id) => id !== state.currentQuestion);
  } else if (!state.progress.reviewIds.includes(state.currentQuestion)) {
    state.progress.reviewIds.push(state.currentQuestion);
  }

  markActiveDay();
  el.feedback.textContent = `${isCorrect ? "正解" : "不正解"}。${question.explanation}`;
  updateStats();
}

function nextQuestion() {
  state.currentQuestion = (state.currentQuestion + 1) % questions.length;
  renderQuestion();
}

function renderCard() {
  const card = words[state.currentCard];
  el.cardFront.textContent = card.front;
  el.cardBack.textContent = state.cardRevealed ? card.back : "";
}

function nextCard() {
  state.currentCard = (state.currentCard + 1) % words.length;
  state.cardRevealed = false;
  renderCard();
}

function renderReview() {
  el.reviewList.innerHTML = "";

  if (state.progress.reviewIds.length === 0) {
    const empty = document.createElement("p");
    empty.className = "review-empty";
    empty.textContent = "復習リストは空です。問題を解いて、間違えたものがここに残ります。";
    el.reviewList.append(empty);
    return;
  }

  state.progress.reviewIds.forEach((id) => {
    const question = questions[id];
    const item = document.createElement("article");
    item.className = "review-item";
    item.innerHTML = `
      <strong>${question.text}</strong>
      <p>正解: ${question.choices[question.answer]}</p>
      <p>${question.explanation}</p>
    `;
    el.reviewList.append(item);
  });
}

el.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    el.tabs.forEach((item) => item.classList.remove("active"));
    el.views.forEach((view) => view.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.view}`).classList.add("active");
  });
});

el.sessionLength.addEventListener("change", startTimer);
el.newQuestion.addEventListener("click", nextQuestion);
el.flashcard.addEventListener("click", () => {
  state.cardRevealed = !state.cardRevealed;
  renderCard();
});
el.shuffleCards.addEventListener("click", () => {
  state.currentCard = Math.floor(Math.random() * words.length);
  state.cardRevealed = false;
  renderCard();
});
el.knownCard.addEventListener("click", nextCard);
el.clearReview.addEventListener("click", () => {
  state.progress.reviewIds = [];
  updateStats();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

syncDate();
renderQuestion();
renderCard();
startTimer();
updateStats();
