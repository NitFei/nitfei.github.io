class Video {
    constructor(_div, _link) {
        this.div = _div;

        this.createVid();
        this.createBackButton();
    }

    createVid = () => {
        const postFrame = document.createElement('iframe');
        postFrame.width = window.innerWidth;
        postFrame.height = window.innerHeight;
        postFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
        postFrame.frameborder="0";
        postFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        this.div.appendChild(postFrame);
    }

    createBackButton = () => {
        const bbuttonDiv = document.createElement('div');
        bbuttonDiv.classList.add('back-button');
        const bbutton = document.createElement('img');
        bbutton.src = '../src/media/ui/backButtonArrow.png';
        bbutton.width = '100';
        bbuttonDiv.appendChild(bbutton);
        this.div.appendChild(bbuttonDiv);
    }
}