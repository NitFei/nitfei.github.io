const descDiv = document.getElementById('descend');
const caveDiv = document.getElementById('cave');

const descCanv = document.getElementById('descCanv');
const caveCanv = document.getElementById('caveCanv');

const caveCont = document.getElementById('cave-content')

descCanv.width = descCanv.parentElement.clientWidth;
descCanv.height = descCanv.parentElement.clientHeight;

caveCanv.width = caveCanv.parentElement.clientWidth;
caveCanv.height = caveCanv.parentElement.clientHeight;

let dragging = false;
let descHover = false;
let mousePos = {x: 0, y: 0};
let lastMousePos = {x: 0, y: 0};
let cavePos = {x: 0, y: 0};
let caveBGColor = 'black';

const descCtx = descCanv.getContext('2d');
const caveCtx = caveCanv.getContext('2d');

// Audio-stuff
const audioContext = new AudioContext();

// const bufferSize = 2 * audioContext.sampleRate;
// const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
// const output = noiseBuffer.getChannelData(0);
// for (var i = 0; i < bufferSize; i++) {
//     output[i] = Math.random() * 2 - 1;
// }

// var whiteNoise = audioContext.createBufferSource();
// whiteNoise.buffer = noiseBuffer;
// whiteNoise.loop = true;
// whiteNoise.start(0);

// whiteNoise.connect(audioContext.destination);


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

const update = () => {
    const mD = mouseDelta();
    if (dragging) {
        moveCave(mD.x, mD.y);
    }

    moveLight();
    updateMousePos();
    updateSounds();
    requestAnimationFrame(update);
}

const moveLight = () => {
    const lightRadius = 80;
    if (descHover) {
        const gradient = descCtx.createLinearGradient(0, descCanv.clientHeight*0.25, 0, descCanv.clientHeight*0.75);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, 'black');
        resetBG(descCanv, descCtx, gradient);
        resetBG(caveCanv, caveCtx, caveBGColor);
        drawLightInCanv(descCanv, descCtx, lightRadius);
        drawLightInCanv(caveCanv, caveCtx, lightRadius);
    }
}

const drawLightInCanv = (canv, ctx, lightR) => {
    const rect = canv.getBoundingClientRect();
    const x = mousePos.x - rect.left;
    const y = mousePos.y - rect.top;
    drawLight(ctx, x, y, lightR);
}

const moveCave = (x, y) => {
    cavePos.x += x;
    cavePos.y += y;
    updateCave(cavePos.x, cavePos.y);
}

const updateCave = (x, y) => {
    caveCont.style.left = x + 'px';
    caveCont.style.top = y + 'px';
}

const mouseDelta = () => {
    mD = {x: 0, y: 0};
    mD.x = mousePos.x - lastMousePos.x;
    mD.y = mousePos.y - lastMousePos.y;
    return mD;
}

const updateMousePos = () => {
    lastMousePos.x = mousePos.x;
    lastMousePos.y = mousePos.y;
}

const toggleCaveBG = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 116) {
        if(caveBGColor === 'black'){
            caveBGColor = 'transparent';
        } else {
            caveBGColor = 'black';
        }
    }
} 

const updateSounds = () => {
    fragments.forEach((f) => {
        const mouseDist = getMouseDist(f);

        if(mouseDist < 300) {
            if(!f.isPlaying) {
                f.play();
            }

            const factor = 1 - (mouseDist / 300);
            f.gain.gain = factor * 0.5;
            f.filter.frequency.value = 2000*factor;

        } else {
            if(f.isPlaying) {
                f.stop();
            }
        }
    })
}

const getMouseDist = (fragment) => {
    const x = (mousePos.x - cavePos.x) - fragment.pos.x;
    const y = (mousePos.y - cavePos.y) - fragment.pos.y;
    const dist = Math.sqrt(x*x + y*y);
    return dist;
}

// this would turn off refreshing the lightposition every frame in the descCanv,
// but it might be necessary to refresh it every frame if there is more than one canvas

// descCanv.addEventListener('mouseover', ()=>{
//     descHover = true;
//     moveLight();
// });
// descCanv.addEventListener('mouseout', ()=>{descHover = false});



caveDiv.addEventListener('mousedown', () => {dragging = true});
caveDiv.addEventListener('mouseup', () => {dragging = false});
document.addEventListener('mousemove', (e) => {mousePos.x = e.clientX; mousePos.y = e.clientY});
document.addEventListener('keypress', toggleCaveBG);


const lorem = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

const fragments = [];

fragments.push(new Fragment(audioContext, undefined, {x:-550,y:200}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:-300,y:700}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:230,y:400}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:30,y:1000}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:-500,y:500}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:540,y:710}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:330,y:-110}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:600,y:200}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:-400,y:1000}, lorem));
fragments.push(new Fragment(audioContext, undefined, {x:1000,y:800}, lorem));

descHover = true;
update();