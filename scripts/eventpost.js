class EventPost {
    constructor(_post, _div) {
        this.post = _post;

        if(!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('post-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.name = this.post.title;
        this.showButtonTimer;
        this.hideButtonTimer;

        this.insertImage();
        this.createMusicPlayer();
        this.createBackButton();
        this.addEventHandlers();
    }

    createMusicPlayer = () => {
        this.mPDiv = document.createElement('div');
        this.mPDiv.classList.add('music-player-wrapper');
        this.div.appendChild(this.mPDiv);

        this.mP = new MusicPlayer(this.mPDiv, this.post.link);
    }

    insertImage = () => {
        this.div.style.backgroundImage = 'url(' + this.post.imageURL + ')';
        this.div.style.backgroundSize = 'cover';
        this.div.style.backgroundPosition = 'center';
    }


    resizePost = () => {
        
    }

    createBackButton = () => {
        this.bbuttonDiv = document.createElement('div');
        this.bbuttonDiv.classList.add('back-button');
        this.bbuttonDiv.addEventListener('click', this.returnToSlotmachine);

        const bbutton = document.createElement('img');
        bbutton.src = 'src/media/ui/backButtonArrow.png';
        bbutton.width = '100';

        this.bbuttonDiv.appendChild(bbutton);
        this.div.appendChild(this.bbuttonDiv);
    }

    returnToSlotmachine = () => {
        //this removes the iframe from view, but the instance of the video object might not get cleaned from memory. How do I do that?
        document.body.removeChild(this.div);
    }

    addEventHandlers = () => {
        this.div.addEventListener('mousemove', this.showBackButton);
    }

    showBackButton = () => {
        this.bbuttonDiv.style.display = 'block';
        this.bbuttonDiv.style.opacity = 1;
        clearTimeout(this.showButtonTimer);
        clearTimeout(this.hideButtonTimer);
        this.showButtonTimer = setTimeout(() => {
            this.bbuttonDiv.style.opacity = 0;
            this.hideButtonTimer = setTimeout(() => {
                this.bbuttonDiv.style.display = 'none';
            }, 500);
        }, 1000);
    }
}