import sys
import os.path
import json

def getPath():
    if len(sys.argv) != 2:
        print "usage : shorten_monsters.py <filepath>"
        sys.exit(-1)
    path = sys.argv[1]
    if not os.path.exists(path):
        print "fatal : could not find <filepath>"
        sys.exit(-1)
    return path

def processPath(path):
    with open(path) as f:
        contents = f.read();
    monsters = json.loads(contents);
    short_monsters = []
    for monster in monsters:
        short_monsters.append({ "name" : monster.get("Name"), "id" : monster.get("id"), "cr" : monster.get("CR")});
    print json.dumps(short_monsters);

if __name__ == "__main__":
    path = getPath();
    processPath(path)
