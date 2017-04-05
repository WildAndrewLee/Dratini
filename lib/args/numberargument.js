"use strict";

const ArgumentType = require('./argumenttype.js');

class NumberArgument extends ArgumentType {
    constructor(name){
        super(name);
    }

    isValid(tokens){
        let x = tokens.next();

        if(x === null){
            return false;
        }

        return !Number.isNaN(parseFloat(x));
    }

    parse(tokens){
        let token = tokens.next();
        return parseFloat(token);
    }

    toString(){
        return `<${this._name} | number>`;
    }
}

module.exports = NumberArgument;
