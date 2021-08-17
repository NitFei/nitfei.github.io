$(document).ready(function() {
    currentLayerString = ''

    resizeBack();

    $(window).resize(function(){
        resizeBack();
    });

    addEventHandlingToBackCharacter($('.back'));

    $('#back-button').click(function() {
        backOneLayer();
    });
})

function resizeBack() {
    const fw = $('.front').width();
    document.body.style.setProperty('--backTop', fw * 0.15 + 'px');
    document.body.style.setProperty('--backTopHover', fw * 0.12 + 'px');
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
    if(me.hasClass('devil-wrapper')){
        isDevil = true;
        currentFront = currentFront.getChildCharacter(0);
        other = $('.back.angel-wrapper');
    } else {
        isDevil = false;
        currentFront = currentFront.getChildCharacter(1);
        other = $('.back.devil-wrapper');
    }

    moveOtherAside(other);
    makeFrontBig($('.front'), isDevil);
    bringBackToFront(me);
}

function randomPathNumber() {
    let rand = Math.floor(Math.random() * 3) + 1;
    if (rand < 10) {
        rand = '00' + rand;
    } else if (rand < 100) {
        rand = '0' + rand;
    } return rand;
}

function backOneLayer() {
    currentFront = currentFront.getParentCharacter();

    $('.back').removeClass('animate');
    $('.back').addClass('opacity0');
    moveFrontToBack();
    resizeBack();
}

function moveFrontToBack() {
    const front = $('.front');
    front.removeAttr('style');
    front.removeClass('front');
    front.addClass('back');
}

function addEventHandlingToBackCharacter(me) {
    $(me).click(function() {
        handleBackClick($(this));
    });

    $(me).mouseenter(function() {
        $(this).addClass('hover');
    });

    $(me).mouseleave(function() {
        $(this).removeClass('hover');
    });
}

let currentLayerString = '';
let currentFront = new Character(false, null);