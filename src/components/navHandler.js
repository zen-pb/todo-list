import loadContent from "./loadContent";

export default function navHandler() {
  const navButtons = document.querySelectorAll("nav button");

  const routes = {
    inbox: "Inbox",
    projects: "Projects",
    notes: "Notes",
  };

  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.target.closest("button");

      const route = routes[target.id];

      if (route) {
        loadContent(route);
      }
    });
  });

  loadContent();
}
