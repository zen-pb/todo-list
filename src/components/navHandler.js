export default function navHandler() {
  const navButtons = document.querySelectorAll("nav button");

  const routes = {
    inbox,
    today,
    week,
    projects,
    notes,
  };

  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const route = routes[e.target.id];
      if (route) {
        return route;
      }
    });
  });
}
