export default function Button(textContent, image = "") {
  const button = document.createElement("button");

  if (image !== "") {
    const span = document.createElement("span");
    const img = document.createElement("img");
    img.src = image;
    span.append(img);

    button.appendChild(span);   
  }

  button.appendChild(document.createTextNode(textContent));
  return button;
}
