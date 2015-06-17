var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');
var ejs = require("ejs");

// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
//var filenames = Array.prototype.slice.call(process.argv, 2);
var filenames2 = fs.readdirSync('/Users/christianevans/Documents/CodingProjectsFullStack/IntroToNode/text-files');
console.log("Node starting...");
//console.log(filenames);
//console.log(filenames2.length);

// create the express app
var app = express();
app.set('view engine', 'ejs');

// connect the Morgan logging middleware to our app
app.use( logger('dev') );

// start a server listening on port 1234
app.listen( 1234 );

//With readFileSync.
// app.get('/', function (request, response) {
//   var mapFilenamesToContent = function(file, doneCallBack) {
//   	var obj = {};
//    	var compiledFile = fs.readFileSync("./" + file, "utf8");
//    	obj.id = file.replace(/[^0-9]/gi, "");
//    	obj.data = compiledFile;
//    	obj.filename = file;
//    	doneCallBack(null, obj);
//   };

//with async readFile.
app.get('/', function (request, response) {
  	var mapFilenamesToContent = function(file, doneCallBack) {
  		var obj = {};
   		fs.readFile("./" + file,{encoding: "utf8"}, function(err, data){
   			var obj = {
   				id: file.replace(/[^0-9]/gi, ""),
   				data: data,
   				filename: file
   			};
			doneCallBack(null, obj);
   		});
  	};
  	async.map(filenames2, mapFilenamesToContent, function (err, results) {
    	if (err) console.log('async.map error:', err);
    	response.render('mainView', {files: results});
  	});
});

