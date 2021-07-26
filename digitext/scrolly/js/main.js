const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.animation',
        pin: true,
        start: 'top top',
        end: '+=5000',
        scrub: 1.5,
    }
});


tl.addLabel('tree001')
    .to('#tree001', {duration: 1, x:-window.innerWidth, ease: 'none'},0)
    .addLabel('tree002')
    .to('#tree002', {duration: 1, x:-window.innerWidth, ease: 'none'},0.5)
    .addLabel('highlights')
    .fromTo('.highlights', {opacity: 0}, {duration: 0.5, opacity: 0.4}, 0)
    .fromTo('.highlights', {opacity: 0.4}, {duration: 0.5, opacity: 0.7}, 2)
    .addLabel('lowlights')
    .fromTo('.lowlights', {opacity: 0}, {duration: 0.5, opacity: 0.4}, 0)
    .fromTo('.lowlights', {opacity: 0.4}, {duration: 0.5, opacity: 0.7}, 2)
    .addLabel('text')
    .fromTo('#text001', {x: 0}, {duration: 1, x: -1000}, 1)
    .fromTo('#text001', {x: -1000}, {duration: 3, x:-3000}, 3)
    .addLabel('end');    
