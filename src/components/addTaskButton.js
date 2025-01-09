import addSvg from "../assets/images/add.svg";

export default function addTaskButton() {
  const button = document.createElement("button");
  const span = document.createElement("span");
  const img = document.createElement("img");

  img.src = addSvg;
  span.append(img);

  button.appendChild(span);
  button.appendChild(document.createTextNode("Add task"));

  return button;
}
