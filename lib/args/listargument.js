const ArgumentType = require('./argumenttype.js');

class ListArgument extends ArgumentType {
    constructor(name, required = true, defaultVal = []){
        super(name, Types.List, required, defaultVal);
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
        let str = '<' + this._name; + ' | [';

        for(let i = 0; i < this.typeList.length; i++){
            str += this.typeList[i].toString();

            if(i + 1 < this.typeList.length){
                str += ' | ';
            }
        }

        return str + ']>';
    }
}

module.exports = ListArgument;
