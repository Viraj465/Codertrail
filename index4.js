document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded.");

  // innerhtml elements
  const inputField = document.getElementById("input-field");
  const taskList = document.getElementById("task-list");
  const submitBtn = document.getElementById("submit-btn");
  const messageField = document.getElementById("message");

  inputField.focus();
  let arr = JSON.parse(localStorage.getItem("arr") || "[]");

  if (!Array.isArray(arr)) {
    arr = [];
  }

  var displayTasks = function () {
    taskList.innerHTML = " ";

    arr.forEach((task, idx) => {
      // InputField functionality
      const taskListElements = document.createElement("li"); //list content
      const taskElement = document.createElement("p"); //inner sentence content
      taskElement.textContent = task;

      // Create update btn and delete button
      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Update Task";
      updateBtn.dataset.index = idx;
      updateBtn.addEventListener("click", updateTask);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete Task";
      deleteBtn.dataset.index = idx;
      deleteBtn.addEventListener("click", deleteTask);

      // add a node to the end of the list of children of a specified parent node.
      taskListElements.appendChild(taskElement);
      taskListElements.appendChild(updateBtn);
      taskListElements.appendChild(deleteBtn);

      // add whole node to main block
      taskList.appendChild(taskListElements);
    });
  };

  const addTask = function (e) {
    e.preventDefault();

    const inputFieldValue = inputField.value.trim();
    if (inputFieldValue !== "") {
      arr.push(inputFieldValue);
      localStorage.setItem("arr", JSON.stringify(arr));
      displayTasks();
      inputField.value = "";
      messageField.textContent = "";
    } else {
      messageField.textContent = "Input field is empty. Enter a task.";
      setTimeout(() => {
        messageField.textContent = "";
      }, 3000);
    }
  };

  let currentUpdateIdx = -1;

  const updateTask = function (e) {
    const idx = e.target.dataset.index;
    inputField.value = arr[idx];
    submitBtn.textContent = "Save Task";
    currentUpdateIdx = idx;

    submitBtn.removeEventListener("click", addTask);
    submitBtn.addEventListener("click", saveUpdatedTask);
  };

  const saveUpdatedTask = function (e) {
    e.preventDefault();

    const newInputFieldValue = inputField.value.trim();
    if (newInputFieldValue && currentUpdateIdx !== -1) {
      arr[currentUpdateIdx] = newInputFieldValue;
      localStorage.setItem("arr", JSON.stringify(arr));
      displayTasks();
      inputField.value = "";
      submitBtn.textContent = "Add Task";
      currentUpdateIdx = -1;
      submitBtn.removeEventListener("click", saveUpdatedTask);
      submitBtn.addEventListener("click", addTask);
    } else {
      messageField.textContent = "Please enter a valid task.";
      setTimeout(() => {
        messageField.textContent = "";
      }, 3000);
    }
  };

  const deleteTask = function (e) {
    const idx = e.target.dataset.index;
    arr.splice(idx, 1);
    localStorage.setItem("arr", JSON.stringify(arr));
    displayTasks();
    console.log("Task Deleted");
  };

  submitBtn.addEventListener("click", addTask);
  displayTasks();
});
