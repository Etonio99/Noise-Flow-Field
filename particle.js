function Particle() {
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = 4;
  this.newColor = random(256);
  
  this.prevPos = this.pos.copy();
  
  this.colorUp = true;
  this.color1 = 0;
  this.color2 = 0;
  this.color3 = 0;
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.show = function() {
    stroke(255, this.changingColor, this.changingColor2, 5);
    if (this.colorUp) {
      this.changingColor++;
      this.changingColor2--;
      if(this.changingColor == 255) {
        this.colorUp = false;
      }
    }
    else {
      this.changingColor--;
      this.changingColor2++;
      if (this.changingColor == 0) {
        this.colorUp = true;
      }
    }
    
    strokeWeight(1);
    //point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrevious();
  }
  
  this.updateColors = function() {
    
  }
  
  this.updatePrevious = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  
  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrevious();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrevious();
    } 
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrevious();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrevious();
    }
  }
}