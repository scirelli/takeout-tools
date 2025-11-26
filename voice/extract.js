#!/usr/bin/env node
//find ~/Downloads/Takeout/Voice/Calls/ -iname '*thita*text*202*.html' | sort | head -n 1 | ./extract.js
const fs = require('fs');
const readline = require('readline');
const htmlparser2 = require('htmlparser2');
const {DomHandler} = require('domhandler');
const domUtils = require('domutils');
const CSSselect = require("css-select");

const rl = readline.createInterface({
  input: process.stdin,
	terminal: true,
});

rl.on('close', () => {
  //process.exit(0);
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
				console.log(domUtils.innerText(CSSselect.selectOne('.dt', mElm)));
				console.log(domUtils.innerText(CSSselect.selectOne('.fn', mElm)));
				console.log(domUtils.innerText(CSSselect.selectOne('q', mElm)));
			});
		}));
    parser.write(data);
    parser.end();
	});
});
