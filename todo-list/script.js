const botao = document.querySelector(".lista-button");
const lista = document.querySelector(".lista-list");
const ent = document.querySelector(".lista-input");

document.addEventListener("DOMContentLoaded", gettodos);
botao.addEventListener("click", addlista);
lista.addEventListener("click", deleteCheck);

function createComponents(value) {
    const listaDiv = document.createElement("div");
    listaDiv.classList.add("lista");
    const newlista = document.createElement("li");
    newlista.innerText = value;
    newlista.classList.add("lista-item");
    listaDiv.appendChild(newlista);
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = "<i class='fas fa-minus-circle'></i>";
    trashbutton.classList.add("trash-btn");
    listaDiv.appendChild(trashbutton);
    const completedbutton = document.createElement("button");
    completedbutton.innerHTML = "<i class='fas fa-check'></i>";
    completedbutton.classList.add("check-btn");
    listaDiv.appendChild(completedbutton);
    const editbutton = document.createElement("button");
    editbutton.innerHTML = "<i class='fas fa-pencil-alt'></i>";
    editbutton.classList.add("edit-btn");
    listaDiv.appendChild(editbutton);
    lista.appendChild(listaDiv);
}

function addlista(e) {
    e.preventDefault();
    if (!ent.value) return;
    createComponents(ent.value);
    saveLocaltodos(ent.value);
    ent.value = "";
}

function saveLocaltodos(lista) {
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }
    todos.push(lista);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteCheck(e) {
    const item = e.target;
    const lista = item.parentElement;
    if (item.classList[0] === "trash-btn") {
        lista.classList.add("fall");
        lista.addEventListener("animationend", function () {
            removeLocaltodos(lista);
            lista.remove();
        });
    }

    if (item.classList[0] === "check-btn") lista.classList.toggle("completed");
    if (item.classList[0] === "edit-btn") {
            editarTarefa(lista);
            lista.edit();
    };
}

function gettodos() {
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }
    todos.forEach(function (lista) {
        createComponents(lista);
    });
}
function editarTarefa(lista){
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }
    document.getElementById("lista").innerHTML=" ";
    editElement("li");
    newlista.innerText = value;
}

function removeLocaltodos(lista) {
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }
    const listaIndex = lista.children[0].innerText;
    todos.splice(todos.indexOf(listaIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}