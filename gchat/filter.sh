#!/usr/bin/env bash
set -euo pipefail

email="$1"

find /tmp/Takeout/Google\ Chat/ \
    -iname '*messages.json' \
    -type f \
    -exec grep -l "$email" {} \; \
| xargs -I {} jq -r '.messages[] | [.created_date, .creator.name, .text] | @csv' '{}'
