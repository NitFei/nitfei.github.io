$(document).ready(async function() {
    getAllLayers();
    resizeBack();
    getLayer();

    $(window).resize(function(){
        resizeBack();
    });

    $('.back').each(function() {
        addEventHandlingToBackCharacter($(this));
    })

    $('#back-button').click(function() {
        backOneLayer();
    });
})

function resizeBack() {
    const fw = $('.front').width();
    document.body.style.setProperty('--backTop', fw * 0.15 + 'px');
    document.body.style.setProperty('--backTopHover', fw * 0.12 + 'px');
    document.body.style.setProperty('--answerTop', fw * 0.1 + 'px');
}

function bringBackToFront(back) {
    back.removeClass('animate');
    
    if(back.hasClass('devil-wrapper')){
        back.css({'right': '0', 'top': ''});
    } else {
        back.css({'left': '0', 'top': ''});
    }
    back.removeClass('back');
    back.addClass('front');
    back.addClass('animate');
    back.off('click');
    back.off('mouseenter');
    back.off('mouseleave');
}

function makeFrontBig(front, isDevil) {
    front.removeClass('animate');
    const w = front.width();

    if(isDevil){
        // devil needs to move stuff to the left
        front.css({'right': '0', 'left':''});
        front.animate({'width': 4 * w + 'px',
                        'top': 4 * -w * 0.15 + 'px',
                        'right': 4 * -w * 0.2 + 'px',
                        'opacity': 0},
                        500,
                        function() {resetToBack(front, isDevil)});
    } else {
        // angel moves stuff to the right
        front.css({'left': '0', 'right':''});
        front.animate({'width': 4 * w + 'px',
                        'top': 4 * -w * 0.15 + 'px',
                        'left': 4 * -w * 0.2 + 'px',
                        'opacity': 0},
                        500,
                        function() {resetToBack(front, isDevil)});
    }
}

function resetToBack(toReset, isDevil) {
    toReset.off('click');
    toReset.off('mouseenter');
    toReset.off('mouseleave');
    toReset.empty();
    toReset.removeClass();
    toReset.addClass('back');
    toReset.addClass('opacity0');
    toReset.removeAttr("style");

    if(isDevil){
        toReset.addClass('devil-wrapper');
        console.log(currentFront);
        addBodyImages(toReset, './src/devils/', currentFront.getChildCharacter(0));
    } else {
        toReset.addClass('angel-wrapper');
        addBodyImages(toReset, './src/angels/', currentFront.getChildCharacter(1));
    }

    addEventHandlingToBackCharacter(toReset);

    resizeBack();

    toReset.addClass('animate');
    toReset.removeClass('opacity0');
}

function addBodyImages(container, path, child) {
    
    // add head
    const head = createBodyPart(path + 'heads/head' + child.bodyParts[0] + '.png');
    head.appendTo(container);

    // add torso
    const torso = createBodyPart(path + 'torsos/torso' + child.bodyParts[1] + '.png');
    torso.appendTo(container);

    // add legs
    const legs = createBodyPart(path + 'legs/legs' + child.bodyParts[2] + '.png');
    legs.appendTo(container);
}

function createBodyPart(path) {
    const part = $('<img>');
    part.prop('src', path);
    return part;
}

function moveOtherAside(other) {
    other.removeClass('animate');
    const w = $('.front').width();


    if(other.hasClass('devil-wrapper')){
        // devil needs to be moved to the right
        other.animate({'width': w * 0.8,
                        'top': 0,
                        'right': 7 * -w * 0.2 + 'px',
                        'opacity': 0}, 
                        500,
                        function() {resetToBack(other, true)});
    } else {
        // angel moves to the left
        other.animate({'width': w * 0.8,
                        'top': 0,
                        'left': 7 *  -w * 0.2 + 'px',
                        'opacity': 0},
                        500,
                        function() {resetToBack(other, false)});
    }
}

function handleBackClick(me) {
    let other;
    let isDevil;
    console.log(currentFront.getChildCharacter(1));
    if(me.hasClass('devil-wrapper')){
        isDevil = true;
        currentFront = currentFront.getChildCharacter(0);
        other = $('.back.angel-wrapper');
        currentLayerString += '0';
    } else {
        isDevil = false;
        currentFront = currentFront.getChildCharacter(1);
        other = $('.back.devil-wrapper');
        currentLayerString += '1';
    }

    console.log(currentFront)
    moveOtherAside(other);
    makeFrontBig($('.front'), isDevil);
    bringBackToFront(me);
    $('.answer-wrapper').addClass('hidden');
}

function randomPathNumber() {
    let rand = Math.floor(Math.random() * 3) + 1;
    if (rand < 10) {
        rand = '00' + rand;
    } else if (rand < 100) {
        rand = '0' + rand;
    } return rand;
}

function addEventHandlingToBackCharacter(me) {
    me.click(async function() {
        handleBackClick($(this));
        getLayer();
    });

    me.mouseenter(function() {
        me.addClass('hover');
        if(me.hasClass('devil-wrapper')) {
            $('.answer-wrapper.devil').removeClass('hidden');

        } else {
            $('.answer-wrapper.angel').removeClass('hidden');
        }
    });

    me.mouseleave(function() {
        me.removeClass('hover');
        if(me.hasClass('devil-wrapper')) {
            $('.answer-wrapper.devil').addClass('hidden');
        } else {
            $('.answer-wrapper.angel').addClass('hidden');
        }
    });
}

