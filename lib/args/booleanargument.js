const ArgumentType = require('argumenttype.js');

class BooleanArgument extends ArgumentType {
    constructor(name, required = true, defaultVal = 0){
        super(name, required, defaultVal);
    }

    isValid(tokens){
        let valid = ['yes', 'no', '0', '1', 'true', 'false'];
        let token = tokens.next().toLowerCase();

        return valid.indexOf(token) !== -1;
    }

    parse(tokens){
        let token = tokens.next();
        let yes = ['yes', '1', 'true'];
        let no = ['no', '0', 'false'];

        if(yes.indexOf(tokens.toLowerCase()) !== -1){
            return true;
        }

        return false;
    }

    toString(){
        return `<${this._name} | boolean>`;
    }
}

module.exports = BooleanArgument;
