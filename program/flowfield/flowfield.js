class FlowField {
    constructor(cellSize, width, height) {
        this.cellSize = cellSize;
        this.width = width;
        this.height = height;
        this.changeFactor = 0.001;

        // calculate rows and columns from width, height and cell size
        this.rows = Math.floor(width / cellSize) + 1;
        this.cols = Math.floor(height / cellSize) + 1;

        // flow field consists of vectors
        this.vecs = [];

        // populate vectors
        for (let i = 0; i < this.rows; i++) {
            let vecRow = [];
            for (let j = 0; j < this.cols; j++) {
                // create perlin noise vector
                let vecX = Math.sin(noise.perlin2(i / 10, j / 10) * 2 * Math.PI);
                let vecY = Math.cos(noise.perlin2(i / 10, j / 10) * 2 * Math.PI);
                let newVec = [vecX, vecY];
                // normalize vector
                newVec = normalize(newVec);
                // add vector to row
                vecRow.push(newVec);
            }
            // add row to vector array
            this.vecs.push(vecRow);
        }
    }

    // draw all vectors
    render(ctx) {
        ctx.strokeStyle = "black";
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // start drawing vectors from the middle of their respective cell
                const xStart = (i + 0.5) * this.cellSize;
                const yStart = (j + 0.5) * this.cellSize;
                // vector endpoint is at start + vector length (+ half cell size to visualize it better)
                const xEnd = xStart + this.vecs[i][j][0] * this.cellSize * 0.5;
                const yEnd = yStart + this.vecs[i][j][1] * this.cellSize * 0.5;

                // draw vector from start to end
                ctx.beginPath();
                ctx.moveTo(xStart, yStart);
                ctx.lineTo(xEnd, yEnd);
                ctx.stroke();
            }
        }
    }

    update(time) {
        this.vecs = [];
        // populate vectors
        for (let i = 0; i < this.rows; i++) {
            let vecRow = [];
            for (let j = 0; j < this.cols; j++) {
                // create perlin noise vector
                let vecX = Math.sin(noise.perlin3(i / 5, j / 5, time * this.changeFactor) * 2 * Math.PI);
                let vecY = Math.cos(noise.perlin3(i / 5, j / 5, time * this.changeFactor) * 2 * Math.PI);
                let newVec = [vecX, vecY];
                // normalize vector
                newVec = normalize(newVec);
                // add vector to row
                vecRow.push(newVec);
            }
            // add row to vector array
            this.vecs.push(vecRow);
        }
    }
}
