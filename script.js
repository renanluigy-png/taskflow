const taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const date = document.getElementById("dueDate").value;

  if (input.value.trim() === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const task = {
    text: input.value,
    priority: priority,
    date: date,
    done: false
  };

  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  taskList.innerHTML = "";
  let tasks = getTasks();

  const filter = document.getElementById("filter").value;

  if (filter === "pending") {
    tasks = tasks.filter(task => !task.done);
  }

  if (filter === "done") {
    tasks = tasks.filter(task => task.done);
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-row">
        <span class="task-text">${task.text}</span>
        <span class="priority ${getPriorityClass(task.priority)}">
          ${task.priority}
        </span>
      </div>
      <small>${task.date ? "📅 " + task.date : ""}</small>
      <button class="delete" onclick="deleteTask(${index})">✖</button>
    `;

    if (task.done) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.6";
    }

    li.onclick = () => toggleDone(index);
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  const tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function getPriorityClass(priority) {
  if (priority === "Alta") return "alta";
  if (priority === "Média") return "media";
  return "baixa";
}
