const Tokenizer = require('../util/tokenizer.js');

class Arguments {
    constructor(args, options){
        this._args = args;
        this._options = options || {
            required: true
        };
    }

    _subValid(tokens, ctx){
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

                let valid = arg._subValid(tokens, ctx);

                if(!valid && arg._options.required){
                    tokens.pop();
                    return false;
                }
                else if(!valid && !arg._options.required){
                    tokens.pop();
                }
            }
            // Single argument check.
            else{
                if(!tokens.hasNext()){
                    return false;
                }

                if(!arg.isValid(tokens, ctx)){
                    return false;
                }
            }
        }

        return true;
    }

    isValid(str, ctx){
        let tokens = new Tokenizer(str);

        // tokens should be of type Tokenizer.
        if(!this._subValid(tokens, ctx)){
            return false;
        }

        // Make sure this is an exact match.
        if(tokens.hasNext()){
            return false;
        }

        return true;
    }

    _subApply(tokens, ctx, args){
        Object.assign(args, this._options.defaults);

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

                if(!arg._subValid(tokens) && !arg._options.required){
                    tokens.pop();
                    Object.assign(args, arg._options.defaults);
                }
                else{
                    tokens.pop();
                    let subArgs = arg._subApply(tokens, ctx, arg._options.defaults || {});
                    Object.assign(args, subArgs);
                }
            }
            else{
                tokens.stash();

                if(arg.isValid(tokens, ctx)){
                    tokens.pop();
                    args[arg._name] = arg.parse(tokens, ctx);
                }
                else{
                    tokens.pop();
                }
            }
        }

        return args;
    }

    apply(str, ctx){
        let tokens = new Tokenizer(str);
        let args = {};
        Object.assign(args, this._subApply(tokens, ctx, this._options.defaults || {}));

        return args;
    }

    toString(){
        return this._args.map((a) => {return a.toString();}).join(' ');
    }
};

module.exports = Arguments;
