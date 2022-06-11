#!/usr/bin/env python3
import sys
import traceback
import os
import pickle
import json

__dirname = os.path.dirname(__file__)
projectPath = os.path.normpath(os.path.join(__dirname))

PROB_START_P = "prob_start.p"
PROB_TRANS_P = "prob_trans.p"
PROB_EMIT_P = "prob_emit.p"


def getProb(filename):
    probStartPath = os.path.join(
        projectPath, "./jieba-tw/jieba/finalseg", filename)
    with (open(probStartPath, "rb")) as openfile:
        return pickle.load(openfile, encoding="utf-8")


def main(argv):
    MIN_PROB = "-3.14e+100"
    startProb = getProb(PROB_START_P)
    transProb = getProb(PROB_TRANS_P)
    emitProb = getProb(PROB_EMIT_P)
    print("#prob_start")
    print(
        "%s %s %s %s"
        % (startProb["B"], startProb["E"], startProb["M"], startProb["S"])
    )
    print("#prob_trans 4x4 matrix")
    print(
        "%s %s %s %s"
        % (MIN_PROB, transProb["B"]["E"], transProb["B"]["M"], MIN_PROB)
    )
    print(
        "%s %s %s %s"
        % (transProb["E"]["B"], MIN_PROB, MIN_PROB, transProb["E"]["S"])
    )
    print(
        "%s %s %s %s"
        % (MIN_PROB, transProb["M"]["E"], transProb["M"]["M"], MIN_PROB)
    )
    print(
        "%s %s %s %s"
        % (transProb["S"]["B"], MIN_PROB, MIN_PROB, transProb["S"]["S"])
    )
    print("#prob_emit 4 lines")

    def emitItem(kv):
        return "%s:%f" % (kv[0], kv[1])
    print(",".join(map(emitItem, emitProb["B"].items())))
    print(",".join(map(emitItem, emitProb["E"].items())))
    print(",".join(map(emitItem, emitProb["M"].items())))
    print(",".join(map(emitItem, emitProb["S"].items())))
    # print(emitProb)
    # print(transProb)
    # print(emitProb)


if __name__ == '__main__':
    main(sys.argv[1:])
