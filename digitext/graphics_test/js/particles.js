/*global Igloo */

/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} nparticles initial particle count
 * @param {size} [size=5] particle size in pixels
 * @constructor
 */
function Particles(canvas, nparticles, size) {
    var igloo = this.igloo = new Igloo(canvas),
        gl = canvas.getContext("webgl");
        w = canvas.width, h = canvas.height;
    gl.disable(gl.DEPTH_TEST);
    this.worldsize = new Float32Array([w, h]);
    var scale = Math.floor(Math.pow(Particles.BASE, 2) / Math.max(w, h) / 3);
    this.scale = [scale, scale * 100];
    this.listeners = [];

    /* Vertex shader texture access not guaranteed on OpenGL ES 2.0. */
    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) === 0) {
        var msg = 'Vertex shader texture access not available.' +
                'Try again on another platform.';
        alert(msg);
        throw new Error(msg);
    }

    /* Drawing parameters. */
    this.size = size || 5;
    this.color = [0.14, 0.2, 0.5, 0.8];
    this.mousePos = [w * 0.5, h * 0.5];
    gl.canvas.addEventListener('mousemove', (e) => {
        this.mousePos[0] = e.pageX - $('#display')[0].offsetLeft;
        this.mousePos[1] = this.worldsize[1] - (e.pageY - $('#display')[0].offsetTop);
    });

    gl.canvas.addEventListener('mousedown', () => {
        this.start();
        this.birthing = true;
        console.log('birthing')
    });

    gl.canvas.addEventListener('mouseup', () => {
        this.birthing = false;
        console.log(this.getPixels());
    });

    /* Simulation parameters. */
    this.running = false;
    this.gravity = [0, -0.1];
    this.wind = [0, 0];
    this.maxAge = 500.0;
    this.birthIndex = 0;
    this.birthing = false;

    function texture() {
        return igloo.texture(null, gl.RGBA, gl.CLAMP_TO_EDGE, gl.NEAREST);
    }

    this.programs = {
        update:  igloo.program('glsl/quad.vert', 'glsl/update.frag'),
        draw:    igloo.program('glsl/draw.vert', 'glsl/draw.frag'),
        copy:    igloo.program('glsl/copy.vert', 'glsl/copy.frag')
    };
    this.buffers = {
        quad: igloo.array(Igloo.QUAD2),
        indexes: igloo.array(),
        point: igloo.array(new Float32Array([0, 0]))
    };
    this.textures = {
        p0: texture(),
        p1: texture(),
        v0: texture(),
        v1: texture(),
        a0: texture(), // age
        a1: texture(),
        c0: texture(), // canvas
        c1: texture(),
        test: texture()
    };
    this.framebuffers = {
        step: igloo.framebuffer()
    };

    this.setCount(nparticles, true);
    this.partAmount = this.getCount();
}

/**
 * Encoding base.
 * @type {number}
 * @const
 */
Particles.BASE = 255;

/**
 * @param {number} value
 * @param {number} scale to maximize use of dynamic range
 * @returns {Array} the 2-byte encoding of VALUE
 */
Particles.encode = function(value, scale) {
    var b = Particles.BASE;
    value = value * scale + b * b / 2;
    var pair = [
        Math.floor((value % b) / b * 255),
        Math.floor(Math.floor(value / b) / b * 255)
    ];
    return pair;
};

/**
 * @param {Array} pair
 * @param {number} scale to maximize use of dynamic range
 * @returns {number} the value for the encoded PAIR
 */
Particles.decode = function(pair, scale) {
    var b = Particles.BASE;
    return (((pair[0] / 255) * b +
             (pair[1] / 255) * b * b) - b * b / 2) / scale;
};

Particles.encodeAge = function(value) {
    var b = Particles.BASE;
    value = value;
    var pair = [
        (value % b) / b,
        Math.floor(value / b) / b
    ];
    return pair;
};

Particles.decodeAge = function(pair) {
    var b = Particles.BASE;
    return (pair[0] + pair[1] * b) * b;
};

