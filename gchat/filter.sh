#!/usr/bin/env bash
set -euo pipefail

takeoutPath="$1"
email="$2"

find "$takeoutPath" \
    -iname '*messages.json' \
    -type f \
    -exec grep -l "$email" {} \; \
| xargs -I {} jq -r '.messages[] | [.created_date, .creator.name, .text] | @csv' '{}'
