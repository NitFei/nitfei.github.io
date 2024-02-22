class Particle {
    constructor(origin, maxLifeSpan, time) {
        this.pos = origin;

        this.maxVel = 1;
        this.vel = [this.maxVel * 0.5 - Math.random() * this.maxVel, this.maxVel * 0.5 - Math.random() * this.maxVel];

        this.acc = [0, 0];

        this.size = 1;

        this.maxLifeSpan = maxLifeSpan;
        this.lifeSpan = maxLifeSpan;

        this.color = [((time * 0.1) % 60) - 120, 50, 50, 0.1];

        this.history = [];
        this.maxHistoryLength = 100;
    }

    // draw the particle onto the canvas
    render(ctx) {
        ctx.fillStyle = `hsla(${this.color[0] + 10},${this.color[1]}%,${this.color[2]}%,${this.color[3]})`;

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
        ctx.fill();

        // // draw history tail
        // if (this.history.length > 1) {
        //   ctx.beginPath();
        //   // start at the newest point
        //   ctx.moveTo(this.history[0][0], this.history[0][1]);

        //   // cycle through the rest of the points
        //   for (let i = 1; i < this.history.length; i++) {
        //     ctx.lineTo(this.history[i][0], this.history[i][1]);
        //   }
        //   ctx.stroke();
        // }
    }

    update() {
        this.vel = vecAdd(this.vel, this.acc);
        this.clampVel();
        this.pos = vecAdd(this.pos, this.vel);

        // reset acceleration
        this.acc = [0, 0];

        this.updateColor();

        // // log position onto history
        // this.history.unshift(this.pos);

        // // trim history to max size
        // if (this.history.length > this.maxHistoryLength) {
        //   this.history.pop();
        // }

        this.lifeSpan--;
    }

    updateColor() {
        //this.color[0] = this.color[0] + ((Math.random() * 20 - 10) % 360);

        this.color[1] += Math.random() * 8.5 - 4.25;
        // clamp color[1] between 0 and 100
        this.color[1] = Math.max(0, Math.min(this.color[1], 100));

        this.color[2] += Math.random() * 8.5 - 4.25;
        // clamp color[2] between 0 and 100
        this.color[2] = Math.max(0, Math.min(this.color[2], 100));
    }

    applyForce(force) {
        this.acc = vecAdd(this.acc, force);
    }

    checkEdges(width, height) {
        let resetHistory = false;
        if (this.pos[0] < 0) {
            this.pos[0] = width;
            resetHistory = true;
        } else if (this.pos[0] >= width) {
            this.pos[0] = 0;
            resetHistory = true;
        }

        if (this.pos[1] < 0) {
            this.pos[1] = height;
            resetHistory = true;
        } else if (this.pos[1] >= height) {
            this.pos[1] = 0;
            resetHistory = true;
        }
        if (resetHistory) {
            this.history = [];
        }
    }

    clampVel() {
        if (magnitude(this.vel) > this.maxVel) {
            this.vel = setMag(this.vel, this.maxVel);
        }
    }
}
