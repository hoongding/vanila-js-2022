const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");

const TODOS_KEY = "toDos";

let toDos = [];

function deleteToDo(event) {
  //Delete a ToDo
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDO) => toDO.id !== parseInt(li.id)); //Delete a ToDo in DataBase
  saveToDos();
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(TODOS_KEY));
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id; //give ID to li.
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span); // Create a span child in li
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = ""; //Empty the input data
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), //it looks like random ID
  };
  toDos.push(newTodoObj); //Update DataBase(toDos)
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (saveToDos) {
  const parsedToDos = JSON.parse(saveToDos);
  toDos = parsedToDos; //After submit, restore previous value
  parsedToDos.forEach(paintToDo); //JS will give the text to paintToDO
}
