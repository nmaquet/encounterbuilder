#!/usr/bin/env python

# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

import os
import os.path
import sys

def line_prepender(filename,line):
    with open(filename,'r+') as f:
        contents = f.read()
        if contents.startswith("#!"):
            print "not modifying #! script " + filename
            return
        if not contents.startswith(line):
            print "modifying " + filename
            f.seek(0,0)
            f.write(line + '\n' + contents)

parent = os.path.abspath(sys.argv[1])

for root, dirs, files in os.walk(parent):
    for file in files:
        if file.endswith('.js') or file.endswith(".jade"):
            line_prepender(os.path.join(root, file), "// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.\n")
        if file.endswith('.py'):
            line_prepender(os.path.join(root, file), "# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.\n")

print "done"