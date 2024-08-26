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
            nt.remove();
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
    notesContainer.appendChild(inputBox).appendChild(img); 

    inputBox.focus();

    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(inputBox, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    inputBox.addEventListener("keyup", updateStorage);
    img.addEventListener("click", function () {
        inputBox.remove();
        updateStorage();
        const range = document.createRange();
        range.selectNodeContents(inputBox);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });

    updateStorage();
})

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
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