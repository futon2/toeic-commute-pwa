const fs = require("fs");
const path = require("path");

const vocabularyGroups = [
  {
    adjectives: [["financial", "財務の"], ["quarterly", "四半期の"], ["annual", "年次の"], ["revised", "改訂された"], ["detailed", "詳細な"], ["accurate", "正確な"], ["final", "最終の"], ["preliminary", "暫定の"], ["projected", "予測された"], ["approved", "承認済みの"], ["estimated", "見積もられた"], ["outstanding", "未払いの"], ["overdue", "期限を過ぎた"], ["monthly", "月次の"], ["budgetary", "予算上の"]],
    nouns: [["report", "報告書"], ["budget", "予算"], ["invoice", "請求書"], ["payment", "支払い"], ["expense", "経費"], ["estimate", "見積もり"], ["statement", "明細書"], ["account", "口座"], ["forecast", "予測"], ["audit", "監査"]]
  },
  {
    adjectives: [["annual", "年次の"], ["upcoming", "今度の"], ["scheduled", "予定された"], ["postponed", "延期された"], ["mandatory", "必須の"], ["optional", "任意の"], ["online", "オンラインの"], ["regional", "地域の"], ["internal", "社内の"], ["external", "外部の"], ["quarterly", "四半期の"], ["weekly", "週次の"], ["training", "研修用の"], ["planning", "計画用の"], ["introductory", "入門の"]],
    nouns: [["meeting", "会議"], ["conference", "会議"], ["seminar", "セミナー"], ["workshop", "研修会"], ["session", "セッション"], ["appointment", "予約"], ["event", "イベント"], ["reception", "受付会"], ["presentation", "発表"], ["webinar", "ウェビナー"]]
  },
  {
    adjectives: [["qualified", "資格のある"], ["experienced", "経験豊富な"], ["prospective", "見込みの"], ["successful", "合格した"], ["eligible", "資格を満たした"], ["new", "新しい"], ["current", "現在の"], ["former", "以前の"], ["temporary", "一時的な"], ["permanent", "常勤の"], ["full-time", "常勤の"], ["part-time", "非常勤の"], ["senior", "上級の"], ["junior", "下級の"], ["internal", "社内の"]],
    nouns: [["candidate", "候補者"], ["employee", "従業員"], ["applicant", "応募者"], ["manager", "管理者"], ["supervisor", "監督者"], ["assistant", "アシスタント"], ["representative", "担当者"], ["staff", "職員"], ["trainer", "研修担当者"], ["consultant", "コンサルタント"]]
  },
  {
    adjectives: [["efficient", "効率的な"], ["routine", "定期的な"], ["regular", "定期的な"], ["scheduled", "予定された"], ["preventive", "予防的な"], ["urgent", "緊急の"], ["necessary", "必要な"], ["additional", "追加の"], ["technical", "技術的な"], ["annual", "年次の"], ["monthly", "月次の"], ["on-site", "現地の"], ["safety", "安全の"], ["quality", "品質の"], ["facility", "施設の"]],
    nouns: [["maintenance", "保守"], ["inspection", "検査"], ["repair", "修理"], ["upgrade", "更新"], ["installation", "設置"], ["delivery", "配送"], ["shipment", "出荷"], ["inventory", "在庫"], ["procedure", "手順"], ["operation", "業務"]]
  },
  {
    adjectives: [["new", "新しい"], ["loyal", "常連の"], ["potential", "見込みの"], ["prospective", "見込みの"], ["existing", "既存の"], ["corporate", "法人の"], ["local", "地元の"], ["overseas", "海外の"], ["regular", "定期的な"], ["major", "主要な"], ["individual", "個人の"], ["satisfied", "満足した"], ["dissatisfied", "不満のある"], ["important", "重要な"], ["repeat", "リピートの"]],
    nouns: [["client", "顧客"], ["customer", "顧客"], ["account", "取引先"], ["buyer", "購入者"], ["visitor", "訪問者"], ["supplier", "供給業者"], ["vendor", "販売業者"], ["partner", "提携先"], ["distributor", "販売代理店"], ["subscriber", "購読者"]]
  },
  {
    adjectives: [["confidential", "機密の"], ["official", "公式の"], ["revised", "改訂された"], ["updated", "更新された"], ["attached", "添付された"], ["signed", "署名済みの"], ["completed", "記入済みの"], ["required", "必要な"], ["missing", "不足している"], ["original", "原本の"], ["duplicate", "複製の"], ["electronic", "電子の"], ["printed", "印刷された"], ["detailed", "詳細な"], ["brief", "簡潔な"]],
    nouns: [["document", "書類"], ["form", "用紙"], ["contract", "契約書"], ["agreement", "合意書"], ["manual", "マニュアル"], ["policy", "方針"], ["notice", "通知"], ["memo", "メモ"], ["brochure", "パンフレット"], ["application", "申請書"]]
  },
  {
    adjectives: [["new", "新しい"], ["popular", "人気のある"], ["innovative", "革新的な"], ["improved", "改良された"], ["defective", "欠陥のある"], ["replacement", "交換用の"], ["complimentary", "無料の"], ["promotional", "販促用の"], ["seasonal", "季節限定の"], ["competitive", "競争力のある"], ["affordable", "手頃な"], ["available", "利用可能な"], ["limited", "限定の"], ["customized", "カスタマイズされた"], ["discontinued", "販売終了の"]],
    nouns: [["product", "製品"], ["service", "サービス"], ["item", "商品"], ["model", "型式"], ["device", "機器"], ["software", "ソフトウェア"], ["package", "パッケージ"], ["offer", "提案"], ["discount", "割引"], ["feature", "機能"]]
  },
  {
    adjectives: [["reserved", "予約済みの"], ["available", "利用可能な"], ["nearby", "近くの"], ["convenient", "便利な"], ["renovated", "改装済みの"], ["spacious", "広々とした"], ["accessible", "利用しやすい"], ["private", "専用の"], ["public", "公共の"], ["central", "中心部の"], ["downtown", "中心街の"], ["local", "地元の"], ["overseas", "海外の"], ["temporary", "一時的な"], ["permanent", "常設の"]],
    nouns: [["room", "部屋"], ["facility", "施設"], ["venue", "会場"], ["hotel", "ホテル"], ["lobby", "ロビー"], ["office", "事務所"], ["branch", "支店"], ["warehouse", "倉庫"], ["parking", "駐車場"], ["restaurant", "レストラン"]]
  },
  {
    adjectives: [["detailed", "詳細な"], ["step-by-step", "段階的な"], ["standard", "標準の"], ["revised", "改訂された"], ["internal", "社内の"], ["official", "公式の"], ["company", "会社の"], ["safety", "安全の"], ["quality", "品質の"], ["approval", "承認の"], ["hiring", "採用の"], ["ordering", "注文の"], ["billing", "請求の"], ["registration", "登録の"], ["cancellation", "キャンセルの"]],
    nouns: [["procedure", "手順"], ["process", "手続き"], ["guideline", "指針"], ["requirement", "要件"], ["policy", "方針"], ["instruction", "指示"], ["rule", "規則"], ["system", "制度"], ["method", "方法"], ["workflow", "作業手順"]]
  },
  {
    adjectives: [["written", "書面の"], ["verbal", "口頭の"], ["official", "公式の"], ["urgent", "緊急の"], ["friendly", "親しみやすい"], ["prompt", "迅速な"], ["automated", "自動の"], ["follow-up", "追跡確認の"], ["confirmation", "確認の"], ["reminder", "催促の"], ["internal", "社内の"], ["external", "外部の"], ["customer", "顧客向けの"], ["supplier", "供給業者向けの"], ["departmental", "部門の"]],
    nouns: [["message", "メッセージ"], ["email", "メール"], ["letter", "手紙"], ["announcement", "告知"], ["notification", "通知"], ["request", "依頼"], ["inquiry", "問い合わせ"], ["response", "返答"], ["complaint", "苦情"], ["invitation", "招待"]]
  }
];

