import sys
import os.path
import json

def getPaths():
    if len(sys.argv) != 3:
        print "usage : shorten_monsters.py <inPath> <outPath>"
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
    with open(inPath) as f:
        contents = f.read()
    monsters = json.loads(contents)
    short_monsters = []
    for monster in monsters:
        short_monsters.append({ "name" : monster.get("Name"), "id" : monster.get("id"), "cr" : monster.get("CR")})
    with open(outPath, "w") as f:
        f.write(json.dumps(short_monsters))

if __name__ == "__main__":
    inPath, outPath = getPaths()
    process(inPath, outPath)
    print "done !"
