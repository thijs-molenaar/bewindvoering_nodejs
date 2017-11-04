var http = require('http');

http.createServer( (req, res) => {

  if ( req.url === "/test" ){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("test page reached");
    res.end();
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("What's up, doc?");
} ).listen(8080);
