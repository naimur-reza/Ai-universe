const body = document.getElementById("body");
const spinnerMain = document.getElementById("spinner");
const header = document.getElementById('header')
const loadSpinner = (condition) => {
  if (condition === true) {
      spinnerMain.classList.remove("hidden");
    body.classList.add("hidden");
    header.classList.add("hidden");
  } else if (condition === false) {
      spinnerMain.classList.add('hidden');
    body.classList.remove("hidden");
    header.classList.remove("hidden");
  }
};
