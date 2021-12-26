var increment = 0.1;
var zOffIncrement = 0.00005;
var scl = 50;
var cols, rows;

var totalParticles = 500;

var zOff = 0;

var fr;

var particles = [];

var flowfield = [];

function setup() {
  createCanvas(800, 800);
  pixelDensity(2);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  
  flowfield = new Array(cols * rows);
  
  for (var i = 0; i < totalParticles; i++) {
    particles[i] = new Particle();
  }
  
  background(0);
}

function draw() {
  var yOff = 0;
  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      var angle = noise(xOff, yOff, zOff) * TWO_PI * 2;
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.2);
      flowfield[index] = vector;
      xOff += increment;
      stroke(255);
    }
    yOff += increment;
    
    zOff += zOffIncrement;
  }
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  
  fr.html(floor(frameRate()));
}