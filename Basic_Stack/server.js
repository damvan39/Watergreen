var express = require('express');
var app = express();
var mongoDB = 'mongodb://localhost/data';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({

  time: Date, // String is shorthand for {type: String}
  airt: [{ data: Number }],
  airh: [{ data: Number }],
  watert: [{ data: Number }],
},{collection :'data_buffer'});
var data = mongoose.model('' , dataSchema)


app.route('/api/buffer').get(function(req, res)  {

  console.log("api request recived, type: " + req.query.type)
  
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));


  var query = data.find({})
  query.select('')
  query.limit(1)
  query.sort({ created_at: -1 });
  
  query.exec(function(err, data){
  
    if (err) return handleError(err);
  res.send(data[0])
  })

});
app.use('/', express.static('Files'))

var server = app.listen(8080, function() {});