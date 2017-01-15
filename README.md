# Dratini

Dratini is an Eris based Discord bot framework that allows developers to create commands declaratively. The goal of Dratini is to provide developers an easier way to create commands. Using Dratini, developers do not need to parse any messages themselves as Dratini will provide already-parsed arguments based off of pre-defined command structures.

# Available Command Argument Types

```
Arguments
BooleanArgument
NumberArgument
StringArgument
ListArgument
VariadicArgument
MemberArgument

Or
```

# Example Command

```js
const Eris = require('eris');

const conf = require('./conf.json');

const eris = new Eris(conf.bot_token);

const Dratini = require('./lib/dratini.js');
const Command = require('./lib/command.js');
const Arguments = require('./lib/args/arguments.js');
const StringArgument = require('./lib/args/stringargument.js');
const NumberArgument = require('./lib/args/numberargument.js');
const MemberArgument = require('./lib/args/memberargument.js');

const bot = new Dratini();

function remindMe(args, ctx){
    let time = (args.hours * 60 * 60 * 1000) + (args.minutes * 60 * 1000) + (args.seconds * 1000);
    let temp = time;

    let hours = Math.floor(temp / (60 * 60 * 1000));
    temp -= (hours * 60 * 60 * 1000);
    let minutes = Math.floor(temp / (60 * 1000));
    temp -= (minutes * 60 * 1000);
    let seconds = temp / 1000;

    let durations = [];

    if(hours){
        durations.push(hours, 'hours');
    }

    if(minutes){
        durations.push(minutes, 'minutes');
    }

    if(seconds){
        durations.push(seconds, 'seconds');
    }

    let in_time = durations.join(' ');

    this.createMessage(ctx.channel.id, `Okay. I'll remind you to **${args.reminder}** in **${in_time}**.`);

    this.getDMChannel(ctx.author.id).then((channel) => {
        setTimeout(() => {
            this.createMessage(channel.id, `Remember to **${args.reminder}**.`);
        }, time);
    });
}

bot.init(eris, conf.prefix);

bot.register(new Command(
    new Arguments([
        'remind',
        'me',
        new Arguments([
            'to'
        ], {required: false}),
        new StringArgument('reminder'),
        new Arguments([
            'in'
        ], {required: false}),
        new Arguments([
            new NumberArgument('hours'),
            'hours'
        ], {required: false}),
        new Arguments([
            new NumberArgument('minutes'),
            'minutes'
        ], {required: false}),
        new Arguments([
            new NumberArgument('seconds'),
            'seconds'
        ], {required: false})
    ], {
        defaults: {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }), remindMe,
    {
        desc: 'Set a reminder for something.'
    }
));

eris.connect();
```
