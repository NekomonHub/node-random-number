#!/usr/bin/env node

import chalk from 'chalk';
import readline from 'readline';
import open from 'open';
import fs from 'fs';
const log = console.log;
const white = chalk.bold.white;
const gold = chalk.hex('#ffd700').bold;
const red = chalk.red.bold;
const DB_FILE = 'trash.txt';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} function random4Digit() {
  return Math.floor(Math.random() * 9000) + 1000;
} function loadDB() {
  if (!fs.existsSync(DB_FILE)) return new Set();
  return new Set(
    fs.readFileSync(DB_FILE, 'utf8')
      .split('\n')
      .filter(Boolean)
  );
} function saveDB(set) {
  fs.writeFileSync(DB_FILE, [...set].join('\n'));
} function clearDB() {
  if (fs.existsSync(DB_FILE)) fs.unlinkSync(DB_FILE);
} async function clear(){
	const { spawn } = await import('child_process');
	spawn('clear',{
		stdio:'inherit'
	});
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function start() {
  clear();
  await wait(500);
  open('https://github.com/NekomonHub');
  log(gold(fs.readFileSync("./logo.txt", "utf8")));
  await wait(500);
  const db = loadDB();
  rl.question(white('Masukkan Awalan Nomor\nExample : 859\n>> '), country => {
    if (!/^\d+$/.test(country)) {
      log(red('Awalan harus angka'));
      return rl.close();
    }
    rl.question(white('Masukkan Akhiran Nomor\nExample : 5854\n>> '), () => {
      const interval = setInterval(() => {
        let tengah = random4Digit();
        let akhir = random4Digit();
        if (tengah >= 10000 || akhir >= 10000) {
          clearInterval(interval);
          clearDB();
          log(red('\nLimit digit tercapai, script dihentikan.'));
          rl.close();
          process.exit(0);
        }

        const number = `[node-random-number] +62 ${country}-${tengah}-${akhir}`;
        if (db.has(number)) return;
        db.add(number);
        saveDB(db);
        log(gold(number));
      },0);
    });
  });
} process.on('SIGINT', () => {
  clearDB();
  process.exit(0);
});

start();
