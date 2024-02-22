class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxLifeSpan = 1000;
        this.maxParticles = 1000;
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            // is particle still alive?
            if (this.particles[i].lifeSpan > 0) {
                // update particle
                this.particles[i].update();
            } else {
                // remove dead particle
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        // render every particle in system
        this.particles.forEach((p) => {
            p.render(ctx);
        });
    }

    addParticle(origin, time) {
        // is maximum amount of particles reached already?
        if (this.particles.length < this.maxParticles) {
            this.particles.push(new Particle(origin, this.maxLifeSpan, time));
        }
    }

    flow(flowField) {
        this.particles.forEach((p) => {
            // get the flow field's vector at the particle's position

            // divide by flowfield's cell resolution to find the right cell
            const vecPosX = Math.floor(p.pos[0] / flowField.cellSize);
            const vecPosY = Math.floor(p.pos[1] / flowField.cellSize);

            // look up flow field vector
            let flowForce = flowField.vecs[vecPosX][vecPosY];

            // scale force
            flowForce = vecMult(flowForce, 2);

            // apply force
            p.applyForce(flowForce);
        });
    }

    checkEdges(width, height) {
        this.particles.forEach((p) => {
            p.checkEdges(width, height);
        });
    }
}
