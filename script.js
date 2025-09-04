// Smooth scroll effect for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// TO-DO LIST FUNCTIONALITY
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// Load saved todos
document.addEventListener("DOMContentLoaded", loadTodos);

// Add new todo
addTodoBtn.addEventListener("click", () => {
  if (todoInput.value.trim() !== "") {
    addTodo(todoInput.value);
    saveTodo(todoInput.value);
    todoInput.value = "";
  }
});

// Function to add todo item
function addTodo(task, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = task;
  if (isCompleted) li.classList.add("completed");

  const btns = document.createElement("div");
  btns.classList.add("todo-btns");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete");
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => {
    li.remove();
    updateLocalStorage();
  };

  btns.appendChild(completeBtn);
  btns.appendChild(deleteBtn);
  li.appendChild(btns);
  todoList.appendChild(li);
}

// Save todos to localStorage
function saveTodo(task) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({ task, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(t => addTodo(t.task, t.completed));
}

// Update localStorage when modified
function updateLocalStorage() {
  let todos = [];
  document.querySelectorAll("#todoList li").forEach(li => {
    todos.push({
      task: li.childNodes[0].textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Contact form submission (dummy handler)
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for reaching out! I’ll get back to you soon.");
  this.reset();
});

// Lazy load fallback for images (extra check for older browsers)
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[loading='lazy']");
  images.forEach(img => {
    img.onload = () => img.classList.add("loaded");
  });
});