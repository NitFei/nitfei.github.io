/***************************
 ******* SECTION E *********
 ***************************/

 function drawSectionE() {
    console.log(progress);
    if (!audioSystem.sequencer.isPlaying) {
        audioSystem.sequencer.startSequencer();
    }

    if (!audioSystem.samples[audioSystem.samples.length-1].isPlaying) {
        audioSystem.playSample(audioSystem.samples[audioSystem.samples.length-1]);
    }

    if (progress >= 400 && !audioSystem.samples[audioSystem.samples.length-1].isMuted) {
        audioSystem.samples[audioSystem.samples.length-1].mute();
    } else if (progress < 400 && audioSystem.samples[audioSystem.samples.length-1].isMuted) {
        audioSystem.samples[audioSystem.samples.length-1].unmute();
    }

    for (let i = 0; i < audioSystem.samples.length-1; i++) {
        if (i  <= Math.floor((progress-25)/20)) {
            audioSystem.samples[i].isInSequence = true;
        } else {
            audioSystem.samples[i].isInSequence = false;
        }
    }

    const heightFactor = 0.26 // found out through trial and error  
    const size = min(width, height)*8;
    const x = -size * 0.5;
    const y = -size * heightFactor;
    const depth = 0;
    // const maxDepth = Math.floor((progress/5));
    
    let maxDepth;
    let depthDecimal

    push();
    if(progress < ubahnBuildupEndStep) {
        maxDepth = ses[Math.floor((progress/5))].maxDepth;
        depthDecimal = (progress/5) % 1;

        translate(width*0.5, height*heightFactor);
        scale(1/(pow(2.2,maxDepth)));

        drawUbahnDuringBuildUp(x, y, size, depth, maxDepth, depthDecimal, sectionESequence);
    } else {
        maxDepth = (((4*ubahnBuildupEndStep-progress)/10));

        translate(width*0.5, height*heightFactor);
        scale(1/(pow(2.2,maxDepth)));

        drawUbahn(x, y, size, depth, maxDepth);
    }
    pop();
}

function drawUbahnDuringBuildUp(x, y, size, depth, maxDepth, depthDecimal, ses) {
    if(depth<1) {
        const rectC = c2;
        //const rectFill = color(red(rectC), green(rectC), blue(rectC), depthDecimal*255)
        fill(c1);
        noStroke();
        rect(x, y, size, size);

        scale(2.2); // 2.2 found out through trial and error
        tint(255, depthDecimal*255);
        let displayIMG = ubahnIMG;

        if (maxDepth > 18 && depth > 18) {
            displayIMG = ubahnIMG3;
        } else if (maxDepth > 14 && depth > 14) {
            displayIMG = ubahnIMG2;
        } else if (depth > 10) {
            displayIMG = ubahnIMG1;
        }
        image(displayIMG, x, y, size, size);
        

        // is it the iteration where we would have to draw the text?
        if(Math.floor(depth) === Math.floor(maxDepth)-4) {
            // does this progress-step have a text?
            if(ses[Math.floor(maxDepth)].textImages && ses[Math.floor(maxDepth)].textImages.length > 0) {
                ses[Math.floor(maxDepth)].textImages.forEach(ti => {
                    if(ti.img) {
                        // is there animation? Appearing, disappearing or none?
                        switch(ti.tint) {
                            case APPEAR:
                                tint(255, depthDecimal*255);
                                break;
                            case NONE:
                                noTint();
                                break;
                            case DISAPPEAR:
                                tint(255, (1-depthDecimal) * 255);
                                break;
                        }
                        // draw the text
                        image(ti.img, x, y, size, size);
                    }
                });
            }
        }

        // if(maxDepth === 5 && Math.floor(depth) === Math.floor(maxDepth)-4) {
        //     tint(255, depthDecimal*255);
        //     image(ubahnText[0],x, y, size, size);
        //     console.log("now");
        // }
        drawUbahnDuringBuildUp(x, y, size, depth+1, maxDepth, depthDecimal, ses);
    } else if(depth<maxDepth+3){
        noTint();
        scale(2.2); // 2.2 found out through trial and error
        let displayIMG = ubahnIMG;

        if (maxDepth > 22 && depth > 22) {
            displayIMG = ubahnIMG3;
        } else if (maxDepth > 15 && depth > 15) {
            displayIMG = ubahnIMG2;
        } else if (depth > 8) {
            displayIMG = ubahnIMG1;
        }
        image(displayIMG, x, y, size, size);
        // if(maxDepth > 5 && Math.floor(depth) === Math.floor(maxDepth)-4) {
        //     image(ubahnText[0],x, y, size, size);
        // }

        if(Math.floor(depth) === Math.floor(maxDepth)-4) {
            // does this progress-step have a text?
            if(ses[Math.floor(maxDepth)].textImages && ses[Math.floor(maxDepth)].textImages.length > 0) {
                ses[Math.floor(maxDepth)].textImages.forEach(ti => {
                    if(ti.img) {
                        // is there animation? Appearing, disappearing or none?
                        switch(ti.tint) {
                            case APPEAR:
                                tint(255, depthDecimal*255);
                                break;
                            case NONE:
                                noTint();
                                break;
                            case DISAPPEAR:
                                tint(255, (1-depthDecimal) * 255);
                                break;
                        }
                        // draw the text
                        image(ti.img, x, y, size, size);
                    }
                });
            }
        }
        drawUbahnDuringBuildUp(x, y, size, depth+1, maxDepth, depthDecimal, ses);
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
        image(ubahnIMG3, x, y, size, size);
        drawUbahn(x, y, size, depth+1, maxDepth);
    }
}