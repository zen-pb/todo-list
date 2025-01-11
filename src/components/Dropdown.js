export default function Dropdown(button, list) {
  const div = document.createElement("div");
  div.classList.add(`${button.id}-dropdown`);

  const ul = document.createElement("ul");
  ul.classList.add("dropdown-items");

  list.forEach((item) => {
    const li = document.createElement("li");
    li.appendChild(item);
    ul.appendChild(li);
  });

  div.append(button, ul);

  return div;
}
