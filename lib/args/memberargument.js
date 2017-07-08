"use strict";

const ArgumentType = require('./argumenttype.js');

class MemberArgument extends ArgumentType {
    constructor(name){
        super(name);
    }

    isValid(tokens, ctx){
        let token = tokens.next();

        if(!token.match(/<@!?\d+>/)){
            return false;
        }

        token = token.replace(/(<@!?)|>/g, '');

        return ctx.mentions.find((user) => {
            return user.id === token;
        }) !== null;
    }

    parse(tokens, ctx){
        let token = tokens.next();

        token = token.replace(/(<@!?)|>/g, '');

        return ctx.mentions.find((user) => {
            return user.id === token;
        });
    }

    toString(){
        return `<${this._name} | member-mention>`;
    }
}

module.exports = MemberArgument;
