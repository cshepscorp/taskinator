var formEl = document.querySelector("#task-form");
var tasksToDo = document.querySelector("#tasks-to-do");



var createTaskHandler = function() {

    // prevents browser from refreshing the page when form submits
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDo.appendChild(listItemEl);

    console.dir(listItemEl);
    };

formEl.addEventListener("submit", createTaskHandler);


document.getElementById("year").innerHTML = new Date().getFullYear() + " Taskinator";