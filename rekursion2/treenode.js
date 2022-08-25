class TreeNode {
    constructor(_x, _y) {
        this.pos = {x : _x, y : _y};
    }

    display(_progress, origX, origY, direction) {
        //clock
        const timedProg = _progress % 2;

        // timings
        const c2Entry = [0.0, 0.35];
        const c2Conn = [0.3, 0.4];
        const c2ConnDrop = [0.4, 0.5];
        const childLineGrow = [0.5, 0.6];
        const childConnGrow = [0.6, 0.7];
        const childSepGrow = [0.7, 0.8]
        const childGrow = [0.8, 1.0];
        const moveEverything = [0.0, 2.0];

        const dir = Math.sign(direction);

        const r = 80;
        const x1 = this.mapValueInTime(timedProg, moveEverything[0], moveEverything[1], origX, origX + (width * dir));
        const y1 = this.mapValueInTime(timedProg, moveEverything[0], moveEverything[1], origY, origY -height * 1.2);
        const x2 = this.mapValueInTime(timedProg, c2Entry[0], c2Entry[1], x1 - (width * dir), x1 - (0.5*width) * dir);
        const y2 = y1;

        // calculate vector from one parent to the other (only x-dimension is relevant)
        const connMax = x1 - x2;

        // in time
        const connLength = this.mapValueInTimeEasedSine(timedProg, c2Conn[0], c2Conn[1], 0, connMax);

        // calculate the y position
        const connY = this.mapValueInTimeEasedSine(timedProg, c2ConnDrop[0], c2ConnDrop[1], y2, y2 + 0.2 * height);

        // end of line connecting the children to the line between the parents
        const childLineX = x2 + connLength * 0.5;
        const childLineY = this.mapValueInTimeEasedSine(timedProg, childLineGrow[0], childLineGrow[1], connY, connY + 0.2 * height);

        // line connecting children
        // length; maxLength same as parents
        const childConnL = this.mapValueInTimeEasedSine(timedProg, childConnGrow[0], childConnGrow[1], 0, connMax);

        // move the beginning of the line from center to the x position of the parent
        const childConnXStart = this.mapValueInTimeEasedSine(timedProg, childConnGrow[0], childConnGrow[1], childLineX, x2);
        const childConnXEnd = childConnXStart + childConnL;

        // 2 lines from childConn to each child
        const childSepY = this.mapValueInTimeEasedSine(timedProg, childSepGrow[0], childSepGrow[1], childLineY, childLineY + 0.2 * height);
        
        // child circles growing
        // radius
        const childR = this.mapValueInTimeEasedSine(timedProg, childGrow[0], childGrow[1], 0, r);

        // draw everything
        stroke(c2);
        strokeWeight(5);
        fill(c2);

        if (_progress > 4.85) {
            fill(c3);
        }

        circle(x1, y1, r); // parent1
        fill(c2);
        circle(x2, y2, r); // parent2
        line(x2, connY, x2 + connLength, connY); // vector from parent1 to parent2
        line(x2,y2, x2, connY); // connection between parent2 and the dropping line(parent1,parent2)
        line(x1,y1, x1, connY); // connection between parent1 and the dropping line(parent1,parent2)
        line(childLineX, connY, childLineX, childLineY); // line connecting the children to the line between the parents
        line(childConnXStart, childLineY, childConnXEnd, childLineY); // connection between children
        if (timedProg >= childSepGrow[0]) {
            line(x2, childLineY, x2, childSepY); // line from the connection between the children child2
            line(x1, childLineY, x1, childSepY); // line from the connection between the children child1
        }

        if (timedProg >= childGrow[0]) {
            circle(x1, childSepY, childR); // child1

            if (_progress > 4.85) {
                fill(c3);
            }

            circle(x2, childSepY, childR); // child2
        }

        // const lineLength = Math.min(Math.max(parseInt(timedProg * 400), 0), 300);
        // const radius = Math.min(Math.max(parseInt(lineLength), 0), 100);
        // circle(this.pos.x, this.pos.y, radius);
        // line(this.pos.x - lineLength*0.5, this.pos.y, this.pos.x + lineLength * 0.5, this.pos.y)
        
    }

    mapValueInTime(time, tStart, tEnd, minVal, maxVal) {
        // make the value 0 at the tStart and 1 at tEnd
        const valTimed = Math.min(Math.max((time - tStart), 0) * (1 / (tEnd - tStart)), 1);
        
        // map 0 to minVal and 1 to maxVal
        const valMapped = minVal + valTimed * (maxVal - minVal);

        return valMapped;
    }

    mapValueInTimeEasedSine(time, tStart, tEnd, minVal, maxVal) {
        // make the value 0 at the tStart and 1 at tEnd
        const valTimed = Math.min(Math.max((time - tStart), 0) * (1 / (tEnd - tStart)), 1);

        // ease
        const valEased = this.easeInOutSine(valTimed);
        
        // map 0 to minVal and 1 to maxVal
        const valMapped = minVal + valEased * (maxVal - minVal);

        return valMapped;
    }

    mapValueInTimeEasedElastic(time, tStart, tEnd, minVal, maxVal) {
        // make the value 0 at the tStart and 1 at tEnd
        const valTimed = Math.min(Math.max((time - tStart), 0) * (1 / (tEnd - tStart)), 1);

        // ease
        const valEased = this.easeInOutElastic(valTimed);
        
        // map 0 to minVal and 1 to maxVal
        const valMapped = minVal + valEased * (maxVal - minVal);

        return valMapped;
    }

    easeInOutSine(x) {
        return -(cos(PI * x) - 1) / 2;
    }

    easeInOutElastic(x) {
        const c5 = (2 * Math.PI) / 4.5;
        
        return x === 0
          ? 0
          : x === 1
          ? 1
          : x < 0.5
          ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
          : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
    }

    easeInOutQuint(x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    }
}