'use strict';
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;

const _txt = "ahhahahahhahah".replace(/['"\\]/g, '');
const fileName = Math.random().toString()+ '.mp3'
const out = spawnSync('sh', ['-c', "espeak -v pt --stdout '"+_txt+"' | avconv -i pipe:0 "+fileName]);
const audio = fs.readFileSync(fileName);
console.log('fileName', fileName);
console.log('audio', audio);