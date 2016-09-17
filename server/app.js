var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');
var pg = require('pg');
var connectionString = "postgres://localhost:5432/weekend_to_do";

//spin up server
app.listen(8080, function(){
  console.log("The server is listening on 8080");
});

//establish base url
app.get("/", function(req,res){
  console.log("base url hit");
  res.sendFile(path.resolve("public/index.html"));
});// end base

//Get tasks
  app.get("/getTasks", function(req, res){
    console.log("Fetching to do");
    pg.connect(connectionString, function(err, client, done){
      //error
      if(err){
        console.log(err);
      }
      //succesful connection
      else{
      console.log("connected to the database");
      //array to hold our results
      var tasksArray=[];
      //make query var
      var queryResults = client.query( 'SELECT * FROM tasks' );
      console.log(queryResults);
      queryResults.on('row', function( row ){
        tasksArray.push( row );
      });//end query results
      queryResults.on('end', function(){
        done();
        return res.json(tasksArray);
      });//end query results
    }//end else
    });//end PG connect
  }); //end get tasks route

//post route to create new task
app.post("/newTask", urlEncodedParser, function(req ,res){
  console.log("creating a new task with", req.body);
  res.send("Hello from New Task");
});// end new task

//post route to change status
app.post("/changeStatus", urlEncodedParser, function(req, res){
  console.log("changeing a task with", req.body);
  res.send("Hello from Change Staus");
});// end change status

//delete route to remove task
app.delete("/deleteTask", urlEncodedParser, function( req, res){
  console.log("deleteing task", req.body);
  res.send("your task has been deleted");
});//end delete route

//set public folder as static
app.use(express.static('public'));
