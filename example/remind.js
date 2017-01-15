const dratini = require('../lib/index.js');
const Dratini = dratini.Dratini;
const Command = dratini.Command;
const Arguments = dratini.Arguments;
const StringArgument = dratini.StringArgument;
const NumberArgument = dratini.NumberArgument;
const Or = dratini.Or;

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

const cmd = new Command(
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
            new Or('hours_label', ['hours', 'hour'])
        ], {required: false}),
        new Arguments([
            new NumberArgument('minutes'),
            new Or('minutes_label', ['minutes', 'minute'])
        ], {required: false}),
        new Arguments([
            new NumberArgument('seconds'),
            new Or('seconds_label', ['seconds', 'second'])
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
);

const Eris = require('eris');
const conf = require('./conf.json');
const eris = new Eris(conf.bot_token);
const bot = new Dratini();

bot.init(eris, conf.prefix);
bot.register(cmd);
eris.connect();
