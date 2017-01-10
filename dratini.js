const Eris = require('eris');
const fs = require('fs');
const path = require('path');

const conf = require('./conf.json');

const eris = new Eris(conf.bot_token);

function load(f){
    if(!f.match(/\.js$/, f))
        return;

    let Bot = require('./' + path.join(conf.bot_dir, f));
    let bot = new Bot();
    bot.init(eris, conf.prefix);
}

fs.readdir(conf.bot_dir, (err, f) => {
    for(let i = 0; i < f.length; i++){
        load(f[i]);
    }
});

eris.connect();
