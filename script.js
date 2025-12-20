const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === "") return;

    const li = document.createElement("li");
    li.classList.add("task-item");

    const spanText = document.createElement("span");
    spanText.textContent = taskText;

    const spanPriority = document.createElement("span");
    spanPriority.textContent = priority;
    spanPriority.classList.add("priority");

    if (priority === "Alta") spanPriority.classList.add("alta");
    if (priority === "Média") spanPriority.classList.add("média");
    if (priority === "Baixa") spanPriority.classList.add("baixa");

    li.appendChild(spanText);
    li.appendChild(spanPriority);

    taskList.appendChild(li);

    taskInput.value = "";
}
