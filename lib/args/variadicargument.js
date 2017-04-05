"use strict";

const ArgumentType = require('./argumenttype.js');

class VariadicArgument extends ArgumentType {
    constructor(name, type){
        super(name);

        if(type instanceof VariadicArgument){
            throw new Error('Cyclic variadic variables are not allowed.');
        }

        this.type = type;
    }

    isValid(tokens){
        let valid = this.type.isValid(tokens);

        while(tokens.hasNext()){
            tokens.next();
        }

        return valid;
    }

    parse(tokens){
        let ret = [];

        while(tokens.hasNext()){
            ret.push(this.type.parse(tokens));
        }

        return ret;
    }

    toString(){
        return `<${this._name} | variadic (${this.type.toString()})>`;
    }
}

module.exports = VariadicArgument;
