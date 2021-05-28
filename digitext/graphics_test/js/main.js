/* requestAnimationFrame shim */
if (window.requestAnimationFrame == null) {
    window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
}

var particles = null,
    controller = null;

$(document).ready(function() {
    var canvas = $('#display')[0];
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //resizeCanvasToDisplaySize(canvas);
    particles = new Particles(canvas, 1024*16, 4);
    particles.draw().start();
});

//window.addEventListener('resize', () => {
    //resizeCanvasToDisplaySize($('#display')[0]);
//})

