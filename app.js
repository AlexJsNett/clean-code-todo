const newTaskInput = document.getElementById("new-task");
const addButton = document.querySelector(".task-row-wrapper button");
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  // innerText, not innerHTML: user input must not be parsed as markup.
  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  moveTask(listItem, todoList, completeTask);

  newTaskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
};

const moveTask = function (listItem, targetList, onCheckboxChange) {
  targetList.appendChild(listItem);
  bindTaskItemEvents(listItem, onCheckboxChange);
};

const completeTask = function () {
  moveTask(this.parentNode, completedList, reopenTask);
};

const reopenTask = function () {
  moveTask(this.parentNode, todoList, completeTask);
};

addButton.addEventListener("click", addTask);

const bindTaskItemEvents = function (listItem, onCheckboxChange) {
  const checkbox = listItem.querySelector("input[type=checkbox]");
  const editButton = listItem.querySelector("button.edit");
  const deleteButton = listItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

const bindListItemsEvents = function (list, onCheckboxChange) {
  for (const listItem of list.children) {
    bindTaskItemEvents(listItem, onCheckboxChange);
  }
};

bindListItemsEvents(todoList, completeTask);
bindListItemsEvents(completedList, reopenTask);