function articleFor(term) {
  return /^[aeiou]/i.test(term) ? "an" : "a";
}

function makeVocabulary() {
  const entries = [];
  const seen = new Set();
  const baseWords = buildSingleWordSources();

  baseWords.forEach((word) => {
    addVocabularyEntry(entries, seen, word.term, word.meaning, word.similar, word.note, word.term);
    word.forms.forEach((form) => {
      addVocabularyEntry(entries, seen, form.term, form.meaning, form.similar || word.similar, word.note, form.root || word.term);
    });
  });

  return entries.slice(0, 1500).map((entry, index) => ({
    ...entry,
    id: `vocab-${String(index + 1).padStart(4, "0")}`
  }));
}

function addVocabularyEntry(entries, seen, term, meaning, similar, note, root = term) {
  if (entries.length >= 1500 || seen.has(term) || term.includes(" ")) return;
  seen.add(term);
  entries.push({
    id: "",
    term,
    root,
    meaning,
    similar,
    pos: inferPos(term),
    note: note || `${term} はTOEICの業務・連絡・手続きの文脈で役立つ単語です。`,
    examples: [
      `The manager used "${term}" in the report.`,
      `Please check the meaning of "${term}" before the meeting.`,
      `You may see "${term}" in business e-mails and notices.`
    ]
  });
}

function inferPos(term) {
  if (term.endsWith("ly")) return "adverb";
  if (term.endsWith("ing") || term.endsWith("ed")) return "verb";
  const adjectiveHints = new Set(["financial", "quarterly", "annual", "revised", "detailed", "accurate", "final", "preliminary", "projected", "approved", "estimated", "outstanding", "overdue", "monthly", "budgetary", "upcoming", "scheduled", "postponed", "mandatory", "optional", "online", "regional", "internal", "external", "qualified", "experienced", "prospective", "successful", "eligible", "new", "current", "former", "temporary", "permanent", "efficient", "routine", "regular", "urgent", "necessary", "additional", "technical", "confidential", "official", "required", "missing", "original", "duplicate", "electronic", "printed", "popular", "innovative", "improved", "defective", "replacement", "complimentary", "promotional", "seasonal", "competitive", "affordable", "available", "limited", "customized", "discontinued"]);
  if (adjectiveHints.has(term)) return "adjective";
  return "noun";
}

function buildSingleWordSources() {
  const sources = [];
  const add = (term, meaning, similar, note, type = "noun") => {
    sources.push({ term, meaning, similar, note, forms: makeWordForms(term, meaning, similar, type) });
  };

  vocabularyGroups.forEach((group) => {
    group.adjectives.forEach(([term, meaning]) => add(term, meaning, getSimilar(term, "adjective"), `${term} は説明・評価で使われるTOEIC頻出語です。`, "adjective"));
    group.nouns.forEach(([term, meaning]) => add(term, meaning, getSimilar(term, "noun"), `${term} は職場・取引・手続きで使われるTOEIC頻出語です。`, "noun"));
  });

  const verbs = [
    ["approve", "承認する", "authorize"], ["arrange", "手配する", "organize"], ["assess", "評価する", "evaluate"],
    ["assign", "割り当てる", "allocate"], ["assist", "支援する", "help"], ["attach", "添付する", "enclose"],
    ["attend", "出席する", "participate"], ["authorize", "権限を与える", "approve"], ["calculate", "計算する", "compute"],
    ["cancel", "取り消す", "withdraw"], ["certify", "証明する", "verify"], ["clarify", "明確にする", "explain"],
    ["collect", "集める", "gather"], ["compare", "比較する", "contrast"], ["complete", "完了する", "finish"],
    ["confirm", "確認する", "verify"], ["contact", "連絡する", "reach"], ["contribute", "貢献する", "donate"],
    ["coordinate", "調整する", "organize"], ["deliver", "配送する", "ship"], ["demonstrate", "実演する", "show"],
    ["distribute", "配布する", "circulate"], ["estimate", "見積もる", "approximate"], ["evaluate", "評価する", "assess"],
    ["examine", "調べる", "inspect"], ["expand", "拡大する", "extend"], ["finalize", "最終決定する", "complete"],
    ["identify", "特定する", "recognize"], ["implement", "実施する", "execute"], ["improve", "改善する", "enhance"],
    ["inspect", "検査する", "examine"], ["install", "設置する", "set"], ["introduce", "導入する", "launch"],
    ["investigate", "調査する", "examine"], ["maintain", "維持する", "preserve"], ["manage", "管理する", "supervise"],
    ["negotiate", "交渉する", "discuss"], ["notify", "通知する", "inform"], ["organize", "整理する", "arrange"],
    ["participate", "参加する", "attend"], ["prepare", "準備する", "ready"], ["process", "処理する", "handle"],
    ["produce", "生産する", "manufacture"], ["promote", "促進する", "advertise"], ["purchase", "購入する", "buy"],
    ["recommend", "推薦する", "suggest"], ["reduce", "減らす", "decrease"], ["reimburse", "払い戻す", "refund"],
    ["renovate", "改装する", "remodel"], ["replace", "交換する", "substitute"], ["request", "依頼する", "ask"],
    ["reserve", "予約する", "book"], ["respond", "返答する", "reply"], ["schedule", "予定する", "plan"],
    ["ship", "発送する", "deliver"], ["submit", "提出する", "present"], ["supervise", "監督する", "manage"],
    ["update", "更新する", "revise"], ["verify", "確認する", "confirm"], ["review", "確認する", "examine"],
    ["revise", "改訂する", "update"], ["launch", "開始する", "introduce"], ["register", "登録する", "enroll"],
    ["enroll", "登録する", "register"], ["extend", "延長する", "expand"], ["decline", "断る", "refuse"],
    ["accept", "受け入れる", "approve"], ["adjust", "調整する", "modify"], ["advertise", "宣伝する", "promote"],
    ["announce", "発表する", "notify"], ["apologize", "謝罪する", "regret"], ["assemble", "組み立てる", "build"],
    ["book", "予約する", "reserve"], ["borrow", "借りる", "rent"], ["broadcast", "放送する", "announce"],
    ["charge", "請求する", "bill"], ["complain", "苦情を言う", "protest"], ["consult", "相談する", "advise"],
    ["delay", "遅らせる", "postpone"], ["design", "設計する", "create"], ["enclose", "同封する", "attach"],
    ["encourage", "促す", "motivate"], ["ensure", "確実にする", "guarantee"], ["exchange", "交換する", "trade"],
    ["hire", "雇う", "employ"], ["increase", "増やす", "raise"], ["inform", "知らせる", "notify"],
    ["lease", "賃借する", "rent"], ["locate", "位置する", "situate"], ["manufacture", "製造する", "produce"],
    ["monitor", "監視する", "track"], ["obtain", "得る", "acquire"], ["operate", "操作する", "run"],
    ["order", "注文する", "request"], ["postpone", "延期する", "delay"], ["provide", "提供する", "supply"],
    ["publish", "発行する", "issue"], ["receive", "受け取る", "obtain"], ["recruit", "採用する", "hire"],
    ["relocate", "移転する", "move"], ["remind", "思い出させる", "notify"], ["repair", "修理する", "fix"],
    ["require", "必要とする", "need"], ["resolve", "解決する", "settle"], ["return", "返却する", "send"],
    ["select", "選ぶ", "choose"], ["serve", "提供する", "assist"], ["supply", "供給する", "provide"],
    ["train", "研修する", "coach"], ["transfer", "移す", "move"], ["upgrade", "更新する", "improve"]
  ];
  verbs.forEach(([term, meaning, similar]) => add(term, meaning, similar, `${term} はTOEICの職場・取引の動作を表す重要語です。`, "verb"));

  addSingleWordSupplements(add);

  return sources;
}

