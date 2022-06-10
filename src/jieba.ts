interface Word {
  word: string
  offset: number
  unicodeOffset: number
}

interface Keyword {
  word: string
  offsets: number
  weight: number
}

interface Jieba {
  cut(sentence: string, useHMM?: boolean): string[]
  cutAll(sentence: string): string[]
  cutForSearch(sentence: string, useHMM?: boolean): string[]
  cutForSearchWithOffset(sentence: string, useHMM?: boolean): Word[]
  insertUserWord(word: string): void
  tag(sentence: string): string[]
  extract(sentence: string, topk: number): Keyword[]
  lookupTag(sentence: string): string
}

declare function createJieba(
  JiebaDict?: Buffer,
  HMMModel?: Buffer,
  UserDict?: Buffer,
  IDF?: Buffer,
  StopWords?: Buffer,
): Jieba

export { createJieba, Jieba }
export default createJieba