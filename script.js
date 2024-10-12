const stickyNotesContainer = document.querySelector(".sticky-notes-container");
let draggedNote = null;

function generateStickyNote(color) {
  const stickyNote = document.createElement("div");
  stickyNote.classList.add("sticky-note", color);
  stickyNote.innerHTML = `
        <div class="front">
            <h2 contenteditable="true">oye dimple</h2>
            <span class="delete-btn">×</span>
        </div>
        <div class="back">
            <h2 contenteditable="true">Back side</h2>
        </div>
    `;

  stickyNote.querySelectorAll("h2").forEach((h2) => {
    h2.addEventListener("blur", () => {
      if (h2.textContent.trim() === "") {
        h2.textContent = "Oye dimple";
      }
    });
  });

  const deleteBtn = stickyNote.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stickyNote.classList.add("fall");
    stickyNote.addEventListener("transitionend", () => stickyNote.remove());
  });

  stickyNote.setAttribute("draggable", true);
  stickyNote.addEventListener("dragstart", dragStart);
  stickyNote.addEventListener("dragend", dragEnd);

  stickyNote.addEventListener("dblclick", () => {
    stickyNote.style.transform =
      stickyNote.style.transform === "rotateY(180deg)"
        ? "rotateY(0deg)"
        : "rotateY(180deg)";
  });

  const rotation = Math.random() * 10 - 5;
  stickyNote.style.transform = `rotate(${rotation}deg)`;

  stickyNotesContainer.appendChild(stickyNote);
}

function dragStart(e) {
  draggedNote = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
  this.style.opacity = "0.5";
}

function dragEnd(e) {
  draggedNote.style.opacity = "1";
  draggedNote = null;
}

stickyNotesContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});

stickyNotesContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const dropX = e.clientX;
  const dropY = e.clientY;
  draggedNote.style.position = "absolute";
  draggedNote.style.left = `${dropX - draggedNote.offsetWidth / 2}px`;
  draggedNote.style.top = `${dropY - draggedNote.offsetHeight / 2}px`;
});

const colors = ["imperial-blue", "pink", "yellow", "green", "blue"];
colors.forEach((color) => {
  generateStickyNote(color);
});
