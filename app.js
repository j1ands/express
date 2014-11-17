var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var async = require('async');
var http = require('http');
var ejs = require('ejs');
var io = require('socket.io');

// take a list of files from the command line
// now we can run our app like:
// node app.js file1.js file2.js file3.js
// and it will watch all three files
var files = Array.prototype.slice.call(process.argv, 2);
console.log(files);
 
// create the express app
var app = express();

app.set('view engine', 'ejs');


var server = http.createServer(app);
var io = require('socket.io').listen(server);
 
// all environments
app.use(logger('dev'));
 
// listen on port 1234
//app.listen(3000);

/*
var fs = {
	readFile : function()
}
*/

var fileText = '';
// when someone comes to http://localhost:1234/, run the callback
// function listed here and send down the data
// we call this the: '/' route (or the Root route).
	
	//app.get = a function that will listen on our express server for a get call. (on /)
	// app.get("/", function(request, response) 
	// {
	// 	var readCount = 0;
	// 	files.forEach(function(ele)
	// 	{
	// 		fs.readFile(ele, function(err, data) 
	// 		{
	// 			fileText += '<pre>'+ data.toString() +'</pre>';
	// 			readCount++;
	// 			if(readCount >= files.length)
	// 			{
	// 				response.send(fileText);
	// 			}
	// 		});			
	// 	});		
	// });

app.get('/', function(request,response)
{	
	var iterator = function(file, done) 
	{
		fs.readFile(file,function(err, fileBuffer)
		{
			// todo fs.watchfile
			if(err) return done(err);
			done(err,{data: fileBuffer.toString(), filename: file, id: file.replace(/[^0-9]/ig, '')});
		});
	}	
	var masterCallback = function(err, fileContentArray)
	{
		if(err) response.send(500, 'Internal Server Error');
		response.render('app.ejs', {files: fileContentArray});
	}

	async.mapSeries(files, iterator, masterCallback);
});

fs.watch('.', {}, function(event, file)
{
	console.log('file', file, 'has changed');
	io.sockets.emit('filechanged');
});

server.listen(3000);