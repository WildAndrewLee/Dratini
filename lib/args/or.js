const ArgumentType = require('./argumenttype.js');

class Or extends ArgumentType {
    constructor(name, options){
        super(name);
        this.options = options;
    }

    isValid(tokens){
        let token = tokens.next().toLowerCase();
        return this.options.indexOf(token) !== -1;
    }

    parse(tokens){
        let token = tokens.next();
        return token;
    }

    toString(){
        let options = this.options.join(', ');
        return `<${this._name} | [${options}]>`;
    }
}

module.exports = Or;
