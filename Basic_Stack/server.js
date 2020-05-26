var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/data";
global.dbresult = []

MongoClient.connect(mongoUrl, function(err, db) {
  var dbdata = []
  var cursor = db.collection('data_buffer').find();

  cursor.each(function(err, doc) {

      console.log(doc);
      dbdata.push(JSON.stringify(doc))
      console.log(dbdata);



  });
  console.log("finaldata")
  console.log(dbdata)
}); 
console.log("yeet:${dbdata}")
//still being tested
process.exit()

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
        dbresult = readDatabase()
        var textResult = JSON.stringify(dbresult)
        console.log("result equals")
        console.log(textResult)
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

function readDatabase(index) {
  var dbresultn;
  MongoClient.connect(Mongourl, function(err, db) {
  if (err) throw err;
  var dbo = db.db("data");
  dbo.collection("data_buffer").find({}).toArray(result) 
  db.close();
});
  console.log("debug1")
  console.log(dbresult)
  return dbresult;
}
