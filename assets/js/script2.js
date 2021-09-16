var formEl = document.querySelector("#task-form");
var tasksToDo = document.querySelector("#tasks-to-do");
// we want to create a unique task id each time one is added
var taskIdCounter = 0;

// to prevent 'bubbling'
var pageContentEl = document.querySelector('#page-content');

// so we can "talk to" the 2nd and 3rd columns - In Progress and Completed
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// this array is going to hold our tasks to enable persistence
var tasks = [];

var completeEditTask = function(taskName, taskType, taskId) {
    // console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop thru tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) { // bc taskId is a string and tasks[i].id is a number
            tasks[i].name === taskName;
            tasks[i].type === taskType;
        }
    };

    // add to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task Updated!");

    // remove the task id and change the button text back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    
};

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

    // true when we're editing
    var isEdit = formEl.hasAttribute("data-task-id");
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do" // bc this data is being sent to createTaskEl so it can't be in progress or completed
        };
  
    createTaskEl(taskDataObj);
    }
};

var taskStatusChangeHandler = function(event) {
    console.log(event.target.getAttribute("data-task-id"));
    // get task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find parent task item element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // tasksToDoEl, tasksInProgressEl, and tasksCompletedEl are references to the <ul> elements
    if(statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks);

    // add to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
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

    // for our tasks array
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    // add to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // increase task counter for next unique id
    taskIdCounter++;

    // console.log(taskDataObj.status);

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

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // add to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

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


// create a new task
formEl.addEventListener("submit", taskFormHandler);

// listening for a form change (when user edits task and chooses a new status - to do, complete, in progress
pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    // Gets task items from localStorage.
    // reassign the tasks variable to whatever localStorage returns
    var savedTasks = localStorage.getItem("tasks");

    if(!savedTasks) {
        return false;
    } 
    console.log('Saved tasks found!');

    // Converts tasks from the string format back into an array of objects
    tasks = JSON.parse(tasks); // turns data back into a real array of objects
    // console.log(tasks);
    // Iterates thru a tasks array and creates task elements on the page from it.
    for(var i = 0; i < tasks.length; i++) {
        (tasks[i].id === parseInt(taskIdCounter));
        console.log(tasks[i]);
    }
}

loadTasks();


document.getElementById("year").innerHTML = new Date().getFullYear() + " Taskinator";