/**
 * Allocates textures and fills them with initial random state.
 * @returns {Particles} this
 */
Particles.prototype.initTextures = function() {
    var tw = this.statesize[0], th = this.statesize[1],
        w = this.worldsize[0], h = this.worldsize[1],
        s = this.scale,
        rgbaP = new Uint8Array(tw * th * 4),
        rgbaV = new Uint8Array(tw * th * 4),
        rgbaA =  new Uint8Array(tw * th * 4);
    for (var y = 0; y < th; y++) {
        for (var x = 0; x < tw; x++) {
            var i = y * tw * 4 + x * 4,
                px = Particles.encode(Math.random() * w, s[0]),
                py = Particles.encode(Math.random() * h, s[0]),
                vx = Particles.encode(Math.random() * 3.0 - 0.5, s[1]),
                vy = Particles.encode(Math.random() * 2.5, s[1]);
            rgbaP[i + 0] = px[0];
            rgbaP[i + 1] = px[1];
            rgbaP[i + 2] = py[0];
            rgbaP[i + 3] = py[1];
            rgbaV[i + 0] = vx[0];
            rgbaV[i + 1] = vx[1];
            rgbaV[i + 2] = vy[0];
            rgbaV[i + 3] = vy[1];
            rgbaA[i + 0] = 0.0;
            rgbaA[i + 1] = 0.0;
            rgbaA[i + 2] = 0.0;
            rgbaA[i + 3] = 0.0;           
        }
    }

    var image = new Image();
    image.src = "./test.jpg";  // MUST BE SAME DOMAIN!!!
    image.onload = () => {
        console.log(this)
        const gl = this.igloo.gl;
        this.textures.test.bind();
 
        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
       
        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }

    rgbaC = new Uint8Array(w * h * 4);

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = y * w * 4 + x * 4;
            rgbaC[i + 0] = 0;
            rgbaC[i + 1] = 0;
            rgbaC[i + 2] = 0;
            rgbaC[i + 3] = 255;
        }
    }

    console.log(w, h)

    rgbaTest = new Uint8Array(w * h * 4);

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = y * w * 4 + x * 8;
            rgbaTest[i + 0] = 255;
            rgbaTest[i + 1] = 0;
            rgbaTest[i + 2] = 255;
            rgbaTest[i + 3] = 255;
            rgbaTest[i + 4] = 0;
            rgbaTest[i + 5] = 0;
            rgbaTest[i + 6] = 0;
            rgbaTest[i + 7] = 0;
        }
    }

    this.textures.p0.set(rgbaP, tw, th);
    this.textures.v0.set(rgbaV, tw, th);
    this.textures.a0.set(rgbaA, tw, th);
    this.textures.p1.blank(tw, th);
    this.textures.v1.blank(tw, th);
    this.textures.a1.blank(tw, th);
    this.textures.c0.set(rgbaC, w, h);
    this.textures.c1.blank(w, h);
    this.textures.test.set(rgbaTest, w, h);
    return this;
};

/**
 * Allocate array buffers and fill with needed values.
 * @returns {Particles} this
 */
Particles.prototype.initBuffers = function() {
    var tw = this.statesize[0], th = this.statesize[1],
        gl = this.igloo.gl,
        indexes = new Float32Array(tw * th * 2);
    for (var y = 0; y < th; y++) {
        for (var x = 0; x < tw; x++) {
            var i = y * tw * 2 + x * 2;
            indexes[i + 0] = x;
            indexes[i + 1] = y;
        }
    }
    this.buffers.indexes.update(indexes, gl.STATIC_DRAW);
    return this;
};

/**
 * Set a new particle count. This is a minimum and the actual count
 * may be slightly higher to fill out a texture.
 * @param {number} n
 * @returns {Particles} this
 */
Particles.prototype.setCount = function(n) {
    var tw = Math.ceil(Math.sqrt(n)),
        th = Math.floor(Math.sqrt(n));
    this.statesize = new Float32Array([tw, th]);
    this.initTextures();
    this.initBuffers();
    return this;
};

