const ArgumentType = require('./argumenttype.js');

class ListArgument extends ArgumentType {
    constructor(name){
        super(name);
        this.typeList = typeList;
    }

    isValid(tokens){
        for(let i = 0; i < this.typeList.length; i++){
            let type = this.typeList[i];

            if(!type.isValid(tokens)){
                return false;
            }
        }

        return true;
    }

    parse(tokens){
        let ret = [];

        for(let i = 0; i < this.typeList.length; i++){
            let type = this.typeList[i];
            ret[i] = type.parse(tokens);
        }

        return ret;
    }

    toString(){
        let str = '<${this._name} | [';
        let types = this.typeList.map((t) => {return t.toString();}).join(' ');
        str += types + ']>';

        return str;
    }
}

module.exports = ListArgument;