function addSingleWordSupplements(add) {
  const patterns = idiomPatterns.map(([pattern]) => pattern);
  const seen = new Set();
  patterns.forEach((pattern) => {
    getIdiomObjects(pattern).forEach(([phrase, meaning]) => {
      phrase
        .replace(/^(a|an|the)\s+/i, "")
        .split(/\s+/)
        .map((word) => word.replace(/[^a-z-]/gi, "").toLowerCase())
        .filter((word) => word && !word.includes("-") && word.length > 2)
        .forEach((word) => {
          if (seen.has(word)) return;
          seen.add(word);
          add(word, meaning, getSimilar(word, "noun"), `${word} はTOEICの案内・メール・手続きで見かける単語です。`, "noun");
        });
    });
  });
}

function makeWordForms(term, meaning, similar, type) {
  const forms = [];
  const add = (form, label, sim = similar) => {
    if (form !== term) forms.push({ term: form, root: term, meaning: `${meaning}（${label}）`, similar: sim });
  };

  if (type === "verb") {
    const past = toPastForm(term);
    const ing = toIngForm(term);
    add(`${term}s`, "三単現");
    add(past, "過去・過去分詞");
    add(ing, "進行形・動名詞");
    add(`${term}er`, "人・もの");
    if (canMakeAble(term)) add(`${term}able`, "可能な");
    if (canUseRePrefix(term)) add(`re${term}`, "再び行う");
  } else if (type === "noun") {
    add(term.endsWith("y") ? `${term.slice(0, -1)}ies` : `${term}s`, "複数形");
  } else if (type === "adjective") {
    if (canMakeAdverb(term)) {
      add(term.endsWith("y") ? `${term.slice(0, -1)}ily` : `${term}ly`, "副詞形");
    }
  }

  return forms;
}

function toPastForm(term) {
  if (term.endsWith("y") && !/[aeiou]y$/.test(term)) return `${term.slice(0, -1)}ied`;
  if (term.endsWith("e")) return `${term}d`;
  return `${term}ed`;
}

function toIngForm(term) {
  if (term.endsWith("ie")) return `${term.slice(0, -2)}ying`;
  if (term.endsWith("e") && !term.endsWith("ee")) return `${term.slice(0, -1)}ing`;
  return `${term}ing`;
}

function canUseRePrefix(term) {
  return [
    "assign", "attach", "calculate", "certify", "check", "confirm", "contact", "deliver", "distribute",
    "estimate", "evaluate", "examine", "install", "introduce", "inspect", "issue", "locate", "open",
    "order", "organize", "prepare", "print", "process", "publish", "schedule", "ship", "submit", "train",
    "verify", "review", "revise", "register", "design", "assemble", "book", "charge", "hire", "lease",
    "manufacture", "monitor", "operate", "provide", "recruit", "repair", "select", "supply", "transfer"
  ].includes(term);
}

function canMakeAdverb(term) {
  if (term.includes("-") || term.endsWith("ed") || term.endsWith("ing") || term.endsWith("ly")) return false;
  if (term.endsWith("y")) return false;
  if (["available", "eligible", "suitable", "daily", "weekly", "monthly", "annual", "quarterly", "overdue", "final"].includes(term)) return false;
  return true;
}

function getSimilar(term, type) {
  const map = {
    financial: "fiscal", quarterly: "periodic", annual: "yearly", revised: "updated", detailed: "thorough", accurate: "precise",
    final: "last", preliminary: "initial", projected: "estimated", approved: "accepted", estimated: "approximate",
    outstanding: "unpaid", overdue: "late", monthly: "regular", budgetary: "financial", upcoming: "forthcoming",
    scheduled: "planned", postponed: "delayed", mandatory: "required", optional: "voluntary", online: "digital",
    regional: "local", internal: "in-house", external: "outside", qualified: "eligible", experienced: "skilled",
    prospective: "potential", successful: "effective", current: "present", former: "previous", temporary: "short-term",
    permanent: "lasting", efficient: "productive", routine: "regular", urgent: "immediate", necessary: "required",
    technical: "specialized", confidential: "private", official: "formal", attached: "enclosed", completed: "finished",
    available: "accessible", limited: "restricted", convenient: "handy", renovated: "remodeled", spacious: "large",
    report: "document", budget: "estimate", invoice: "bill", payment: "remittance", expense: "cost",
    statement: "record", account: "client", forecast: "projection", audit: "inspection", meeting: "conference",
    seminar: "workshop", session: "period", appointment: "booking", event: "function", presentation: "briefing",
    candidate: "applicant", employee: "worker", manager: "supervisor", assistant: "aide", representative: "agent",
    facility: "site", equipment: "machinery", inventory: "stock", maintenance: "upkeep", inspection: "review",
    document: "file", form: "sheet", contract: "agreement", policy: "guideline", notice: "announcement"
  };
  if (map[term]) return map[term];
  return type === "noun" ? "item" : "similar";
}

function canMakeAble(term) {
  return [
    "accept", "adjust", "approve", "attach", "calculate", "certify", "complete", "confirm", "deliver",
    "demonstrate", "estimate", "evaluate", "exchange", "identify", "manage", "negotiate", "notify",
    "obtain", "operate", "organize", "process", "produce", "purchase", "recommend", "reduce", "replace",
    "reserve", "review", "schedule", "select", "submit", "verify"
  ].includes(term);
}

