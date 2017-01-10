# Dratini

Dratini is an Eris based Discord bot framework that allows developers to create commands declaratively.

# Example Command

```js
this.register(new Command(
    new Arguments([
	'remind-me',
	new StringArgument('reminder'),
	'in',
	new Arguments([
	    new NumberArgument('hours'),
	    'hours'
	], false),
	new Arguments([
	    new NumberArgument('minutes'),
	    'minutes'
	], false),
	new Arguments([
	    new NumberArgument('seconds'),
	    'seconds'
	], false)
    ]), this.remindMe.bind(this)
));
```
