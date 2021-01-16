#include "cppjieba/Jieba.hpp"
#include <cstring>
#include <emscripten.h>

using namespace std;

const char *const DICT_PATH = "/jieba.dict.utf8";
const char *const HMM_PATH = "/hmm_model.utf8";
const char *const USER_DICT_PATH = "/user.dict.utf8";
const char *const IDF_PATH = "/idf.utf8";
const char *const STOP_WORD_PATH = "/stop_words.utf8";

auto jieba = cppjieba::Jieba(DICT_PATH,
                             HMM_PATH,
                             USER_DICT_PATH,
                             IDF_PATH,
                             STOP_WORD_PATH);

extern "C"
{
  extern void array_push_size(size_t v);
  extern void result_push_keyword(const char *word, double weight);
  extern void result_push_word(const char *word);
  extern void result_push_word_offset(const char *word, uint32_t offset, uint32_t unicode_offset);
  extern void result_push_tag(const char *word, const char *tag);
  EMSCRIPTEN_KEEPALIVE
  int Cut(const char *sentence, bool useHMM)
  {
    cppjieba::Jieba *x = (cppjieba::Jieba *)(&jieba);
    vector<string> words;
    size_t len = strlen(sentence);
    string s(sentence, len);
    x->Cut(s, words, useHMM);
    for (vector<string>::iterator it = words.begin(); it != words.end(); it++)
    {
      result_push_word(it->c_str());
    }
    return 0;
  }

  EMSCRIPTEN_KEEPALIVE
  int CutAll(const char *sentence)
  {
    cppjieba::Jieba *x = (cppjieba::Jieba *)(&jieba);
    vector<string> words;
    size_t len = strlen(sentence);
    string s(sentence, len);
    x->CutAll(s, words);
    for (vector<string>::iterator it = words.begin(); it != words.end(); it++)
    {
      result_push_word(it->c_str());
    }
    return 0;
  }

  EMSCRIPTEN_KEEPALIVE
  int CutForSearch(const char *sentence, bool useHMM)
  {
    cppjieba::Jieba *x = (cppjieba::Jieba *)(&jieba);
    vector<string> words;
    size_t len = strlen(sentence);
    string s(sentence, len);
    x->CutForSearch(s, words, useHMM);
    for (vector<string>::iterator it = words.begin(); it != words.end(); it++)
    {
      result_push_word(it->c_str());
    }
    return 0;
  }

  EMSCRIPTEN_KEEPALIVE
  int CutForSearchWithOffset(const char *sentence, bool useHMM)
  {
    cppjieba::Jieba *x = (cppjieba::Jieba *)(&jieba);
    vector<cppjieba::Word> jiebawords;
    size_t len = strlen(sentence);
    string s(sentence, len);
    x->CutForSearch(s, jiebawords, useHMM);
    for (vector<cppjieba::Word>::iterator it = jiebawords.begin(); it != jiebawords.end(); it++)
    {
      result_push_word_offset(it->word.c_str(), it->offset, it->unicode_offset);
    }
    return 0;
  }

  EMSCRIPTEN_KEEPALIVE
  int InsertUserWord(const char *word)
  {
    cppjieba::Jieba *x = (cppjieba::Jieba *)(&jieba);
    x->InsertUserWord(word);
    return 0;
  }

  EMSCRIPTEN_KEEPALIVE
  int Tag(const char *sentence)
  {
    vector<pair<string, string>> tagres;
    size_t len = strlen(sentence);
    string s(sentence, len);
    jieba.Tag(s, tagres);
    for (vector<pair<string, string>>::iterator it = tagres.begin(); it != tagres.end(); it++)
    {
      result_push_tag(it->first.c_str(), it->second.c_str());
    }
    return 0;
  }

  void PushOffsets(vector<size_t> offsets)
  {
    for (vector<size_t>::iterator it = offsets.begin(); it != offsets.end(); it++)
    {
      array_push_size(*it);
    }
  }

  EMSCRIPTEN_KEEPALIVE
  int Extract(const char *sentence, size_t topk)
  {
    size_t len = strlen(sentence);
    string s(sentence, len);
    vector<cppjieba::KeywordExtractor::Word> keywordres;
    jieba.extractor.Extract(s, keywordres, topk);
    for (vector<cppjieba::KeywordExtractor::Word>::iterator it = keywordres.begin(); it != keywordres.end(); it++)
    {
      PushOffsets(it->offsets);
      result_push_keyword(it->word.c_str(), it->weight);
    }
    return 0;
  }

  EMSCRIPTEN_KEEPALIVE
  int LookupTag(const char *sentence)
  {
    size_t len = strlen(sentence);
    string s(sentence, len);
    string v = jieba.LookupTag(s);
    result_push_word(v.c_str());
    return 0;
  }
}

int main(int argc, char **argv)
{
  return EXIT_SUCCESS;
}