#!/usr/bin/env node
//find ~/Downloads/Takeout/Voice/Calls/ -iname '*thita*text*202*.html' | sort | head -n 1 | ./extract.js
const fs = require('fs');
const {readFile} = require('fs').promises;
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
const fileReads = [];


rl.on('close', () => {
	Promise.allSettled(fileReads).then(()=> {
		parser.end();
		stringifier.end();
		process.exit(0);
	});
});

stringifier.on('error', (err) => {
  console.error(err.message);
});

stringifier.pipe(process.stdout).on('finish', () => {});

rl.on('line', (line) => {
	fileReads.push(readFile(line, 'utf8').then(data => {
    parser.write(data);
	}));
});
