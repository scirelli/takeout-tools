#!/usr/bin/env node
//find ~/Downloads/Takeout/Voice/Calls/ -iname '*thita*text*202*.html' | sort | head -n 1 | ./extract.js
const fs = require('fs');
const readline = require('readline');
const htmlparser2 = require('htmlparser2');
const {DomHandler} = require('domhandler');
const domUtils = require('domutils');
const CSSselect = require("css-select");
const { stringify } = require('csv-stringify');

const rl = readline.createInterface({
  input: process.stdin,
	terminal: true,
});
const stringifier = stringify({ header: true, columns: ['date', 'user', 'message'] })

rl.on('close', () => {
  //process.exit(0);
});

stringifier.on('error', (err) => {
  console.error(err.message);
});

stringifier.pipe(process.stdout).on('finish', () => {
    console.log('Data successfully written to streamed_output.csv using piping.');
});

rl.on('line', (line) => {
	fs.readFile(line, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return;
		}

    const parser = new htmlparser2.Parser(new DomHandler((error, dom) => {
			if (error) {
					console.error('Error parsing HTML:', error);
					return;
			}
			messagesElms = CSSselect.selectAll('.hfeed > .message', dom).map(mElm => {
				stringifier.write([
					domUtils.innerText(CSSselect.selectOne('.dt', mElm)).replaceAll(/[\n\r]+/g, ' '),
					domUtils.innerText(CSSselect.selectOne('.fn', mElm)).replaceAll(/[\n\r]+/g, ' '),
					domUtils.innerText(CSSselect.selectOne('q', mElm)).replaceAll(/[\n\r]+/g, ' '),
				]);
			})
		}));
    parser.write(data);
    parser.end();
	});
});
