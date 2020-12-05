document.addEventListener("scroll", scrollOppositeDirection);
const spaltenHeight = document.getElementById("linke-spalte").clientHeight;
document.getElementById("linke-spalte").style.top = -spaltenHeight + window.innerHeight + "px";


function scrollOppositeDirection() {

	var newTop = (-spaltenHeight + window.innerHeight + (scrollY * 2)) + "px";
	console.log(newTop);
	document.getElementById("linke-spalte").style.top = newTop;
}