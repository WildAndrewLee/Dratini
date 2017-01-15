class Command {
    constructor(args, fn, options){
        this._args = args;
        this._fn = fn;
        this._name = options.name || 'Command';
        this._desc = options.desc || '';
        this._permissions = options.permissions || [];
        this._help = options.help || null;
    }

    hasPermission(perm){
        for(let i = 0; i < this._permissions.length; i++){
            if(!perm.has(this._permissions[i])){
                return false;
            }
        }

        return true;
    }

    isValid(message, ctx){
        return this._args.isValid(message, ctx);
    }

    apply(message, ctx){
        let args = this._args.apply(message, ctx);

        if(!args){
            return;
        }

        this._fn(args, ctx);
    }

    bind(skele){
        this._fn = this._fn.bind(skele);
    }

    help(){
        if(this._help !== null){
            return this._help;
        }

        let required_permissions = this._permissions.length ? JSON.stringify(this._permissions) : 'None';

        let help = `**__${this._name}__**\n\n${this._desc}\nPermissions Required: ${required_permissions}\n\n`;
        help += '```\n';
        help += this._args.toString();
        help += '\n```';

        return help;
    }
}

module.exports = Command;
