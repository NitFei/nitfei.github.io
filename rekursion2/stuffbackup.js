    // const maxDepth = Math.floor((progress/5));
    
    let maxDepth;
    let depthDecimal

    const walkStart = 50;

    push();

    translate(width*0.5, height*heightFactor);
    scale(1/(pow(2.2,maxDepth)));
    if(progress < walkStart) {
        maxDepth = Math.floor((progress/5) + 3);
        depthDecimal = (progress/5) % 1;
        drawUbahnDuringBuildUp(x, y, size, depth, maxDepth, depthDecimal);
    } else {
        maxDepth = (((4*walkStart-progress)/10));
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
