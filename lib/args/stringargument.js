const ArgumentType = require('./argumenttype.js');

class StringArgument extends ArgumentType {
    constructor(name, required = true, defaultVal = ''){
        super(name, required, defaultVal);
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
