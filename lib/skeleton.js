const string = require('./util/string.js');

class Skeleton {
    constructor(par = null){
        this.par = par;
        this.prefix = null;
        this.commands = [];
        this.children = [];
        this.inactive = {};
        this.eris = null;
    }

    init(eris, prefix){
        this.prefix = prefix;
        this.eris = eris;
        this.eris.on('messageCreate', this.handleMessage.bind(this));
    }

    handleMessage(msg){
        let ch = msg.channel.id;

        if(this.inactive[ch])
            return;

        if(this._par === null && this.prefix === null){
            // Bots are not allowed to operate without either:
            //  - Parent
            //  - Prefix
            return;
        }

        let content = string.replaceFirst(msg.content, this.prefix, '');
        let match = this._findMatch(content);

        if(match !== null){
            match.apply(content, msg);
            return;
        }

        for(let i = 0; i < this.children.length; n++){
            this.children.handleMessage(msg);
        }
    }

    _findMatch(content){
        for(let i = 0; i < this.commands.length; i++){
            let cmd = this.commands[i];

            if(cmd.isValid(content)){
                return cmd;
            }
        }

        return null;
    }

    register(command){
        this.commands[this.commands.length++] = command;
    }
}

module.exports = Skeleton;
