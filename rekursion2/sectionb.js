/***************************
 ******* SECTION B *********
 ***************************/

 function drawSectionB() {
    ft.display(progress);
    noStroke();
    fill(c2);
    textSize(30);
    textAlign(CENTER);
    textFont(font1);
    text(secBTexts[Math.floor(progress / 50)], width*0.5, height*0.8);
    textAlign(LEFT);


    // noStroke();
    // fill(c3)
    // circle(width*0.5, height*0.25, 100);
 }