const Skeleton = require('../lib/skeleton.js');

const Command = require('../lib/command.js');

const Arguments = require('../lib/args/arguments.js');
const StringArgument = require('../lib/args/stringargument.js');
const NumberArgument = require('../lib/args/numberargument.js');
const MemberArgument = require('../lib/args/memberargument.js');

class Test extends Skeleton {
    init(eris, prefix){
        super.init(eris, prefix);

        this.register(new Command(
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
            }), this.remindMe,
            {
                desc: 'Set a reminder for something.'
            }
        ));

        this.register(new Command(new Arguments([
            'ping',
            new MemberArgument('person')
        ]), this.ping, {desc: 'Pings a user.'}));
    }

    remindMe(args, ctx){
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

    ping(args, ctx){
        this.eris.createMessage(ctx.channel.id, `${args.person.id}`);
    }
}

module.exports = Test;
