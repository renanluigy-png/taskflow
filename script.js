const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Carregar tarefas salvas
function loadTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        createTaskElement(task.text, task.priority, index);
    });
}

// Adicionar tarefa
function addTask() {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (text === "") return;

    // impedir duplicadas
    const exists = tasks.some(task => task.text === text);
    if (exists) {
        alert("Essa tarefa já existe!");
        return;
    }

    tasks.push({ text, priority });
    saveTasks();
    loadTasks();

    taskInput.value = "";
}

// Criar elemento da tarefa
function createTaskElement(text, priority, index) {
    const li = document.createElement("li");
    li.className = "task-item";

    const spanText = document.createElement("span");
    spanText.textContent = text;

    const spanPriority = document.createElement("span");
    spanPriority.textContent = priority;
    spanPriority.className = `priority ${priority.toLowerCase()}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.onclick = () => removeTask(index);

    li.appendChild(spanText);
    li.appendChild(spanPriority);
    li.appendChild(removeBtn);

    taskList.appendChild(li);
}

// Remover tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
}

// Salvar no localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Enter adiciona tarefa
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

loadTasks();
