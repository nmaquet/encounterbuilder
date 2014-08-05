# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

import sys
import os.path
import json

def getPaths():
    if len(sys.argv) != 3:
        print "usage : split_monsters.py <inPath> <outPath>"
        sys.exit(-1)
    inPath = sys.argv[1]
    outPath = sys.argv[2]
    if not os.path.exists(inPath):
        print "fatal : could not find <inPath>"
        sys.exit(-1)
    if os.path.exists(outPath):
        print "fatal : <outPath> already exists"
        sys.exit(-1)
    return inPath, outPath

def process(inPath, outPath):
    os.mkdir(outPath)
    with open(inPath) as f:
        contents = f.read()
    monsters = json.loads(contents)
    for monster in monsters:
        monsterPath = os.path.join(outPath, str(monster["id"]) + ".json")
        with open(monsterPath, "w") as f:
            f.write(json.dumps(monster))
        
if __name__ == "__main__":
    inPath, outPath = getPaths()
    process(inPath, outPath)
    print "done !"
