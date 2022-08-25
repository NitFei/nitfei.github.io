/***************************
 ******* SECTION A *********
 ***************************/

 function drawSectionA(){
    secABackBuffer.clear();
    // text
    textSize(32);
    noStroke();
    fill(c2);
    //text("Vielleicht sind wir alle dazu verdammt, wie unsere Eltern zu werden", 100, 100);
    text("test test ich ", 100, 100);
    fill(c3);
    text("bin", 100 + textWidth("test test ich "), 100);
    fill(c2);
    text(" ein test", 100 + textWidth("test test ich bin"), 100);
    // shapes
    push();
    secABackBuffer.push();

    stroke(c2);
    strokeWeight(1);
    //noStroke();
    const radius = (width - 20) * 0.5;
    translate(width*0.5, height*0.5);
    secABackBuffer.translate(secABackBuffer.width * 0.5, secABackBuffer.height * 0.5);
    //scale(pow(1.1,-progress));
    let depth = progress/20;

    drawCircle(0, 0, radius, depth, 1);

    pop();
    secABackBuffer.pop();

    const step = Math.floor(depth);
    if (step <= secATexts.length) {
        let msg = secATexts[step];

        // determine textSize
        let tSize = radius * Math.pow(0.5, step);

        // how many letters can be placed?
        let amountOfLetters = Math.pow(2,step);

        // text drawing settings
        secABackBuffer.textSize(Math.floor(tSize) * 2.2); // the 2.2 is to resize the font, found out through trial an error
        secABackBuffer.noStroke();
        secABackBuffer.fill(c2);

        // draw only where the arcs are already drawn on the back buffer
        secABackBuffer.drawingContext.globalCompositeOperation = "source-atop";

        // draw the letters to the offscreen back buffer
        for (let i = 0; i < amountOfLetters; i++) {
            const x = secABackBuffer.width * 0.5 + (i - amountOfLetters * 0.5) * tSize * 2 + tSize * 0.35; // the final "+tSize*0.35" is to center the font, found out through trial and error
            const y = secABackBuffer.height * 0.5 + tSize - tSize * 0.25;// the final "-tSize*0.25" is to center the font, found out through trial and error


            secABackBuffer.text(msg[i], Math.floor(x), Math.floor(y));
        }

        // return the drawing mode to default
        secABackBuffer.drawingContext.globalCompositeOperation = "source-over";

        // draw the same thing for the previous message, but on our regular canvas, so the new message will come on top
        if (step > 0) {
            // repeat above steps
            msg = secATexts[step-1];

            // textSize is twice as big
            tSize *= 2;

            // how many letters can be placed?
            let amountOfLetters = Math.pow(2,step-1);

            // text drawing settings
            textSize(Math.floor(tSize) * 2.2); // the 2.2 is to resize the font, found out through trial an error
            noStroke();
            fill(c2);
            textFont(font1);    

            // draw the letters to the offscreen back buffer
            for (let i = 0; i < amountOfLetters; i++) {
                const x = width * 0.5 + (i - amountOfLetters * 0.5) * tSize * 2 + tSize * 0.35; // the final "+tSize*0.35" is to center the font, found out through trial and error
                const y = height * 0.5 + tSize - tSize * 0.25;// the final "-tSize*0.25" is to center the font, found out through trial and error

                text(msg[i], Math.floor(x), Math.floor(y));
            }
        }

        // display the backbuffer on our canvas
        image(secABackBuffer, 0, 0);    
    }
}

function drawCircle(x, y, radius, _depth, dir) {
    if(_depth > 0) {
        if(((Math.floor(_depth)) / 2) % 1 === 0) {
            if(_depth >= 1) {
                fill(c2);
                circle(x,y, radius*2 - 0);
            }
            fill(c1);
            secABackBuffer.fill(c1);
        } else {
            if(_depth >= 1) {
                fill(c1);
                circle(x,y, radius*2 - 0);
            }
            fill(c2);
            secABackBuffer.fill(c2);
        }
        
        if(_depth < 1) {
            if(dir > 0) {
                secABackBuffer.arc(x,y, radius*2,radius*2, TWO_PI*0.75, TWO_PI * (0.75 + (_depth % 1)), PIE);
            } else {
                secABackBuffer.arc(x,y, radius*2,radius*2, TWO_PI * (0.75 - (_depth % 1)), TWO_PI*0.75, PIE);
            }
        }
        
        if(dir > 0) {
            arc(x,y, radius*2,radius*2, TWO_PI*0.75, TWO_PI * (0.75 + (_depth % 1)), PIE);
        } else {
            arc(x,y, radius*2,radius*2, TWO_PI * (0.75 - (_depth % 1)), TWO_PI*0.75, PIE);
        }
                        
        drawCircle(x-radius*0.5, y, radius*0.5, _depth-1, -dir);
        drawCircle(x+radius*0.5, y, radius*0.5, _depth-1, dir);
    }
}
