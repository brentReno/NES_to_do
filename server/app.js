var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');
var pg = require('pg');
var connectionString = "postgres://localhost:5432/weekend_to_do";

//spin up server
app.listen(3001, function(){
  console.log("The server is listening on 3001");
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
      var queryResults = client.query( 'SELECT * FROM tasks ORDER BY status' );
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
  //create DB data
  var task = req.body.task;
  var status= req.body.status;
  pg.connect(connectionString, function(err, client, done){
    //error
    if(err){
      console.log(err);
    }
    //succesful connection
    else{
    console.log("connected to the database");
    //make query var
    client.query( "INSERT INTO tasks(task, Status) VALUES($1, $2);",[task, status]);
      console.log("task added to DB");
      done();

  }//end else
  });//end PG connect
});// end new task

//post route to change status
app.put("/changeStatus", urlEncodedParser, function(req, res){
  console.log("changeing a task with", req.body);
  var id= req.body.id;
  var status = req.body.status;
  pg.connect(connectionString, function(err, client, done){
    //error
    if(err){
      console.log(err);
    }
    //succesful connection
    else{
    console.log("connected to the database");
    //make query var
    client.query( "UPDATE tasks SET status ="+ status +" WHERE id="+ id +";");
      console.log("Status changed in DB");
      done();
    }
  });// end pg connect
});// end change status

//delete route to remove task
app.delete("/deleteTask", urlEncodedParser, function( req, res){
  console.log("deleteing task", req.body);
  pg.connect(connectionString, function(err, client, done){
    //error
    if(err){
      console.log(err);
    }
    //succesful connection
    else{
    console.log("connected to the database");
    //make query var
    client.query("DELETE FROM tasks WHERE id =($1);", [req.body.id]);
    console.log("Task "+ req.body.id +" has been deleted.");
    done();
    }//end else
  });//end pg connect
});//end delete route

//set public folder as static
app.use(express.static('public'));
