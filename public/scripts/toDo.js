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
      }

    });//end AJAX call
  });//END CREATE TASK CLICK

});
