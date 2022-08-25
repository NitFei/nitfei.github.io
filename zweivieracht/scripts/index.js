window.onload = () => {
    resizeCards();
    const cont = document.getElementById("img-cont");
    const lg = new LineGraphics("./src/images/home2.jpg", cont);
    clean(document);
}

window.addEventListener('resize', () => {
    resizeCards();
})

const resizeCards = () => {
    $(".card img").height(window.innerHeight - $("header").height());
    const offset = window.innerWidth * 0.5 - ($(".card img")[0].width) * 0.5;
    $("#card-wrapper").css({left:offset});
}

function clean(node) {
    for (var n = 0; n < node.childNodes.length; n ++) {
        var child = node.childNodes[n];
        if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
            node.removeChild(child);
            n --;
        } else if(child.nodeType === 1) {
            clean(child);
        }
    }
}