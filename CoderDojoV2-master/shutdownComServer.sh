#!/bin/bash

clear
echo "Shut down Communication Server."

cd WebRTC/
export XIRSYS=70c9a87c-6338-11e5-b7f9-407599caac9d
npm stop
echo "The server has been shut down."