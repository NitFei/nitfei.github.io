const hand = document.getElementById('hand');
hand.style.width = document.body.clientWidth * 0.5 + 'px';
hand.style.height = 'auto';

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', updateMousePos);

function updateMousePos(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

updateHandPos();

function updateHandPos() {
    hand.style.top = mouseY + 'px';
    hand.style.left = mouseX + 'px';
    hand.style.transform = 'rotate(180)'

    requestAnimationFrame(updateHandPos)
}
