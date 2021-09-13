var formEl = document.querySelector("#task-form");
var tasksToDo = document.querySelector("#tasks-to-do");



var taskFormHandler = function() {

    // prevents browser from refreshing the page when form submits
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // make sure input values aren't empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form correctly!");
        return false;
    }

    // clears the input field after submitted
    formEl.reset();
    
    // package data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDo.appendChild(listItemEl);
}    

formEl.addEventListener("submit", taskFormHandler);


document.getElementById("year").innerHTML = new Date().getFullYear() + " Taskinator";