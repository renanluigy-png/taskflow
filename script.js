function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const taskList = document.getElementById("taskList");

  if (input.value === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `${input.value} - <strong>${priority}</strong>`;

  li.onclick = () => {
    li.style.textDecoration = "line-through";
  };

  taskList.appendChild(li);
  input.value = "";
}

