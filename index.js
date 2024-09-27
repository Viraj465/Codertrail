const inputField = document.getElementById("input");
const submitBtn = document.getElementById("submitbtn");
const taskList = document.getElementById("task-list");
const messageElement = document.getElementById("message");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const taskListItem = document.createElement("h4");
    const taskElement = document.createElement("span");
    taskElement.textContent = t;
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.dataset.index = i;
    editButton.addEventListener("click", editTask);
    const delButton = document.createElement("button");
    delButton.textContent = "Delete";
    delButton.dataset.index = i;
    delButton.addEventListener("click", deleteTask);
    taskListItem.appendChild(taskElement);
    taskListItem.appendChild(editButton);
    taskListItem.appendChild(delButton);
    taskList.appendChild(taskListItem);
  });
}

displayTasks();

function addTask(e) {
  e.preventDefault();
  const task = inputField.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    inputField.value = "";
    messageElement.textContent = "";
  } else {
    messageElement.textContent = "Please enter a task";
  }
}

function editTask(e) {
  const taskIndex = e.target.dataset.index;
  const task = tasks[taskIndex];
  inputField.value = task;
  submitBtn.textContent = "Update Task";

  submitBtn.onclick = function () {
    const updatedTask = inputField.value.trim();
    if (updatedTask) {
      tasks[taskIndex] = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
      inputField.value = "";
      submitBtn.textContent = "Add Task";
      submitBtn.onclick = addTask;
    } else {
      messageElement.textContent = "Please enter a task";
    }
  };
}

function deleteTask(e) {
  const taskIndex = e.target.dataset.index;
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

submitBtn.addEventListener("click", addTask);

// submitBtn.addEventListener("click", () => {
//   const task = inputField.value.trim();

//   if (task !== "") {
//     tasks.push(task);
//     inputField.value = "";
//     displayTasks();
//   } else {
//     messageElement.textContent = "Please enter a task!";
//     setTimeout(() => {
//       messageElement.textContent = "";
//     }, 2000);
//   }
// });

// function displayTasks() {
//   taskList.innerHTML = "";
//   tasks.forEach((t, i) => {
//     const taskElement = document.createElement("h4");
//     taskElement.textContent = t;
//     taskElement.addEventListener("click", () => {
//       tasks.splice(i, 1);
//       displayTasks();
//     });
//     taskList.appendChild(taskElement);
//   });
// }