const idiomPatterns = [
  ["in response to", "に応じて", "We sent the brochure {term}."],
  ["on behalf of", "に代わって", "The assistant signed the document {term}."],
  ["due to", "が原因で", "The delivery was delayed {term}."],
  ["prior to", "の前に", "Please complete the form {term}."],
  ["according to", "によると", "The price changed {term}."],
  ["in accordance with", "に従って", "The staff worked {term}."],
  ["in addition to", "に加えて", "The package includes support {term}."],
  ["as a result of", "の結果として", "Sales increased {term}."],
  ["in charge of", "を担当して", "Ms. Lee is {term}."],
  ["responsible for", "に責任がある", "The supervisor is {term}."],
  ["familiar with", "に詳しい", "Applicants should be {term}."],
  ["eligible for", "を受ける資格がある", "Employees are {term}."],
  ["subject to", "の対象となる", "All prices are {term}."],
  ["available for", "に利用可能である", "The room is {term}."],
  ["suitable for", "に適している", "This software is {term}."],
  ["in preparation for", "に備えて", "The team met {term}."],
  ["in connection with", "に関連して", "We received a notice {term}."],
  ["with regard to", "に関して", "Please contact us {term}."],
  ["with respect to", "に関して", "The policy changed {term}."],
  ["in relation to", "に関連して", "The question was asked {term}."],
  ["at the request of", "の依頼で", "The report was prepared {term}."],
  ["for the purpose of", "の目的で", "The survey was conducted {term}."],
  ["in the event of", "の場合には", "Call this number {term}."],
  ["in exchange for", "と引き換えに", "Customers received a coupon {term}."],
  ["in need of", "を必要として", "The office is {term}."],
  ["in favor of", "に賛成して", "Most members voted {term}."],
  ["in place of", "の代わりに", "Use this form {term}."],
  ["in support of", "を支援して", "The company donated funds {term}."],
  ["in advance of", "に先立って", "Materials were sent {term}."],
  ["by means of", "によって", "The notice was delivered {term}."],
  ["take advantage of", "を活用する", "Customers can {term}."],
  ["make use of", "を利用する", "Staff should {term}."],
  ["keep track of", "を記録する", "The system helps employees {term}."],
  ["pay attention to", "に注意を払う", "Please {term}."],
  ["look forward to", "を楽しみにする", "We {term}."],
  ["look into", "を調査する", "The manager will {term}."],
  ["follow up on", "を追跡確認する", "Please {term}."],
  ["come up with", "を思いつく", "The team will {term}."],
  ["put off", "を延期する", "They decided to {term}."],
  ["carry out", "を実施する", "The department will {term}."],
  ["set up", "を設置する", "The technician will {term}."],
  ["fill out", "に記入する", "Applicants must {term}."],
  ["hand in", "を提出する", "Employees should {term}."],
  ["sign up for", "に申し込む", "Staff can {term}."],
  ["run out of", "を使い果たす", "The office may {term}."],
  ["deal with", "に対処する", "The team will {term}."],
  ["take over", "を引き継ぐ", "She will {term}."],
  ["work on", "に取り組む", "Engineers will {term}."],
  ["go over", "を確認する", "Let's {term}."],
  ["bring up", "を話題に出す", "He may {term}."]
];

const idiomObjects = [
  ["the request", "依頼"], ["the inquiry", "問い合わせ"], ["the order", "注文"], ["the schedule", "予定"],
  ["the policy", "方針"], ["the contract", "契約"], ["the invoice", "請求書"], ["the proposal", "提案"],
  ["the budget", "予算"], ["the meeting", "会議"], ["the report", "報告書"], ["the project", "プロジェクト"],
  ["the shipment", "出荷"], ["the delivery", "配送"], ["the reservation", "予約"], ["the application", "申請"],
  ["the inspection", "検査"], ["the training", "研修"], ["the seminar", "セミナー"], ["the conference", "会議"],
  ["the client", "顧客"], ["the supplier", "供給業者"], ["the department", "部門"], ["the branch", "支店"],
  ["the facility", "施設"], ["the equipment", "機器"], ["the inventory", "在庫"], ["the maintenance", "保守"],
  ["the deadline", "締め切り"], ["the announcement", "告知"]
];

function makeIdioms() {
  const entries = [];
  idiomPatterns.forEach(([pattern, patternJa, template]) => {
    getIdiomObjects(pattern).forEach(([object, objectJa]) => {
      const term = `${pattern} ${object}`;
      entries.push({
        id: `idiom-${String(entries.length + 1).padStart(4, "0")}`,
        base: pattern,
        term,
        meaning: `${objectJa}${patternJa}`,
        note: `${term} は、TOEICのメール・通知・会議文脈で出やすい表現です。`,
        examples: [
          template.replace("{term}", term),
          `You may see "${term}" in a business e-mail.`,
          `The phrase "${term}" is useful in formal office communication.`
        ]
      });
    });
  });
  return interleaveByFirstWords(entries, 3);
}

