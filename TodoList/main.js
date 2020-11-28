const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", function (e) {
  getTodo();
});

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);
function addTodo(e) {
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo";
  //console.log(todoDiv);
  const todos = document.createElement("li");
  todos.className = "todo-item";
  setTodo(todoInput.value);
  todos.appendChild(document.createTextNode(todoInput.value));
  todoDiv.appendChild(todos);
  todoInput.value = "";
  console.log(todos);

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeBtn);

  const trashBtn = document.createElement("button");
  trashBtn.className = "trash-btn";
  trashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
  todoDiv.appendChild(trashBtn);
  todoList.appendChild(todoDiv);
  e.preventDefault();
}
function deleteCheck(e) {
  const items = e.target;

  if (items.className == "trash-btn") {
    const todo = items.parentElement;
    todo.classList.add("fall");
    // console.log("Dc", todo);
    removeTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // console.log(e.target.parentElement);
  //console.log(items);

  if (items.className == "complete-btn") {
    const todo = items.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
  e.preventDefault();
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        console.log(e.target.value);
    }
    //console.log("toodo", todo);
  });
  e.preventDefault();
}
function setTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    //console.log(todoDiv);
    const todos = document.createElement("li");
    todos.className = "todo-item";

    todos.appendChild(document.createTextNode(todo));
    todoDiv.appendChild(todos);
    todoInput.value = "";
    console.log(todos);

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.className = "trash-btn";
    trashBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);
  });
}
function removeTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.childNodes[0].innerHTML;
  todos.splice(todos.indexOf(todoIndex), 1);
  console.log(todoIndex);
  localStorage.setItem("todos", JSON.stringify(todos));
}
