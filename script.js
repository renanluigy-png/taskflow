const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// carregar do localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// salvar no localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// renderizar tarefas
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = task.priority;
        prioritySpan.className = `priority ${task.priority}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✖";
        removeBtn.addEventListener("click", () => removeTask(index));

        li.appendChild(textSpan);
        li.appendChild(prioritySpan);
        li.appendChild(removeBtn);

        taskList.appendChild(li);
    });
}

// adicionar tarefa
function addTask() {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (text === "") return;

    // bloquear duplicadas
    const exists = tasks.some(task => task.text === text);
    if (exists) {
        alert("Essa tarefa já existe!");
        return;
    }

    tasks.push({ text, priority });
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// remover tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// eventos
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// inicialização
renderTasks();

