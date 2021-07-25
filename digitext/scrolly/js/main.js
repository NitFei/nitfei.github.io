const flightPath = {
    curviness: 1.25,
    values: [
        {x:-window.innerWidth, y: 0}
    ]
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to('.tree', 1, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration: 1000,
    triggerHook: 0
})
.setTween(tween)
.setPin('.animation')
.addTo(controller);