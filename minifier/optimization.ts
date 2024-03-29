/**
 * Optimization for minifier
 * as /[^\]\[,.+-><]/g
 */
const exprWords = ["+", "-", "<", ">", "[", "]", ".", ","] as const;
type exceptionWord = string;

export type beforeOptSource = ((typeof exprWords)[number] | exceptionWord)[];
export type afterOptSource = (typeof exprWords)[number][];

export function Optimization(source: beforeOptSource): afterOptSource {
  const sourceLength = source.length;

  for (let i = 0; i < sourceLength; i++) {
    const word = source[i];
    if (!isExprWord(word)) {
      source[i] = "";
    }
  }

  return source.join("").split("") as unknown as afterOptSource;
}

function isExprWord(word: beforeOptSource[number]) {
  // @ts-expect-error: < word may be a string >
  return exprWords.includes(word);
}
