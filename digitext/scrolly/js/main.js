const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.animation',
        pin: true,
        start: 'top top',
        end: '+=12000',
        scrub: 1.5,
    }
});


tl.addLabel('tree001')
    .to('#tree001', {duration: 5, x:-2*window.innerWidth, ease: 'none'}, 0)
    .addLabel('tree002')
    .to('#tree002', {duration: 6, x:-2*window.innerWidth, ease: 'none'}, 0.5)
    .addLabel('pole001')
    .to('#pole001', {duration: 4, x:-2*window.innerWidth, ease: 'none'}, 4)
    .addLabel('face1')
    .fromTo('.face1', {opacity: 0}, {duration: 1, opacity: 0.3}, 0)
    .fromTo('.face1', {opacity: 0.3}, {duration: 1, opacity: 0.5}, 2)
    .fromTo('.face1', {opacity: 0.5}, {duration: 1, opacity: 0.7}, 4)
    .addLabel('face2')
    .fromTo('.face2', {opacity: 0.2}, {duration: 1, opacity: 0.4}, 2)
    .fromTo('.face2', {opacity: 0.4}, {duration: 1, opacity: 0.8}, 3)
    .addLabel('face3')
    .fromTo('.face3', {opacity: 0.2}, {duration: 1, opacity: 0.8}, 3)
    .fromTo('.face3', {opacity: 0.8}, {duration: 1, opacity: 0.4}, 4)
    .addLabel('text')
    .fromTo('#text001', {x: 0}, {duration: 1, x: -1000}, 2)
    .fromTo('#text001', {x: -1000}, {duration: 3, x:-3000}, 6)
    .addLabel('end');    
