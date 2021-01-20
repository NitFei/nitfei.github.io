const descDiv = document.getElementById('descend');

const descCanv = document.getElementById('descCanv');

descCanv.width = descCanv.parentElement.clientWidth;
descCanv.height = descCanv.parentElement.clientHeight;

let descHover = false;
let mousePos = {x: 0, y: 0};


const descCtx = descCanv.getContext('2d');


const drawLight = (ctx, x, y, r) => {
    ctx.globalCompositeOperation = 'destination-out';

    const gradient = ctx.createRadialGradient(x, y, r/10, x, y, r);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);

    ctx.fillStyle = gradient;
    ctx.fill();
}

const resetBG = (canv, ctx, fStyle) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canv.clientWidth, canv.clientHeight);
    ctx.fillStyle = fStyle;
    ctx.fillRect(0, 0, canv.clientWidth, canv.clientHeight);
}

const moveLight = () => {
    const lightRadius = 80;
    if (descHover) {
        const gradient = descCtx.createLinearGradient(0, descCanv.clientHeight*0.25, 0, descCanv.clientHeight*0.75);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'black');
        resetBG(descCanv, descCtx, gradient);
        drawLightInCanv(descCanv, descCtx, lightRadius);
        requestAnimationFrame(moveLight);
    }
}

const drawLightInCanv = (canv, ctx, lightR) => {
    const rect = canv.getBoundingClientRect();
    const x = mousePos.x - rect.left;
    const y = mousePos.y - rect.top;
    drawLight(ctx, x, y, lightR);
}

descCanv.addEventListener('mouseover', ()=>{
    descHover = true;
    moveLight();
});
descCanv.addEventListener('mouseout', ()=>{descHover = false});
document.addEventListener('mousemove', (e)=>{mousePos.x = e.clientX; mousePos.y = e.clientY});