const fs = require("fs");
const path = require("path");
const vm = require("vm");

const code = fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const data = sandbox.window.TOEIC_DATA;

function countUnique(items, key) {
  return new Set(items.map((item) => item[key])).size;
}

const result = {
  vocabulary: data.vocabulary.length,
  idioms: data.idioms.length,
  synonyms: data.synonyms.length,
  grammar: data.grammar.length,
  uniqueVocabulary: countUnique(data.vocabulary, "term"),
  uniqueIdioms: countUnique(data.idioms, "term"),
  uniqueSynonyms: countUnique(data.synonyms, "term"),
  uniqueGrammar: countUnique(data.grammar, "text"),
  vocabularyWithThreeExamples: data.vocabulary.filter((item) => item.examples.length >= 3).length,
  idiomsWithThreeExamples: data.idioms.filter((item) => item.examples.length >= 3).length,
  synonymAdjacentSameRoot: countAdjacentSameRoot(data.synonyms),
  synonymDuplicateChoices: data.synonyms.filter((item) => new Set(item.choices).size !== item.choices.length).length,
  synonymBannedChoices: data.synonyms.filter((item) =>
    item.choices.some((choice) => ["item", "similar", "related"].includes(choice))
  ).length
};

console.log(JSON.stringify(result, null, 2));

const expected = {
  vocabulary: 1500,
  idioms: 1500,
  synonyms: 1500,
  grammar: 100,
  uniqueVocabulary: 1500,
  uniqueIdioms: 1500,
  uniqueSynonyms: 1500,
  uniqueGrammar: 100,
  vocabularyWithThreeExamples: 1500,
  idiomsWithThreeExamples: 1500,
  synonymAdjacentSameRoot: 0,
  synonymDuplicateChoices: 0,
  synonymBannedChoices: 0
};

for (const [key, value] of Object.entries(expected)) {
  if (result[key] !== value) {
    throw new Error(`${key} expected ${value}, got ${result[key]}`);
  }
}

function countAdjacentSameRoot(items) {
  let count = 0;
  for (let index = 1; index < items.length; index += 1) {
    const previous = items[index - 1].root || items[index - 1].term;
    const current = items[index].root || items[index].term;
    if (previous === current) count += 1;
  }
  return count;
}
