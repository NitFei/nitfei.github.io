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
    .fromTo('.animation', {background: 'linear-gradient(#000000, #313131)'}, {duration: 8, background: 'linear-gradient(#000000, #73858b)'}, 0)

    // 0.5


    // 1
    .to('#tree002', {duration: 3.5, x:-2*window.innerWidth, ease: 'none'}, 1.5)

    //1.5

    // 2
    .fromTo('.face1', {opacity: 0.3}, {duration: 1, opacity: 0.5}, 2)
    .fromTo('.face2', {opacity: 0.2}, {duration: 1, opacity: 0.4}, 2)

    .to('#tree009', {duration: 2, x:-2*window.innerWidth, ease: 'none'}, 2.1)
    .to('#tree006', {duration: 1, x:-2*window.innerWidth, ease: 'none'}, 2.2)
    .to('#tree007', {duration: 1.7, x:-2*window.innerWidth, ease: 'none'}, 2.4)
    .to('#tree008', {duration: 2.4, x:-2*window.innerWidth, ease: 'none'}, 2.4)

    //2.5
    .to('#tree001', {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, 2.5)

    .to('#tree004', {duration: 1, x:-2*window.innerWidth, ease: 'none'}, 2.8)

    .to('#tree010', {duration: 2.5, x:-2*window.innerWidth, ease: 'none'}, 2.9)
    .to('#tree005', {duration: 3, x:-2*window.innerWidth, ease: 'none'}, 2.9)


    // 3
    .fromTo('#text001', {x: 0}, {duration: 8, x: -2*window.innerWidth, ease: 'none'}, 3)
    .to('#tree003', {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, 3)
    .fromTo('.face2', {opacity: 0.4}, {duration: 1, opacity: 0.8}, 3)
    .fromTo('.face3', {opacity: 0.2}, {duration: 1, opacity: 0.8}, 3)

    //3.5
    .to('#tree011', {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, 3.5)

    // 4
    .fromTo('.face1', {opacity: 0.5}, {duration: 1, opacity: 0.7}, 4)
    .fromTo('.face3', {opacity: 0.8}, {duration: 1, opacity: 0.4}, 4)
    .to('#tree013', {duration: 1.2, x:-2*window.innerWidth, ease: 'none'}, 4)

    //4.5
    .to('#tree012', {duration: 2.5, x:-2*window.innerWidth, ease: 'none'}, 4.5)

    // 5
    .to('#pole002', {duration: 10, x:-2*window.innerWidth, ease: 'none'}, 5)

    // 6
    .to('#tree014', {duration: 1.2, x:-2*window.innerWidth, ease: 'none'}, 6)

    // 6.5
    .to('#tree015', {duration: 2.2, x:-2*window.innerWidth, ease: 'none'}, 6.5)
    .to('#factory', {duration: 13, x:-2*window.innerWidth, ease: 'none'}, 6.5)

    // 7


    .addLabel('end');    
