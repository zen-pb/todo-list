export default function Dropdown(button, list) {
  const div = document.createElement("div");
  div.classList.add(`${button.id}-dropdown`);

  button.classList.add("dropdown-button");

  const ul = document.createElement("ul");
  ul.classList.add("dropdown-items");

  if (list.length > 1) {
    list.forEach((item) => {
      const li = document.createElement("li");
      li.appendChild(item);
      ul.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.appendChild(list);
    ul.appendChild(li);
  }

  div.append(button, ul);

  return div;
}
