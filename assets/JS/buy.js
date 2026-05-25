// Button click animation
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    button.style.transform = "scale(0.95)";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);

  });
});

// Filter button active state
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {
      btn.classList.remove("active-filter");
    });

    button.classList.add("active-filter");

  });

});