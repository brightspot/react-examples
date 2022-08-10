#!/bin/bash

DIR=$(git rev-parse --show-prefix | cut -d/ -f1)
mkdir -p brightspot-server
git clone git@github.com:brightspot/react-examples-docker.git brightspot-server/$DIR
rm -rf brightspot-server/$DIR/.git

