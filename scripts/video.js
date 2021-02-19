class Video {
    constructor(_div, _link) {
        this.div = _div;
        this.player;

        this.createVid();
        this.createBackButton();
        this.bbOpacityTimer = 0;
        this.bbDisplayTimer = 0;
    }

    createVid = () => {
        const postFrame = document.createElement('iframe');
        postFrame.classList.add('post-frame');
        postFrame.height = window.innerHeight;
        postFrame.width = window.innerWidth;
        postFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        postFrame.frameborder = '0';
        this.div.appendChild(postFrame);

        window.addEventListener('mousemove', () => {
            console.log('moved');
        });
    }

    createBackButton = () => {
        const bbuttonDiv = document.createElement('div');
        bbuttonDiv.classList.add('back-button');
        bbuttonDiv.addEventListener('click', this.returnToSlotmachine);

        const bbutton = document.createElement('img');
        bbutton.src = '../src/media/ui/backButtonArrow.png';
        bbutton.width = '100';

        document.querySelector('.post-frame').addEventListener('mousemove', () => {
            console.log('log');
            bbuttonDiv.style.display = 'block';
            bbuttonDiv.style.opacity = '1';
            clearTimeout(this.bbOpacityTimer);
            this.bbOpacityTimer = setTimeout(() => {
                bbuttonDiv.style.opacity = '0';
                this.bbDisplayTimer = setTimeout(() => {
                    bbuttonDiv.style.display = 'none';
                }, 500);
            }, 1000);

        })
        bbuttonDiv.appendChild(bbutton);
        this.div.appendChild(bbuttonDiv);
    }

    returnToSlotmachine = () => {
        //this removes the iframe from view, but the instance of the video object might not get cleaned from memory. How do I do that?
        document.body.header.style.display = 'auto';
        document.body.main.style.display = 'auto';
        document.body.removeChild(this.div);
    }

    handleMouseMove = () => {
        console.log('mouse moved');
    }
}