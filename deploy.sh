#!/bin/bash
rsync -av -e "ssh -p 7822" dist/hex-tool-next/ david@davidrodal.com:/var/www/beta/game-dispatcher/public/modern/
