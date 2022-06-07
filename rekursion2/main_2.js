const canv = $("#canv")[0];
const ctx = canv.getContext("2d");

const c1 = "#ffe8d6";
const c2 = "#111601";

let depth = 0;


canv.width = window.innerWidth;
canv.height = window.innerHeight;
let width = $("#canv").width();
let height = $("#canv").height();

ctx.beginPath();
ctx.rect(0,0, width, height);
ctx.fillStyle = c1;
ctx.fill();

draw();

$("#canv").mousedown(()=>{
    depth++;
    draw();
});

function draw() {
    const radius = Math.min (width -20, height - 20) * 0.5;
    drawCircle(width*0.5, height*0.5, radius, depth);
}


function mousePressed() {
    depth++;
}

function drawCircle(x, y, radius, _depth) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = c2;
    ctx.lineWidth = 3;
    ctx.stroke();
    if(_depth > 0) {
        drawCircle(x-radius*0.5, y, radius*0.5, _depth-1);
        drawCircle(x+radius*0.5, y, radius*0.5, _depth-1);
    }
}

// scrolling part //
function setupScrolling() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.animation',
            pin: true,
            start: 'top top',
            end: '+=20000',
            scrub: 1.5,
        }
    });
    tl.fromTo('.animation', {background: 'linear-gradient(#000000, #313131)'}, {duration: 8, background: 'linear-gradient(#000000, #73858b)'}, 0)
}