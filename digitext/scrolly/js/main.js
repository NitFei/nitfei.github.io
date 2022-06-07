const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.animation',
        pin: true,
        start: 'top top',
        end: '+=20000',
        scrub: 1.5,
    }
});

//background animation
tl.fromTo('.animation', {background: 'linear-gradient(#000000, #313131)'}, {duration: 8, background: 'linear-gradient(#000000, #73858b)'}, 0)

// text animation
tl.fromTo('#text001', {x: 0, opacity: 0.5}, {duration: 3, x: -0.75*window.innerWidth, opacity: 1, ease: 'none'}, 3)
    .fromTo('#text001', {x: -0.75*window.innerWidth, opacity: 1}, {duration: 5, x: -2*window.innerWidth, opacity: 0.5, ease: 'none'}, 6)


// face animation
tl.fromTo('.face1', {opacity: 0}, {duration: 1, opacity: 0.3}, 0)
    .fromTo('.face1', {opacity: 0.3}, {duration: 1, opacity: 0.5}, 2)
    .fromTo('.face2', {opacity: 0.2}, {duration: 1, opacity: 0.4}, 2)
    .fromTo('.face2', {opacity: 0.4}, {duration: 1, opacity: 0.8}, 3)
    .fromTo('.face3', {opacity: 0.2}, {duration: 1, opacity: 0.8}, 3)
    .fromTo('.face1', {opacity: 0.5}, {duration: 1, opacity: 0.7}, 4)
    .fromTo('.face3', {opacity: 0.8}, {duration: 1, opacity: 0.4}, 4);


let tla = 0;    // tree loop addition
// tree loop
tl.to('#pole001', {duration: 10, x:-2*window.innerWidth, ease: 'none'}, tla+0)
    .fromTo('.animation', {background: 'linear-gradient(#000000, #313131)'}, {duration: 8, background: 'linear-gradient(#000000, #73858b)'}, 0)

    // 0.5


    // 1
    .to('#tree002', {duration: 3.5, x:-2*window.innerWidth, ease: 'none'}, tla+1.5)

    //1.5

    // 2
    

    .to('#tree009', {duration: 2, x:-2*window.innerWidth, ease: 'none'}, tla+2.1)
    .to('#tree006', {duration: 1, x:-2*window.innerWidth, ease: 'none'}, tla+2.2)
    .to('#tree016', {duration: 1.4, x:-2*window.innerWidth, ease: 'none'}, tla+2.2)
    .to('#tree017', {duration: 2.7, x:-2*window.innerWidth, ease: 'none'}, tla+2.3)
    .to('#tree007', {duration: 1.7, x:-2*window.innerWidth, ease: 'none'}, tla+2.4)
    .to('#tree008', {duration: 2.4, x:-2*window.innerWidth, ease: 'none'}, tla+2.4)

    //2.5
    .to('#tree001', {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, tla+2.5)
    .to('#tree004', {duration: 1, x:-2*window.innerWidth, ease: 'none'}, tla+2.8)

    .to('#tree010', {duration: 2.5, x:-2*window.innerWidth, ease: 'none'}, tla+2.9)
    .to('#tree005', {duration: 3, x:-2*window.innerWidth, ease: 'none'}, tla+2.9)

    // 3
    .to('#tree003', {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, tla+3)

    //3.5
    .to('#tree011', {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, tla+3.5)

    // 4
    .to('#tree013', {duration: 1.2, x:-2*window.innerWidth, ease: 'none'}, tla+3.9)

    //4.5
    .to('#tree012', {duration: 2.5, x:-2*window.innerWidth, ease: 'none'}, tla+4.5)

    // 5
    .to('#pole002', {duration: 10, x:-2*window.innerWidth, ease: 'none'}, tla+5)

    // 6
    .to('#tree014', {duration: 1.2, x:-2*window.innerWidth, ease: 'none'}, tla+6)

    // 6.5
    .to('#tree015', {duration: 2.2, x:-2*window.innerWidth, ease: 'none'}, tla+8.5)
    .to('#factory', {duration: 13, x:-2*window.innerWidth, ease: 'none'}, tla+6.5)

    // 7

    .to('#tree016', {duration: 2.2, x:-2*window.innerWidth, ease: 'none'}, tla+8)
    .to('#tree017', {duration: 1.6, x:-2*window.innerWidth, ease: 'none'}, tla+9);

tla+=9;

tl.fromTo('#tree002', {x:0}, {duration: 3.5, x:-2*window.innerWidth, ease: 'none'}, tla+1.5)
    .fromTo('#tree009', {x:0}, {duration: 2, x:-2*window.innerWidth, ease: 'none'}, tla+2.1)
    .fromTo('#tree006', {x:0}, {duration: 1, x:-2*window.innerWidth, ease: 'none'}, tla+2.2)
    .fromTo('#tree016', {x:0}, {duration: 1.4, x:-2*window.innerWidth, ease: 'none'}, tla+2.2)
    .fromTo('#tree017', {x:0}, {duration: 2.7, x:-2*window.innerWidth, ease: 'none'}, tla+2.3)
    .fromTo('#tree007', {x:0}, {duration: 1.7, x:-2*window.innerWidth, ease: 'none'}, tla+2.4)
    .fromTo('#tree008', {x:0}, {duration: 2.4, x:-2*window.innerWidth, ease: 'none'}, tla+2.4)
    .fromTo('#tree001', {x:0}, {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, tla+2.5)
    .fromTo('#tree004', {x:0}, {duration: 1, x:-2*window.innerWidth, ease: 'none'}, tla+2.8)
    .fromTo('#tree010', {x:0}, {duration: 2.5, x:-2*window.innerWidth, ease: 'none'}, tla+2.9)
    .fromTo('#tree005', {x:0}, {duration: 3, x:-2*window.innerWidth, ease: 'none'}, tla+2.9)
    .fromTo('#tree003', {x:0}, {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, tla+3)
    .fromTo('#tree011', {x:0}, {duration: 1.5, x:-2*window.innerWidth, ease: 'none'}, tla+3.5)
    .fromTo('#tree013', {x:0}, {duration: 1.2, x:-2*window.innerWidth, ease: 'none'}, tla+3.9)
    .fromTo('#tree012', {x:0}, {duration: 2.5, x:-2*window.innerWidth, ease: 'none'}, tla+4.5)
    .fromTo('#tree014', {x:0}, {duration: 1.2, x:-2*window.innerWidth, ease: 'none'}, tla+6)
    .fromTo('#tree015', {x:0}, {duration: 2.2, x:-2*window.innerWidth, ease: 'none'}, tla+8.5)
    .fromTo('#tree016', {x:0}, {duration: 2.2, x:-2*window.innerWidth, ease: 'none'}, tla+8)
    .fromTo('#tree017', {x:0}, {duration: 1.6, x:-2*window.innerWidth, ease: 'none'}, tla+9);