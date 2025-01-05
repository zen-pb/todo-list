import quillDark from "./quill-dark.svg";
import quillLight from "./quill-light.svg";

function setFaviconBasedOnTheme() {
  const favicon = document.getElementById("favicon");
  const userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  if (userTheme === "dark") {
    favicon.href = quillDark;
  } else {
    favicon.href = quillLight;
  }
}

export { setFaviconBasedOnTheme };
