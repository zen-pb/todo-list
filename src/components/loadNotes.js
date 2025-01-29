import Storage from "../classes/Storage";
import closeSVG from "../assets/images/note-close.svg";

export default function loadNotes() {
  const notes = Storage.getStorage("notes");

  const container = document.createElement("div");
  container.classList.add("notes-container");

  notes.reverse().forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.classList.add(`${note.id}`);

    const closeBTN = document.createElement("button");
    closeBTN.type = "button";
    closeBTN.id = "close";

    const img = document.createElement("img");
    img.src = closeSVG;

    closeBTN.append(img);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("note-card-titleDiv");

    const title = document.createElement("h1");
    title.classList.add("note-card-title");
    title.textContent = note.title;

    titleDiv.append(title);

    const contentsDiv = document.createElement("div");
    contentsDiv.classList.add("note-card-contentsDiv");

    const content = document.createElement("p");
    content.classList.add("note-card-contents");
    content.textContent = note.content;

    contentsDiv.append(content);

    card.append(closeBTN, titleDiv, contentsDiv);
    container.appendChild(card);
  });

  return container;
}
