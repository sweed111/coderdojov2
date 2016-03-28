#!/bin/bash

clear
echo "Shut down MongoDB Server."

mongo admin --eval 'db.shutdownServer()'