console.log("toDo script is sourced");

$(document).ready(function(){
  console.log("JQ is sourced");
  //set focus to taskIn
  $('#taskIn').focus();
  //call display tasks
  displayTask();
  //Create Task on Click
  $('#createNewTask').on('click', function(){
    console.log("In createNewTask Click");
    //check for empty field
    if($('#taskIn').val()===""){
      $('#taskIn').fadeOut("slow").fadeIn("slow").focus();
    }else{
      //create true false values for task
      var statusIn;
      if($('#statusIn').val() == "Complete"){
        statusIn = true;
      }
      else if($('#statusIn').val()=="Work In Progress"){
        statusIn = false;
      }
      else if($('#statusIn').val()!= "Complete" ||$('#statusIn').val()!= "Work In Progress" ){
        $('#statusIn').fadeOut().fadeIn();
        return;
      }//end if else
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
    $("#statusIn").val($("#statusIn option:first").val());
    $('#taskIn').val('');
    }//end else
  });//END CREATE TASK CLICK

  //update status on CLICK
  $("#changeTaskStaus").on('click', function(){
    console.log("In changeTaskStatus on click");
    //check empties
    if($('#selectTaskIn option').val()=== "0"|| $('#statusChangeIn option').val()=== "0"){
      $('#selectTaskIn').fadeOut('slow').fadeIn('slow');
      $('#statusChangeIn').fadeOut('slow').fadeIn('slow');
    }
    else{
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
      displayTask();
      $("#selectTaskIn").val($("#selectTaskIn option:first").val());
      $("#statusChangeIn").val($("#statusChangeIn option:first").val());
    }//end else
  });// end change task on click

  //Delete Safety check
  $("#deleteTask").on("click", function(){
    $("#deleteTaskDiv").append("<div id='safetyCheck'><p> Are you sure you want to delete this Task?</p><button id='deleteYes'>Delete</button><button id='deleteNo'>Don't Delete</button></div>");
  });//end delete safety check

  //Delete Yes on click
  $("body").on("click","#deleteYes",function(){
    console.log("In Delete Yes Click");
    $('#safetyCheck').remove();
    console.log($('#deleteTaskSel option').val());
    //check for empty fields
    if($('#deleteTaskSel option').val()=== "0"){
      $('#deleteTaskSel').fadeOut().fadeIn();
      return;
    } else {

    //create object
    var taskToDelete={
      id: $('#deleteTaskSel').find(':selected').data('value'),
    };
    $.ajax({
      type:"DELETE",
      url: "/deleteTask",
      data:taskToDelete,
      success: function(data){
        console.log("Deleted Task: "+ data);
      }//end success
    });// end ajax call
      displayTask();
      $("#deleteTaskSel").val($("#deleteTaskSel option:first").val());
    }//end else
    });//end Delete on click

  //Delete No on click
  $("body").on("click","#deleteNo",function(){
   console.log("In Delete No Click");
   $('#safetyCheck').remove();
  });// end delete No

});//end doc ready

//Display tasks
var displayTask = function(){
  $.ajax({
    url:"/getTasks",
    success: function(data){
      console.log(" back with the Tasks:", data);
      //establish display string
      var displayString="";
      var selectList="<option value='0'disabled selected>Select a Task</option>";
      var deleteList="<option value='0'disabled selected>Select a Task</option>";
      //loop through data array
      for (var i = 0; i < data.length; i++) {
        if(data[ i ].status === true){
        displayString +='<li class="complete" id ="'+data[ i ].id+'"data-value="'+ data[ i ].status+'">'+ data[ i ].task +"</li>";
      } else{
        displayString +='<li id ="'+data[ i ].id+'"data-value="'+ data[ i ].status+'">'+ data[ i ].task +"</li>";
      }
        selectList+='<option data-value="'+data[ i ].id+'">'+ data[ i ].task + "</option>";
        deleteList+='<option data-value="'+data[ i ].id+'">'+ data[ i ].task + "</option>";
      }
      //display on DOM
      $('#toDoList').html(displayString);
      $('#selectTaskIn').html(selectList);
      $('#deleteTaskSel').html(deleteList);
    }// end success

  });//end ajax
};//end display tasks
