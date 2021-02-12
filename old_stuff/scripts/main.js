document.getElementById("navbarHoverHelper").addEventListener("mouseenter", makeNavbarAppear);
document.getElementById("navbarHoverHelper").addEventListener("mouseleave", makeNavbarDisappear);

function makeNavbarAppear() {
  document.getElementById("navbarHoverHelper").style.backgroundColor = "blue";
  docum
}

function makeNavbarDisappear() {
  document.getElementById("navbarHoverHelper").style.backgroundColor = "black";
}


/*
function enterHandler(ev) {
  document.getElementById("navbarHoverHelper").style.backgroundColor = "blue";
}
function init() {
  let el = document.getElementById("navbarHoverHelper");
  el.onpointerenter = enterHandler;
}
*/