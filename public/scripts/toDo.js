console.log("toDo script is sourced");

$(document).ready(function(){
  console.log("JQ is sourced");

  //Create Task on Click
  $('#createNewTask').on('click', function(){
    console.log("In createNewTask Click");
    // CREATE TEST OBJECT
    var objectToSend ={
      task:"test task",
      satus: true
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
