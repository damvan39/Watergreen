var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoDB = 'mongodb://localhost/data';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  type: String, // String is shorthand for {type: String}
  airt: Number,
  airh: Number,
  watert: [{ data: Number, index: Number }],
},{collection :'data_buffer'});
var data = mongoose.model('data_buffer', dataSchema)

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var testwrite = new data({
  type: 'example1',
  airt: 27.012,
  airh: 34.34,
  watert: [{data: 27.12, index:1}]

})
testwrite.save(function (err){
console.log("entered function")
  if (err) return handleError(err);

});

var query = data.find({ 'type': 'example1'})
query.select('airt airh')
query.limit(5)
query.sort({ airt: -1 });

query.exec(function(err, data){
  if (err) return handleError(err);
console.log(data)
})


async function findOne() {
  return new Promise(function(resolve, reject) {
    try {
      const client = MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
      
      if (!client) {
        return;
      }

      const db = client.db("data");

      let collection = db.collection('data_buffer');

      let query = { type: 'example' }

      let data = collection.findOne(query);

      resolve(JSON.stringify(data))

    } catch (err) {

        reject(err);
    } finally {

        client.close();
    }
  });


}



app.route('/api').get(function(req, res)  {
  console.log("api request recived, type: " + req.query.type)
  data = findOne();
  console.log(data)
  data.then(function (result){
    console.log(result)
    res.write(result)
  });

});

var server = app.listen(8080, function() {});