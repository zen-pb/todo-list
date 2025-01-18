import Storage from "../classes/Storage";

export default function loadNotes() {
  const notes = Storage.getStorage("notes");

  const container = document.createElement("div");
  container.classList.add("note-container")

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("note-card-titleDiv");

    const title = document.createElement("h1");
    title.classList.add("note-card-title");
    title.textContent = note.title;

    titleDiv.append(title);

    const contentsDiv = document.createElement("div");
    contentsDiv.classList.add("note-card-contentsDiv");

    const content = document.createElement("p");
    content.classList.add("note-card-content");
    content.textContent = note.content;

    contentsDiv.append(content);

    card.append(titleDiv, contentsDiv);
    container.appendChild(card);
  });

  return container;
}