function backOneLayer() {
    $('.back').removeClass('animate');
    //$('.back').addClass('opacity0');

    let other;
    let newFront;
    let parentIsDevil;

    if($('.front').hasClass('devil-wrapper')){
        other = $('.back.angel-wrapper');
        newFront = $('.back.devil-wrapper');
    } else {
        other = $('.back.devil-wrapper');
        newFront = $('.back.angel-wrapper');
    }

    parentIsDevil = (currentFront.getParentCharacter().isDevil);
    
    moveOtherIn(other);
    moveFrontToBack();
    spawnFront(newFront, parentIsDevil);
    resizeBack();
    currentFront = currentFront.getParentCharacter();
}

function moveFrontToBack() {
    const front = $('.front');

    front.removeAttr('style');
    front.removeClass('front');
    front.addClass('back');
    front.addClass('animate');
    front.removeClass('hover');
    addEventHandlingToBackCharacter(front);
}

function moveOtherIn(other) {
    other.removeClass('animate');
    const w = $('.front').width();
    console.log(w);

    if(other.hasClass('devil-wrapper')){
        // devil needs to be moved to the right
        other.css({'width': w * 0.8,
                        'top': 0,
                        'right': 7 * -w * 0.2 + 'px',
                        'opacity': 0});
        other.animate({'width': w * 0.2,
                        'top': w * 0.15,
                        'right': w * 0.2 + 'px',
                        'opacity': 1},
                        500,
                        function(){resetToBack(other, true)});
    } else {
        // angel moves to the left
        other.css({'width': w * 0.8,
                        'top': 0,
                        'left': 7 *  -w * 0.2 + 'px',
                        'opacity': 0});
        other.animate({'width': w * 0.2,
                        'top': w * 0.15,
                        'leftt': w * 0.2 + 'px',
                        'opacity': 1},
                        500,
                        function(){resetToBack(other, false)});
    }   
}

function spawnFront(front, isDevil) {
    front.off('click');
    front.off('mouseenter');
    front.off('mouseleave');
    resetToFront(front, isDevil);
    const w = front.width();

    if(isDevil){
        // devil needs to move stuff to the left
        front.css({'right': 4 * -w * 0.2 + 'px', 'width': 4 * w + 'px', 'top': 4 * -w * 0.15 + 'px', 'left':'', 'opacity':0});
        front.animate({'width': w,
                        'top': 0,
                        'right': '0',
                        'opacity': 1},
                        500,
                        function() {/*resetToFront(front, isDevil)*/});
    } else {
        // angel moves stuff to the right
        front.css({'left': 4 * -w * 0.2 + 'px', 'width': 4 * w + 'px', 'top': 4 * -w * 0.15 + 'px', 'right':'', 'opacity':0});
        front.animate({'width': w,
                        'top': 0,
                        'left': '0',
                        'opacity': 1},
                        500,
                        function() {/*resetToFront(front)*/});
    }
}

function resetToFront(toReset, isDevil) {
    toReset.empty();
    toReset.removeClass();
    toReset.addClass('front');
    toReset.addClass('opacity0');
    toReset.removeAttr("style");

    if(isDevil){
        toReset.addClass('devil-wrapper');
        addBodyImages(toReset, './src/devils/', currentFront.getParentCharacter());
    } else {
        toReset.addClass('angel-wrapper');
        addBodyImages(toReset, './src/angels/', currentFront.getParentCharacter());
    }

    resizeBack();
    toReset.addClass('animate');
    toReset.removeClass('opacity0');
    console.log('frontreset')
}

async function getLayer() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify({layerID: currentLayerString})
    }

    const response = await fetch('/getLayer', options);
    const data = await response.json();
    $('.question.text').text(data.question.text);
    $('.answer.angel.text').text(data.answers.angel.text);
    $('.answer.devil.text').text(data.answers.devil.text);
    console.log(data);
}

async function createPath() {
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({
            question: 'Warum soll ich Bob sagen, dass er bei der Polizei durchrufen soll?',
            answers: {
                devil: 'Sag ihm, dass jemand ihn beim Anfahren gesehen haben könnte.',
                angel: 'Sag ihm, dass er damit das gesetzlich Richtige tut.'
            },
            layerID: currentLayerString
        })
    };
    const response = await fetch('/createPath', options);
    const data = await response.json();
    console.log(data.text);
}

async function getAllLayers() {
    // GET fetch doesn't need to explicitly tell the routing that it is a GET request, so we don't need options
    const response = await fetch('/getAllLayers');
    const data = await response.json();
    
    // sort through all the characters, placing the lowest layers first
    data.sort(function(a,b){
        return a.layerID.length - b.layerID.length;
    });

    // turn each character's layerID into an array of integers
    data.forEach(layer => {
        // get rid of the non-numbers in the layerID, as they don't indicate the layer's structure
        let s = layer.layerID.slice(1);

        if(s.length > 0) {
            let character = mainChar;

            // do some stupid recursion shit 
            for(let c in s) {
                child = character.getChildCharacter(c);

                if(child) {
                    character = child;
                } else {
                    character.birthChild(c);
                }
                character = child ? child : character;
                
            }

            character.answers = layer.answers;
            character.question = layer.question;
        }
    });
    
}

let currentLayerString = 'a';
let currentFront = new Character(false, null);
let mainChar = currentFront;