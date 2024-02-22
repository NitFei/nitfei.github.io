window.onload = () => {
    // cache canvas and drawing context of the drawing canvas
    const canvas = document.getElementById("canv");
    const ctx = canvas.getContext("2d");

    // cache canvas and drawing context of the drawing canvas
    const copyCanvases = document.getElementsByClassName("copy-canv");
    console.log(copyCanvases);
    const copyCtxs = [];
    for (let i = 0; i < copyCanvases.length; i++) {
        copyCtxs.push(copyCanvases[i].getContext("2d"));
    }

    // set initial backgroundcolor
    let bgCol = "black";

    // make it responsive
    window.addEventListener("resize", resize);
    resize();

    // instantiate particle system
    let ps = new ParticleSystem();

    // instantiate flow field
    noise.seed(Math.random());
    let ff = new FlowField(50, canvas.width, canvas.height);

    // variable to keep track of time
    let time = 0;

    // start drawing
    step();

    // main draw loop
    function step() {
        for (let i = 0; i < 3; i++) {
            // clear background
            //ctx.clearRect(0, 0, canvas.width, canvas.height);

            // birth new particle
            ps.addParticle([canvas.width * 0.5, canvas.height * 0.5], time);

            // update flow field
            ff.update(time);

            // apply flow field to particles
            ps.flow(ff);

            // update particle system
            ps.update();
            ps.checkEdges(canvas.width, canvas.height);

            // draw particle system
            ps.render(ctx);

            // draw flow field
            //ff.render(ctx);

            // increment time
            time++;
        }

        // copy onto the copy canvas
        copyCtxs.forEach((cc) => cc.drawImage(canvas, 0, 0));
        // wait for next frame, then restart loop
        requestAnimationFrame(step);
    }

    // responsiveness logic
    function resize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        for (let i = 0; i < copyCanvases.length; i++) {
            copyCanvases[i].width = copyCanvases[i].clientWidth;
            copyCanvases[i].height = copyCanvases[i].clientHeight;
        }

        ctx.fillStyle = bgCol;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};
