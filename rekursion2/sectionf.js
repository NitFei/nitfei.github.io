/***************************
 ******* SECTION F *********
 ***************************/

 function drawSectionF() {
    // if(!audioSystem.pinkNoise.isPlaying) {
    //     audioSystem.distortion.connect(audioCtx.destination);
    //     audioSystem.playDistortedPinkNoise();
    // }

    // //audioSystem.distortion.fadeWetTo(progress/100, 0.1);
    // audioSystem.distortion.fadeLowPassFilterTo(progress*20, 0.1);

    const msg = [..."Auge um Auge um Zahn um Zahn um "];

    noStroke();
    fill(c2);

    r = 0;

    push();
    translate(width*0.1, height*0.1);
    const scaleIncr = 0.04;
    const baseCond = 1000;
    const maxCharsPerRow = 64;
    const scale = 20;
    textSize(30);
    fill(c2);
    drawSectionFLetter(scale, maxCharsPerRow, msg, 0, progress, scaleIncr, baseCond);
    pop();
}

function drawSectionFLetter(_scale, _maxCharsPerRow, msg, _depth, maxDepth, _scaleIncr, _baseCond) {
    if(_depth <= min(maxDepth, _baseCond)) {
        const posX = _depth % _maxCharsPerRow;
        const posY = Math.floor(_depth / _maxCharsPerRow);
        text(msg[_depth % msg.length], posX * _scale, posY * _scale * 3+ pow(posY,1.1) * 0.1 * _scale * (1 + (Math.random(1)-0.5)));

        drawSectionFLetter(_scale, _maxCharsPerRow, msg, _depth + 1, maxDepth, _scaleIncr, _baseCond);
    }
}