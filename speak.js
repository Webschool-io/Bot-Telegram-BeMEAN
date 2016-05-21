
const sendSpeak = (chat, txt, opts, callback) => {
  if(typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  opts.chat_id = chat
  const spawnSync = require('child_process').spawnSync
  const _txt = txt.replace(/['"\\]/g, '');
  fileName = Math.random().toString()+ '.mp3'
  out = spawnSync('sh', ['-c', "espeak -v pt --stdout '"+_txt+"' | avconv -i pipe:0 "+fileName]);
  const audio = fs.readFileSync(fileName);
  console.log('audio', audio)
}
