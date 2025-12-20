const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const dateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);
filter.addEventListener("change", loadTasks);

window.onload = loadTasks;

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const task = {
        text: taskInput.value,
        priority: priorityInput.value,
        date: dateInput.value,
        done: false
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    dateInput.value = "";
    loadTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    taskList.innerHTML = "";
    let tasks = getTasks();

    if (filter.value === "pending") {
        tasks = tasks.filter(t => !t.done);
    }

    if (filter.value === "done") {
        tasks = tasks.filter(t => t.done);
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.text}</span>
            <span>${task.priority}</span>
            <small>${task.date ? "📅 " + task.date : ""}</small>
            <button onclick="deleteTask(${index})">✖</button>
        `;

        li.addEventListener("click", () => toggleDone(index));
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

