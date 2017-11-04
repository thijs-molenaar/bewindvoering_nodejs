"use strict";

var http = require('http');

// main request handler
http.createServer( (request, response) => {

	if ( request.url === "/test" ) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end('Reached test page');
	}

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('Hello World!');
}).listen(8080);
