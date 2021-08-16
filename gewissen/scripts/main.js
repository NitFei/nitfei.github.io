$(document).ready(function(){
    resizeBack();

    $(window).resize(function(){
        resizeBack();
    });

    $('.back').click(function() {
        handleBackClick($(this));
    })
})

function resizeBack() {
    const fw = $('.front').width();
    $('.back').css('top', fw * 0.15 + 'px');
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
    back.addClass('animate')
}

function makeFrontBig(front, devAng) {
    front.removeClass('animate');
    const w = front.width();

    if(devAng.hasClass('devil-wrapper')){
        // devil needs to move stuff to the left
        front.css({'right': '0', 'left':''});
        front.animate({'width': 4 * w + 'px', 'top': 4 * -w * 0.15 + 'px', 'right': 4 * -w * 0.2 + 'px', 'opacity': 0}, 500, function() {moveFrontToBack(front, devAng)});
    } else {
        // angel moves stuff to the right
        front.css({'left': '0', 'right':''});
        front.animate({'width': 4 * w + 'px', 'top': 4 * -w * 0.15 + 'px', 'left': 4 * -w * 0.2 + 'px', 'opacity': 0}, 500, function() {moveFrontToBack(front, devAng)});
    }
}

function moveFrontToBack(front, devAng) {
    front.empty();
    front.removeClass();
    front.addClass('back');
    front.addClass('opacity0');
    front.removeAttr("style");

    if(devAng.hasClass('devil-wrapper')){
        front.addClass('devil-wrapper');
        addBodyImages(front, './src/devils/');
    } else {
        front.addClass('angel-wrapper');
        addBodyImages(front, './src/angels/');
    }

    front.click(function() {
        handleBackClick(front)
    })

    resizeBack();

    front.addClass('animate');
    front.removeClass('opacity0');
}

function addBodyImages(front, path) {
    
    // add head
    const head = createBodyPart(path + 'heads/head' + randomPathNumber() + '.png');
    head.appendTo(front);

    // add torso
    const torso = createBodyPart(path + 'torsos/torso' + randomPathNumber() + '.png');
    torso.appendTo(front);

    // add legs
    const legs = createBodyPart(path + 'legs/legs' + randomPathNumber() + '.png');
    legs.appendTo(front);
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
        other.animate({'width': w * 0.8, 'top': 0, 'right': 7 * -w * 0.2 + 'px', 'opacity': 0}, 500, function() {resetToBack(other)});
    } else {
        // angel moves to the left
        other.animate({'width': w * 0.8, 'top': 0, 'left': 7 *  -w * 0.2 + 'px', 'opacity': 0}, 500, function() {resetToBack(other)});
    }
}

function resetToBack(other) {
    other.addClass('opacity0')
    other.removeAttr('style');


    resizeBack();

    other.addClass('animate');
    other.removeClass('opacity0');
}

function handleBackClick(me) {
    let other;
    if(me.hasClass('devil-wrapper')){
        other = $('.back.angel-wrapper');
    } else {
        other = $('.back.devil-wrapper');
    }

    moveOtherAside(other);

    makeFrontBig($('.front'), me);


    bringBackToFront(me);
    me.off('click');
}

function randomPathNumber() {
    let rand = Math.floor(Math.random() * 3) + 1;
    console.log(rand)
    if (rand < 10) {
        rand = '00' + rand;
    } else if (rand < 100) {
        rand = '0' + rand;
    } return rand;
}