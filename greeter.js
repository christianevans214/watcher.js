
var greet = function(name){
	console.log("Hello, " + name);
}

var shout = function(name){
	console.log("HELLO " + name + "!");
}

module.exports.greet = greet;
module.exports.shout = shout;

//console.log(module);

