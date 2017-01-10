const Tokenizer = require('../util/tokenizer.js');

class Arguments {
    constructor(args, required = true, defaultVal = null){
        this._args = args;
        this._required = required;
    }

    _subValid(tokens){
        // tokens should be of type Tokenizer.

        for(let i = 0; i < this._args.length; i++){
            let arg = this._args[i];

            // Case-insensitive match.
            if(typeof arg === 'string'){
                let token = tokens.next();

                if(token === null)
                    return false;

                if(token.toLowerCase() !== arg.toLowerCase())
                    return false;
            }
            // Sub-Argument check.
            else if(arg instanceof Arguments){
                tokens.stash();

                let valid = arg._subValid(tokens);

                if(!valid && arg._required){
                    return false;
                }
                else if(!valid && !arg._required){
                    tokens.pop();
                }
            }
            // Single argument check.
            else{
                tokens.stash();

                if(!arg.isValid(tokens)){
                    return false;
                }
            }
        }

        return true;
    }

    isValid(str){
        let tokens = new Tokenizer(str);

        // tokens should be of type Tokenizer.
        if(!this._subValid(tokens))
            return false;

        // Make sure this is an exact match.
        if(tokens.hasNext()){
            return false;
        }

        return true;
    }

    _subApply(tokens){
        let args = {};

        for(let i = 0; i < this._args.length; i++){
            // Check for more stuff to apply.
            if(!tokens.hasNext())
                return args;

            let arg = this._args[i];

            // Case-insensitive match.
            if(typeof arg === 'string'){
                // Skip.
                tokens.next();
            }
            // arg should be of type Argument or instance of ArgumentType.
            else if(arg instanceof Arguments){
                tokens.stash();

                if(!arg._subValid(tokens) && !arg.required){
                    tokens.pop();
                }
                else{
                    tokens.pop();
                    let subArgs = arg._subApply(tokens);
                    Object.assign(args, subArgs);
                }
            }
            else{
                tokens.stash();

                if(arg.isValid(tokens)){
                    tokens.pop();
                    args[arg._name] = arg.parse(tokens);
                }
                else{
                    tokens.pop();
                }
            }
        }

        console.log(args);

        return args;
    }

    apply(str, fn, ctx){
        let tokens = new Tokenizer(str);
        let args = {};
        Object.assign(args, this._subApply(tokens));

        fn(args, ctx);
    }

    toString(){
        let str = '';

        for(let i = 0; i < this._args.length; i++){
            let arg = this._args[i];

            if(typeof arg === 'string'){
                str += arg + ' ';
            }
            else{
                str += arg.toString() + ' ';
            }
        }

        return str;
    }
};

module.exports = Arguments;
