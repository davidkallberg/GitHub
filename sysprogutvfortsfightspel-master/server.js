#!/usr/bin/env node

if (!Array.prototype.includes) {
	Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
		'use strict';
		var O = Object(this);
		var len = parseInt(O.length) || 0;
		if (len === 0) {
			return false;
		}
		var n = parseInt(arguments[1]) || 0;
		var k;
		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) { k = 0; }
		}
		var currentElement;
		while (k < len) {
			currentElement = O[k];
			if (searchElement === currentElement ||
			(searchElement !== searchElement && currentElement !== currentElement)) {
				return true;
			}
			k++;
		}
		return false;
	};
}

/*var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    net = require('net'),
    port = process.argv[2] || 8080;

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname,
		filename = path.join(process.cwd(), uri);

	fs.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) {
			filename += '/index.xhtml';
		}

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}

			if(filename.slice(filename.length - 7) == '.xhtml') {
				response.writeHead(200, {"Content-Type": "application/xhtml+xml"});
			} else if ((filename.slice(filename.length - 6) == '.html') || (filename.slice(filename.length - 5) == '.htm')) {
				response.writeHead(200, {"Content-Type": "text/html"});
			} else if (filename.slice(filename.length - 4) == '.js') {
				response.writeHead(200, {"Content-Type": "application/javascript"});
			} else if (filename.slice(filename.length - 5) == '.css') {
				response.writeHead(200, {"Content-Type": "text/css"});
			} else if (filename.slice(filename.length - 5) == '.gif') {
				response.writeHead(200, {"Content-Type": "image/gif"});
			} else if (filename.slice(filename.length - 5) == '.png') {
				response.writeHead(200, {"Content-Type": "image/png"});
			} else if ((filename.slice(filename.length - 6) == '.jpeg') || (filename.slice(filename.length - 5) == '.jpg')) {
				response.writeHead(200, {"Content-Type": "image/jpeg"});
			} else if (['.mp4', '.m4a', '.m4p', '.m4b', '.m4r', '.m4v'].includes(filename.slice(filename.length - 5))) {
				response.writeHead(200, {"Content-Type": "video/mp4"});
			} else if (filename.slice(filename.length - 6) == '.webm') {
				response.writeHead(200, {"Content-Type": "video/webm"});
			} else if (filename.slice(filename.length - 5) == '.ogv') {
				response.writeHead(200, {"Content-Type": "video/ogg"});
			} else if (filename.slice(filename.length - 6) == '.weba') {
				response.writeHead(200, {"Content-Type": "audio/webm"});
			} else if (['.ogg', '.oga', '.spx'].includes(filename.slice(filename.length - 5)) || (filename.slice(filename.length - 6) == '.opus')) {
				response.writeHead(200, {"Content-Type": "audio/ogg"});
			} else if (filename.slice(filename.length - 5) == '.mp3') {
				response.writeHead(200, {"Content-Type": "audio/mpeg"});
			} else {
				response.writeHead(200);
			}
			
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");


var HOST = '127.0.0.1';
var PORT = 1337;

net.createServer(function(sock) {
	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
	
	sock.on('data', function(data) {
		console.log('DATA ' + sock.remoteAddress + ': ' + data);
		sock.write('You said "' + data + '"');
	});
	
	sock.on('close', function(data) {
		console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
	});
	
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.xhtml');
});

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
	console.log('Server listening at port %d', port);
});

io.on('connection', function(){ 
	console.log("got connection");
});
