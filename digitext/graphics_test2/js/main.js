/* requestAnimationFrame shim */
if (window.requestAnimationFrame == null) {
    window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
}

var particles = null,
    controller = null;

const audioContext = new AudioContext();

$(document).ready(function() {
    

    // set up textQuadrant system for locating the closest texts and for placing texts
    const fragmentQuadrants = new Array(8);
    for(let i = 0; i < fragmentQuadrants.length; i++) {
        fragmentQuadrants[i] = new Array(8);
        for(let j = 0; j < fragmentQuadrants[i].length; j++) {
            fragmentQuadrants[i][j] = [];
        }
    }

    const NUMBEROFQUADRANTSPERAXIS = 8;
    const caveWidth = 28;
    const caveHeight = 35;
    const textInfo = JSON.parse(textInfoJSON);
    textInfo.forEach(text => {
        const f = new Fragment(audioContext, undefined, text.pos, text.content, document.getElementById('cave-content'));


        let x = Math.floor(text.pos.x / (caveWidth / NUMBEROFQUADRANTSPERAXIS));
        let y = Math.floor(text.pos.y / (caveHeight / NUMBEROFQUADRANTSPERAXIS));
        fragmentQuadrants[x][y].push(f);
    });

    console.log(fragmentQuadrants);

    var canvas = $('#display')[0];
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //resizeCanvasToDisplaySize(canvas);
    particles = new Particles(canvas, 1024*16, 3);
    particles.draw();


    // for debugging
    const toggleCaveBG = (e) => {
        if (e.keyCode === 116) {
            if(caveBGColor === 'black'){
                caveBGColor = 'transparent';
                canvas.style.opacity = '0';
            } else {
                caveBGColor = 'black';
                canvas.style.opacity = '1';
            }
        }
    }   

    let caveBGColor = 'black'; // for debugging
    document.addEventListener('keypress', toggleCaveBG); // for debugging

    const caveDiv = document.getElementById('cave');
    const caveCont = document.getElementById('cave-content');
    caveDiv.addEventListener('mouseenter', () => {caveHover = true});
    caveDiv.addEventListener('mouseleave', () => {caveHover = false});
    caveDiv.addEventListener('mousedown', () => {dragging = true;});
    caveDiv.addEventListener('mouseup', () => {
        dragging = false;
        findClosestFragments();
        particles.updateClosest(closestFragments, cavePos);
    });
    document.addEventListener('mousemove', (e) => {mousePos.x = e.clientX; mousePos.y = e.clientY});
   
    
    let caveHover = false;
    let dragging = false;
    let descHover = false;
    let mousePos = {x: 0, y: 0};
    let lastMousePos = {x: 0, y: 0};
    let cavePos = {x: 0, y: 0};

    let closestFragments = [];



    function findClosestFragments () {
        // find the quadrant of the current mouse position
        let x = Math.floor((mousePos.x - cavePos.x) / (caveWidth * Fragment.PLACEMENTFACTOR / NUMBEROFQUADRANTSPERAXIS));
        let y = Math.floor((mousePos.y - cavePos.y) / (caveHeight * Fragment.PLACEMENTFACTOR / NUMBEROFQUADRANTSPERAXIS));
        let clFrags = [];

        let adjCount = 0;

        for(let k = 0; k < NUMBEROFQUADRANTSPERAXIS; k++) { // if less than 3 fragments were found, repeat with a larger search radius
            //make a list of all fragments inside the quadrant and inside adjacent quadrants
            let adjacentFragments = [];
            
            if(k == 0) {
                fragmentQuadrants[x][y].forEach(fragment => {
                    adjacentFragments.push(fragment);
                })
            } else {
                 // vertical edges
                for(let i = x-k; i <= x+k; i += k*2) {
                    if(i >= 0 && i < NUMBEROFQUADRANTSPERAXIS) {
                        for(let j = y-k; j <= y+k; j++) {
                            if(j >= 0 && j < NUMBEROFQUADRANTSPERAXIS) {
                                fragmentQuadrants[i][j].forEach(fragment => {
                                    adjacentFragments.push(fragment);
                                })
                            }
                        }
                    }
                }

                // fill in horizontal edge rest
                for(let i = x-k+1; i <= x+k-1; i++) {
                    if(i >= 0 && i < NUMBEROFQUADRANTSPERAXIS) {
                        for(let j = y-k; j <= y+k; j += k*2) {
                            if(j >= 0 && j < NUMBEROFQUADRANTSPERAXIS) {

                                fragmentQuadrants[i][j].forEach(fragment => {
                                    adjacentFragments.push(fragment);
                                })
                            }
                        }
                    }
                }
            }
           
            adjCount += adjacentFragments.length;

            //check the distance from mouse position to each fragment position in the list
            adjacentFragments.forEach(fragment => {
                // a² + b² = c² -> c = sqrt(a² + b²)
                const a = ((window.scrollY - caveDiv.offsetTop) + mousePos.y - cavePos.y) - (fragment.pos.y * Fragment.PLACEMENTFACTOR);
                const b = (mousePos.x - cavePos.x)-(fragment.pos.x * Fragment.PLACEMENTFACTOR);
                let dist = Math.sqrt(a * a + b * b);

                if(!clFrags[2] || dist < clFrags[2].dist) {
                    if(!clFrags[1] || dist < clFrags[1].dist) {
                        if(!clFrags[0] || dist < clFrags[0].dist) {
                            clFrags.unshift({frag: fragment, dist: dist});
                        } else {
                            clFrags[2] = clFrags[1];
                            clFrags[1] = {frag: fragment, dist: dist};
                        }
                    }   else {
                        clFrags[2] = {frag: fragment, dist: dist};
                    }
                }
            })

            if(clFrags[2]) {
                break;
            }
        }

        closestFragments = [];

        for(let i = 0; i < clFrags.length; i++) {
            closestFragments.push(clFrags[i].frag);
        };
    }

    const update = () => {

        const mD = mouseDelta();
        if (dragging) {
            moveCave(mD.x, mD.y);
        }

        updateMousePos();
        // still need to implement sound
        //updateSounds();
        updateParticles();
        requestAnimationFrame(update);
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

    const updateParticles = () => {
        particles.updateMousePos({x: mousePos.x, y: (caveDiv.offsetTop - window.scrollY) + canvas.clientHeight - mousePos.y});
        particles.step().draw();
    }

    const moveCave = (x, y) => {
        cavePos.x += x;
        cavePos.y += y;
        updateCave(cavePos.x, cavePos.y);
        particles.updateCaveOffset([x,y]);
    }

    const updateCave = (x, y) => {
        caveCont.style.left = x + 'px';
        caveCont.style.top = y + 'px';
    }

    setInterval(() => {
        particles.birthing = true;
        setTimeout(() => {
            particles.birthing = false;
        }, 5000);
    }, 10000);

    //initial birthing burst
    particles.birthing = true;
    setTimeout(() => {
        particles.birthing = false;
    }, 5000);

    findClosestFragments();
    particles.updateClosest(closestFragments, cavePos);
    update();
});



//window.addEventListener('resize', () => {
    //resizeCanvasToDisplaySize($('#display')[0]);
//})

