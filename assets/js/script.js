var formEl = document.querySelector("#task-form");
var tasksToDo = document.querySelector("#tasks-to-do");
// we want to create a unique task id each time one is added
var taskIdCounter = 0;

// to prevent 'bubbling'
var pageContentEl = document.querySelector('#page-content');



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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDo.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
}    

var createTaskActions = function(taskId) {
    // taskId is how we're going to pass a diff id into the function each time to keep track of which elements belong to which task
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // adds an empty select element to the div container
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    // create an array to loop through for status options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl)
    }

    return actionContainerEl;

    
}
var editTask = function(taskId) {
    // console.log('editing task #' + taskId);
    // selecting a list item using .task-item and also has data-task-id equal to the argument we passed
    // no space between .task-item and data-task-id which means they must both be on the same element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    // will only search within the taskSelected element
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // changes the button so say save instead of add
    document.querySelector("#save-task").textContent = "Save Task";
    // add the taskId to a data-task-id attribute on the form itself
    formEl.setAttribute("data-task-id", taskId);

}

var deleteTask = function(taskId) {
    // selecting a list item using .task-item and also has data-task-id equal to the argument we passed
    // no space between .task-item and data-task-id which means they must both be on the same element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    var targetEl = event.target;
    // event.target reports the element on which an event occurs

    // matches() was created specifically for checking if an element matches certain criteria
    // similar to using the querySelector() method, but it doesn't find and return an element
    // instead, it returns true if the element would be returned by a querySelector() with the same argument
    
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        // get element's task id w getAttribute
        var taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }

    // delete button was cliked
    if (targetEl.matches(".delete-btn")) {
        // get element's task id w getAttribute
        var taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }

};

pageContentEl.addEventListener("click", taskButtonHandler);

document.getElementById("year").innerHTML = new Date().getFullYear() + " Taskinator";