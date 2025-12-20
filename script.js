const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const filter = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

loadTasks();

function addTask() {
  if (!taskInput.value.trim()) return;

  tasks.push({
    text: taskInput.value,
    priority: priority.value,
    date: dueDate.value,
    done: false
  });

  taskInput.value = "";
  save();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  save();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (filter.value === "pending") {
    filtered = tasks.filter(t => !t.done);
  }
  if (filter.value === "done") {
    filtered = tasks.filter(t => t.done);
  }

  filtered.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-top">
        <span class="${task.done ? 'done' : ''}">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
      </div>

      <small>${task.date ? "📅 " + task.date : ""}</small>

      <div class="actions">
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="deleteTask(${index})">✕</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

/* ===== PARALLAX REAL ===== */
const layers = document.querySelectorAll(".layer");

window.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  layers.forEach((layer, i) => {
    const depth = (i + 1) * 8;
    layer.style.transform = `translate(${x / depth}px, ${y / depth}px)`;
  });
});