function getIdiomObjects(pattern) {
  const generalTopics = [
    ["the request", "依頼"], ["the inquiry", "問い合わせ"], ["the order", "注文"], ["the schedule", "予定"],
    ["the policy", "方針"], ["the contract", "契約"], ["the invoice", "請求書"], ["the proposal", "提案"],
    ["the budget", "予算"], ["the meeting", "会議"], ["the report", "報告書"], ["the project", "プロジェクト"],
    ["the shipment", "出荷"], ["the delivery", "配送"], ["the reservation", "予約"], ["the application", "申請"],
    ["the inspection", "検査"], ["the training", "研修"], ["the seminar", "セミナー"], ["the conference", "会議"],
    ["the client", "顧客"], ["the supplier", "供給業者"], ["the department", "部門"], ["the branch", "支店"],
    ["the facility", "施設"], ["the equipment", "機器"], ["the inventory", "在庫"], ["the maintenance", "保守"],
    ["the deadline", "締め切り"], ["the announcement", "告知"]
  ];
  const people = [
    ["the client", "顧客"], ["the customer", "顧客"], ["the manager", "管理者"], ["the supervisor", "監督者"],
    ["the director", "部長"], ["the supplier", "供給業者"], ["the vendor", "販売業者"], ["the applicant", "応募者"],
    ["the accounting department", "経理部"], ["the sales team", "営業チーム"], ["the board", "役員会"], ["the owner", "所有者"],
    ["the organizer", "主催者"], ["the tenant", "テナント"], ["the receptionist", "受付係"], ["the trainer", "研修担当者"],
    ["the consultant", "コンサルタント"], ["the technician", "技術者"], ["the representative", "担当者"], ["the coordinator", "調整担当者"],
    ["the assistant", "アシスタント"], ["the sponsor", "スポンサー"], ["the auditor", "監査人"], ["the editor", "編集者"],
    ["the instructor", "講師"], ["the participant", "参加者"], ["the distributor", "販売代理店"], ["the agent", "代理人"],
    ["the committee", "委員会"], ["the hotel manager", "ホテル支配人"]
  ];
  const causes = [
    ["bad weather", "悪天候"], ["a system error", "システムエラー"], ["maintenance work", "保守作業"], ["a shipping delay", "配送遅延"],
    ["a scheduling conflict", "予定の重複"], ["high demand", "高い需要"], ["low enrollment", "申込者不足"], ["a power outage", "停電"],
    ["traffic congestion", "交通渋滞"], ["budget cuts", "予算削減"], ["staff shortages", "人員不足"], ["renovation work", "改装工事"],
    ["equipment failure", "機器故障"], ["a printing error", "印刷ミス"], ["a supplier issue", "供給業者の問題"], ["security concerns", "安全上の懸念"],
    ["technical problems", "技術的問題"], ["unexpected demand", "予想外の需要"], ["late payment", "支払い遅延"], ["inventory shortages", "在庫不足"],
    ["building repairs", "建物修理"], ["flight cancellations", "欠航"], ["holiday closures", "祝日の休業"], ["software updates", "ソフトウェア更新"],
    ["a venue change", "会場変更"], ["a client request", "顧客の依頼"], ["a policy revision", "方針改定"], ["additional testing", "追加試験"],
    ["production delays", "生産遅延"], ["a safety inspection", "安全検査"]
  ];
  const supplies = [
    ["printer paper", "印刷用紙"], ["office supplies", "事務用品"], ["blank forms", "未記入用紙"], ["brochures", "パンフレット"],
    ["shipping labels", "配送ラベル"], ["envelopes", "封筒"], ["toner cartridges", "トナーカートリッジ"], ["name tags", "名札"],
    ["training manuals", "研修マニュアル"], ["product samples", "製品サンプル"], ["business cards", "名刺"], ["packing materials", "梱包材"],
    ["receipt paper", "レシート用紙"], ["replacement parts", "交換部品"], ["refreshments", "軽食"], ["parking spaces", "駐車スペース"],
    ["meeting rooms", "会議室"], ["storage space", "保管場所"], ["funds", "資金"], ["time", "時間"],
    ["inventory", "在庫"], ["application forms", "申請書"], ["catalogs", "カタログ"], ["spare batteries", "予備電池"],
    ["safety equipment", "安全装備"], ["order forms", "注文書"], ["cleaning supplies", "清掃用品"], ["display shelves", "展示棚"],
    ["laptop chargers", "充電器"], ["visitor passes", "来客証"]
  ];
  const tasks = [
    ["the meeting", "会議"], ["the appointment", "予約"], ["the seminar", "セミナー"], ["the workshop", "研修会"],
    ["the inspection", "検査"], ["the presentation", "発表"], ["the interview", "面接"], ["the delivery", "配送"],
    ["the product launch", "製品発表"], ["the training session", "研修"], ["the conference", "会議"], ["the reception", "受付会"],
    ["the maintenance work", "保守作業"], ["the deadline", "締め切り"], ["the site visit", "現地訪問"], ["the client call", "顧客電話"],
    ["the budget review", "予算確認"], ["the hiring process", "採用手続き"], ["the order", "注文"], ["the shipment", "出荷"],
    ["the survey", "調査"], ["the audit", "監査"], ["the campaign", "キャンペーン"], ["the reservation", "予約"],
    ["the repair", "修理"], ["the upgrade", "更新"], ["the registration", "登録"], ["the payment", "支払い"],
    ["the announcement", "告知"], ["the facility tour", "施設見学"]
  ];

  if (pattern === "on behalf of" || pattern === "at the request of") return people;
  if (pattern === "in response to") return [["the inquiry", "問い合わせ"], ["the request", "依頼"], ["the complaint", "苦情"], ["the survey", "調査"], ["the application", "申請"], ["the order", "注文"], ["the proposal", "提案"], ["the invitation", "招待"], ["the announcement", "告知"], ["the notice", "通知"], ["the customer's email", "顧客のメール"], ["the client's question", "顧客の質問"], ["the supplier's request", "供給業者の依頼"], ["the job posting", "求人"], ["the feedback", "意見"], ["the inspection result", "検査結果"], ["the audit report", "監査報告"], ["the registration form", "登録用紙"], ["the reservation request", "予約依頼"], ["the payment notice", "支払い通知"], ["the shipping delay", "配送遅延"], ["the product review", "製品レビュー"], ["the service complaint", "サービス苦情"], ["the meeting invitation", "会議招待"], ["the warranty claim", "保証請求"], ["the estimate request", "見積依頼"], ["the brochure request", "パンフレット依頼"], ["the interview invitation", "面接案内"], ["the cancellation notice", "キャンセル通知"], ["the customer survey", "顧客調査"]];
  if (pattern === "due to" || pattern === "as a result of") return causes;
  if (pattern === "subject to") return [["change", "変更"], ["approval", "承認"], ["availability", "空き状況"], ["tax", "税"], ["a service fee", "サービス料"], ["inspection", "検査"], ["cancellation", "キャンセル"], ["review", "確認"], ["confirmation", "確認"], ["local regulations", "地域規則"], ["company policy", "会社方針"], ["additional charges", "追加料金"], ["weather conditions", "天候条件"], ["inventory levels", "在庫状況"], ["security checks", "安全確認"], ["management approval", "管理者承認"], ["annual renewal", "年次更新"], ["contract terms", "契約条件"], ["schedule changes", "予定変更"], ["budget approval", "予算承認"], ["quality standards", "品質基準"], ["safety rules", "安全規則"], ["shipping restrictions", "配送制限"], ["customs inspection", "税関検査"], ["technical review", "技術確認"], ["final approval", "最終承認"], ["price changes", "価格変更"], ["room availability", "部屋の空き"], ["maintenance schedules", "保守予定"], ["payment confirmation", "支払い確認"]];
  if (pattern === "run out of") return supplies;
  if (["put off", "carry out", "follow up on", "go over", "bring up"].includes(pattern)) return tasks;
  if (pattern === "work on") return [["the project", "プロジェクト"], ["the report", "報告書"], ["the proposal", "提案書"], ["the update", "更新"], ["the budget", "予算"], ["the schedule", "予定"], ["the presentation", "発表"], ["the campaign", "キャンペーン"], ["the design", "設計"], ["the contract", "契約書"], ["the manual", "マニュアル"], ["the application", "申請書"], ["the training program", "研修プログラム"], ["the sales plan", "販売計画"], ["the website", "ウェブサイト"], ["the brochure", "パンフレット"], ["the inventory system", "在庫システム"], ["the software update", "ソフトウェア更新"], ["the customer survey", "顧客調査"], ["the annual report", "年次報告"], ["the hiring plan", "採用計画"], ["the office layout", "事務所レイアウト"], ["the safety policy", "安全方針"], ["the product launch", "製品発表"], ["the ordering process", "注文手続き"], ["the service improvement", "サービス改善"], ["the cost estimate", "費用見積もり"], ["the market analysis", "市場分析"], ["the travel arrangements", "出張手配"], ["the quality review", "品質確認"]];
  if (pattern === "come up with") return [["a new idea", "新しい案"], ["a solution", "解決策"], ["a plan", "計画"], ["a proposal", "提案"], ["a strategy", "戦略"], ["a design", "設計"], ["a slogan", "標語"], ["a schedule", "予定"], ["a budget plan", "予算案"], ["a marketing idea", "販促案"], ["an alternative", "代替案"], ["a better method", "よりよい方法"], ["a new feature", "新機能"], ["a cost-saving plan", "費用削減案"], ["a training plan", "研修計画"], ["a campaign idea", "キャンペーン案"], ["a product name", "製品名"], ["a solution to the problem", "問題の解決策"], ["a revised proposal", "改訂案"], ["a delivery plan", "配送計画"], ["a staffing plan", "人員計画"], ["an improvement plan", "改善案"], ["a backup plan", "代替計画"], ["a customer survey", "顧客調査"], ["a presentation topic", "発表テーマ"], ["a list of questions", "質問リスト"], ["a new menu", "新メニュー"], ["a sales target", "販売目標"], ["a meeting agenda", "会議議題"], ["a repair schedule", "修理予定"]];
  if (pattern === "make use of" || pattern === "take advantage of") return [["the software", "ソフトウェア"], ["the equipment", "機器"], ["the data", "データ"], ["the resources", "資源"], ["the training materials", "研修資料"], ["the online system", "オンラインシステム"], ["the discount", "割引"], ["the offer", "提案"], ["the conference room", "会議室"], ["the company website", "会社ウェブサイト"], ["the customer database", "顧客データベース"], ["the delivery service", "配送サービス"], ["the new feature", "新機能"], ["the mobile app", "モバイルアプリ"], ["the support desk", "サポート窓口"], ["the free trial", "無料試用"], ["the membership program", "会員制度"], ["the warehouse space", "倉庫スペース"], ["the product samples", "製品サンプル"], ["the revised manual", "改訂マニュアル"], ["the meeting room", "会議室"], ["the reservation system", "予約システム"], ["the sales data", "販売データ"], ["the accounting software", "会計ソフト"], ["the training portal", "研修ポータル"], ["the marketing budget", "販促予算"], ["the branch network", "支店網"], ["the online catalog", "オンラインカタログ"], ["the automated system", "自動システム"], ["the feedback form", "意見フォーム"]];
  if (pattern === "pay attention to") return [["the instructions", "指示"], ["the details", "詳細"], ["the deadline", "締め切り"], ["the schedule", "予定"], ["the safety rules", "安全規則"], ["the warning signs", "警告表示"], ["the client's request", "顧客の依頼"], ["the invoice number", "請求書番号"], ["the delivery date", "配送日"], ["the meeting agenda", "会議議題"], ["the application deadline", "申込期限"], ["the payment terms", "支払い条件"], ["the product label", "製品ラベル"], ["the room number", "部屋番号"], ["the reservation details", "予約詳細"], ["the attached file", "添付ファイル"], ["the revised policy", "改訂方針"], ["the parking instructions", "駐車案内"], ["the maintenance notice", "保守通知"], ["the security procedure", "安全手順"], ["the customer feedback", "顧客意見"], ["the order quantity", "注文数量"], ["the return policy", "返品方針"], ["the training schedule", "研修予定"], ["the shipping address", "配送先住所"], ["the warranty period", "保証期間"], ["the budget limit", "予算上限"], ["the entry requirements", "応募要件"], ["the inspection results", "検査結果"], ["the contact information", "連絡先情報"]];
  if (pattern === "by means of") return [["email", "メール"], ["an online form", "オンラインフォーム"], ["bank transfer", "銀行振込"], ["courier service", "宅配便"], ["a mobile app", "モバイルアプリ"], ["video conference", "ビデオ会議"], ["a secure website", "安全なウェブサイト"], ["an automated system", "自動システム"], ["a printed notice", "印刷通知"], ["a confirmation code", "確認コード"], ["a membership card", "会員カード"], ["a barcode scanner", "バーコード読取機"], ["a delivery service", "配送サービス"], ["a company portal", "社内ポータル"], ["a customer survey", "顧客調査"], ["a payment link", "支払いリンク"], ["a reservation system", "予約システム"], ["a phone call", "電話"], ["a written request", "書面依頼"], ["a tracking number", "追跡番号"], ["a digital signature", "電子署名"], ["a purchase order", "発注書"], ["a training video", "研修動画"], ["a feedback form", "意見フォーム"], ["a security pass", "入館証"], ["a shipping label", "配送ラベル"], ["a check-in kiosk", "チェックイン端末"], ["an electronic invoice", "電子請求書"], ["a shared calendar", "共有カレンダー"], ["a text message", "テキストメッセージ"]];
  if (pattern === "take over") return [["the project", "プロジェクト"], ["the account", "取引先"], ["the department", "部門"], ["the role", "役割"], ["the position", "職位"], ["the assignment", "任務"], ["the client account", "顧客口座"], ["the sales territory", "営業地域"], ["the training program", "研修プログラム"], ["the budget review", "予算確認"], ["the inventory system", "在庫システム"], ["the customer service desk", "顧客対応窓口"], ["the marketing campaign", "販促活動"], ["the hiring process", "採用手続き"], ["the maintenance schedule", "保守予定"], ["the ordering system", "注文システム"], ["the reception desk", "受付"], ["the branch office", "支店"], ["the supplier contract", "供給契約"], ["the event planning", "イベント企画"], ["the payment process", "支払い手続き"], ["the quality inspection", "品質検査"], ["the software update", "ソフトウェア更新"], ["the delivery route", "配送経路"], ["the reservation desk", "予約窓口"], ["the monthly report", "月次報告"], ["the safety training", "安全研修"], ["the vendor relationship", "業者関係"], ["the office relocation", "事務所移転"], ["the product launch", "製品発表"]];
  if (["set up"].includes(pattern)) return [["the equipment", "機器"], ["the account", "アカウント"], ["the display", "展示"], ["the booth", "ブース"], ["the projector", "プロジェクター"], ["the registration desk", "受付机"], ["the meeting room", "会議室"], ["the online profile", "オンラインプロフィール"], ["the payment system", "支払いシステム"], ["the delivery schedule", "配送予定"], ["the training area", "研修場所"], ["the software", "ソフトウェア"], ["the conference table", "会議テーブル"], ["the customer account", "顧客アカウント"], ["the sound system", "音響システム"], ["the product display", "製品展示"], ["the reservation page", "予約ページ"], ["the printer", "プリンター"], ["the network", "ネットワーク"], ["the work station", "作業台"], ["the booth sign", "ブース看板"], ["the survey form", "調査票"], ["the security camera", "防犯カメラ"], ["the visitor area", "来客エリア"], ["the ordering system", "注文システム"], ["the sample table", "サンプル台"], ["the check-in counter", "チェックインカウンター"], ["the training portal", "研修ポータル"], ["the inventory system", "在庫システム"], ["the help desk", "ヘルプデスク"]];
  if (["fill out", "hand in"].includes(pattern)) return [["the form", "用紙"], ["the application", "申請書"], ["the survey", "調査票"], ["the questionnaire", "アンケート"], ["the expense report", "経費報告書"], ["the registration form", "登録用紙"], ["the order form", "注文書"], ["the attendance sheet", "出席表"], ["the request form", "依頼書"], ["the evaluation form", "評価票"], ["the reimbursement form", "精算書"], ["the application form", "申込書"], ["the tax document", "税務書類"], ["the consent form", "同意書"], ["the feedback form", "意見用紙"], ["the checklist", "チェックリスト"], ["the inspection sheet", "検査票"], ["the delivery form", "配送用紙"], ["the sign-in sheet", "署名表"], ["the claim form", "請求用紙"], ["the warranty card", "保証書"], ["the contact form", "連絡用紙"], ["the entry form", "応募用紙"], ["the visitor pass", "来客証"], ["the time sheet", "勤務表"], ["the contract", "契約書"], ["the agreement", "合意書"], ["the report", "報告書"], ["the invoice", "請求書"], ["the notice", "通知"]];
  if (pattern === "eligible for") return [["a discount", "割引"], ["a refund", "返金"], ["a promotion", "昇進"], ["a bonus", "賞与"], ["membership", "会員資格"], ["training", "研修"], ["reimbursement", "払い戻し"], ["free shipping", "無料配送"], ["an upgrade", "アップグレード"], ["a replacement", "交換"], ["a warranty", "保証"], ["the position", "職位"], ["the program", "プログラム"], ["the benefit", "福利厚生"], ["the award", "賞"], ["the trial period", "試用期間"], ["paid leave", "有給休暇"], ["medical coverage", "医療保険"], ["the scholarship", "奨学金"], ["the service plan", "サービスプラン"], ["the loyalty program", "会員制度"], ["the commuter pass", "通勤定期"], ["the employee rate", "社員料金"], ["the early-bird price", "早割料金"], ["the annual bonus", "年次賞与"], ["the sales incentive", "販売奨励金"], ["the referral reward", "紹介報酬"], ["the relocation allowance", "転居手当"], ["the training grant", "研修補助"], ["the repair service", "修理サービス"]];
  if (pattern === "available for") return [["the meeting", "会議"], ["the seminar", "セミナー"], ["the workshop", "研修会"], ["the event", "イベント"], ["the presentation", "発表"], ["the interview", "面接"], ["the training session", "研修"], ["the site visit", "現地訪問"], ["the conference", "会議"], ["the reception", "受付会"], ["the reservation", "予約"], ["the appointment", "予約"], ["the product launch", "製品発表"], ["the tour", "見学"], ["the inspection", "検査"], ["the audit", "監査"], ["the webinar", "ウェビナー"], ["the consultation", "相談"], ["the demonstration", "実演"], ["the orientation", "説明会"], ["the repair", "修理"], ["the upgrade", "更新"], ["the delivery", "配送"], ["the installation", "設置"], ["the rehearsal", "リハーサル"], ["the client call", "顧客電話"], ["the budget review", "予算確認"], ["the performance review", "人事評価"], ["the team lunch", "昼食会"], ["the training program", "研修プログラム"]];
  if (pattern === "suitable for") return [["the meeting", "会議"], ["the seminar", "セミナー"], ["the workshop", "研修会"], ["the presentation", "発表"], ["the training session", "研修"], ["the conference", "会議"], ["the reception", "受付会"], ["the interview", "面接"], ["the online course", "オンライン講座"], ["the product display", "製品展示"], ["the office", "事務所"], ["the lobby", "ロビー"], ["the warehouse", "倉庫"], ["the restaurant", "レストラン"], ["the hotel", "ホテル"], ["the software", "ソフトウェア"], ["the device", "機器"], ["the brochure", "パンフレット"], ["the package", "パッケージ"], ["the service", "サービス"], ["the training program", "研修プログラム"], ["the beginner level", "初級"], ["the sales team", "営業チーム"], ["the accounting department", "経理部"], ["the maintenance staff", "保守担当者"], ["the customer survey", "顧客調査"], ["the annual event", "年次イベント"], ["the facility tour", "施設見学"], ["the product launch", "製品発表"], ["the safety inspection", "安全検査"]];
  if (["in the event of"].includes(pattern)) return [["an emergency", "緊急事態"], ["a cancellation", "キャンセル"], ["a delay", "遅延"], ["a power outage", "停電"], ["bad weather", "悪天候"], ["a fire drill", "消防訓練"], ["a system failure", "システム障害"], ["a building closure", "建物閉鎖"], ["a flight delay", "航空便遅延"], ["a payment issue", "支払い問題"], ["a security alert", "警報"], ["a delivery problem", "配送問題"], ["a schedule change", "予定変更"], ["a shortage", "不足"], ["an accident", "事故"], ["a complaint", "苦情"], ["a technical issue", "技術的問題"], ["a missing document", "書類不足"], ["a late arrival", "遅着"], ["a venue change", "会場変更"], ["a product defect", "製品不良"], ["a staffing issue", "人員問題"], ["a software error", "ソフトウェアエラー"], ["a network problem", "ネットワーク問題"], ["a weather warning", "気象警報"], ["a maintenance delay", "保守遅延"], ["a lost package", "紛失荷物"], ["an overbooking", "過剰予約"], ["a damaged item", "破損品"], ["a safety concern", "安全上の懸念"]];
  return generalTopics;
}

