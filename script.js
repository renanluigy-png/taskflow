const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

if (!taskInput || !prioritySelect || !taskList || !addBtn) {
    alert("Erro: elementos não encontrados no HTML");
}

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text + " (" + task.priority + ")";

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

function addTask() {
    alert("Função addTask chamada");

    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (text === "") {
        alert("Digite algo");
        return;
    }

    tasks.push({ text, priority });
    renderTasks();

    taskInput.value = "";
}

addBtn.onclick = addTask;
