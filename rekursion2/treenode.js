class TreeNode {
    constructor(_x, _y) {
        this.pos = {x : _x, y : _y};
    }

    display(_progress) {
        stroke(c2);
        strokeWeight(5);
        fill(c2);
        const lineLength = Math.min(Math.max(parseInt(_progress * 400), 0), 300);
        const radius = Math.min(Math.max(parseInt(lineLength), 0), 100);
        circle(this.pos.x, this.pos.y, radius);
        line(this.pos.x - lineLength*0.5, this.pos.y, this.pos.x + lineLength * 0.5, this.pos.y)
        
    }
}