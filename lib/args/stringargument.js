"use strict";

const ArgumentType = require('./argumenttype.js');

class StringArgument extends ArgumentType {
    constructor(name){
        super(name);
    }

    isValid(tokens){
        // Make sure we consume a token.
        tokens.next();
        return true;
    }

    parse(tokens){
        return tokens.next();
    }

    toString(){
        return `<${this._name} | string>`;
    }
}

module.exports = StringArgument;
