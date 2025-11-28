Extract takes a path to a google voice text messaage html file and extracts the conversation.

## Install
```
npm ci
```

## Usage
```
find ./Takeout/Voice/Calls/ -iname '*text*.html' -type f | sort | ./extractCSV.js > texts.csv
```
