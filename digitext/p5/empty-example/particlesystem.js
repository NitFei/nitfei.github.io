class ParticleSystem {
    constructor(x,y) {
        this.particles = [];
        this.origin = createVector(x,y);
        this.maxAge = 500;
        this.maxPopulation = 100;
    }

    spawnAllParticles = () => {
        for (let i = 0; i < this.maxPopulation; i++) {
            this.addParticle(random(width), random(height));
        }
    }

    addParticle = (x, y) => {
        this.particles.push(new Particle(x, y));
    }

    addParticleAtOrigin = () => {
        this.addParticle(this.origin.x, this.origin.y);
    }

    update = () => {
        for (let i = this.particles.length -1; i >= 0; i--) {
            // if (this.particles[i].age > this.maxAge) {
            //     this.particles.splice(i, 1);
            // }
            this.particles[i].flock(this.particles);
            this.particles[i].update();
        }

        // if(this.particles.length < this.maxPopulation) {
        //     this.addParticleAtOrigin();
        // }
    }

    display = () => {
        this.particles.forEach(particle => {
            particle.display();
        })
    }
}