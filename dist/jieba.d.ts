/// <reference types="node" />
interface Word {
    word: string;
    offset: number;
    unicodeOffset: number;
}
interface Keyword {
    word: string;
    offsets: number;
    weight: number;
}
interface Jieba {
    cut: (sentence: string, useHMM?: boolean) => string[];
    cutAll: (sentence: string) => string[];
    cutForSearch: (sentence: string, useHMM?: boolean) => string[];
    cutForSearchWithOffset: (sentence: string, useHMM?: boolean) => Word[];
    insertUserWord: (word: string) => void;
    tag: (sentence: string) => string[];
    extract: (sentence: string, topk: number) => Keyword[];
    lookupTag: (sentence: string) => string;
}
declare function createJieba(JiebaDict?: Buffer | Uint8Array, HMMModel?: Buffer | Uint8Array, UserDict?: Buffer | Uint8Array, IDF?: Buffer | Uint8Array, StopWords?: Buffer | Uint8Array): Jieba;
export { createJieba, Jieba };
export default createJieba;
