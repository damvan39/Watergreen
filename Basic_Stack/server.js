var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var str = "";

console.log(databaseQuery("example"))

async function databaseQuery(type) {
  console.log("api request recived, type: " + type)
  var data
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
    console.log("error")
    return;
  }

  try {

    const db = client.db("data");

    let query = {}

    query.type = type

    let collection = db.collection('data_buffer');

    let res = await collection.findOne(query);

    data = JSON.stringify(res);
  } catch (err) {

      return
  } finally {

    client.close();
  }
  return (data);
}

app.route('/api').get(function(req, res)  {
  console.log("api request recived, type: " + req.query.type)
  var data
  const client = MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .catch(err => { console.log(err); });

  if (!client) {
    console.log("database error 001")
  }

  try {

    const db = client.db("data");

    let query = {}

    query.type = req.query.type

    let collection = db.collection('data_buffer');

    let res = collection.findOne(query);

    data = JSON.stringify(res);
    client.close()

  } catch (err) {

    console.log("database error 002")
  } finally {

    client.close();
  }
  res.send (data);
});

var server = app.listen(8080, function() {});