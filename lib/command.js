class Command {
    constructor(args, fn, desc){
        this._args = args;
        this._fn = fn;
        this._desc = desc;
    }

    isValid(content){
        return this._args.isValid(content);
    }

    apply(content, ctx){
        this._args.apply(content, this._fn, ctx);
    }

    _setClient(eris){
        this._eris = eris;
    }

    help(){
        let help = '```' + desc + '\n\n';
        help += this._args.toString();
        help += '```';

        return help;
    }
}

module.exports = Command;
