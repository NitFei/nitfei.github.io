$(document).ready(function() {

    $(window).resize(function() {
        resizeEverything();
    });

    $('.animation').mousemove(function(event) {
        x = event.pageX - $(this).offset().left;
        y = event.pageY - $(this).offset().top;
        w = $('.animation').width();
        h = $('.animation').height();

        xPercent = x/w;
        yPercent = y/h;
        console.log(xPercent,yPercent)      
        if(yPercent < 0.475 && yPercent > 0.37 && xPercent < 0.4 && xPercent > 0.315) {
            focusPillowBlanket(x, y);
        } else if(yPercent < 0.74 && yPercent > 0.26 && xPercent < 0.7 && xPercent > 0.484) {
            focusPillowBlanket(x, y);
        } else if(yPercent < 0.18 && yPercent > 0.05 && xPercent < 0.775 && xPercent > 0.647) {
            focusHomeSweetHome(x, y);
        } else {
            resetRoom();
        }
    });

    resizeEverything();
});

function resizeEverything() {
    // aspect should be 1920:1080
    w = window.innerWidth;
    h = window.innerHeight;

    console.log(w, h)
    if(w/h > 1920/1080) {
        // window is wider than 1920:1080 ratio, so our height limits the width
        $('.animation').css({'width': 1920 * h/1080 + 'px', 'height': h + 'px'});
    } else {
        // window is taller than 1920:1080 ratio, so our width limits the height
        $('.animation').css({'width': w + 'px', 'height': 1080 * w/1920 + 'px'});
    }
}

function focusPillowBlanket(x, y) {
    $('.room-wrapper>img').not('.blanket').addClass('unfocussed');
    $('.descr.blanket').removeClass('hidden');
    $('.descr.blanket').css({'left': x, 'top':y})
}

function focusHomeSweetHome(x, y) {
    $('.room-wrapper>img').not('.home').addClass('unfocussed');
    $('.descr.home').removeClass('hidden');
    $('.descr.home').css({'left': x, 'top':y})
}

function resetRoom() {
    $('.room-wrapper>img').removeClass('unfocussed');
    $('.descr').addClass('hidden');
}