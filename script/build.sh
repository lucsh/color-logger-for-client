#!/bin/bash

# build src
rm -rf out/src
mkdir -p out/src
./node_modules/.bin/babel --out-dir out/src src
