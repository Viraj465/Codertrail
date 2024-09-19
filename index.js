const inputField = document.getElementById("input");
const submitBtn = document.getElementById("submitbtn");
const taskList = document.getElementById("task-list");
const messageElement = document.getElementById("message");

let tasks = [];

submitBtn.addEventListener("click", () => {
  const task = inputField.value.trim();

  if (task !== "") {
    tasks.push(task);
    inputField.value = "";
    displayTasks();
  } else {
    messageElement.textContent = "Please enter a task!";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 2000);
  }
});

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const taskElement = document.createElement("h4");
    taskElement.textContent = t;
    taskElement.addEventListener("click", () => {
      tasks.splice(i, 1);
      displayTasks();
    });
    taskList.appendChild(taskElement);
  });
}
