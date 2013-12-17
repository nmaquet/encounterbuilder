import sys
import os.path

if len(sys.argv) != 2:
    print "usage : shorten_monsters.py <filepath>"
    sys.exit(-1)

path = sys.argv[1]

if not os.path.exists(path):
    print "fatal : could not find <filepath>"
    sys.exit(-1)

print "processing", path
