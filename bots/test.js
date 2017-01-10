const Skeleton = require('../lib/skeleton.js');

const Command = require('../lib/command.js');

const Arguments = require('../lib/args/arguments.js');
const StringArgument = require('../lib/args/stringargument.js');
const NumberArgument = require('../lib/args/numberargument.js');

class Test extends Skeleton {
    constructor(){
        super();

        this.register(new Command(
            new Arguments([
                'remind-me',
                new StringArgument('reminder'),
                'in',
                new Arguments([
                    new NumberArgument('hours'),
                    'hours'
                ], false),
                new Arguments([
                    new NumberArgument('minutes'),
                    'minutes'
                ], false),
                new Arguments([
                    new NumberArgument('seconds'),
                    'seconds'
                ], false)
            ]), this.remindMe.bind(this)
        ));
    }

    remindMe(args, ctx){
        this.eris.createMessage(ctx.channel.id, JSON.stringify(args));
    }
}

module.exports = Test;
