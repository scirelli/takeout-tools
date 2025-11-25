#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const htmlparser2 = require('htmlparser2');
const DomHandler = require('domhandler');
const domUtils = require('domutils');

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
		console.log(data);
		const handler = new DomHandler((error, dom) => {
			if (error) {
					console.error('Error parsing HTML:', error);
			} else {
					console.log('HTML parsing complete. DOM available.');

					const paragraphs = domUtils.findAll(element => element.tagName === 'p', dom);
					paragraphs.forEach((p, index) => {
							console.log(`Paragraph ${index + 1}:`, domUtils.getInnerHTML(p));
					});

					// Example: Find an element by ID
					const specificElement = domUtils.findOne(element => element.attribs && element.attribs.id === 'my-id', dom);
					if (specificElement) {
							console.log('Content of element with ID "my-id":', domUtils.getInnerHTML(specificElement));
					}
			}
		});

    const parser = new htmlparser2.Parser(handler);
    parser.write(htmlContent);
    parser.end();
	});
});

function extract(fileName) {
	const dom = htmlparser2.parseDocument(htmlString);
}
