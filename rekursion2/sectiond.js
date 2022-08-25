/***************************
 ******* SECTION D *********
 ***************************/

function drawSectionD() {
    //const msg = [..."Denn natürlich hatte die auch ihre eigenen Probleme mit ihrer eigenen Mutter. Hat sich auch gedacht, wenn ich mal Kinder habe, wird alles anders."]
    //Dachte sich, wenn ich mal Kinder habe, werde ich alles anders machen. Und dann kommt der Alltag, und dann kommt die Routine, und dann kommen die Geduldproben und man ist ja auch nur ein Mensch, man kann nicht immer"];
    const msg = [..."Und das alles nur, weil Menschen Menschen aus ihren Haeusern vertrieben haben. Menschen werden aus ihren Haeusern vertrieben von Menschen, die aus ihren Haeusern vertrieben wurden. Davor vertreiben Menschen Menschen aus ihren Haeusern, damit Menschen Menschen aus ihren Haeusern vertreiben koennen, waehrend Menschen Menschen aus ihren Haeusern vertreiben, um Menschen aus ihren Haeusern zu vertreiben."]

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
