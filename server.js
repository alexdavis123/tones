require('dotenv').config()
var path = require("path");
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
//app.use(express.static('public'))
app.use('/css', express.static('css'))

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/success", function(req, res) {
  res.sendFile(path.join(__dirname, "success.html"));
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`tones: listening on port ${port}`);
});
// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });
const uri = process.env.DB_URI;


const mongoose = require('mongoose');
mongoose.connect(uri);
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

app.use(bodyParser.json());
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/add', urlencodedParser,function(req,res){
  const clientDetails=req.body;
  console.log('Got body:', clientDetails.name);
    var name = clientDetails.name;
    var age =clientDetails.age;
    var group1 = req.body.counter1;
    var group2 =req.body.counter2;
    var group3 =req.body.counter3;
    var total =req.body.total;

    var data = {
        "name": name,
        "age":age,
        "counter1":group1,
        "counter2":group2,
        "counter3":group3,
        "total":total
    }
db.collection('users').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('/success');
})
