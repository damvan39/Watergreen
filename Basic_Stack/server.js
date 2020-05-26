var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var Mongourl = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

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
    var result = ""
    query = query.slice(1,)
    d = querystring.parse(query)
    if (d.type == "watert") {
        console.log("api: requested water temp");
        result = getTemp()
    }
    else if (d.type == "airt") {
        console.log("api: requested air temp");
    }
    else if (d.type == "airh") {
        console.log("api: requested air humidity");
    }
    else {
      console.log("error: api request type not valid")
      result = "error: api request type not valid, valid types are watert, airt, airh "
    }
    return result
}

function getTemp(index) {

}