const Dratini = require('./dratini.js');

Dratini.Command = require('./command.js');
Dratini.Arguments = require('./args/arguments.js');
Dratini.BooleanArgument = require('./args/booleanargument.js');
Dratini.ListArgument = require('./args/listargument.js');
Dratini.MemberArgument = require('./args/memberargument.js');
Dratini.NumberArgument = require('./args/numberargument.js');
Dratini.Or = require('./args/or.js');
Dratini.StringArgument = require('./args/stringargument.js');
Dratini.VariadicArgument = require('./args/variadicargument.js');

module.exports = Dratini;
