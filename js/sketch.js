var t;
var step;

function setup() {
  let h = windowWidth*0.5;
  if(h>400){
    h = 400;
  }
  let canvas = createCanvas(windowWidth, h);
  rectMode(CENTER);
  canvas.parent('canvas');
  stroke(30, 144, 255, 18);
  noFill();
  t = 0;
  step = 0;
}

function draw() {
  if(t<1){
    var x1 = 0;
    var x2 = windowWidth * noise(t + 60);
    var x3 = windowWidth * noise(t + 70);
    var x4 = windowWidth;
    var y1 = height;
    var y2 = height * noise(t + 20);
    var y3 = height * noise(t + 30);
    var y4 = height/step;
  
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  
    t += 0.005;
    step += 1;
    if(step>30){
      step=0;
    }
  }
}
function windowResized() {
  let h = windowWidth*0.5;
  if(h>400){
    h = 400;
  }
  resizeCanvas(windowWidth, h);
  t = 0;
}