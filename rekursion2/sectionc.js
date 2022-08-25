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