const ArgumentType = require('./argumenttype.js');

class NumberArgument extends ArgumentType {
    constructor(name, required = true, defaultVal = 0){
        super(name, required, defaultVal);
    }

    isValid(tokens){
        let x = tokens.next();

        if(x === null){
            return false;
        }

        return !Number.isNaN(x);
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
