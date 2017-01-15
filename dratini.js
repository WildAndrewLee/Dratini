const Eris = require('eris');
const fs = require('fs');
const path = require('path');

const conf = require('./conf.json');

const eris = new Eris(conf.bot_token);

const Dratini = require('./lib/dratini.js');
const bot = new Dratini();
bot.init(eris, conf.prefix);

function load(f){
    if(!f.match(/\.js$/, f))
        return;

    let cmd = require('./' + path.join(conf.cmd_dir, f));

    bot.register(cmd);
}

fs.readdir(conf.cmd_dir, (err, f) => {
    for(let i = 0; i < f.length; i++){
        load(f[i]);
    }

    eris.connect();
});