/**
 * @returns {number} the actual particle count
 */
Particles.prototype.getCount = function() {
    return this.statesize[0] * this.statesize[1];
};

/**
 * @returns {Array} list of all particle positions
 */
Particles.prototype.get = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.p0);
    var w = this.statesize[0], h = this.statesize[1],
        s = this.scale,
        rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    var particles = [];
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = y * w * 4 + x * 4,
                px = Particles.decode([rgba[i + 0], rgba[i + 1]], s[0]),
                py = Particles.decode([rgba[i + 2], rgba[i + 3]], s[0]);
            particles.push({x: px, y: py});
        }
    }
    return particles;
};

Particles.prototype.getPixels = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.c0);
    var w = this.worldsize[0], h = this.worldsize[1],
        rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    var particles = [];
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = y * w * 4 + x * 4;
            if(rgba[i + 0] !== 0 || rgba[i+1] !== 0 || rgba[i+2] !== 0 ) {
                particles.push(i);
            }
        }
    }
    return particles;
};

Particles.prototype.getAge = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.a0);
    var w = this.statesize[0], h = this.statesize[1],
        s = this.scale,
        rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    var particles = [];
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = y * w * 4 + x * 4,
                px = Particles.decodeAge([rgba[i + 0], rgba[i + 1]]),
                py = Particles.decodeAge([rgba[i + 2], rgba[i + 3]]);
            particles.push({alive: px, age: py});
        }
    }
    return particles;
};

Particles.prototype.getAge2 = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.a1);
    var w = this.statesize[0], h = this.statesize[1],
        s = this.scale,
        rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    var particles = [];
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var i = y * w * 4 + x * 4,
                px = Particles.decodeAge([rgba[i + 0], rgba[i + 1]]),
                py = Particles.decodeAge([rgba[i + 2], rgba[i + 3]]);
            particles.push(rgba[i + 0], rgba[i + 1], rgba[i + 2], rgba[i + 3]);
        }
    }
    return particles;
};


/**
 * Swap the foreground and background state.
 * @returns {Particles} this
 */
Particles.prototype.swap = function() {
    var tmp = this.textures.p0;
    this.textures.p0 = this.textures.p1;
    this.textures.p1 = tmp;
    tmp = this.textures.v0;
    this.textures.v0 = this.textures.v1;
    this.textures.v1 = tmp;
    tmp = this.textures.a0;
    this.textures.a0 = this.textures.a1;
    this.textures.a1 = tmp;
    tmp = this.textures.c0;
    this.textures.c0 = this.textures.c1;
    this.textures.c1 = tmp;
    return this;
};

/**
 * Step the simulation forward by one iteration.
 * @returns {Particles} this
 */
Particles.prototype.step = function() {
    const origin = this.mousePos;

    var igloo = this.igloo, gl = igloo.gl;
    gl.disable(gl.BLEND);
    this.framebuffers.step.attach(this.textures.p1);
    this.textures.p0.bind(0);
    this.textures.v0.bind(1);
    this.textures.a0.bind(2);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.update.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('position', 0)
        .uniformi('velocity', 1)
        .uniformi('age', 2)
        .uniform('maxAge', this.maxAge)
        .uniformi('birthIndex', this.birthIndex % this.partAmount)
        .uniform('birthing', this.birthing)
        .uniform('scale', this.scale)
        .uniform('random', Math.random() * 2.0 - 1.0)
        .uniform('gravity', this.gravity)
        .uniform('wind', this.wind)
        .uniform('worldsize', this.worldsize)
        .uniform('statesize', this.statesize)
        .uniform('origin', origin)
        .uniformi('derivative', 0)
        .draw(gl.TRIANGLE_STRIP, Igloo.QUAD2.length / 2);
    this.framebuffers.step.attach(this.textures.v1);
    this.programs.update
        .uniformi('derivative', 1)
        .uniform('random', Math.random() * 2.0 - 1.0)
        .draw(gl.TRIANGLE_STRIP, Igloo.QUAD2.length / 2);
    this.framebuffers.step.attach(this.textures.a1);
    this.programs.update
        .uniformi('derivative', 2)
        .uniform('random', Math.random() * 2.0 - 1.0)
        .draw(gl.TRIANGLE_STRIP, Igloo.QUAD2.length / 2);
    this.swap();

    if(this.birthing) {
        this.birthIndex++;
    }
    return this;
};

