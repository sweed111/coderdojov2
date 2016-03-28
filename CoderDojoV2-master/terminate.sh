#!/bin/bash

clear
echo "Terminate Process"

./shurdownComServer.sh
./shurdownAdminServer.sh
#./shurdownMongoDB.sh

echo "Terminate the whole system."