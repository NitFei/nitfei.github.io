class Particle {
    constructor(_x,_y) {
        this.pos = createVector(_x, _y);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0,0);
        this.age = 0;
        this.maxForce = 1;
    }

    display = () => {
        stroke(0);
        fill(0);
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }

    update = () => {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.age++;
    }

    align = (particles) => {
        const perceptionRadius = 50;
        let steering = createVector();
        let totalCount = 0;
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            if(particle != this && d < perceptionRadius) {
                steering.add(particle.vel);
                totalCount++;
            }
        })
        
        if (totalCount > 0) {
            steering.div(totalCount);
            steering.sub(this.vel);
        }

        steering.limit(this.maxForce);
        return steering;
    }

    flock = (particles) =>{
        const alignment = this.align(particles);
        this.acc = alignment;
    }
}