var express = require('express');
var app = express();
var mongoDB = 'mongodb://localhost/data';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({

  time: Date, // String is shorthand for {type: String}
  airt: [{ data: Number, index: Number }],
  airh: [{ data: Number, index: Number }],
  watert: [{ data: Number, index: Number }],
},{collection :'data_buffer'});
var data = mongoose.model('' , dataSchema)

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var testwrite = new data({
  
  time: 27/04/2020,
  airt: [{data: 27.012, index:1}],
  airh: [{data: 34.34, index:1}],
  watert: [{data: 27.12, index:1}],

})
testwrite.save(function (err){
console.log("entered function")

  if (err) return handleError(err);

});

var query = data.find({ 'type': 'example1'})
query.select('airt airh')
query.limit(10)
query.sort({ created_at: -1 });

query.exec(function(err, data){

  if (err) return handleError(err);
  console.log(data)
})


app.route('/api').get(function(req, res)  {

  console.log("api request recived, type: " + req.query.type)

  var query = data.find({})
  query.select('')
  query.limit(1)
  query.sort({ created_at: -1 });
  
  query.exec(function(err, data){
  
    if (err) return handleError(err);
  res.send(data[0])
  })

});
app.use(express.static('Files'))

var server = app.listen(8080, function() {});