class VideoPost {
    constructor(_post, _div) {
        if (!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('post-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.post = _post;

        this.createBackButton();
        this.createPlayer();
    }

    createPlayer = () => {
        this.div.style.display = "flex";
        this.div.style.justifyContent = "center";
        this.div.setAttribute('controls', '');

        this.playerCont = document.createElement('div');
        this.playerCont.classList.add('player-cont');
        this.playerDiv = document.createElement('div');
        this.playerDiv.classList.add('js-player');
        this.playerDiv.setAttribute('data-plyr-provider', 'youtube');
        this.playerDiv.setAttribute('data-plyr-embed-id', this.post.videoURL);
        this.playerDiv.setAttribute('controls', '');
        // this.playerDiv.setAttribute('data-plyr-config', '{ "settings": "quality" }');

        this.playerCont.appendChild(this.playerDiv);
        this.div.appendChild(this.playerCont);
        this.resizePost();

        this.player = Plyr.setup('.js-player', { settings: ['quality', 'captions', 'speed'], quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] } });
    };


    resizePost = () => {
        this.playerCont.style.display = "flex";
        this.playerCont.style.height = "100%";
        this.playerCont.style.width = (16 / 9) * this.div.clientHeight + 'px';


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

    handleMouseMove = () => {
        this.showBackButton();
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

    returnToSlotmachine = () => {
        //this removes the iframe from view, but the instance of the video object might not get cleaned from memory. How do I do that?
        document.body.removeChild(this.div);
        this.post.logic.startBackground();
    }

}