let c1, c2, c3, c4;
let progress, progressTarget;
let canvas;
let ft;
let currentSection;
let font1;

// Audio
let audioCtx;
let audioSystem;

// Section A
let secATexts;
let secABackBuffer;

// Section B
let secBTexts;

// Section E
let ubahnIMG, ubahnIMG1, ubahnIMG2, ubahnIMG3;
let ubahnText;
let sectionESequence;
let ubahnBuildupEndStep;

const APPEAR = 1;
const NONE = 2;
const DISAPPEAR = 3;

// Section G
let secGRandVals

let snapTimeout;

function preload() {
    font1 = loadFont('src/fonts/superwebcomicbros.ttf');
  }

function setup() {
    textFont(font1);

    // colors
    c1 = color("#ffe8d6");
    c2 = color("#111601");
    //c2 = color("#0e1430")
    //c3 = color("#9b9831");
    c3 = color("#bc2f2f");
    c4 = color("#ffffff");
    //c3 = color("#b52929");
    
    pixelDensity(1); 

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');

    // general global variables
    progress = 0;
    progressTarget = 0;
    currentSection = "b";

    // Audio Setup
    audioCtx = new AudioContext();
    audioSystem = new AudioSystem(audioCtx);

    // Section A Setup
    secABackBuffer = createGraphics(windowWidth, windowHeight);
    secABackBuffer.fill(c2); // this needs to be here for some reason or else the program crashes ???????
    secABackBuffer.textFont(font1);

    secATexts = [];
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
    secATexts.push([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);

    // Section B Setup
    ft = new FamilyTree();
    ft.addNode(new TreeNode(width*0.5, height*0.5));

    secBTexts = [];
    secBTexts.push("Der Satz, dass wir früher oder später alle wie unsere Eltern werden,");
    secBTexts.push("der trifft ja auch auf unsere Eltern zu.");
    secBTexts.push("Und auf deren Eltern.");
    secBTexts.push("Und deren Elternseltern.");
    secBTexts.push("Graue Haare und hässliche Pullover.");


    // Section E Setup
    ubahnIMG = loadImage('./src/ubahn.png');
    ubahnIMG1 = loadImage('./src/ubahn_m1.png');
    ubahnIMG2 = loadImage('./src/ubahn_m2.png');
    ubahnIMG3 = loadImage('./src/ubahn_m3.png');

    ubahnText = [];
    ubahnText.push(loadImage('./src/texts/sectione/wennichmal.png'));
    ubahnText.push(loadImage('./src/texts/sectione/macheichalles.png'));
    ubahnText.push(loadImage('./src/texts/sectione/schreiteinjunge.png'));

    ubahnBuildupEndStep = 150;

    sectionESequenceHelper = [];
    sectionESequenceHelper.push({stepSkip:6, textImages: [{img: ubahnText[0], tint: APPEAR}], hold: 0});
    sectionESequenceHelper.push({stepSkip:1, textImages: [{img: ubahnText[0], tint: NONE}, {img: ubahnText[1], tint: APPEAR}], hold: 0})
    sectionESequenceHelper.push({stepSkip:1, textImages: [{img: ubahnText[0], tint: NONE}, {img: ubahnText[1], tint: NONE}, {img: ubahnText[2], tint: APPEAR}], hold: 0});
    sectionESequenceHelper.push({stepSkip:6, textImages: [{img: ubahnText[0], tint: DISAPPEAR}, {img: ubahnText[1], tint: DISAPPEAR}, {img: ubahnText[2], tint: DISAPPEAR}], hold: 0});

    sectionESequence = buildSectionESecquence(sectionESequenceHelper);

    // Section G Setup
    // secGRandVals = [];
    // for (let i = 0; i < 40; i++) {
    //     secGRandVals.push([Math.random()*1.7 + 0.3, Math.random()-0.5]);
    // }


    //

}

function draw() {
    //clampProgress();
    progress += (progressTarget - progress) * 0.05;
    background(c1);
    if(progress > 0) {
        switch (currentSection) {
            case "a":
                drawSectionA();
                break;
            case "b":
                drawSectionB();
                break;
            case "c":
                drawSectionC();
                break;
            case "d":
                drawSectionD();
                break;
            case "e":
                drawSectionE();
                break;
            case "f":
                drawSectionF();
                break;
            case "g":
                drawSectionG();
                break;
            default:
                break;
        }
    }
}

function buildSectionESecquence(helper) {
    ses = [];
    let count = 3;
    let maxDepth = 3;
    for (let i = 0; i < helper.length; i++) {
        const goal = count + helper[i].stepSkip;
        while(count < goal) {
            let textImages = [];
            if(count < goal-1){
                if(i > 0){
                    if(helper[i-1].textImages){
                        helper[i-1].textImages.forEach(ti => {
                            if(ti.tint === APPEAR || ti.tint === NONE) {
                                textImages.push({img: ti.img, tint: NONE});
                            }
                        });
                    }
                }
                ses.push({maxDepth: maxDepth, textImages: textImages, hold: helper[i].hold});
                maxDepth++;
            } else {
                helper[i].textImages.forEach(ti => {
                    textImages.push({img: ti.img, tint: ti.tint});
                })
                ses.push({maxDepth:maxDepth, textImages: textImages, hold: helper[i].hold});
                if(!helper[i].hold) {
                    maxDepth++;
                }
                
            }
            count++;
        }
    }
    

    while(count < ubahnBuildupEndStep) {
        let textImages = [];
        if(helper[helper.length-1] && helper[helper.length-1].textImages){
            helper[helper.length-1].textImages.forEach(ti => {
                let tint = NONE;
                let img;
                
                if(ti.tint != DISAPPEAR) {
                    if(ti.img){
                        img = ti.img;
                    }
                }
    
                

                textImages.push({img: img, tint: tint});
            });
        }

        ses.push({maxDepth: maxDepth, textImages: textImages, hold: 0});
        maxDepth++;
        count++;
    }

    return ses;
}

document.onwheel = (e) => {
    progressTarget -= (detectMouseWheelDirection(e));
    switch (currentSection) {
        default: 
            break;
        case "e":
            clearTimeout(snapTimeout);
            snapTimeout = setTimeout( () => {
                snapProgressTo5();
            }, 500);
            break;
        case "f":
            clearTimeout(snapTimeout);
            snapTimeout = setTimeout( () => {
                snapProgressTo1();
            }, 500);
            break;
    }
}

document.onkeydown = (e) => {
    currentSection = e.key;
}

function clampProgress() {
    if(progressTarget < 0) {
        progressTarget = 0;
    }
}

function snapProgressTo5() {
    progressTarget = Math.round(progressTarget / 5) * 5;
}

function snapProgressTo1() {
    progressTarget = Math.round(progressTarget);
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

function windowResized() {
    //const canvasLength = min(windowWidth, windowHeight);
    resizeCanvas(windowWidth, windowHeight);
    //canvas.style('margin-top', -canvasLength*0.5 + 'px');
    //canvas.style('margin-left', -canvasLength*0.5 + 'px');
}
  
function copyToImage(src, img) {
    img.loadPixels();
    src.loadPixels();

    img.pixels = [...src.pixels];

    img.updatePixels();
    return img;
}


// Nitay's note:    faster tint. No idea what it does, but it works extremely well. Credit to https://github.com/davepagurek
//                  with this sketch: https://editor.p5js.org/davepagurek/sketches/D_ehdpTjO 
p5.Renderer2D.prototype._getTintedImageCanvas = function(img) {
  if (!img.canvas) {
    return img;
  }

  if (!img.tintCanvas) {
    // Once an image has been tinted, keep its tint canvas
    // around so we don't need to re-incur the cost of
    // creating a new one for each tint
    img.tintCanvas = document.createElement('canvas');
  }

  // Keep the size of the tint canvas up-to-date
  if (img.tintCanvas.width !== img.canvas.width) {
    img.tintCanvas.width = img.canvas.width;
  }
  if (img.tintCanvas.height !== img.canvas.height) {
    img.tintCanvas.height = img.canvas.height;
  }

  // Goal: multiply the r,g,b,a values of the source by
  // the r,g,b,a values of the tint color
  const ctx = img.tintCanvas.getContext('2d');

  ctx.save();
  ctx.clearRect(0, 0, img.canvas.width, img.canvas.height);

  if (this._tint[0] < 255 || this._tint[1] < 255 || this._tint[2] < 255) {
    // Color tint: we need to use the multiply blend mode to change the colors.
    // However, the canvas implementation of this destroys the alpha channel of
    // the image. To accommodate, we first get a version of the image with full
    // opacity everywhere, tint using multiply, and then use the destination-in
    // blend mode to restore the alpha channel again.

    // Start with the original image
    ctx.drawImage(img.canvas, 0, 0);

    // This blend mode makes everything opaque but forces the luma to match
    // the original image again
    ctx.globalCompositeOperation = 'luminosity';
    ctx.drawImage(img.canvas, 0, 0);

    // This blend mode forces the hue and chroma to match the original image.
    // After this we should have the original again, but with full opacity.
    ctx.globalCompositeOperation = 'color';
    ctx.drawImage(img.canvas, 0, 0);

    // Apply color tint
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgb(${this._tint.slice(0, 3).join(', ')})`;
    ctx.fillRect(0, 0, img.canvas.width, img.canvas.height);

    // Replace the alpha channel with the original alpha * the alpha tint
    ctx.globalCompositeOperation = 'destination-in';
    ctx.globalAlpha = this._tint[3] / 255;
    ctx.drawImage(img.canvas, 0, 0);
  } else {
    // If we only need to change the alpha, we can skip all the extra work!
    ctx.globalAlpha = this._tint[3] / 255;
    ctx.drawImage(img.canvas, 0, 0);
  }

  ctx.restore();
  return img.tintCanvas;
};



