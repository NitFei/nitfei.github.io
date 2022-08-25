/***************************
 ******* SECTION G *********
 ***************************/

 function drawSectionG() {
    // standard size unit on which everything is based
    const su = min(width, height) * 0.1;

    // scale progress to slow down anmation speed
    let scaledProg = progress / 10 % (6);

    // factor determining how much of the bezier curve will be drawn above the point and how much below it
    let t = scaledProg % 1;

    noFill();
    strokeWeight(5);

    stroke(c2);
    drawHelixEdge(1, scaledProg, t, su);
    stroke(c3);
    drawHelixBars(scaledProg, t, su);
    stroke(c4);
    drawHelixEdge(-1, scaledProg, t, su);

    // for (let i = 0; i < secGRandVals.length; i++) {
    //     const scaleFactor = secGRandVals[i][0];
    //     push();
    //     scaledProg = progress / 10*scaleFactor % (8/scaleFactor);
    //     t = scaledProg % 1;
    //     translate(secGRandVals[i][1] * width, 0);
    //     scale(scaleFactor);

    //     stroke(c2);
    //     drawHelixEdge(1, scaledProg, t, su);
    //     stroke(c3);
    //     drawHelixBars(scaledProg, t, su);
    //     stroke(c4);
    //     drawHelixEdge(-1, scaledProg, t, su);
    //     pop();
    // }
}

function getPointInTime(x1, y1, x2, y2, t) {
    const vecX = x2 - x1;
    const midX = x1 + vecX * t;
    
    const vecY = y2 - y1;
    const midY = y1 + vecY * t;

    return [midX, midY];
}

function drawHelixBars(scaledProg, t, su) {
    // dna horizontal lines
    // top line
    // stroke(c3);
    const tTop = Math.abs(((t + 0.25) % 1) * 2 - 1);
    const yTop = (Math.floor(scaledProg + 0.75)-0.75)*su*2;
    const xOffsetTop = 0.57 * su;
    line(width*0.5 - xOffsetTop, yTop, width*0.5 - xOffsetTop * (1 - tTop), yTop);
    line(width*0.5 + xOffsetTop, yTop, width*0.5 + xOffsetTop * (1 - tTop), yTop);

    // middle line
    //stroke(c4);
    const tMid = Math.abs(((t) % 1) * 2 - 1);
    const yMid = (Math.floor(scaledProg + 0.5)-0.5)*su*2;
    const xOffsetMid = 0.72 * su;
    line(width*0.5 - xOffsetMid, yMid, width*0.5 - xOffsetMid * (1 - tMid), yMid);
    line(width*0.5 + xOffsetMid, yMid, width*0.5 + xOffsetMid * (1 - tMid), yMid);

    // bottom line
    //stroke(c4);
    const tBot = Math.abs(((t + 0.75) % 1) * 2 - 1);
    const yBot = (Math.floor(scaledProg + 0.25)-0.25)*su*2;
    const xOffsetBot = 0.57 * su;
    line(width*0.5 - xOffsetBot, yBot, width*0.5 - xOffsetBot * (1 - tBot), yBot);
    line(width*0.5 + xOffsetBot, yBot, width*0.5 + xOffsetBot * (1 - tBot), yBot);
}

function drawHelixEdge(dir, scaledProg, t, su) {
    // start / end points for bezier curve
    const points = [];

    // control points for bezier curve
    const controlPoints = [];

    // -1st point sarting outside the canvas to have a smooth entrance and not just spawn at once
    const x1 = width * 0.5;
    const y1 = su * -2;
    points.push([x1,y1]);

    // rest of the points
    for (let i = 1; i < 30; i++) { // start at 1 to skip the -1st point
        const x = width * 0.5;
        const y = (i-1) * su * 2;
        points.push([x,y]);

        // since we want to alternate our control points being left or right from the center
        // check if i is even or odd, then turn it into either 1 or -1
        // also the j is in here to have everything mirrored on the 2nd iteration of j
        const oddEven = Math.sign(0.5 - i%2) * Math.sign(dir);

        // control points
        const cx1 = points[i-1][0] + su * 1.0 * oddEven;
        const cy1 = points[i-1][1] + su * 0.5;
        const cx2 = cx1;
        const cy2 = y - su * 0.5;

        controlPoints.push([cx1, cy1]);
        controlPoints.push([cx2, cy2]);
    }

    // index of the point around which we will build our bezier curve
    const currP = Math.floor(scaledProg+1);

    // part of bezier curve above our point
    const c1p1 = getPointInTime(points[currP][0], points[currP][1], controlPoints[currP*2-1][0], controlPoints[currP*2-1][1], 1-t);
    const c1p2 = getPointInTime(controlPoints[currP*2-1][0], controlPoints[currP*2-1][1], controlPoints[currP*2-2][0], controlPoints[currP*2-2][1], 1-t);
    const c1p3 = getPointInTime(controlPoints[currP*2-2][0], controlPoints[currP*2-2][1],points[currP-1][0], points[currP-1][1], 1-t);

    const c1p4 = getPointInTime(c1p1[0], c1p1[1], c1p2[0], c1p2[1], 1-t);
    const c1p5 = getPointInTime(c1p2[0], c1p2[1], c1p3[0], c1p3[1], 1-t);

    const c1p6 = getPointInTime(c1p4[0], c1p4[1], c1p5[0], c1p5[1], 1-t);

    // part of bezier curve below our point
    const c2p1 = getPointInTime(points[currP][0], points[currP][1], controlPoints[currP*2][0], controlPoints[currP*2][1], t);
    const c2p2 = getPointInTime(controlPoints[currP*2][0], controlPoints[currP*2][1], controlPoints[currP*2+1][0], controlPoints[currP*2+1][1], t);
    const c2p3 = getPointInTime(controlPoints[currP*2+1][0], controlPoints[currP*2+1][1],points[currP+1][0], points[currP+1][1], t);

    const c2p4 = getPointInTime(c2p1[0], c2p1[1], c2p2[0], c2p2[1], t);
    const c2p5 = getPointInTime(c2p2[0], c2p2[1], c2p3[0], c2p3[1], t);

    const c2p6 = getPointInTime(c2p4[0], c2p4[1], c2p5[0], c2p5[1], t);

    beginShape();
    vertex(c1p6[0], c1p6[1]);
    bezierVertex(c1p4[0], c1p4[1], c1p1[0], c1p1[1], points[currP][0], points[currP][1]);
    bezierVertex(c2p1[0], c2p1[1], c2p4[0], c2p4[1], c2p6[0], c2p6[1]);
    endShape();
}