#/usr/bin/env bash
grep -ri 'thitaporn.jenly@gmail.com' . | uniq | cut -d':' -f 1 | grep 'messages' | uniq
jq '.messages[].text' './Groups/DM 7Nf1rgAAAAE/messages.json'
