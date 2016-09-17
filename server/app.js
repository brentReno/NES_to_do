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

//post route to create new task
app.post("/newTask", urlEncodedParser, function(req ,res){
  console.log("creating a new task");
  res.send("Hello from New Task");
});

//post route to change status
app.post("/changeStatus", urlEncodedParser, function(req, res){
  console.log("changeing a task");
  res.send("Hello from Change Staus");
});

//delete route to remove task


//set public folder as static
app.use(express.static('public'));
