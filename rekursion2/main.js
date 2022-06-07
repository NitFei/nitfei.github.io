let c1, c2, c3;
let progress, progressTarget;
let canvas;
let ft;
let ubahnIMG;

function setup() {
    c1 = color("#ffe8d6");
    c2 = color("#111601");
    //c2 = color("#0e1430")
    c3 = color("#9b9831");
    //c3 = color("#bc2f2f");
    //c3 = color("#b52929");
    
    pixelDensity(1); 
    //const canvasLength = min(windowWidth, windowHeight);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    // canvas.style('top', '50%');
    // canvas.style('left', '50%');
    // canvas.style('margin-top', -canvasLength*0.5 + 'px');
    // canvas.style('margin-left', -canvasLength*0.5 + 'px');
    progress = 0;
    progressTarget = 0;

    // Section B Setup
    ft = new FamilyTree();
    ft.addNode(new TreeNode(0, 0));

    // Section E Setup
    ubahnIMG = loadImage('./src/ubahn.png');
}

function draw() {
    //clampProgress();
    progress += (progressTarget - progress) * 0.05;
    background(c1);
    //if(progress > 0 && progress < 100) {
        drawSectionE();
    //}
}

document.onwheel = (e) => {
    progressTarget -= (detectMouseWheelDirection(e));
}

function clampProgress(){
    if(progressTarget < 0) {
        progressTarget = 0;
    }
}

/***************************
 ******* SECTION A *********
 ***************************/

function drawSectionA(){
    // text
    textSize(32);
    noStroke();
    fill(c2);
    //text("Vielleicht sind wir alle dazu verdammt, wie unsere Eltern zu werden", 100, 100);
    text("test test ich ", 100, 100);
    fill(c3);
    text("bin", 100 + textWidth("test test ich "), 100);
    fill(c2);
    text(" ein test", 100 + textWidth("test test ich ")+ textWidth("bin"), 100);
    // shapes
    push();
    stroke(c2);
    strokeWeight(1);
    //noStroke();
    const radius = min (width -20, height - 20) * 2;
    translate(width*0.5, height*0.5);
    //scale(pow(1.1,-progress));
    let depth = progress/20;
    drawCircle(0, 0, radius, depth, 1);
    pop();
}

function drawCircle(x, y, radius, _depth, dir) {
    if(_depth > 0) {
        if(((Math.floor(_depth)) / 2) % 1 === 0) {
            if(_depth >= 1) {
                fill(c2);
                circle(x,y, radius*2 - 0);
            }
            fill(c1);
        } else {
            if(_depth >= 1) {
                fill(c1);
                circle(x,y, radius*2 - 0);
            }
            fill(c2);
        }
        //if(_depth < 1) {
            if(dir > 0) {
                arc(x,y, radius*2,radius*2, TWO_PI*0.75, TWO_PI * (0.75 + (_depth % 1)), PIE);
            } else {
                arc(x,y, radius*2,radius*2, TWO_PI * (0.75 - (_depth % 1)), TWO_PI*0.75, PIE);
            }
                
        // } else {
        //    circle(x,y, radius*2);
        // }
        
        //circle(x,y,radius*2);
        
            drawCircle(x-radius*0.5, y, radius*0.5, _depth-1, -dir);
            drawCircle(x+radius*0.5, y, radius*0.5, _depth-1, dir);
    }
}

/***************************
 ******* SECTION B *********
 ***************************/

 function drawSectionB() {
    push();
    translate(width*0.5, height*0.5);
    ft.display(progress);
    pop();

    noStroke();
    fill(c3)
    circle(width*0.5, height*0.25, 100);
 }

/***************************
 ******* SECTION C *********
 ***************************/

 function drawSectionC() {
    strokeWeight(2);
    const triColor = color(red(c3), green(c3), blue(c3), 100);
    stroke(triColor);
    noFill();

    r = 200;

    // top left
    push();
    translate(width*0.25, height*0.25);
    drawTriangle(0, r, progressTarget, 0.1, 0.95);
    pop();

    // top right
    push();
    translate(width*0.75, height*0.25);
    drawTriangle(0, r, progressTarget, 0.15, 0.95);
    pop();

    // bottom left
    push();
    translate(width*0.25, height*0.75);
    drawTriangle(0, r, progressTarget, 0.2, 0.95);
    pop();

    // bottom right
    push();
    translate(width*0.75, height*0.75);
    drawTriangle(0, r, progressTarget, 0.25, 0.95);
    pop();
 }

 function drawTriangle(_angle, _r, _depth, angleIncr, rDec) {
    if(_depth > 0) {
        const x1 = Math.sin((TWO_PI/3)*1 + _angle) * _r;
        const y1 = Math.cos((TWO_PI/3)*1 + _angle) * _r;
        const x2 = Math.sin((TWO_PI/3)*2 + _angle) * _r;
        const y2 = Math.cos((TWO_PI/3)*2 + _angle) * _r;
        const x3 = Math.sin((TWO_PI/3)*3 + _angle) * _r;
        const y3 = Math.cos((TWO_PI/3)*3 + _angle) * _r;

        triangle(x1,y1, x2,y2, x3,y3);

        drawTriangle(_angle+angleIncr, _r*rDec, _depth-1, angleIncr, rDec)
    }
 }

