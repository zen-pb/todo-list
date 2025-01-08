import "./utils.css";
import "./styles.css";
import loadInbox from "./inbox";

const routes = {
  inbox: loadInbox,
};

const content = document.getElementById("content");

document.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const route = routes[e.target.id];
  if (route) {
    content.innerHTML = "";
    route();
  }
});

loadInbox();
