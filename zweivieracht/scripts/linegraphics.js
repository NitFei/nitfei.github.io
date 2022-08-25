class LineGraphics {
    constructor(imgPath, parentDiv) {
        this.canv = document.createElement('canvas');
        parentDiv.appendChild(this.canv);
        this.resizeCanvasToWindowSize();

        window.addEventListener('resize', () => {
            this.resizeCanvasToWindowSize();
        });

        this.mouseXTarget = 0;
        this.mouseX = 0;
        window.addEventListener('mousemove', (e) => {
            this.mouseXTarget = e.clientX / window.innerWidth;
        })

        this.ctx = this.canv.getContext('2d');

        this.linesAmount = 60;
        this.linesWidth = 4;

        this.startBias = 0;
        this.startSpacing = 1;
        this.endBias = 0;
        this.endSpacing = 1;

        this.midPoints = [];
        this.addMidPoints(6);

        this.img = new Image();
        this.img.src = imgPath;

        this.img.onload = () => {
            this.draw();
        }
    }

    resizeCanvasToWindowSize() {
        this.canv.width = window.innerWidth;
        this.canv.height = window.innerHeight - $("header").height();
    }

    addMidPoints(amount) {
        let sum = 0;
        let xPercentages = [];

        // randomly generate where to divide up the canvas
        for (let i = 0; i < amount; i++) {
            let p = Math.random() + 1;
            sum += p;
            xPercentages.push(sum);
        }

        // multiply the percentages so they add up to 1
        for (let i = 0; i < xPercentages.length; i++) {
            xPercentages[i] = xPercentages[i] / sum;
            const midPoint = {xPerc: xPercentages[i], spacing: Math.random() * 0.3 + 0.7, yOrigin: Math.random()};
            this.midPoints.push(midPoint);
        }
    }

    drawImg(img) {
        this.ctx.globalCompositeOperation = 'source-in';
        
        // maximize img size without distorting its dimensions
        let w, h, x, y;
        const widthRatio = this.img.width / this.canv.width;
        const heightRatio = this.img.height / this.canv.height;
        if(widthRatio > heightRatio) {
            w = this.canv.width;
            h = this.img.height / widthRatio;
        } else {
            w = this.img.width / heightRatio;
            h = this.canv.height;
        }

        x = (this.canv.width - w) * 0.5;
        y = (this.canv.height - h) * 0.5;
        
        this.ctx.drawImage(img, x, y, w, h);
    }

    drawLines() {
        this.ctx.globalCompositeOperation = 'source-over';

        for (let i = 0; i < this.linesAmount; i++){
            const startPointX = 0;
            const startPointY = (i * ((this.startSpacing * this.canv.height) / this.linesAmount)) + (this.startBias * ((1 - this.startSpacing) * this.canv.height));
            const endPointX = this.canv.width;
            const endPointY = (i * ((this.endSpacing * this.canv.height) / this.linesAmount)) + (this.endBias * ((1 - this.endSpacing) * this.canv.height));

            this.ctx.lineWidth = this.linesWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(startPointX, startPointY);
            for (let j = 0; j < this.midPoints.length; j++) {
                const midPointY = (i * ((this.midPoints[j].spacing * this.canv.height) / this.linesAmount)) + (this.midPoints[j].yOrigin * ((1 - this.midPoints[j].spacing) * this.canv.height));
                const d = Math.pow(this.mouseX-this.midPoints[j].xPerc,2) * Math.sign(this.mouseX-this.midPoints[j].xPerc);
                const midPointX = (this.mouseX - d * 2) * this.canv.width;
                this.ctx.lineTo(midPointX, midPointY);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(midPointX-2, midPointY);
            }
            this.ctx.lineTo(endPointX, endPointY);
            this.ctx.stroke();
        }
    }

    updateMouseX() {
        this.mouseX += (this.mouseXTarget - this.mouseX) * 0.05;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
    }

    draw = () => {
        this.clearCanvas();
        this.updateMouseX();
        this.drawLines();
        this.drawImg(this.img);
        requestAnimationFrame(this.draw);
        console.log("hi")
    }
}