/***************************
 ******* SECTION D *********
 ***************************/

function drawSectionD() {
    const msg = [..."Denn natürlich hatte die auch ihre eigenen Probleme mit ihrer eigenen Mutter. Hat sich auch gedacht, wenn ich mal Kinder habe, wird alles anders."]
    //Dachte sich, wenn ich mal Kinder habe, werde ich alles anders machen. Und dann kommt der Alltag, und dann kommt die Routine, und dann kommen die Geduldproben und man ist ja auch nur ein Mensch, man kann nicht immer"];
    
    noStroke();
    fill(c2);

    r = 0;

    push();
    translate(width*0.5, height*0.5);
    const scaleIncr = 0.04;
    const baseCond = 200;
    drawSpiralLetter(4 * (1 + (scaleIncr*(progress%1))), msg, progress%1, progress, scaleIncr, baseCond);
    pop();
}

function drawSpiralLetter(_scale, msg, _depth, maxDepth, _scaleIncr, _baseCond) {
    if(_depth <= min(maxDepth, _baseCond)) {
        textSize(_scale * 0.3);
        fill(red(c2), green(c2), blue(c2), (_depth + 10/_baseCond) * 255);

        rotate((TWO_PI * 0.0015) * -_depth * 0.5);
        text(msg[Math.floor((maxDepth - _depth) % msg.length)], -_scale*0.25, -_scale);


        drawSpiralLetter(_scale * (1 + _scaleIncr), msg, _depth + 1, maxDepth, _scaleIncr, _baseCond);
    }
}

/***************************
 ******* SECTION E *********
 ***************************/

function drawSectionE() {
    const heightFactor = 0.26 // found out through trial and error  
    const size = min(width, height)*8;
    const x = -size * 0.5;
    const y = -size * heightFactor;
    const depth = 0;
    // const maxDepth = Math.floor((progress/5));
    
    let maxDepth;
    let depthDecimal

    const walkStart = 50;

    push();
    if(progress < walkStart) {
        maxDepth = Math.floor((progress/5) + 3);
        depthDecimal = (progress/5) % 1;

        translate(width*0.5, height*heightFactor);
        scale(1/(pow(2.2,maxDepth)));

        drawUbahnDuringBuildUp(x, y, size, depth, maxDepth, depthDecimal);
    } else {
        maxDepth = (((4*walkStart-progress)/10));

        translate(width*0.5, height*heightFactor);
        scale(1/(pow(2.2,maxDepth)));

        drawUbahn(x, y, size, depth, maxDepth);
    }

    pop();
}

function drawUbahnDuringBuildUp(x, y, size, depth, maxDepth, depthDecimal) {
    if(depth<1) {
        fill(c1);
        noStroke();
        rect(x, y, size, size);

        scale(2.2); // 2.2 found out through trial and error
        tint(255, depthDecimal*255);
        image(ubahnIMG, x, y, size, size);        
        drawUbahnDuringBuildUp(x, y, size, depth+1, maxDepth, depthDecimal);
    } else if(depth<maxDepth){
        noTint();
        scale(2.2); // 2.2 found out through trial and error
        image(ubahnIMG, x, y, size, size);
        drawUbahnDuringBuildUp(x, y, size, depth+1, maxDepth, depthDecimal);
    }
}

function drawUbahn(x, y, size, depth, maxDepth) {
    if(depth<1) {
        fill(c1);
        noStroke();
        rect(x, y, size, size);
        fill(c2);
        textSize(200);
        text("BASE CASE", textWidth("BASE CASE") * -0.5, 100);
        textSize(50);
        text("Text, Grafik, Programming & Sound", textWidth("Text, Grafik, Programming & Sound") * -0.5, 400);
        textSize(100);
        text("Nitay Feigenbaum", textWidth("Nitay Feigenbaum") * -0.5, 500);
    }
    if(depth<maxDepth){
        scale(2.2); // 2.2 found out through trial and error
        image(ubahnIMG, x, y, size, size);
        drawUbahn(x, y, size, depth+1, maxDepth);
    }
}


 /**************************
 ********** UTIL ***********
 ***************************/
function detectMouseWheelDirection( e )
{
    let delta = null,
        direction = false
    ;
    if ( !e ) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if ( e.wheelDelta ) { // will work in most cases
        delta = e.wheelDelta / 60;
    } else if ( e.detail ) { // fallback for Firefox
        delta = -e.detail / 2;
    }
    if ( delta !== null ) {
        direction = delta > 0 ? 1 : -1;
    }

    return direction;
}

function windowResized() {
    //const canvasLength = min(windowWidth, windowHeight);
    resizeCanvas(windowWidth, windowHeight);
    //canvas.style('margin-top', -canvasLength*0.5 + 'px');
    //canvas.style('margin-left', -canvasLength*0.5 + 'px');
}
  