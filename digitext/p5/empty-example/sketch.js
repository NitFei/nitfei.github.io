let pS;

function setup() {
  createCanvas(400, 400);
  pS = new ParticleSystem(width/2, height/2);
  pS.spawnAllParticles();
}
function draw() {
  background(255);
  pS.update();
  pS.display();
}

