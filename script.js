// ================= DOM =================
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const dueTimeInput = document.getElementById("dueTime");
const taskList = document.getElementById("taskList");

// ================= STATE =================
let tasks = [];

// ================= INIT =================
requestNotificationPermission();
loadTasksFromStorage();
renderTasks();
startNotificationWatcher();

// ================= FUNCTIONS =================
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  tasks.push({
    text,
    priority: prioritySelect.value,
    dueDate: dueDateInput.value,
    dueTime: dueTimeInput.value,
    done: false,
    notified: false
  });

  taskInput.value = "";
  dueDateInput.value = "";
  dueTimeInput.value = "";

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
          <button class="done-btn" onclick="toggleDone(${index})" aria-label="Concluir tarefa">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </button>

          <button class="delete-btn" onclick="deleteTask(${index})" aria-label="Excluir tarefa">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <small>
        ${task.priority}
        ${task.dueDate ? " • Data: " + task.dueDate : ""}
        ${task.dueTime ? " • Hora: " + task.dueTime : ""}
      </small>
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

function clearAllTasks() {
  if (!tasks.length) return;
  if (!confirm("Deseja apagar todas as tarefas?")) return;

  tasks = [];
  saveTasks();
  renderTasks();
}

// ================= NOTIFICATION =================
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function startNotificationWatcher() {
  setInterval(checkNotifications, 30 * 1000);
}

function checkNotifications() {
  const now = new Date();

  tasks.forEach(task => {
    if (task.done || task.notified || !task.dueDate || !task.dueTime) return;

    const taskTime = new Date(`${task.dueDate}T${task.dueTime}`);

    if (now >= taskTime) {
      fireNotification(task.text);
      task.notified = true;
      saveTasks();
    }
  });
}

function fireNotification(text) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification("TaskFlow", {
        body: text,
        tag: "taskflow-reminder",
        vibrate: [100, 50, 100]
      });
    });
  }

  playAppleLikeSound();
}

// ================= SOUND =================
function playAppleLikeSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);

  gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.6);
}

// ================= STORAGE =================
function saveTasks() {
  localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const data = localStorage.getItem("taskflow_tasks");
  if (data) tasks = JSON.parse(data);
}

// ================= PWA INSTALL =================
let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.createElement("button");
  btn.textContent = "Instalar TaskFlow";
  btn.className = "install-btn";
  document.querySelector(".container").prepend(btn);

  btn.addEventListener("click", async () => {
    btn.remove();
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
});
