const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();
    const priority = priorityInput.value;

    if (text === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${text}</span>
        <span>[${priority}]</span>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
}
