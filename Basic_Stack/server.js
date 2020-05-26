var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  if (q.pathname == "/api") {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(Api(q.search));
      return res.end();
  }
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

function Api(query) {
    query = query.slice(1,)
    d = querystring.parse(query)
    if (d.type == "watert") {
        console.log("water temp");
    }
    else if (d.type == "airt") {
        console.log("air temp");
    }
    else if (d.type == "airh") {
        console.log("air humidity");
    }
    return query
}
