"use strict";

module.exports = {
    /**
     * Returns `string` with the first instance of `pattern`
     * replaced by `replacement`.
     *
     * In the instance that `pattern` is null then `str`
     * is returned without additional processing.
     *
     * @args str The string to use for search and replacement.
     * @args pattern The pattern to use for searching. If this
     *  is null then search string is returned as-is.
     * @args replacement The string to replace the first matched
     *  pattern with.
     *
     * @returns The search string with the first instance of
     *  the specified pattern replaced by the specified
     *  replacement string.
     */
    replaceFirst: (str, pattern, replacement) => {
        if(pattern === null)
            return str;

        return str.replace(pattern, (m, i) => {
            if(i === 0){
                return replacement;
            }

            return m;
        });
    }
};
