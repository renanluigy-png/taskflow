let tasks = [];

// carregar ao iniciar
loadTasksFromStorage();
renderTasks();

function addTask() {
  const text = taskInput.value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (text.trim() === "") return;

  tasks.push({
    text,
    priority,
    dueDate,
    done: false
  });

  taskInput.value = "";
  dueDate.value = "";

  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const priorityClass =
      task.priority === "Alta"
        ? "priority-high"
        : task.priority === "Média"
        ? "priority-medium"
        : "priority-low";

    li.className = `${priorityClass} ${task.done ? "done" : ""}`;

    li.innerHTML = `
      <div class="task-top">
        <strong>${task.text}</strong>
        <div class="actions">
          <button class="done-btn" onclick="toggleDone(${index})">
            ✔
          </button>
          <button class="delete-btn" onclick="deleteTask(${index})">
            ✖
          </button>
        </div>
      </div>
      <small>${task.priority} • ${task.dueDate || "sem data"}</small>
    `;

    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// 🗑 LIMPAR TUDO
function clearAllTasks() {
  if (!tasks.length) return;

  const confirmClear = confirm("Tem certeza que deseja apagar todas as tarefas?");
  if (!confirmClear) return;

  tasks = [];
  saveTasks();
  renderTasks();
}

// 💾 STORAGE
function saveTasks() {
  localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const data = localStorage.getItem("taskflow_tasks");
  if (data) tasks = JSON.parse(data);
}
