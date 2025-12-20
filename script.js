const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", () => {
    const text = input.value.trim();

    if (text === "") {
        alert("Digite uma tarefa");
        return;
    }

    const li = document.createElement("li");
    li.textContent = text;

    list.appendChild(li);
    input.value = "";
});
