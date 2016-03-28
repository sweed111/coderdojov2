#!/bin/bash

clear
echo "Set up initial MongoDB."

mongod --fork --logpath /dev/null
mongo coderdojo initialize.js
#sudo mongo coderdojo initilize.js

cd Administrator/
npm install
npm update
echo "Start Admin Server."
npm start
 cd ..
cd WebRTC/
echo "Start Communication Server."
npm install
npm update
export XIRSYS=70c9a87c-6338-11e5-b7f9-407599caac9d
npm start