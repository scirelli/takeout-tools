#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const htmlparser2 = require('htmlparser2');
const DomHandler = require('domhandler');
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
			CSSselect.selectAll('.', dom)
		}));
    parser.write(data);
    parser.end();
	});
});

function extract(fileName) {
}
