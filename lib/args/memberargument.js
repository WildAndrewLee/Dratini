const ArgumentType = require('./argumenttype.js');

class MemberArgument extends ArgumentType {
    constructor(name){
        super(name);
    }

    isValid(tokens, ctx){
        let token = tokens.next();

        if(!token.match(/<@\d+>/)){
            console.log(token);
            return false;
        }

        token = token.replace(/(<@)|>/g, '');

        return ctx.mentions.filter((user) => {
            return user.id === token;
        }).length === 1;
    }

    parse(tokens, ctx){
        let token = tokens.next();

        token = token.replace(/(<@)|>/g, '');

        return ctx.mentions.filter((user) => {
            return user.id === token;
        })[0];
    }

    toString(){
        return `<${this._name} | member-mention>`;
    }
}

module.exports = MemberArgument;
