#!/usr/bin/env node
const fs = require('fs');
const { parse } = require('csv-parse');

const results = [];

process.stdin
  .pipe(parse({ columns: true, trim: true })) // `columns: true` treats the first row as headers
  .on('error', (error) => console.error(error))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });
