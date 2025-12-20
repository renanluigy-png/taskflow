const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("taskList");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        createTaskElement(task.text, task.priority, index);
    });
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (text === "") return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, priority });
    saveTasks(tasks);

    createTaskElement(text, priority, tasks.length - 1);

    taskInput.value = "";
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function createTaskElement(text, priority, index) {
    const li = document.createElement("li");
    li.className = "task-item";

    const spanText = document.createElement("span");
    spanText.textContent = text;

    const spanPriority = document.createElement("span");
    spanPriority.textContent = priority;
    spanPriority.className = `priority ${priority}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.onclick = () => removeTask(index);

    li.appendChild(spanText);
    li.appendChild(spanPriority);
    li.appendChild(removeBtn);

    taskList.appendChild(li);
}

loadTasks();
