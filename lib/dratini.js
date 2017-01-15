const string = require('./util/string.js');
const Command = require('./command.js');
const Arguments = require('./args/arguments.js');

class Dratini {
    constructor(){
        this.prefix = null;
        this.commands = [];
        this.inactive = {};
        this.eris = null;
    }

    init(eris, prefix){
        this.prefix = prefix;
        this.eris = eris;
        this.eris.on('messageCreate', this.handleMessage.bind(this));

        this.register(
            new Command(new Arguments(['help']),
            this._help.bind(this),
            {
                name: 'Show Help',
                desc: 'Show help information.'
            }
        ));
    }

    handleMessage(msg){
        let ch = msg.channel.id;

        if(this.inactive[ch])
            return;

        if(this.prefix === null){
            // Bots are not allowed to operate without a prefix.
            return;
        }

        let content = string.replaceFirst(msg.content, this.prefix, '');
        let match = this._findMatch(content, msg);

        if(match !== null){
            if(!match.hasPermission(msg.author.permission)){
                this.eris.createMessage(ch, 'You do not have permission to do this.');
            }
            else{
                try{
                    match.apply(content, msg);
                }
                catch(e){
                    this.eris.createMessage(ch, e.toString());
                }
            }
            return;
        }
    }

    _findMatch(content, msg){
        for(let i = 0; i < this.commands.length; i++){
            let cmd = this.commands[i];

            if(cmd.isValid(content, msg)){
                return cmd;
            }
        }

        return null;
    }

    register(command){
        command.bind(this.eris);
        this.commands[this.commands.length++] = command;
    }

    _genHelp(help){
        for(let i = 0; i < this.commands.length; i++){
            help.push(this.commands[i].help());
        }

        return help;
    }

    _help(args, ctx){
        let help_txt = this._genHelp([]);
        this.eris.createMessage(ctx.channel.id, help_txt.join('\n\n'));
    }
}

module.exports = Dratini;
