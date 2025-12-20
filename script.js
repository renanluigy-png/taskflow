let tasks = [];

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    priority: priority.value,
    date: dueDate.value,
    done: false
  });

  taskInput.value = "";
  loadTasks();
}

function loadTasks() {
  taskList.innerHTML = "";

  const filterValue = filter.value;

  tasks.forEach((task, index) => {
    if (
      (filterValue === "pending" && task.done) ||
      (filterValue === "done" && !task.done)
    ) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${task.text}</strong>
      <span class="priority ${task.priority}">${task.priority}</span>
      <small>${task.date || ""}</small>
      <button onclick="toggleTask(${index})">✔</button>
      <button onclick="deleteTask(${index})">✖</button>
    `;

    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  loadTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  loadTasks();
}

/* PARALLAX REAL */
const layers = document.querySelectorAll(".layer");

window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  layers.forEach((layer, i) => {
    const depth = (i + 1) * 8;
    layer.style.transform = `translate(${x / depth}px, ${y / depth}px)`;
  });
});