function interleaveByFirstWord(entries) {
  return interleaveByFirstWords(entries, 1);
}

function interleaveByFirstWords(entries, wordCount) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = entry.term.split(" ").slice(0, wordCount).join(" ");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  });

  const orderedGroups = [...groups.values()];
  const result = [];
  let index = 0;
  while (result.length < entries.length) {
    orderedGroups.forEach((group) => {
      if (group[index]) result.push(group[index]);
    });
    index += 1;
  }
  return deterministicShuffle(result);
}

function deterministicShuffle(items) {
  const copied = [...items];
  let seed = 20260628;
  for (let i = copied.length - 1; i > 0; i -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

const grammarPatterns = [
  {
    label: "Part 5 品詞",
    make: (i) => ({
      text: `The ------- of the new system will begin on ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i % 5]}.`,
      choices: ["install", "installing", "installation", "installed"],
      answer: 2,
      explanation: "installation が正解です。The と of の間には名詞が必要です。"
    })
  },
  {
    label: "Part 5 前置詞",
    make: (i) => ({
      text: `Please submit the ${["report", "form", "invoice", "proposal", "application"][i % 5]} ------- Friday afternoon.`,
      choices: ["within", "by", "during", "along"],
      answer: 1,
      explanation: "by が正解です。期限を表すときは by を使います。"
    })
  },
  {
    label: "Part 5 比較",
    make: (i) => ({
      text: `This year's ${["conference", "seminar", "workshop", "campaign", "event"][i % 5]} attracted ------- attendees than last year's.`,
      choices: ["many", "more", "most", "much"],
      answer: 1,
      explanation: "more が正解です。than があるため比較級が必要です。"
    })
  },
  {
    label: "Part 5 受動態",
    make: (i) => ({
      text: `The ${["invoices", "documents", "packages", "tickets", "forms"][i % 5]} ------- to the accounting department yesterday.`,
      choices: ["sent", "were sent", "sending", "send"],
      answer: 1,
      explanation: "were sent が正解です。主語が送られる側なので受動態を使います。"
    })
  },
  {
    label: "Part 5 副詞",
    make: (i) => ({
      text: `The manager asked the staff to review the ${["contract", "manual", "schedule", "budget", "report"][i % 5]} -------.`,
      choices: ["care", "careful", "carefully", "caring"],
      answer: 2,
      explanation: "carefully が正解です。動詞 review を修飾する副詞が必要です。"
    })
  },
  {
    label: "Part 5 関係詞",
    make: (i) => ({
      text: `The company hired a ${["consultant", "designer", "trainer", "manager", "engineer"][i % 5]} ------- specializes in employee training.`,
      choices: ["who", "what", "whose", "where"],
      answer: 0,
      explanation: "who が正解です。人を受ける主格の関係代名詞です。"
    })
  },
  {
    label: "Part 5 時制",
    make: (i) => ({
      text: `The ${["marketing", "sales", "finance", "planning", "support"][i % 5]} team ------- the results at tomorrow's meeting.`,
      choices: ["presented", "will present", "has presented", "presenting"],
      answer: 1,
      explanation: "will present が正解です。tomorrow's meeting が未来を示しています。"
    })
  },
  {
    label: "Part 5 接続詞",
    make: (i) => ({
      text: `The ${["seminar", "tour", "meeting", "training session", "reception"][i % 5]} was canceled ------- fewer than ten people registered.`,
      choices: ["because", "although", "unless", "despite"],
      answer: 0,
      explanation: "because が正解です。理由を表す節を導きます。"
    })
  },
  {
    label: "Part 5 語法",
    make: (i) => ({
      text: `Ms. ${["Tanaka", "Lee", "Garcia", "Patel", "Smith"][i % 5]} has been ------- for the overseas sales team since April.`,
      choices: ["responsible", "responsibly", "responsibility", "respond"],
      answer: 0,
      explanation: "responsible が正解です。be responsible for で「担当している」という意味です。"
    })
  },
  {
    label: "Part 5 接続副詞",
    make: (i) => ({
      text: `The ${["product", "service", "plan", "device", "software"][i % 5]} is affordable; -------, it comes with a two-year warranty.`,
      choices: ["however", "moreover", "otherwise", "instead"],
      answer: 1,
      explanation: "moreover が正解です。追加情報を表す接続副詞です。"
    })
  }
];

function makeGrammar() {
  const contexts = [
    "at the main office",
    "for the regional branch",
    "during the morning session",
    "before the client visit",
    "after the budget review",
    "for the product launch",
    "during the training period",
    "before the deadline",
    "at the downtown facility",
    "for the annual event"
  ];
  const grammar = [];
  for (let i = 0; i < 100; i += 1) {
    const pattern = grammarPatterns[i % grammarPatterns.length];
    const variant = Math.floor(i / grammarPatterns.length);
    const question = pattern.make(variant);
    question.text = question.text.replace(/\.$/, ` ${contexts[variant]}.`);
    grammar.push({
      id: `grammar-${String(i + 1).padStart(4, "0")}`,
      label: pattern.label,
      ...question
    });
  }
  return grammar;
}

function makeSynonyms(vocabulary) {
  const banned = new Set(["item", "similar", "related"]);
  const fallbackChoices = {
    adjective: ["efficient", "reliable", "available", "mandatory", "accurate", "annual", "temporary", "qualified", "urgent", "initial", "fiscal", "periodic", "private", "updated", "thorough", "precise", "yearly", "late", "restricted", "accessible"],
    adverb: ["quickly", "promptly", "carefully", "accurately", "regularly", "annually", "periodically", "officially", "directly", "properly", "efficiently", "privately", "briefly", "currently", "recently", "immediately", "approximately", "specifically", "separately", "securely"],
    verb: ["approve", "confirm", "notify", "purchase", "submit", "review", "update", "estimate", "assist", "schedule", "organize", "verify", "inspect", "deliver", "prepare", "respond", "reserve", "install", "improve", "select"],
    noun: ["document", "invoice", "contract", "proposal", "budget", "facility", "equipment", "inventory", "customer", "supplier", "report", "meeting", "candidate", "employee", "shipment", "payment", "policy", "notice", "application", "reservation"]
  };
  const terms = interleaveByRoot(vocabulary).slice(0, 1500);
  return terms.map((item, index) => {
    const answer = item.similar && item.similar !== item.term && !banned.has(item.similar)
      ? item.similar
      : getFallbackSynonym(item.term);
    const samePosTerms = terms.filter((entry) => entry.pos === item.pos);
    const candidates = unique([
      ...samePosTerms
        .map((entry) => (entry.similar && entry.similar !== entry.term ? entry.similar : "related"))
        .filter((similar) => similar !== answer && !banned.has(similar)),
      ...(fallbackChoices[item.pos] || fallbackChoices.noun).filter((choice) => choice !== answer && choice !== item.term)
    ]);
    const distractors = deterministicShuffle(candidates).slice(0, 3);
    return {
      id: `synonym-${String(index + 1).padStart(4, "0")}`,
      term: item.term,
      root: item.root || item.term,
      answer,
      choices: deterministicShuffle([answer, ...distractors]),
      note: `${item.term} はTOEICの文脈で ${answer} と近い意味で使われます。`,
      examples: [
        `The word "${item.term}" is similar in meaning to "${answer}".`,
        `In a business e-mail, "${item.term}" may be replaced by "${answer}" in some contexts.`,
        `Understanding "${item.term}" and "${answer}" helps you read TOEIC passages faster.`
      ]
    };
  });
}

function interleaveByRoot(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = entry.root || entry.term;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  });

  const result = [];
  const grouped = deterministicShuffle([...groups.values()]);
  let index = 0;
  while (result.length < entries.length) {
    grouped.forEach((group) => {
      if (group[index]) result.push(group[index]);
    });
    index += 1;
  }
  return result;
}

function unique(items) {
  return [...new Set(items)];
}

function getFallbackSynonym(term) {
  if (term.endsWith("s")) return "plural";
  if (term.endsWith("ed")) return "completed";
  if (term.endsWith("ing")) return "ongoing";
  return "business";
}

const vocabulary = makeVocabulary();
const data = {
  vocabulary,
  idioms: makeIdioms(),
  synonyms: makeSynonyms(vocabulary),
  grammar: makeGrammar()
};

const output = `window.TOEIC_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "..", "data.js"), output, "utf8");

console.log(JSON.stringify({
  vocabulary: data.vocabulary.length,
  idioms: data.idioms.length,
  synonyms: data.synonyms.length,
  grammar: data.grammar.length,
  uniqueVocabulary: new Set(data.vocabulary.map((item) => item.term)).size,
  uniqueIdioms: new Set(data.idioms.map((item) => item.term)).size,
  uniqueSynonyms: new Set(data.synonyms.map((item) => item.term)).size,
  uniqueGrammar: new Set(data.grammar.map((item) => item.text)).size
}, null, 2));
