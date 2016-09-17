var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');
var pg = require('pg');
// add connection string here

//spin up server
app.listen(8080, function(){
  console.log("The server is listening on 8080");
});

//establish base url
app.get("/", function(req,res){
  console.log("base url hit");
  res.sendFile(path.resolve("public/index.html"));
});

app.post("/newTask", urlEncodedParser, function(req ,res){
  console.log("creating a new task");
  res.send("Hello from New Task");
});


//set public folder as static
app.use(express.static('public'));
