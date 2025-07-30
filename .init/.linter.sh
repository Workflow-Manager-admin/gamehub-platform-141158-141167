#!/bin/bash
cd /home/kavia/workspace/code-generation/gamehub-platform-141158-141167/archid_games_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

