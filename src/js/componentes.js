import { Todo } from "../classes";

import { todoList } from "../index";

// Referencias en el HTML
const divTodoList          = document.querySelector(".todo-list");
const txtInput             = document.querySelector(".new-todo");
const buttonClearCompleted = document.querySelector(".clear-completed");
const ulFilters            = document.querySelector(".filters");
const anchorFilters        = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id=${todo.id}>
      <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.completado ? "checked" : ""
        }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
    </li> 
  `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

// Eventos

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (e) => {
  const nombreElemento = e.target.localName; // Input,label,button
  const todoElemento = e.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");

  if (nombreElemento.includes("input")) {
    // Click en el checkbox

    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    // Hay que borrar el todo

    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
});

buttonClearCompleted.addEventListener("click", () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];

    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFilters.addEventListener("click", (e) => {
  const filtro = e.target.text;
  if (!filtro) return;

  anchorFilters.forEach( elem => elem.classList.remove('selected') );

  e.target.classList.add('selected');

  for (const elemento of divTodoList.children) {
    elemento.classList.remove("hidden");
    const completado = elemento.classList.contains("completed");

    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;

      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});
