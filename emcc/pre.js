/* eslint-disable */
module.exports = function() {
  var Module = {};
  (function() {
    var loadPackage = function(metadata) {
      function runWithFS() {
        function assert(check, msg) {
          if (!check) throw msg + new Error().stack;
        }
      }
      if (Module['calledRun']) {
        runWithFS();
      } else {
        if (!Module['preRun']) Module['preRun'] = [];
        Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
      }
    }
    loadPackage({
      "files": []
    });
  })();
  var args = Array.prototype.slice.call(arguments)
  Module.preRun.push(function() {
    var JiebaDict = args[0] || 'default 1 n\n'
    var HMMModel = args[1] || '0 0 0 0\n0 0 0 0\n0 0 0 0\n0 0 0 0\n0 0 0 0\nb:0\ne:0\nm:0\ns:0\n'
    var UserDict = args[2] || ''
    var IDF = args[3] || 'default 1\n'
    var StopWords = args[4] || '\n'
    var createDataFile = Module.FS_createDataFile
    createDataFile('/', 'jieba.dict.utf8', JiebaDict, true)
    createDataFile('/', 'hmm_model.utf8', HMMModel, true)
    createDataFile('/', 'user.dict.utf8', UserDict, true)
    createDataFile('/', 'idf.utf8', IDF, true)
    createDataFile('/', 'stop_words.utf8', StopWords, true)
  })

  var _result = []
  var _array = []

/** ... */
// }
/** in post.js */
