const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.addEventListener("keyup", function () {
            updateStorage();
        });

        nt.querySelector("img").addEventListener("click", function () {
            handleDelete(nt);
            updateStorage();
        });
    });
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "assets/delete.png";
    img.style.float = "right";
    notesContainer.appendChild(inputBox).appendChild(img);

    inputBox.focus();

    inputBox.addEventListener("keyup", () => {
        updateStorage();
    });

    img.addEventListener("click", function () {
        handleDelete(inputBox);
        updateStorage();
    });
    updateStorage();
})

function handleDelete(note) {
    const prevNote = note.previousElementSibling;
    const nextNote = note.nextElementSibling;

    note.remove();

    if (prevNote && prevNote.classList.contains("input-box")) {
        prevNote.focus();
    } else if (nextNote && nextNote.classList.contains("input-box")) {
        nextNote.focus();
    }
}

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        const noteToRemove = e.target.parentElement;
        handleDelete(noteToRemove);
        updateStorage();
    }
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

showNotes();