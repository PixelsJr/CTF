#!/bin/bash

# Download and install fnm:
curl -o- https://fnm.vercel.app/install | bash

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node_output=$(node -v) # Should print "v22.14.0".
echo "node_output: $node_output"

# Verify npm version:
npm_output=$(npm -v) # Should print "10.9.2".
echo "npm_output: $npm_output"

# Verify outputs
if [ $node_output != "v22.14.0" ] || [ $npm_output !=  "10.9.2" ]; then
  return "Node couldn't install correctly.\nExpected Node output: 'v22.14.0'\nExpected npm output: '10.9.2'"
fi

# Build the app
cd ./client
npm install
npm run build

# Installing python
sudo apt-get update
sudo apt-get install python3.6

# Installing python dependencies (via venv)
cd ..
python3 -m venv ./venv
source ./venv/bin/activate
pip install -r ./server/requirements.txt

# Fixing php 
sudo apt-get install php

# Testing the fix
php_output=$(php --version)
echo "php_output: $php_output"

if [ $php_output != "idk yet" ]; then #! CHANGE STR TO ERROR OUTPUT
  return "php still isn't working. smh"
fi

echo "ig we got php working now?"



