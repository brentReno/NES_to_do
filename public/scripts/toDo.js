console.log("toDo script is sourced");

$(document).ready(function(){
  console.log("JQ is sourced");
  //call display tasks
  displayTask();

  //Create Task on Click
  $('#createNewTask').on('click', function(){
    console.log("In createNewTask Click");
    // CREATE TEST OBJECT
    var objectToSend ={
      task:"test task",
      status: true
    };
    //AJAX call to server
    $.ajax({
      type:"POST",
      url:"/newTask",
      data: objectToSend,
      success: function(data){
        console.log("back with:", data);
      }//end success
    });//end AJAX call
      displayTask();
  });//END CREATE TASK CLICK

  //update status on CLICK
  $("#changeTaskStaus").on('click', function(){
    console.log("In chnageTaskStatus on click");
    //create test object
    var objectToSend ={
      status: true
    };
    //AJAX call
    $.ajax({
      type:"POST",
      url: "/changeStatus",
      data: objectToSend,
      success: function(data){
      console.log("back from changeStatus:", data);
    }// end success

    });//end ajax
  });// end change task on click

  //Delete Task on click
  $("#deleteTask").on("click",function(){
    console.log("In Delete Click");
    //create test objectToSend
    var objectToSend={
      id: 1
    };
    $.ajax({
      type:"DELETE",
      url: "/deleteTask",
      data:objectToSend,
      success: function(data){
        console.log("Deleted task",data);

      }//end success
    });// end ajax call

  });//end Delete on click

});//end doc ready

//Display tasks
var displayTask = function(){
  $.ajax({
    url:"/getTasks",
    success: function(data){
      console.log(" back with the Tasks:", data);

      var displayString="";
      for (var i = 0; i < data.length; i++) {
        displayString +='<li id ="'+data[ i ].id+'"data-value="'+ data[ i ].status+'">'+ data[ i ].task +"</li>";
      }
      $('#toDoList').html(displayString);
    }// end success

  });//end ajax
};//end display tasks