/**
 * Draw the current simulation state to the display.
 * @returns {Particles} this
 */
Particles.prototype.draw = function() {
    var igloo = this.igloo, gl = igloo.gl;
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    this.framebuffers.step.attach(this.textures.c1);
    gl.viewport(0, 0, this.worldsize[0], this.worldsize[1]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.textures.p0.bind(0);
    this.textures.v0.bind(1);
    this.textures.a0.bind(2);
    this.textures.c0.bind(3);
    this.programs.draw.use()
        .attrib('index', this.buffers.indexes, 2)
        .uniformi('positions', 0)
        .uniformi('velocities', 1)
        .uniformi('ages', 2)
        .uniformi('lastFrame', 3)
        .uniform('maxAge', this.maxAge)
        .uniform('statesize', this.statesize)
        .uniform('worldsize', this.worldsize)
        .uniform('size', this.size)
        .uniform('scale', this.scale)
        .uniform('color', this.color)
        .draw(gl.POINTS, this.statesize[0] * this.statesize[1]);
    igloo.defaultFramebuffer.bind();
    gl.viewport(0, 0, this.worldsize[0], this.worldsize[1]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.textures.c1.bind(3);
    this.programs.copy.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('pixels', 3)
        .draw(gl.TRIANGLE_STRIP, Igloo.QUAD2.length / 2);
    return this;
};

Particles.prototype.drawOriginal = function() {
    var igloo = this.igloo, gl = igloo.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    igloo.defaultFramebuffer.bind();
    gl.viewport(0, 0, this.worldsize[0], this.worldsize[1]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.textures.p0.bind(0);
    this.textures.v0.bind(1);
    this.programs.draw.use()
        .attrib('index', this.buffers.indexes, 2)
        .uniformi('positions', 0)
        .uniformi('velocities', 1)
        .uniform('statesize', this.statesize)
        .uniform('worldsize', this.worldsize)
        .uniform('size', this.size)
        .uniform('scale', this.scale)
        .uniform('color', this.color)
        .draw(gl.POINTS, this.statesize[0] * this.statesize[1]);
    return this;
};

Particles.prototype.draw2 = function() {
    var igloo = this.igloo, gl = igloo.gl;
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
    igloo.defaultFramebuffer.bind();
    gl.viewport(0, 0, this.worldsize[0], this.worldsize[1]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.textures.p0.bind(0);
    this.textures.v0.bind(1);
    this.textures.a0.bind(2);
    this.textures.c0.bind(3);
    this.programs.draw.use()
        .attrib('index', this.buffers.indexes, 2)
        .uniformi('positions', 0)
        .uniformi('velocities', 1)
        .uniformi('ages', 2)
        .uniformi('lastFrame', 3)
        .uniform('statesize', this.statesize)
        .uniform('worldsize', this.worldsize)
        .uniform('size', this.size)
        .uniform('scale', this.scale)
        .uniform('color', this.color)
        .draw(gl.POINTS, this.statesize[0] * this.statesize[1]);
    return this;
};


/**
 * Register with requestAnimationFrame to step and draw a frame.
 * @returns {Particles} this
 */
Particles.prototype.frame = function() {
    window.requestAnimationFrame(function() {
        if (this.running) {
            //this.stop();
            this.step().draw().frame();
            
        }
    }.bind(this));
    return this;
};

/**
 * Start animating the simulation if it isn't already.
 * @returns {Particles} this
 */
Particles.prototype.start = function() {
    if (!this.running) {
        this.running = true;
        this.frame();
    }
    return this;
};

/**
 * Immediately stop the animation.
 * @returns {Particles} this
 */
Particles.prototype.stop = function() {
    this.running = false;
    return this;
};
