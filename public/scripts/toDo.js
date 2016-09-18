console.log("toDo script is sourced");

$(document).ready(function(){
  console.log("JQ is sourced");
  //call display tasks
  displayTask();

  //Create Task on Click
  $('#createNewTask').on('click', function(){
    console.log("In createNewTask Click");
    //create true false values for task
    var statusIn;
    if($('#statusIn').val() == "Complete"){
      statusIn = true;
    }
    else if($('#statusIn').val()=="Work In Progress"){
      statusIn = false;
    } //end if else
    // assemble object to send
    var taskToCreate ={
      task:$('#taskIn').val(),
      status: statusIn
    };
    console.log("task to create:", taskToCreate);
    //AJAX call to server
    $.ajax({
      type:"POST",
      url:"/newTask",
      data: taskToCreate,
      success: function(data){
        console.log("back with:", data);
      }//end success
    });//end AJAX call
      displayTask();
  });//END CREATE TASK CLICK

  //update status on CLICK
  $("#changeTaskStaus").on('click', function(){
    console.log("In chnageTaskStatus on click");
    //convert to true false
    var statusSel;
    if($('#statusChangeIn').val()== "Complete"){
      statusSel = true;
    }
    else if($('#statusChangeIn').val()=="Work In Progress"){
      statusSel = false;
    } //end if else

    //create object
    var objectToSend ={
      id: $('#selectTaskIn').find(':selected').data('value'),
      status: statusSel
    };
    console.log("object to send", objectToSend);
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
      //establish display string
      var displayString="";
      var selectList="";
      //loop through data array
      for (var i = 0; i < data.length; i++) {
        displayString +='<li id ="'+data[ i ].id+'"data-value="'+ data[ i ].status+'">'+ data[ i ].task +"</li>";
        selectList+='<option data-value="'+data[ i ].id+'"> Item '+ data[ i ].id + "</option>";
      }
      //display on DOM
      $('#toDoList').html(displayString);
      $('#selectTaskIn').html(selectList);
    }// end success

  });//end ajax
};//end display tasks
