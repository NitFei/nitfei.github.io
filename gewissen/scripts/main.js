$(document).ready(function(){
    resizeBack();

    $(window).resize(function(){
        resizeBack();
    });

    $('.back').click(function() {
        makeFrontBig($('.front'), $(this));

        bringBackToFront($(this));
        $(this).off('click');
    })
})

function resizeBack() {
    const fw = $('.front').width();
    $('.back').css('top', fw * 0.15 + 'px');
}

function bringBackToFront(back) {
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
        // devil needs to move tuff to the left
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
    front.removeAttr("style");

    if(devAng.hasClass('devil-wrapper')){
        front.addClass('devil-wrapper');

        // add head
        const head = $('<img>');
        head.prop('src','../src/devils/heads/head001.png');
        head.appendTo(front);

        // add torso
        const torso = $('<img>');
        torso.prop('src','../src/devils/torsos/torso001.png');
        torso.appendTo(front);

        // add legs
        const legs = $('<img>');
        legs.prop('src','../src/devils/legs/legs001.png');
        legs.appendTo(front);
    } else {
        front.addClass('angel-wrapper');

        const head = $('<img>');
        head.prop('src','../src/angels/heads/head001.png');
        head.appendTo(front);

        // add torso
        const torso = $('<img>');
        torso.prop('src','../src/angels/torsos/torso001.png');
        torso.appendTo(front);

        // add legs
        const legs = $('<img>');
        legs.prop('src','../src/angels/legs/legs001.png');
        legs.appendTo(front);
    }

    

    

    front.click(function() {
        makeFrontBig($('.front'), $(this));
        bringBackToFront($(this));
        $(this).off('click');
    })

    resizeBack();
}