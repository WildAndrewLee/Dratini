const ArgumentType = require('./argumenttype.js');

class VariadicArgument extends ArgumentType {
    constructor(name, type){
        super(name);

        if(type instanceof Variadic){
            throw new Error('Cyclic variadic variables are not allowed.');
        }

        this.type = type;
    }

    isValid(tokens){
        tokens.stash();
        let valid = this.type.isValid(tokens);
        tokens.pop();
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
