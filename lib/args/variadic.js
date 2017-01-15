const ArgumentType = require('./argumenttype.js');

class Variadic extends ArgumentType {
    constructor(name){
        super(name);
    }

    isValid(tokens){
        return true;
    }

    parse(tokens){
        let ret = [];

        while(tokens.hasNext()){
            ret.push(tokens.next());
        }

        return ret;
    }

    toString(){
        return `<${this._name} | variadic-string-list>`;
    }
}

module.exports = VariadicArgument;
