'use strict';

const fs = require('fs');
const spawnSync = require('child_process').spawnSync;

const execute = (bot, msg, match) => {
  const _txt = msg.text.replace(/['"\\]/g, '');
  const fileName = Math.random().toString()+ '.mp3'
  const out = spawnSync('sh', ['-c', "espeak -v pt --stdout '"+_txt+"' | avconv -i pipe:0 '"+fileName+"'"]);
  const audio = fs.readFileSync(fileName);
  bot.sendMessage(msg.chat.id, 'Enviando audio: '+fileName);
  bot.sendVoice(msg.chat.id, fileName);
}

module.exports = {
    execute: execute
}

// const sendSpeak = (chat, txt, opts, callback) => {
//   if(typeof opts === 'function') {
//     callback = opts;
//     opts = {};
//   }
//   opts.chat_id = chat
//   const spawnSync = require('child_process').spawnSync
//   const _txt = txt.replace(/['"\\]/g, '');
//   fileName = Math.random().toString()+ '.mp3'
//   out = spawnSync('sh', ['-c', "espeak -v pt --stdout '"+_txt+"' | avconv -i pipe:0 "+fileName]);
//   const audio = fs.readFileSync(fileName);
//   console.log('audio', audio)
// }