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
    // 0
    .to('#pole001', {duration: 10, x:-2*window.innerWidth, ease: 'none'}, 0)
    .fromTo('.face1', {opacity: 0}, {duration: 1, opacity: 0.3}, 0)
    .fromTo('.animation', {background: 'linear-gradient(#000000, #313131)'}, {duration: 8, background: 'linear-gradient(#000000, #8b8d8d)'}, 0)

    // 0.5


    // 1
    .to('#tree001', {duration: 5, x:-2*window.innerWidth, ease: 'none'}, 1.5)

    //1.5
    .to('#tree002', {duration: 6, x:-2*window.innerWidth, ease: 'none'}, 2)

    // 2
    .fromTo('.face1', {opacity: 0.3}, {duration: 1, opacity: 0.5}, 2)
    .fromTo('.face2', {opacity: 0.2}, {duration: 1, opacity: 0.4}, 2)


    //2.5

    // 3
    .fromTo('#text001', {x: 0}, {duration: 8, x: -2*window.innerWidth, ease: 'none'}, 3)
    .fromTo('.face2', {opacity: 0.4}, {duration: 1, opacity: 0.8}, 3)
    .fromTo('.face3', {opacity: 0.2}, {duration: 1, opacity: 0.8}, 3)

    // 4

    .fromTo('.face1', {opacity: 0.5}, {duration: 1, opacity: 0.7}, 4)
    .fromTo('.face3', {opacity: 0.8}, {duration: 1, opacity: 0.4}, 4)

    // 5
    .to('#pole002', {duration: 10, x:-2*window.innerWidth, ease: 'none'}, 5)
    
    // 5.5
    

    // 7
    .to('#tree003', {duration: 2, x:-2*window.innerWidth, ease: 'none'}, 7)


    .addLabel('end');    
