var buttonEl = document.querySelector("#save-task");
var tasksToDo = document.querySelector("#tasks-to-do");



var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task";
    tasksToDo.appendChild(listItemEl);
    };

buttonEl.addEventListener("click", createTaskHandler);
// console.log(buttonEl);



var footerEl = document.querySelector("footer");
footerEl.textContent = "2021 Taskinator";