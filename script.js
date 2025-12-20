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

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = priority;
    prioritySpan.classList.add("priority", priority.toLowerCase());

    const textSpan = document.createElement("span");
    textSpan.textContent = text;

    li.appendChild(textSpan);
    li.appendChild(prioritySpan);

    taskList.appendChild(li);

    taskInput.value = "";
}
